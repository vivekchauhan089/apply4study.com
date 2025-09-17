import PropTypes from 'prop-types';
import React from 'react';


export default function Version({ version }) {
  return (
    <div className="version">
      <span>Version {version}</span>
    </div>
  );
}

Version.propTypes = {
  version: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'footerLeft',
  sortOrder: 20
};

export const query = `
  query query {
    version
  }
`;
