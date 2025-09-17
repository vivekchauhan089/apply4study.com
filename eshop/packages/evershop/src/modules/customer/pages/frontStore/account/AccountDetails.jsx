import Area from '@components/common/Area';
import { InboxIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import React from 'react';

export default function AccountDetails({ account }) {
  return (
    <div className="account-details">
      <div className="account-details-inner">
        <div className="grid grid-cols-1 gap-2">
          <Area
            id="accountDetails"
            coreComponents={[
              {
                component: {
                  default: () => (
                    <div className="account-details-name flex gap-2">
                      <div>
                        <UserIcon width={20} height={20} />
                      </div>
                      <div>{account.fullName}</div>
                    </div>
                  )
                },
                sortOrder: 10
              },
              {
                component: {
                  default: () => (
                    <div className="account-details-email flex gap-2">
                      <div>
                        <InboxIcon width={20} height={20} />
                      </div>
                      <div>{account.email}</div>
                    </div>
                  )
                },
                sortOrder: 15
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}

AccountDetails.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired
  }).isRequired
};

export const layout = {
  areaId: 'accountPageInfo',
  sortOrder: 10
};

export const query = `
  query Query {
    account: currentCustomer {
      uuid
      fullName
      email
    }
  }
`;
