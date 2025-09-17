import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import React from 'react';
import { _ } from '../../../lib/locale/translate/_.js';

interface OrderProps {
  order: {
    createdAt: {
      text: string;
    };
    grandTotal: {
      text: string;
    };
    items: {
      productPrice: {
        text: string;
      };
      productSku: string;
      productName: string;
      thumbnail?: string;
      qty: number;
    }[];
    orderNumber: string;
  };
}

export function OrderDetail({ order }: OrderProps) {
  return (
    <div className="order border-divider">
      <div className="order-inner grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="order-items col-span-2">
          {order.items.map((item) => (
            <div
              className="order-item mb-2 flex gap-5 items-center"
              key={item.productSku}
            >
              <div className="thumbnail border border-divider p-2 rounded">
                {item.thumbnail && (
                  <img
                    style={{ maxWidth: '6rem' }}
                    src={item.thumbnail}
                    alt={item.productName}
                  />
                )}
                {!item.thumbnail && (
                  <ProductNoThumbnail width={100} height={100} />
                )}
              </div>
              <div className="order-item-info">
                <div className="order-item-name font-semibold">
                  {item.productName}
                </div>
                <div className="order-item-sku italic">
                  {_('Sku')}: #{item.productSku}
                </div>
                <div className="order-item-qty" style={{ fontSize: '0.9em' }}>
                  {item.qty} x {item.productPrice.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-total col-span-1">
          <div className="order-header">
            <div className="order-number">
              <span className="font-bold">
                {_('Order')}: #{order.orderNumber}
              </span>
              <span className="italic pl-2">{order.createdAt.text}</span>
            </div>
          </div>
          <div className="order-total-value font-bold">
            {_('Total')}:{order.grandTotal.text}
          </div>
        </div>
      </div>
    </div>
  );
}
