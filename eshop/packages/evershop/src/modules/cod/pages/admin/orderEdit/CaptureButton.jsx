import { Card } from '@components/admin/Card';
import Button from '@components/common/Button';
import RenderIfTrue from '@components/common/RenderIfTrue';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';

export default function CaptureButton({
  captureAPI,
  order: { paymentStatus, uuid, paymentMethod }
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  const onAction = async () => {
    setIsLoading(true);
    // Use Axios to call the capture API
    const response = await axios.post(
      captureAPI,
      { order_id: uuid },
      { validateStatus: false }
    );
    if (!response.data.error) {
      // Reload the page
      window.location.reload();
    } else {
      toast.error(response.data.error.message);
    }
    setIsLoading(false);
  };

  return (
    <RenderIfTrue
      condition={paymentStatus.code === 'pending' && paymentMethod === 'cod'}
    >
      <Card.Session>
        <div className="flex justify-end">
          <Button title="Capture" onAction={onAction} isLoading={isLoading} />
        </div>
      </Card.Session>
    </RenderIfTrue>
  );
}

CaptureButton.propTypes = {
  captureAPI: PropTypes.string.isRequired,
  order: PropTypes.shape({
    paymentStatus: PropTypes.shape({
      code: PropTypes.string.isRequired
    }).isRequired,
    uuid: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired
  }).isRequired
};

export const layout = {
  areaId: 'orderPaymentActions',
  sortOrder: 10
};

export const query = `
  query Query {
    captureAPI: url(routeId: "codCapturePayment")
    order(uuid: getContextValue("orderId")) {
      uuid
      paymentStatus {
        code
      }
      paymentMethod
    }
  }
`;
