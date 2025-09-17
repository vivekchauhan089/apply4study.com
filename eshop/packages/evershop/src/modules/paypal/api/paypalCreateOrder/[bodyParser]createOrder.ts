import { select, update } from '@evershop/postgres-query-builder';
import { error } from '../../../../lib/log/logger.js';
import { pool } from '../../../../lib/postgres/connection.js';
import { buildUrl } from '../../../../lib/router/buildUrl.js';
import { getConfig } from '../../../../lib/util/getConfig.js';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_PAYLOAD,
  OK
} from '../../../../lib/util/httpStatus.js';
import { getValueSync } from '../../../../lib/util/registry.js';
import { toPrice } from '../../../checkout/services/toPrice.js';
import { getContextValue } from '../../../graphql/services/contextHelper.js';
import { getSetting } from '../../../setting/services/setting.js';
import { createAxiosInstance } from '../../services/requester.js';
import { EvershopRequest } from '../../../../types/request.js';
import { EvershopResponse } from '../../../../types/response.js';
import type { PurchaseUnit, CreateOrderRequestBody } from '@paypal/paypal-js';

export default async (
  request: EvershopRequest,
  response: EvershopResponse,
  next
) => {
  try {
    const { order_id } = request.body;
    const order = await select()
      .from('order')
      .where('uuid', '=', order_id)
      .and('payment_method', '=', 'paypal')
      .and('payment_status', '=', 'pending')
      .load(pool);

    if (!order) {
      return response.status(INVALID_PAYLOAD).json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Invalid order'
        }
      });
    } else {
      // Build the order for createOrder API PayPal
      const items = await select()
        .from('order_item')
        .where('order_item_order_id', '=', order.order_id)
        .execute(pool);
      const catalogPriceInclTax = getConfig(
        'pricing.tax.price_including_tax',
        false
      );
      const amount = {
        currency_code: order.currency,
        value: toPrice(order.grand_total),
        breakdown: {
          item_total: {
            currency_code: order.currency,
            value: catalogPriceInclTax
              ? toPrice(order.sub_total_incl_tax)
              : toPrice(order.sub_total)
          },
          shipping: {
            currency_code: order.currency,
            value: catalogPriceInclTax
              ? toPrice(order.shipping_fee_incl_tax)
              : toPrice(order.shipping_fee_excl_tax)
          },
          discount: {
            currency_code: order.currency,
            value: toPrice(order.discount_amount)
          },
          tax_total: !catalogPriceInclTax
            ? {
                currency_code: order.currency,
                value: toPrice(order.total_tax_amount)
              }
            : undefined
        }
      } as PurchaseUnit['amount'];

      const finalAmount = getValueSync('paypalFinalAmount', amount, {
        order,
        items
      });

      const orderData = {
        intent: await getSetting('paypalPaymentIntent', 'CAPTURE'),
        purchase_units: [
          {
            items: items.map((item) => ({
              name: item.product_name,
              sku: item.product_sku,
              quantity: item.qty,
              unit_amount: {
                currency_code: order.currency,
                value: catalogPriceInclTax
                  ? toPrice(item.final_price_incl_tax)
                  : toPrice(item.final_price)
              }
            })),
            amount: finalAmount
          }
        ],
        application_context: {
          cancel_url: `${getContextValue<string>(
            request,
            'homeUrl',
            ''
          )}${buildUrl('paypalCancel', { order_id })}`,
          return_url: `${getContextValue<string>(
            request,
            'homeUrl',
            ''
          )}${buildUrl('paypalReturn', { order_id })}`,
          shipping_preference: 'SET_PROVIDED_ADDRESS',
          user_action: 'PAY_NOW',
          brand_name: await getSetting('storeName', 'Evershop')
        }
      } as CreateOrderRequestBody;
      const shippingAddress = await select()
        .from('order_address')
        .where('order_address_id', '=', order.shipping_address_id)
        .load(pool);

      // Add shipping address
      if (shippingAddress) {
        const address: any = {
          address_line_1: shippingAddress.address_1,
          address_line_2: shippingAddress.address_2,
          admin_area_2: shippingAddress.city,
          postal_code: shippingAddress.postcode,
          country_code: shippingAddress.country
        };
        if (shippingAddress.province) {
          address.admin_area_1 = shippingAddress.province.split('-').pop();
        }
        orderData.purchase_units[0].shipping = {
          name: {
            full_name: `${shippingAddress.full_name}`
          },
          type: 'SHIPPING',
          address
        };
      } else {
        // This is digital order, no shipping address
        orderData.purchase_units[0].shipping = {
          address: {
            address_line_1: 'No shipping address',
            address_line_2: 'No shipping address',
            admin_area_1: 'No shipping address',
            admin_area_2: 'No shipping address',
            postal_code: 'No shipping address',
            country_code: 'No shipping address'
          }
        };
      }

      const finalPaypalOrderData = getValueSync<CreateOrderRequestBody>(
        'finalPaypalOrderData',
        orderData,
        {
          order,
          items,
          shippingAddress
        }
      );
      // Call PayPal API to create order using axios
      const axiosInstance = await createAxiosInstance(request);
      const { data } = await axiosInstance.post(
        `/v2/checkout/orders`,
        finalPaypalOrderData,
        {
          validateStatus: (status) => status < 500
        }
      );

      if (data.id) {
        // Update order and insert papal order id
        await update('order')
          .given({ integration_order_id: data.id })
          .where('uuid', '=', order_id)
          .execute(pool);

        response.status(OK);
        return response.json({
          data: {
            paypalOrderId: data.id,
            approveUrl: data.links.find((link) => link.rel === 'approve').href
          }
        });
      } else {
        // Re-active the cart
        await update('cart')
          .given({ status: true })
          .where('cart_id', '=', order.cart_id)
          .execute(pool);
        response.status(INTERNAL_SERVER_ERROR);
        return response.json({
          error: {
            status: INTERNAL_SERVER_ERROR,
            message: data.message
          }
        });
      }
    }
  } catch (err) {
    error(err);
    return next(err);
  }
};
