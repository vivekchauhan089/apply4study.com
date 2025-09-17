import Area from '@components/common/Area';
import React from 'react';
import './CheckoutSuccess.scss';

export default function CheckoutSuccessPage() {
  return (
    <div className="page-width grid grid-cols-1 md:grid-cols-2 gap-7">
      <Area id="checkoutSuccessPageLeft" />
      <Area id="checkoutSuccessPageRight" />
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
