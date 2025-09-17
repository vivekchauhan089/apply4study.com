import React from 'react';
import { _ } from '../../lib/locale/translate/_.js';
import { ItemProps } from './CartItems.js';

const CartSummarySkeleton: React.FC<{ rows?: number }> = ({ rows = 2 }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex items-center py-6 animate-pulse">
          <div className="relative mr-4">
            <div className="w-16 h-16 bg-gray-200 rounded border p-2 box-border" />
            <span className="absolute -top-2 -right-2 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-400 text-sm">
              {i + 1}
            </span>
          </div>
          <div className="flex-1 min-w-0 items-start align-top">
            <div className="h-4 bg-gray-200 rounded w-3/5 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-2/5 mb-1" />
          </div>
          <div className="ml-auto text-right">
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </li>
      ))}
    </ul>
  );
};

const CartSummaryItemsList: React.FC<{
  items: ItemProps[];
  loading: boolean;
}> = ({ items, loading }) => {
  if (loading) {
    return <CartSummarySkeleton rows={items.length} />;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-base">{_('Your cart is empty')}</p>
        <p className="text-sm mt-2">{_('Add some items to get started')}</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 border-b mb-3">
      {items.map((item) => (
        <li key={item.id} className="flex items-start py-3">
          <div className="relative mr-4 self-center">
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-16 h-16 object-cover rounded border p-2 box-border"
              />
            )}
            <span className="absolute -top-2 -right-2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-gray-700 text-sm">
              {item.qty}
            </span>
          </div>
          <div className="flex-1 min-w-0 items-start align-top">
            <div className="font-semibold text-sm mb-1">{item.name}</div>
            {item.variantOptions && item.variantOptions.length > 0 && (
              <div className="space-y-1">
                {item.variantOptions.map((option) => (
                  <div
                    key={option.attributeCode}
                    className="text-sm text-gray-700"
                  >
                    {option.attributeName}: {option.optionText}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="ml-auto text-right self-center">
            <div className="">{item.lineTotal}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { CartSummaryItemsList };
