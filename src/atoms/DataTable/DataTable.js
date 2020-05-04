import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const DataTable = ({
  id,
  type,
  tableData,
  tableConfig,
  className,
  onSort,
  totalItems,
  expandRowTemplate,
  headerSelection,
  ...restProps
}) => {
  
  const [rows, updateTableRowData] = useState(tableData);
  const tableRef = useRef(null);
  const [tableConfiguration, setTableConfiguration] = useState(tableConfig);

  useEffect(() => {
    updateTableRowData(tableData);
  }, [tableData]);

  useEffect(() => {
    let tempConfig = [...tableConfiguration];
    let columnInfo = {
      left: [],
      main: [],
      right: []
    };

    let unitUsed = 'px';

    tempConfig.map(column => {
      if (column.pinned === 'left') {
        columnInfo['left'].push(column);
      } else if (column.pinned === 'right') {
        columnInfo['right'].push(column);
      } else {
        columnInfo['main'].push(column);
      }
    });

    let expandColumn = {
      field: 'expand',
      width: '50px'
    };

    tempConfig = [];
    if (expandRowTemplate) {
      tempConfig.push(expandColumn);
    }
    tempConfig = [...tempConfig, ...columnInfo['left']];

    tempConfig = [...tempConfig, ...columnInfo['main'], ...columnInfo['right']];

    let allocatedWidth = 0;
    let totalItemsWithoutWidth = tempConfig.length;

    tempConfig.map(column => {
      if (column.width) {
        if (column.pinned !== 'left' && column.pinned !== 'right') {
          allocatedWidth += parseInt(column.width);
        }
        unitUsed = column.width.replace(/[0-9]/g, '');
        totalItemsWithoutWidth--;
      }
    });
    const getMarginLeft = index => {
      let width = tempConfig[index - 1].width.includes('calc')
        ? tempConfig[index - 1].width
            .substr(0, tempConfig[index - 1].width.length - 1)
            .replace('calc(', '')
        : tempConfig[index - 1].width;

      let marginLeft = tempConfig[index - 1].marginLeft
        ? tempConfig[index - 1].marginLeft.includes('calc')
          ? tempConfig[index - 1].marginLeft
              .substr(0, tempConfig[index - 1].marginLeft.length - 1)
              .replace('calc(', '')
          : tempConfig[index - 1].marginLeft
        : '0px';

      return `calc( ${width} + ${marginLeft})`;
    };

    const getMarginRight = index => {
      let width = tempConfig[index + 1].width.includes('calc')
        ? tempConfig[index + 1].width
            .substr(0, tempConfig[index + 1].width.length - 1)
            .replace('calc(', '')
        : tempConfig[index + 1].width;

      let marginRight = tempConfig[index + 1].marginRight
        ? tempConfig[index + 1].marginRight.includes('calc')
          ? tempConfig[index + 1].marginRight
              .substr(0, tempConfig[index + 1].marginRight.length - 1)
              .replace('calc(', '')
          : tempConfig[index + 1].marginRight
        : '0px';

      return `calc( ${width} + ${marginRight})`;
    };

    if (allocatedWidth) {
      let leftPinned = false;
      tempConfig.map((column, index) => {
        if (!column.width) {
          column.width = `calc((100% - ${allocatedWidth +
            unitUsed}) / ${totalItemsWithoutWidth})`;
        }

        if (column.pinned === 'left') {
          leftPinned = true;
          if (index !== 0) {
            column.marginLeft = getMarginLeft(index);
          }
        } else {
          if (leftPinned) {
            leftPinned = false;
          }
        }
      });

      let rightPinned = false;
      for (let i = tempConfig.length - 1; i >= 0; i--) {
        let column = tempConfig[i];
        if (column.pinned === 'right') {
          rightPinned = true;
          if (i !== tempConfig.length - 1) {
            column.marginRight = getMarginRight(i);
          }
        } else {
          if (rightPinned) {
            rightPinned = false;
          }
        }
      }
    }
    setTableConfiguration(tempConfig);
  }, [tableConfig]);

  useEffect(() => {
    if (
      tableRef.current.parentElement.offsetWidth < tableRef.current.offsetWidth
    ) {
      tableRef.current.parentElement.style.overflow = 'auto';
    }
  }, [tableRef]);

  const sort = async (field, event) => {
    const col = event.currentTarget;
    if (col.classList.contains('desc')) {
      col.classList.remove('desc');
      col.dataset.order = 'asc';
    } else {
      col.classList.add('desc');
      col.dataset.order = 'desc';
    }
    let sortedData = await onSort(field, col.dataset.order, rows);
    if (sortedData) {
      updateTableRowData([...sortedData]);
    }
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

  let tableClass = `${prefix}-data-table`;
  if (type.includes('compact')) {
    tableClass += ` ${prefix}-data-table-compact`;
  } else if (type.includes('tall')) {
    tableClass += ` ${prefix}-data-table-tall`;
  }
  if (type.includes('zebra')) {
    tableClass += ` ${prefix}-data-table-zebra`;
  }

  const classnames = `${prefix}-table-wrapper${
    type.includes('borderless') ? ` ${prefix}-data-table-borderless` : ''
  } ${className}`.trim();

  return (
    <div
      className={classnames}
      {...restProps}
    >
      <table
        id={id}
        ref={tableRef}
        className={tableClass}
        role="grid"
        aria-rowcount={totalItems}
      >
        <thead>
          <tr>
            {tableConfiguration.map(
              (
                {
                  label,
                  field,
                  sortable,
                  title,
                  width,
                  pinned,
                  marginLeft,
                  marginRight
                },
                index
              ) => {
                return (
                  <th
                    key={`heading-${index}`}
                    style={{
                      width: width,
                      left: marginLeft,
                      right: marginRight
                    }}
                    title={title ? title.toString() : ''}
                    data-column={label}
                    className={`${
                      pinned === 'left' ? 'sticky-div sticky-left-div' : ''
                    }${
                      pinned === 'right' ? 'sticky-div sticky-right-div' : ''
                    }`}
                  >
                    {field !== 'checkbox' &&
                    field !== 'overflow' &&
                    field !== 'expand' ? (
                      <div
                        className="header-text-wrapper"
                        onClick={sortable ? sort.bind(this, field) : null}
                      >
                        <span>{label}</span>
                        {sortable ? (
                          <svg
                            className={`${prefix}-sorting`}
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                          >
                            <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
                          </svg>
                        ) : null}
                      </div>
                    ) : null}

                    {field === 'checkbox' ? (
                      <div className="checkbox-wrapper">
                        {headerSelection}
                        {/* <Checkbox
                            id={`${id}_checkbox_all`}
                            checked={allSelected}
                            onChange={selectAll}
                          /> */}
                      </div>
                    ) : null}

                    {field === 'overflow' || field === 'expand' ? (
                      <div className="header-text-wrapper" />
                    ) : null}
                  </th>
                );
              }
            )}
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
                    onKeyDown={e => {
                      if (
                        e.currentTarget.getAttribute('data-label') ===
                          'overflow' &&
                        [
                          'ArrowLeft',
                          'ArrowRight',
                          'ArrowDown',
                          'ArrowUp'
                        ].includes(e.key) &&
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
                          e.currentTarget.parentElement.nextElementSibling
                            .children[i]
                        ) {
                          e.currentTarget.parentElement.nextElementSibling.children[
                            i
                          ].focus();
                        }
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (
                          e.currentTarget.parentElement
                            .previousElementSibling &&
                          e.currentTarget.parentElement.previousElementSibling
                            .children[i]
                        ) {
                          e.currentTarget.parentElement.previousElementSibling.children[
                            i
                          ].focus();
                        }
                      }
                    }}
                  >
                    {column.field === 'checkbox' ? (
                      <div className="checkbox-wrapper">
                        {/* {selectionTemplate(row)} */}
                        {column.renderHtml(row)}
                        {/* <Checkbox
                            id={`${id}_checkbox_${index}`}
                            name="testcheck"
                            data-index={index}
                          /> */}
                        {/* <Checkbox
                            id={`${id}_checkbox_${index}`}
                            name="testcheck"
                            data-index={index}
                            checked={
                              uniqueKey && selectedRows[row[uniqueKey]]
                                ? true
                                : !uniqueKey && selectedRows.find(i => i == row)
                                ? true
                                : false
                            }
                            onChange={setSelection.bind(this, row)}
                          /> */}
                      </div>
                    ) : null}
                    {column.field !== 'checkbox' &&
                    column.field !== 'overflow' &&
                    column.field !== 'expand' ? (
                      <div className="table-body-content-wrapper">
                        {column.renderHtml
                          ? column.renderHtml(row)
                          : column.field.split('.').length > 1
                          ? getValue(row, column.field)
                          : row[column.field]}
                      </div>
                    ) : null}

                    {column.field === 'overflow' ? (
                      <div className="header-text-wrapper overflow-container">
                        {/* {
                            React.cloneElement(overflowTemplate, {
                                onClick : {e => {
                                    console.log(e);
                                    return e;
                                  }}
                              })

                           
                        } */}
                        {column.renderHtml(row)}
                        {/* {overflowTemplate(row)} */}
                        {/* <Overflowmenu
                            listItems={overflowMenuItems}
                            ellipsisType={overflowMenuEllipsisDirection}
                            onClick={event => _overflowMenuOnClick(event, row)}
                          /> */}
                      </div>
                    ) : null}
                    {column.field === 'expand' ? (
                      <div
                        className="header-text-wrapper"
                        onClick={toggleRow.bind(this, index)}
                      >
                        <svg
                          className={`${
                            row.expanded ? `${prefix}-collapse-row` : `${prefix}-expand-row`
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
  /** Column Configuration  */
  tableConfig: PropTypes.any,
  /** Name of the custom class to apply to the Data Table
   * eg: hcl-data-table-zebra, hcl-data-table-compact, hcl-data-table-tall, hcl-data-table-borderless */
  className: PropTypes.string,

  /** Call back function to sort table data
   *
   * Argument – event
   */
  onSort: PropTypes.func,
  totalItems: PropTypes.number,
  expandRowTemplate: PropTypes.func,
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
  expandRowTemplate: null,
  totalItems: 0
};

export default DataTable;
