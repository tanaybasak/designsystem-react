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

  const sort = async field => {
    let tempSortedColumn = { ...sortedColumn };
    if (tempSortedColumn.name === field.field) {
      if (tempSortedColumn.order === 'asc') {
        tempSortedColumn.order = 'desc';
      } else if (tempSortedColumn.order === 'desc') {
        tempSortedColumn.order = null;
      } else {
        tempSortedColumn.order = 'asc';
      }
    } else {
      tempSortedColumn.order = 'asc';
      tempSortedColumn.name = field.field;
    }
    let sortedData = await onSort(field.field, tempSortedColumn.order, rows);
    if (sortedData) {
      updateTableRowData([...sortedData]);
    }
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

  const classnames = `${prefix}-data-table-wrapper${
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
                    width: column.width,
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
                  }`}
                >
                  {column.field !== 'checkbox' &&
                  column.field !== 'overflow' &&
                  column.field !== 'expand' ? (
                    <div
                      className={`header-text-wrapper${
                        column.sortable ? ' sortable' : ''
                      }`}
                      onClick={column.sortable ? sort.bind(this, column) : null}
                    >
                      <span>{column.label}</span>
                      {column.sortable ? (
                        sortedColumn.name === column.field &&
                        sortedColumn.order ? (
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
                    </div>
                  ) : null}

                  {column.field === 'checkbox' ? (
                    <div className="checkbox-wrapper">{headerSelection}</div>
                  ) : null}

                  {column.field === 'overflow' || column.field === 'expand' ? (
                    <div className="header-text-wrapper" />
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <React.Fragment key={`row-${index}`}>
              <tr>
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
                      width: column.width,
                      left: column.marginLeft,
                      right: column.marginRight
                    }}
                    tabIndex={-1}
                    onKeyDown={onKeyDownOnTable.bind(this, i)}
                  >
                    {column.field === 'checkbox' ? (
                      <div className="checkbox-wrapper">
                        {column.renderHtml(row)}
                      </div>
                    ) : null}
                    {column.field !== 'checkbox' &&
                    column.field !== 'overflow' &&
                    column.field !== 'expand' ? (
                      <div
                        className={`body-content-wrapper${
                          column.renderHtml ? ' body-content-html-wrapper' : ''
                        }`}
                      >
                        {column.renderHtml
                          ? column.renderHtml(row)
                          : column.field.split('.').length > 1
                          ? getValue(row, column.field)
                          : row[column.field]}
                      </div>
                    ) : null}

                    {column.field === 'overflow' ? (
                      <div className="header-text-wrapper overflow-wrapper">
                        {column.renderHtml(row)}
                      </div>
                    ) : null}
                    {column.field === 'expand' ? (
                      <div
                        className="header-text-wrapper"
                        onClick={toggleRow.bind(this, index)}
                      >
                        <svg
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
                      </div>
                    ) : null}
                  </td>
                ))}
              </tr>
              {expandRowTemplate && row.expanded ? (
                <tr className={`${prefix}-expanded-row`}>
                  <td>{expandRowTemplate(row)}</td>
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
   *    label : 'Name',
   *    field : 'name',
   *    sortable:true,
   *    width:'100px',
   *    renderHtml: (model)=> {return <span>{model.name}</span>}
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
  /** Used for passing expand row template  */
  expandRowTemplate: PropTypes.func,
  /** Used for passing template for Table header  */
  headerSelection: PropTypes.node
};

DataTable.defaultProps = {
  id: null,
  tableData: [],
  tableConfig: [],
  className: '',
  type: '',
  headerSelection: null,
  onSort: () => {},
  expandRowTemplate: null
};

export default DataTable;
