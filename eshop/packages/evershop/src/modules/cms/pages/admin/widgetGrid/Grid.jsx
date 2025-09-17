import { Card } from '@components/admin/Card';
import { SortableHeader } from '@components/admin/grid/header/Sortable';
import { Pagination } from '@components/admin/grid/Pagination';
import { Status } from '@components/admin/Status.js';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { useAlertContext } from '@components/common/modal/Alert';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Name } from './rows/Name.js';
import { WidgetTypeRow } from './rows/WidgetTypeRow.js';

function Actions({ widgets = [], selectedIds = [] }) {
  const { openAlert, closeAlert } = useAlertContext();
  const [isLoading, setIsLoading] = useState(false);

  const updatePages = async (status) => {
    setIsLoading(true);
    const promises = widgets
      .filter((widget) => selectedIds.includes(widget.uuid))
      .map((widget) =>
        axios.patch(widget.updateApi, {
          status
        })
      );
    await Promise.all(promises);
    setIsLoading(false);
    // Refresh the page
    window.location.reload();
  };

  const deletePages = async () => {
    setIsLoading(true);
    const promises = widgets
      .filter((widget) => selectedIds.includes(widget.uuid))
      .map((widget) => axios.delete(widget.deleteApi));
    await Promise.all(promises);
    setIsLoading(false);
    // Refresh the page
    window.location.reload();
  };

  const actions = [
    {
      name: 'Disable',
      onAction: () => {
        openAlert({
          heading: `Disable ${selectedIds.length} widgets`,
          content: 'Are you sure?',
          primaryAction: {
            title: 'Cancel',
            onAction: closeAlert,
            variant: 'primary'
          },
          secondaryAction: {
            title: 'Disable',
            onAction: async () => {
              await updatePages(0);
            },
            variant: 'critical',
            isLoading: false
          }
        });
      }
    },
    {
      name: 'Enable',
      onAction: () => {
        openAlert({
          heading: `Enable ${selectedIds.length} widgets`,
          content: 'Are you sure?',
          primaryAction: {
            title: 'Cancel',
            onAction: closeAlert,
            variant: 'primary'
          },
          secondaryAction: {
            title: 'Enable',
            onAction: async () => {
              await updatePages(1);
            },
            variant: 'critical',
            isLoading: false
          }
        });
      }
    },
    {
      name: 'Delete',
      onAction: () => {
        openAlert({
          heading: `Delete ${selectedIds.length} widgets`,
          content: <div>Can&apos;t be undone</div>,
          primaryAction: {
            title: 'Cancel',
            onAction: closeAlert,
            variant: 'primary'
          },
          secondaryAction: {
            title: 'Delete',
            onAction: async () => {
              await deletePages();
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
            {actions.map((action, i) => (
              <a
                key={i}
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
  widgets: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      updateApi: PropTypes.string.isRequired,
      deleteApi: PropTypes.string.isRequired
    })
  ).isRequired
};

export default function WidgetGrid({
  widgets: { items, total, currentFilters = [] },
  widgetTypes
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
    <Card>
      <Card.Session
        title={
          <Form submitBtn={false} id="widgetGridFilter">
            <Area
              id="widgetGridFilter"
              noOuter
              coreComponents={[
                {
                  component: {
                    default: () => (
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
                    )
                  },
                  sortOrder: 10
                }
              ]}
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
                      setSelectedRows(items.map((p) => p.uuid));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </div>
            </th>
            <Area
              className=""
              id="widgetGridHeader"
              noOuter
              coreComponents={[
                {
                  component: {
                    default: () => (
                      <SortableHeader
                        title="Name"
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
                        title="Type"
                        name="type"
                        currentFilters={currentFilters}
                      />
                    )
                  },
                  sortOrder: 15
                },
                {
                  component: {
                    default: () => (
                      <SortableHeader
                        title="Status"
                        name="status"
                        currentFilters={currentFilters}
                      />
                    )
                  },
                  sortOrder: 20
                }
              ]}
            />
          </tr>
        </thead>
        <tbody>
          <Actions
            widgets={items}
            selectedIds={selectedRows}
            setSelectedRows={setSelectedRows}
          />
          {items.map((w, i) => (
            <tr key={i}>
              <td style={{ width: '2rem' }}>
                <div className="form-field mb-0">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(w.uuid)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(selectedRows.concat([w.uuid]));
                      } else {
                        setSelectedRows(
                          selectedRows.filter((row) => row !== w.uuid)
                        );
                      }
                    }}
                  />
                </div>
              </td>
              <Area
                className=""
                id="widgetGridRow"
                row={w}
                noOuter
                coreComponents={[
                  {
                    component: {
                      default: () => <Name url={w.editUrl} name={w.name} />
                    },
                    sortOrder: 10
                  },
                  {
                    component: {
                      default: () => (
                        <WidgetTypeRow code={w.type} types={widgetTypes} />
                      )
                    },
                    sortOrder: 15
                  },
                  {
                    component: {
                      default: ({ areaProps }) => (
                        <Status status={parseInt(w.status, 10)} />
                      )
                    },
                    sortOrder: 20
                  }
                ]}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && (
        <div className="flex w-full justify-center">
          There is no widget to display
        </div>
      )}
      <Pagination total={total} limit={limit} page={page} />
    </Card>
  );
}

WidgetGrid.propTypes = {
  widgets: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        editUrl: PropTypes.string.isRequired,
        updateApi: PropTypes.string.isRequired,
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
  }).isRequired,
  widgetTypes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 20
};

export const query = `
  query Query($filters: [FilterInput]) {
    widgets (filters: $filters) {
      items {
        widgetId
        uuid
        name
        area
        route
        type
        status
        editUrl
        updateApi
        deleteApi
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
    widgetTypes {
      code
      name
    }
  }
`;

export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
