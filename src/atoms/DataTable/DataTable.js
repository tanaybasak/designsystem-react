import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { getColumnStructure } from '../../util/tableUtil';

const DataTable = ({
  id,
  type,
  tableData,
  tableConfig,
  className,
  onSort,
  expandRowTemplate,
  headerSelection,
  onRowSelect,
  triStateSorting,
  ...restProps
}) => {
  const [rows, updateTableRowData] = useState(tableData);
  const tableRef = useRef(null);
  const [tableConfiguration, setTableConfiguration] = useState(tableConfig);
  const [sortedColumn, updateSortedColumn] = useState({});

  useEffect(() => {
    updateTableRowData(tableData);
  }, [tableData]);

  useEffect(() => {
    let tempConfig = getColumnStructure(
      [...tableConfiguration],
      expandRowTemplate ? true : false
    );
    setTableConfiguration(tempConfig);
  }, [tableConfig]);

  useEffect(() => {
    if (
      tableRef.current.parentElement.offsetWidth < tableRef.current.offsetWidth
    ) {
      tableRef.current.parentElement.style.overflow = 'auto';
    }
  }, [tableRef]);

  const sortOnEnter = (field, e) => {
    if (e.key === 'Enter') {
      sort(field);
    }
  };
  const sort = field => {
    let tempSortedColumn = { ...sortedColumn };
    if (tempSortedColumn.name === field.field) {
      if (tempSortedColumn.order === 'asc') {
        tempSortedColumn.order = 'desc';
      } else if (tempSortedColumn.order === 'desc') {
        tempSortedColumn.order = triStateSorting ? null : 'asc';
      } else {
        tempSortedColumn.order = 'asc';
      }
    } else {
      tempSortedColumn.order = 'asc';
      tempSortedColumn.name = field.field;
    }
    onSort(field.field, tempSortedColumn.order, rows);
    updateSortedColumn(tempSortedColumn);
  };

  const getValue = (row, key) => {
    let value = row;
    key.split('.').map(f => {
      value = value[f];
    });
    return value;
  };

  const toggleRow = index => {
    let tempData = rows;
    tempData[index].expanded = !tempData[index].expanded;
    updateTableRowData([...tempData]);
  };

  const onKeyDownOnTable = (i, e) => {
    if (
      e.currentTarget.getAttribute('data-label') === 'overflow' &&
      ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(e.key) &&
      e.currentTarget !== e.target
    ) {
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (e.currentTarget.previousElementSibling) {
        e.currentTarget.previousElementSibling.focus();
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (e.currentTarget.nextElementSibling) {
        e.currentTarget.nextElementSibling.focus();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (
        e.currentTarget.parentElement.nextElementSibling &&
        e.currentTarget.parentElement.nextElementSibling.children[i]
      ) {
        e.currentTarget.parentElement.nextElementSibling.children[i].focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (
        e.currentTarget.parentElement.previousElementSibling &&
        e.currentTarget.parentElement.previousElementSibling.children[i]
      ) {
        e.currentTarget.parentElement.previousElementSibling.children[
          i
        ].focus();
      }
    }
  };

  let tableClass = `${prefix}-data-table`;
  if (type.includes('compact')) {
    tableClass += ` ${prefix}-data-table-compact`;
  } else if (type.includes('tall')) {
    tableClass += ` ${prefix}-data-table-tall`;
  }
  if (type.includes('zebra')) {
    tableClass += ` ${prefix}-data-table-zebra`;
  }

  const classnames = `${prefix}-data-table-wrapper data-table-sticky-header${
    type.includes('borderless') ? ` ${prefix}-data-table-borderless` : ''
  } ${className}`.trim();

  return (
    <div className={classnames}>
      <table
        id={id}
        ref={tableRef}
        className={tableClass}
        role="grid"
        {...restProps}
      >
        <thead>
          <tr>
            {tableConfiguration.map((column, index) => {
              return (
                <th
                  key={`heading-${index}`}
                  style={{
                    minWidth: column.width,
                    left: column.marginLeft,
                    right: column.marginRight
                  }}
                  title={column.title ? column.title.toString() : ''}
                  data-column={column.label}
                  className={`${
                    column.pinned === 'left' ? 'sticky-div sticky-left-div' : ''
                  }${
                    column.pinned === 'right'
                      ? 'sticky-div sticky-right-div'
                      : ''
                  }${column.sortable ? ' sortable' : ''}`}
                  tabIndex={column.sortable ? '0' : null}
                  onClick={column.sortable ? sort.bind(this, column) : null}
                  onKeyDown={
                    column.sortable ? sortOnEnter.bind(this, column) : null
                  }
                >
                  {headerSelection && column.field === 'checkbox'
                    ? headerSelection
                    : column.label}

                  {column.sortable ? (
                    sortedColumn.name === column.field && sortedColumn.order ? (
                      <svg
                        className={`${prefix}-sorting${
                          sortedColumn.order === 'desc' ? ' desc' : ''
                        }`}
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                      >
                        <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
                      </svg>
                    ) : (
                      <svg
                        className={`${prefix}-sorting`}
                        height="16px"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                      >
                        <path d="M512.578 192.991l-256 255.52 512 0L512.578 192.991zM512.578 832.511l256-255.52-512 0L512.578 832.511z" />
                      </svg>
                    )
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <React.Fragment key={`row-${index}`}>
              <tr onClick={onRowSelect ? onRowSelect.bind(this, row) : null}>
                {tableConfiguration.map((column, i) => (
                  <td
                    key={`col-${index}-${i}`}
                    title={
                      row[column.field] ? row[column.field].toString() : ''
                    }
                    data-label={column.field}
                    className={`${
                      column.pinned === 'left'
                        ? 'sticky-div sticky-left-div'
                        : ''
                    }${
                      column.pinned === 'right'
                        ? 'sticky-div sticky-right-div'
                        : ''
                    }`}
                    style={{
                      minWidth: column.width,
                      left: column.marginLeft,
                      right: column.marginRight
                    }}
                    tabIndex={-1}
                    onKeyDown={onKeyDownOnTable.bind(this, i)}
                  >
                    {column.renderHtml ? (
                      column.renderHtml(row)
                    ) : column.field === 'expand' ? (
                      <svg
                        onClick={toggleRow.bind(this, index)}
                        className={`${
                          row.expanded
                            ? `${prefix}-collapse-row`
                            : `${prefix}-expand-row`
                        }`}
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                      >
                        <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
                      </svg>
                    ) : column.field.split('.').length > 1 ? (
                      getValue(row, column.field)
                    ) : (
                      row[column.field]
                    )}
                  </td>
                ))}
              </tr>
              {expandRowTemplate && row.expanded ? (
                <tr className={`${prefix}-expanded-row`}>
                  <td colSpan={tableConfiguration.length}>
                    <div>{expandRowTemplate(row)}</div>
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  /** Unique id for Table */
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  /** Data for table  */
  tableData: PropTypes.any,
  /** Column Configuration eg:
   * [ {
   *    label : 'Name', // Column Header
   *    field : 'name',// Column key
   *    sortable:true,// Is column Sortable
   *    width:'100px',// Minimum width for the column
   *    renderHtml: (model)=> {return <span>{model.name}</span>} // For passing Custom Html
   *
   * }] */
  tableConfig: PropTypes.any,
  /** Name of the custom class to apply to the Data Table
   * eg: hcl-data-table-zebra, hcl-data-table-compact, hcl-data-table-tall, hcl-data-table-borderless */
  className: PropTypes.string,

  /** Call back function to sort table data
   *
   * Argument – event
   */
  onSort: PropTypes.func,
  /** Call back function on selecting row
   *
   * Argument – row data
   */
  onRowSelect: PropTypes.func,
  /** Used for passing expand row template  */
  expandRowTemplate: PropTypes.func,
  /** Used for passing template for Table header  */
  headerSelection: PropTypes.node,
  /** When this property is set, sorting in each column iterates through three sort states: ascending, descending, and unsort.  */
  triStateSorting: PropTypes.bool
};

DataTable.defaultProps = {
  id: null,
  tableData: [],
  tableConfig: [],
  className: '',
  type: '',
  headerSelection: null,
  onSort: () => {},
  onRowSelect: () => {},
  expandRowTemplate: null,
  triStateSorting: false
};

export default DataTable;
