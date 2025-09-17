import { Card } from '@components/admin/Card';
import { DummyColumnHeader } from '@components/admin/grid/header/Dummy';
import { SortableHeader } from '@components/admin/grid/header/Sortable';
import { Pagination } from '@components/admin/grid/Pagination';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CollectionNameRow } from './rows/CollectionNameRow.js';

function Actions({ collections = [], selectedIds = [] }) {
  const { openAlert, closeAlert } = useAlertContext();
  const [isLoading, setIsLoading] = useState(false);

  const deleteCategories = async () => {
    setIsLoading(true);
    const promises = collections
      .filter((c) => selectedIds.includes(c.uuid))
      .map((col) => axios.delete(col.deleteApi));
    await Promise.all(promises);
    setIsLoading(false);
    // Refresh the page
    window.location.reload();
  };

  const actions = [
    {
      name: 'Delete',
      onAction: () => {
        openAlert({
          heading: `Delete ${selectedIds.length} collections`,
          content: <div>Can&apos;t be undone</div>,
          primaryAction: {
            title: 'Cancel',
            onAction: closeAlert,
            variant: 'primary'
          },
          secondaryAction: {
            title: 'Delete',
            onAction: async () => {
              await deleteCategories();
            },
            variant: 'critical',
            isLoading
          }
        });
      }
    }
  ];

  return (
    <tr>
      {selectedIds.length === 0 && null}
      {selectedIds.length > 0 && (
        <td style={{ borderTop: 0 }} colSpan="100">
          <div className="inline-flex border border-divider rounded justify-items-start">
            <a href="#" className="font-semibold pt-2 pb-2 pl-4 pr-4">
              {selectedIds.length} selected
            </a>
            {actions.map((action, index) => (
              <a
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  action.onAction();
                }}
                className="font-semibold pt-2 pb-2 pl-4 pr-4 block border-l border-divider self-center"
              >
                <span>{action.name}</span>
              </a>
            ))}
          </div>
        </td>
      )}
    </tr>
  );
}

Actions.propTypes = {
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired
    })
  ).isRequired
};

export default function CollectionGrid({
  collections: { items: collections, total, currentFilters = [] }
}) {
  const page = currentFilters.find((filter) => filter.key === 'page')
    ? parseInt(currentFilters.find((filter) => filter.key === 'page').value, 10)
    : 1;
  const limit = currentFilters.find((filter) => filter.key === 'limit')
    ? parseInt(
        currentFilters.find((filter) => filter.key === 'limit').value,
        10
      )
    : 20;
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div className="w-2/3" style={{ margin: '0 auto' }}>
      <Card>
        <Card.Session
          title={
            <Form submitBtn={false} id="collectionGridFilter">
              <InputField
                name="name"
                placeholder="Search"
                defaultValue={
                  currentFilters.find((f) => f.key === 'name')?.value
                }
                onKeyPress={(e) => {
                  // If the user press enter, we should submit the form
                  if (e.key === 'Enter') {
                    const url = new URL(document.location);
                    const name = e.target?.value;
                    if (name) {
                      url.searchParams.set('name[operation]', 'like');
                      url.searchParams.set('name[value]', name);
                    } else {
                      url.searchParams.delete('name[operation]');
                      url.searchParams.delete('name[value]');
                    }
                    window.location.href = url;
                  }
                }}
              />
            </Form>
          }
          actions={[
            {
              variant: 'interactive',
              name: 'Clear filter',
              onAction: () => {
                // Just get the url and remove all query params
                const url = new URL(document.location);
                url.search = '';
                window.location.href = url.href;
              }
            }
          ]}
        />
        <table className="listing sticky">
          <thead>
            <tr>
              <th className="align-bottom">
                <div className="form-field mb-0">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(collections.map((c) => c.uuid));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </div>
              </th>
              <Area
                className=""
                id="collectionGridHeader"
                noOuter
                coreComponents={[
                  {
                    component: {
                      default: () => (
                        <DummyColumnHeader
                          title="ID"
                          id="collectionId"
                          currentFilters={currentFilters}
                        />
                      )
                    },
                    sortOrder: 5
                  },
                  {
                    component: {
                      default: () => (
                        <SortableHeader
                          title="Collection Name"
                          name="name"
                          currentFilters={currentFilters}
                        />
                      )
                    },
                    sortOrder: 10
                  },
                  {
                    component: {
                      default: () => (
                        <SortableHeader
                          title="Code"
                          name="code"
                          currentFilters={currentFilters}
                        />
                      )
                    },
                    sortOrder: 15
                  }
                ]}
              />
            </tr>
          </thead>
          <tbody>
            <Actions
              collections={collections}
              selectedIds={selectedRows}
              setSelectedRows={setSelectedRows}
            />
            {collections.map((c) => (
              <tr key={c.collectionId}>
                <td style={{ width: '2rem' }}>
                  <div className="form-field mb-0">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(c.uuid)}
                      onChange={(e) => {
                        if (e.target.checked)
                          setSelectedRows(selectedRows.concat([c.uuid]));
                        else
                          setSelectedRows(
                            selectedRows.filter((r) => r !== c.uuid)
                          );
                      }}
                    />
                  </div>
                </td>
                <Area
                  className=""
                  id="collectionGridRow"
                  row={c}
                  noOuter
                  coreComponents={[
                    {
                      component: {
                        default: () => <td>{c.collectionId.toString()}</td>
                      },
                      sortOrder: 5
                    },
                    {
                      component: {
                        default: () => (
                          <CollectionNameRow
                            id="name"
                            name={c.name}
                            url={c.editUrl}
                          />
                        )
                      },
                      sortOrder: 10
                    },
                    {
                      component: {
                        default: () => <td>{c.code}</td>
                      },
                      sortOrder: 15
                    }
                  ]}
                />
              </tr>
            ))}
          </tbody>
        </table>
        {collections.length === 0 && (
          <div className="flex w-full justify-center">
            There is no collections to display
          </div>
        )}
        <Pagination total={total} limit={limit} page={page} />
      </Card>
    </div>
  );
}

CollectionGrid.propTypes = {
  collections: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        collectionId: PropTypes.number.isRequired,
        uuid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        editUrl: PropTypes.string.isRequired,
        deleteApi: PropTypes.string.isRequired
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    currentFilters: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        operation: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 20
};

export const query = `
  query Query($filters: [FilterInput]) {
    collections (filters: $filters) {
      items {
        collectionId
        uuid
        name
        code
        editUrl
        deleteApi
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
  }
`;

export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
