import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Checkbox from '../Checkbox';
import Overflowmenu from '../../molecules/Overflowmenu';
import Pagination from '../Pagination';

const DataTable = ({
  id,
  type,
  tableData,
  tableConfig,
  selectable,
  className,
  onSort,
  overflowMenu,
  overflowMenuItems,
  overflowMenuOnClick,
  onSelection,
  uniqueKey,
  pagination,
  itemsPerPageStepper,
  itemsPerPageText,
  itemsStepperLimit,
  totalItems,
  overflowMenuEllipsisDirection,
  onPageChange,
  expandRowTemplate,
  ...restProps
}) => {
  const [allSelected, setAllSelected] = useState(false);
  const classnames = `${prefix}-data-table ${className}`.trim();
  const [pageNo, setPageNo] = useState(1);
  const [pageItemCount, setPageItemCount] = useState(itemsPerPageStepper);
  const [rows, updateTableRowData] = useState(tableData);
  const [selectedRows, updateSelectedRow] = useState(uniqueKey ? {} : []);
  const tableRef = useRef(null);
  const [tableConfigTemp, setTableConfigTemp] = useState(tableConfig)

  useEffect(() => {
    updateTableRowData(tableData);
  }, [tableData]);

  useEffect(() => {
    updateAllSelected(selectedRows);
  }, [pageNo, pageItemCount]);

  useEffect(() => {
    updateAllSelected(selectedRows);
  }, [rows]);

  useEffect(() => {
    let tempConfig = [...tableConfigTemp];
    let columnInfo = {
        left: [],
        main: [],
        right: []
      };
    
      let unitUsed = 'px';
      let selectCheckBoxWidth = '100px';
      let overflowContentWidth = '80px';
    
      tempConfig.map(column => {
        if (column.pinned === 'left') {
          columnInfo['left'].push(column);
        } else if (column.pinned === 'right') {
          columnInfo['right'].push(column);
        } else {
          columnInfo['main'].push(column);
        }
      });
    
      let selectColumn = {
        field: 'checkbox',
        width: selectCheckBoxWidth
      };
    
      let expandColumn = {
        field: 'expand',
        width: '50px'
      };
    
      let overflowColumn = {
        field: 'overflow',
        width: overflowContentWidth
      };
    
      tempConfig = [];
      if (expandRowTemplate) {
        tempConfig.push(expandColumn);
      }
      tempConfig = [...tempConfig, ...columnInfo['left']];
    
      if (selectable) {
        tempConfig.push(selectColumn);
      }
      tempConfig = [...tempConfig, ...columnInfo['main'], ...columnInfo['right']];
    
      if (overflowMenu) {
        tempConfig.push(overflowColumn);
      }
    
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

      setTableConfigTemp(tempConfig)
  }, [tableConfig]);

  useEffect(() => {
    if (
      tableRef.current.parentElement.offsetWidth < tableRef.current.offsetWidth
    ) {
      tableRef.current.parentElement.style.overflow = 'auto';
    }
  }, [tableRef]);

  const _overflowMenuOnClick = (event, node) => {
    overflowMenuOnClick(event, node);
  };

  const updateAllSelected = tempselectedRow => {
    let tempRows = getTableData(rows);
    let resultStatus = Object.keys(tempselectedRow).length === 0 ? false : true;

    tempRows.map(row => {
      if (uniqueKey) {
        if (!tempselectedRow[row[uniqueKey]]) {
          resultStatus = false;
        }
      } else {
        if (!tempselectedRow.find(i => i == row)) {
          resultStatus = false;
        }
      }
    });
    setAllSelected(resultStatus);
  };

  const selectAll = event => {
    let tempRows = getTableData(rows);
    let tempselectedRow = null;
    if (uniqueKey) {
      tempselectedRow = { ...selectedRows };
      if (event.currentTarget.checked) {
        tempRows.map(row => {
          tempselectedRow[row[uniqueKey]] = row;
        });
      } else {
        tempRows.map(row => {
          delete tempselectedRow[row[uniqueKey]];
        });
      }
    } else {
      tempselectedRow = [...selectedRows];

      if (event.currentTarget.checked) {
        tempRows.map(row => {
          if (!tempselectedRow.find(i => i == row)) {
            tempselectedRow.push(row);
          }
        });
      } else {
        tempRows.map(row => {
          let index = tempselectedRow.findIndex(i => i == row);
          if (index !== undefined) {
            tempselectedRow.splice(index, 1);
          }
        });
      }
    }
    updateSelectedRow(tempselectedRow);
    setAllSelected(event.currentTarget.checked);
    if (onSelection) {
      onSelection(null, Object.values(tempselectedRow));
    }
  };

  const getTableData = tableData => {
    if (pagination) {
      return tableData.slice(
        (pageNo - 1) * pageItemCount,
        pageNo * pageItemCount
      );
    } else {
      return tableData;
    }
  };

  const setSelection = row => {
    let tempselectedRow = null;
    if (uniqueKey) {
      tempselectedRow = { ...selectedRows };
      if (tempselectedRow[row[uniqueKey]]) {
        delete tempselectedRow[row[uniqueKey]];
      } else {
        tempselectedRow[row[uniqueKey]] = row;
      }
    } else {
      tempselectedRow = [...selectedRows];

      if (tempselectedRow.find(i => i == row)) {
        tempselectedRow.splice(tempselectedRow.findIndex(i => i == row), 1);
      } else {
        tempselectedRow.push(row);
      }
    }

    updateSelectedRow(tempselectedRow);
    updateAllSelected(tempselectedRow);

    if (onSelection) {
      onSelection(row, Object.values(tempselectedRow));
    }
  };

  const sort = async (field, event) => {
    const col = event.currentTarget;
    if (col.classList.contains('desc')) {
      col.classList.remove('desc');
      col.dataset.order = 'asc';
    } else {
      col.classList.add('desc');
      col.dataset.order = 'desc';
    }
    let presentData = getTableData(rows);
    let sortedData = await onSort(field, col.dataset.order, presentData, rows);
    if (sortedData) {
      if (presentData.length === sortedData.length) {
        let tempRows = [...rows];
        tempRows.splice(
          (pageNo - 1) * pageItemCount,
          pageNo * pageItemCount,
          ...sortedData
        );

        updateTableRowData([...sortedData]);
      } else {
        updateTableRowData([...sortedData]);
      }
    }
  };

  const onPageNumberChange = async pageNo => {
    if (rows.length < pageNo * pageItemCount && rows.length != totalItems) {
      let newData = await onPageChange(pageNo, pageItemCount);
      if (newData) {
        updateTableRowData([...rows, ...newData]);
      }
    }
    setPageNo(pageNo);
  };

  const onPageItemCountChange = async pageCount => {
    if (rows.length < pageNo * pageCount && rows.length != totalItems) {
      let newData = await onPageChange(pageNo, pageCount);
      if (newData) {
        updateTableRowData(newData);
      }
    }
    setPageNo(1);
    setPageItemCount(pageCount);
  };

  const toggleRow = index => {
    let tempData = rows;
    tempData[index].expanded = !tempData[index].expanded;
    updateTableRowData([...tempData]);
  };

  let tableClass = '';
  if (type.includes('compact')) {
    tableClass += ' hcl-data-table-compact';
  } else if (type.includes('tall')) {
    tableClass += ' hcl-data-table-tall';
  }
  if (type.includes('zebra')) {
    tableClass += ' hcl-data-table-zebra';
  }

  return (
    <div className={`hcl-data-grid`} {...restProps}>
      <div className={`hcl-table-wrapper${type.includes('borderless') ? ' hcl-data-table-borderless' : ''}`}>
        <table
          id={id}
          ref={tableRef}
          className={`${classnames}${tableClass}`}
          role="grid"
          aria-rowcount={totalItems}
        >
          <thead>
            <tr>
              {tableConfigTemp.map(
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
                              className={`hcl-sorting`}
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
                          <Checkbox
                            id={`${id}_checkbox_all`}
                            checked={allSelected}
                            onChange={selectAll}
                          />
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
            {getTableData(rows).map((row, index) => (
              <React.Fragment key={`row-${index}`}>
                <tr>
                  {tableConfigTemp.map((column, i) => (
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
                          <Checkbox
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
                          />
                        </div>
                      ) : null}
                      {column.field !== 'checkbox' &&
                      column.field !== 'overflow' &&
                      column.field !== 'expand' ? (
                        <div className="table-body-content-wrapper">
                          {column.renderHtml
                            ? column.renderHtml(row)
                            : row[column.field]}
                        </div>
                      ) : null}

                      {column.field === 'overflow' ? (
                        <div className="header-text-wrapper overflow-container">
                          <Overflowmenu
                            listItems={overflowMenuItems}
                            ellipsisType={overflowMenuEllipsisDirection}
                            onClick={event => _overflowMenuOnClick(event, row)}
                          />
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
                                ? 'hcl-collapse-row'
                                : 'hcl-expand-row'
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
                  <tr className="hcl-expanded-row">
                    <td>{expandRowTemplate(row)}</td>
                  </tr>
                ) : null}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {pagination ? (
        <Pagination
          itemsPerPageStepper={itemsPerPageStepper}
          itemsPerPageText={itemsPerPageText}
          itemsStepperLimit={itemsStepperLimit}
          onPageChange={onPageNumberChange}
          onItemsPerPageChange={onPageItemCountChange}
          totalItems={totalItems}
        />
      ) : null}
    </div>
  );
};

DataTable.propTypes = {
  /** Unique id for Table */
  id: PropTypes.string.isRequired,
  uniqueKey: PropTypes.string,
  /** Data for table  */
  tableData: PropTypes.any,
  /** Column Configuration  */
  tableConfig: PropTypes.any,
  /** Boolean value to make records selectable in Data Table */
  selectable: PropTypes.bool,
  pagination: PropTypes.bool,
  /** Name of the custom class to apply to the Data Table
   * eg: hcl-data-table-zebra, hcl-data-table-compact, hcl-data-table-tall, hcl-data-table-borderless */
  className: PropTypes.string,
  type: PropTypes.string,
  /** Call back function to sort table data
   *
   * Argument – event
   */
  onSort: PropTypes.func,
  /** Boolean value to enable overflow menu */
  overflowMenu: PropTypes.bool,
  /** Items for overflow menu  */
  overflowMenuItems: PropTypes.array,
  /** Call back function to be called on click of overflow menu */
  overflowMenuOnClick: PropTypes.func,

  itemsPerPageStepper: PropTypes.number,
  itemsPerPageText: PropTypes.string,
  overflowMenuEllipsisDirection: PropTypes.string,
  itemsStepperLimit: PropTypes.number,
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func,
  onSelection: PropTypes.func,
  expandRowTemplate: PropTypes.func
};

DataTable.defaultProps = {
  id: null,
  tableData: [],
  tableConfig: [],
  selectable: false,
  className: '',
  type: '',
  pagination: false,
  onSort: () => {},
  overflowMenu: false,
  overflowMenuItems: [],
  overflowMenuOnClick: () => {},
  expandRowTemplate: null,
  uniqueKey: null,
  itemsPerPageStepper: 10,
  itemsPerPageText: 'Items per Page:',
  itemsStepperLimit: 100,
  totalItems: 0,
  overflowMenuEllipsisDirection: 'vertical',
  onPageChange: () => {},
  onSelection: () => {}
};

export default DataTable;
