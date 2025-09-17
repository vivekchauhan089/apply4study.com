import Area from '@components/common/Area.js';
import Button from '@components/common/Button.js';
import { useAppDispatch, useAppState } from '@components/common/context/app.js';
import { Form } from '@components/common/form/Form.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import {
  AddToCart,
  AddToCartActions,
  AddToCartState
} from '@components/frontStore/AddToCart.js';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { _ } from '../../../../../lib/locale/translate/_.js';
import './Form.scss';

const ToastMessage: React.FC<{
  thumbnail?: string;
  name: string;
  qty: number;
  count: number;
  cartUrl: string;
  toastId: string;
}> = ({ thumbnail, name, qty, count, cartUrl, toastId }) => {
  return (
    <div className="toast-mini-cart">
      <div className="top-head grid grid-cols-2">
        <div className="self-center">{_('JUST ADDED TO YOUR CART')}</div>
        <div className="self-center close flex justify-end">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast.dismiss(toastId);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="item-line flex justify-between">
        <div className="popup-thumbnail flex justify-center items-center">
          {thumbnail ? (
            <img src={thumbnail} alt={name} />
          ) : (
            <ProductNoThumbnail width={25} height={25} />
          )}
        </div>
        <div className="item-info flex justify-between">
          <div className="name">
            <span className="font-bold">{name}</span>
          </div>
          <div>{_('QTY: ${qty}', { qty: qty.toString() })}</div>
        </div>
      </div>
      <a className="add-cart-popup-button" href={cartUrl}>
        {_('VIEW CART (${count})', { count: count.toString() })}
      </a>
      <a
        className="add-cart-popup-continue text-center underline block"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          toast.dismiss(toastId);
        }}
      >
        {_('Continue Shopping')}
      </a>
    </div>
  );
};

interface ProductFormProps {
  product: {
    image?: {
      thumb: string;
    };
    inventory: {
      isInStock: boolean;
    };
    name: string;
    sku: string;
  };
  action: string;
}
export default function ProductForm({ product }: ProductFormProps) {
  const [toastId, setToastId] = useState();
  const form = useForm();
  const qty = form.watch('qty');

  return (
    <Form id="productForm" method="POST" submitBtn={false} form={form}>
      <Area
        id="productSinglePageForm"
        coreComponents={[
          {
            component: {
              default: (
                <NumberField
                  defaultValue={1}
                  allowDecimals={false}
                  required
                  validation={{
                    required: _('Qty is required'),
                    min: { value: 1, message: _('Qty must be greater than 0') }
                  }}
                  className="qty"
                  name="qty"
                  placeholder={_('Qty')}
                />
              )
            },
            sortOrder: 50,
            id: 'qtyField'
          },
          {
            component: {
              default: (
                <AddToCart
                  product={{
                    sku: product.sku,
                    isInStock: product.inventory.isInStock
                  }}
                  qty={qty}
                  onSuccess={() => {
                    toast(
                      <ToastMessage
                        thumbnail={product.image?.thumb}
                        name={product.name}
                        qty={qty}
                        count={1}
                        cartUrl="/cart"
                        toastId={`${toastId}-${Math.random()
                          .toString(36)
                          .slice(2)}`}
                      />,
                      { closeButton: false }
                    );
                  }}
                  onError={(errorMessage) => {
                    toast.error(
                      errorMessage || _('Failed to add product to cart')
                    );
                  }}
                >
                  {(state: AddToCartState, actions: AddToCartActions) => (
                    <>
                      {state.isInStock === true && (
                        <Button
                          title={_('ADD TO CART')}
                          outline
                          isLoading={state.isLoading}
                          onAction={actions.addToCart}
                        />
                      )}
                      {state.isInStock === false && (
                        <Button title={_('SOLD OUT')} onAction={() => {}} />
                      )}
                    </>
                  )}
                </AddToCart>
              )
            },
            sortOrder: 60,
            id: 'addToCartButton'
          }
        ]}
      />
    </Form>
  );
}

export const layout = {
  areaId: 'productPageMiddleRight',
  sortOrder: 45
};

export const query = `
  query Query {
    product(id: getContextValue('productId')) {
      productId
      sku
      name
      image {
        thumb
      }
      inventory {
        isInStock
      }
    }
  }
`;
