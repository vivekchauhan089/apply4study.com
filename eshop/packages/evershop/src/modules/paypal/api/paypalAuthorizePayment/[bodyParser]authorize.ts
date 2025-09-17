import {
  getConnection,
  insert,
  select
} from '@evershop/postgres-query-builder';
import { error } from '../../../../lib/log/logger.js';
import { pool } from '../../../../lib/postgres/connection.js';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_PAYLOAD,
  OK
} from '../../../../lib/util/httpStatus.js';
import { updatePaymentStatus } from '../../../oms/services/updatePaymentStatus.js';
import { createAxiosInstance } from '../../services/requester.js';
import { EvershopRequest } from '../../../../types/request.js';
import { EvershopResponse } from '../../../../types/response.js';

export default async (
  request: EvershopRequest,
  response: EvershopResponse,
  next
) => {
  try {
    const { order_id } = request.body;
    // Validate the order;
    const order = await select()
      .from('order')
      .where('uuid', '=', order_id)
      .and('payment_method', '=', 'paypal')
      .and('payment_status', '=', 'pending')
      .load(pool);

    if (!order) {
      response.status(INVALID_PAYLOAD);
      response.json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Invalid order'
        }
      });
    } else {
      // Call API to authorize the paypal order using axios
      const axiosInstance = await createAxiosInstance(request);
      const responseData = await axiosInstance.post(
        `/v2/checkout/orders/${order.integration_order_id}/authorize`
      );

      if (responseData.data.status === 'COMPLETED') {
        await updatePaymentStatus(order.order_id, 'authorized');
        // Add transaction data to database
        await insert('payment_transaction')
          .given({
            payment_transaction_order_id: order.order_id,
            transaction_id:
              responseData.data.purchase_units[0].payments.authorizations[0].id,
            amount:
              responseData.data.purchase_units[0].payments.authorizations[0]
                .amount.value,
            currency:
              responseData.data.purchase_units[0].payments.authorizations[0]
                .amount.currency_code,
            status:
              responseData.data.purchase_units[0].payments.authorizations[0]
                .status,
            payment_action: 'authorize',
            transaction_type: 'online',
            additional_information: JSON.stringify(responseData.data)
          })
          .execute(pool);

        // Save order activities
        await insert('order_activity')
          .given({
            order_activity_order_id: order.order_id,
            comment: `Customer authorized the payment using PayPal. Transaction ID: ${responseData.data.purchase_units[0].payments.authorizations[0].id}`,
            customer_notified: 0
          })
          .execute(pool);

        response.status(OK);
        response.json({
          data: {}
        });
      } else {
        response.status(INTERNAL_SERVER_ERROR);
        response.json({
          error: {
            status: INTERNAL_SERVER_ERROR,
            message: responseData.data.message
          }
        });
      }
    }
  } catch (err) {
    error(err);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: err.message
      }
    });
  }
};
