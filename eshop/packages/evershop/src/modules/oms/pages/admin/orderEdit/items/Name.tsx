import React from 'react';
import { ItemVariantOptions } from './ItemVariantOptions.js';

interface NameProps {
  name: string;
  productSku: string;
  productUrl: string;
  variantOptions?: Array<{
    attribute_name: string;
    option_text: string;
    values: Array<{
      value_text: string;
      extra_price: number;
    }>;
  }>;
}

export function Name({
  name,
  productSku,
  productUrl,
  variantOptions = []
}: NameProps) {
  return (
    <td>
      <div className="product-column">
        <div>
          <span className="font-semibold">
            <a href={productUrl}>{name}</a>
          </span>
        </div>
        <div className="text-gray-500">
          <span className="font-semibold">SKU: </span>
          <span>{productSku}</span>
        </div>
        <ItemVariantOptions options={variantOptions} />
      </div>
    </td>
  );
}
