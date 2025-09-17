import Area from '@components/common/Area';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import { _ } from '../../../../../lib/locale/translate/_.js';

export default function Layout({ logoutUrl }) {
  const logout = async (e) => {
    e.preventDefault();
    const respone = await fetch(logoutUrl, {
      method: 'GET'
    });
    const data = await respone.json();
    if (data.error) {
      toast.error(data.error.message);
    } else {
      window.location.href = '/';
    }
  };
  return (
    <div>
      <h1 className="text-center">{_('My Account')}</h1>
      <div className="page-width mt-7 grid grid-cols-1 md:grid-cols-3 gap-7">
        <div className="col-span-1 md:col-span-2">
          <div className="border-b mb-5 border-textSubdued">
            <h2>{_('Order History')}</h2>
          </div>
          <Area id="accountPageOrderHistory" noOuter />
        </div>
        <div className="col-span-1">
          <div className="border-b mb-5 flex justify-between items-center  border-textSubdued">
            <h2>{_('Account Details')}</h2>
            <a className="text-interactive" href="#" onClick={(e) => logout(e)}>
              {_('Logout')}
            </a>
          </div>
          <Area id="accountPageInfo" noOuter />
        </div>
      </div>
      <div className="page-width mt-7">
        <div className="border-b mb-5 border-textSubdued">
          <h2>{_('Address Book')}</h2>
        </div>
        <Area id="accountPageAddressBook" noOuter />
      </div>
    </div>
  );
}

Layout.propTypes = {
  logoutUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    logoutUrl: url(routeId: "customerLogoutJson")
  }
`;
