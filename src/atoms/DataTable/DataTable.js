import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { getColumnStructure } from '../../util/tableUtil';
import { addListener, removeListeners } from '../../util/eventManager';

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
  resizable,
  ...restProps
}) => {
  const [rows, updateTableRowData] = useState(tableData);
  const tableRef = useRef(null);
  const [tableConfiguration, setTableConfiguration] = useState([]);
  const [sortedColumn, updateSortedColumn] = useState({});

  let customHeaderFlag = false;

  useEffect(() => {
    updateTableRowData(tableData);
  }, [tableData]);

  useEffect(() => {
    let tempConfig = getColumnStructure(
      tableConfig,
      expandRowTemplate ? true : false
    );
    setTableConfiguration(tempConfig);
  }, [tableConfig]);

  useEffect(() => {
    if (
      tableRef.current.parentElement.offsetWidth <
        tableRef.current.offsetWidth &&
      rows.length > 0
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

  /* Table re-size starts */
  const [isMouseDownForResize, setMouseDownonResize] = useState(false);
  const resizeLineRef = useRef(null);

  let resizeDividerData = {};
  let mouseDownColumnData = {};
  let totalLengthMoved = 0;
  let isMouseDown = false;

  const onColumnMouseDown = (column, idx, e) => {
    e.preventDefault();
    e.stopPropagation();
    const { button } = e;
    if (button !== 0) return;
    let nThTarget,
      moveLength = 0,
      minResizeFlag = false,
      maxResizeFlag = false;

    isMouseDown = true;
    setMouseDownonResize(true);
    document.body.classList.add('resize-table');
    tableRef.current.parentElement.style.position = `relative`;
    totalLengthMoved = column.width
      ? parseInt(column.width.replace(/px/g, ''), 10)
      : 10;

    /* For Detecting Second Row Header Resize */
    nThTarget = e.currentTarget.parentElement.parentElement
      .previousElementSibling
      ? e.currentTarget.parentElement.parentElement.previousElementSibling
          .children[parseInt(idx, 10)]
      : e.currentTarget.parentElement;

    nThTarget.classList.add('hovered');

    if (
      resizeLineRef &&
      resizeLineRef.current &&
      tableRef &&
      tableRef.current
    ) {
      let tableEleBounding = tableRef.current.getBoundingClientRect();
      resizeLineRef.current.style.left =
        e.clientX - tableEleBounding.left + `px`;
      resizeDividerData['left'] = e.clientX - tableEleBounding.left;

      /* MouseDownColumn data collected */
      mouseDownColumnData['column'] = column;
      mouseDownColumnData['idx'] = idx;
      mouseDownColumnData['startX'] = e.clientX;
      mouseDownColumnData['clientWidth'] = nThTarget
        ? nThTarget.getBoundingClientRect().width
        : 0;
      mouseDownColumnData['currentElement'] = nThTarget;
    }

    /* On Mouse move */
    const onPressMouseMove = e => {
      e.preventDefault();
      e.stopPropagation();

      if (isMouseDown) {
        const { startX, clientWidth } = mouseDownColumnData;

        moveLength = e && startX ? e.clientX - startX : 0;
        totalLengthMoved = moveLength ? clientWidth + moveLength : 0;
        let { left } = resizeDividerData;
        if (
          column &&
          column.minResizeWidth &&
          totalLengthMoved &&
          totalLengthMoved < column.minResizeWidth
        ) {
          /* on minimum resize, adjust resizer */
          minResizeFlag = true;
          resizeLineRef.current.style.left =
            left - clientWidth + column.minResizeWidth + `px`;
        } else if (
          column &&
          column.minResizeWidth &&
          totalLengthMoved &&
          totalLengthMoved > column.maxResizeWidth
        ) {
          /* on max resize */
          maxResizeFlag = true;
          resizeLineRef.current.style.left =
            left + (column.maxResizeWidth - clientWidth) + `px`;
        } else {
          maxResizeFlag = false;
          minResizeFlag = false;
          resizeLineRef.current.style.left = moveLength + left + `px`;
        }
      }
    };

    /* On Mouse up */
    const onPressMouseUp = async e => {
      e.preventDefault();
      e.stopPropagation();

      if (!isMouseDown) return;

      const { idx, clientWidth } = mouseDownColumnData;

      const tempObj = [...tableConfiguration];
      tempObj.map(item =>
        item.width && item.width.includes('calc') ? delete item.width : item
      );
      if (minResizeFlag) {
        tempObj[idx][`width`] =
          clientWidth - (clientWidth - column.minResizeWidth) + `px`;
      } else if (maxResizeFlag) {
        tempObj[idx][`width`] =
          clientWidth + (column.maxResizeWidth - clientWidth) + `px`;
      } else {
        tempObj[idx][`width`] = totalLengthMoved + `px`;
      }
      const tempConfig = getColumnStructure(
        [...tempObj],
        expandRowTemplate ? true : false
      );

      resizeDividerData['left'] = parseInt(
        resizeLineRef.current.style.left.replace(/px/, ''),
        10
      );
      isMouseDown = false;
      clearOnMouseUp();
      nThTarget ? nThTarget.classList.remove('hovered') : null;
      removeListeners('datatablemouseup-' + column[`label`] + idx, 'mouseup');
      removeListeners(
        'datatablemousemove-' + column[`label`] + idx,
        'mousemove'
      );
      await setTableConfiguration(tempConfig);
      await setMouseDownonResize(false);
      /* Callback post updating state */
      if (moveLength !== 0) {
        // console.log(tableConfiguration);
      }
    };

    /* Adding Event Listeners */
    addListener(
      'datatablemousemove-' + column[`label`] + idx,
      'mousemove',
      e => {
        onPressMouseMove(e);
      },
      false
    );
    addListener(
      'datatablemouseup-' + column[`label`] + idx,
      'mouseup',
      e => {
        onPressMouseUp(e);
      },
      false
    );
  };

  const clearOnMouseUp = () => {
    document.body.classList.remove('resize-table');
    tableRef.current.parentElement.style.position = ``;
  };
  /* Table re-size ends */

  return (
    <div className={classnames}>
      <div
        ref={resizeLineRef}
        style={{
          display: isMouseDownForResize ? `block` : `none`
        }}
        className={`resize-line`}
      />
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
              customHeaderFlag || column.columnHtml
                ? (customHeaderFlag = true)
                : null;
              return (
                <th
                  key={`heading-${index}`}
                  style={{
                    minWidth: column.width,
                    width: column.width,
                    left: column.marginLeft,
                    right: column.marginRight,
                    ...column.styles
                  }}
                  title={column.title ? column.title.toString() : ''}
                  data-column={column.label}
                  className={`${
                    column.pinned === 'left' ? 'sticky-div sticky-left-div' : ''
                  }${
                    column.pinned === 'right'
                      ? 'sticky-div sticky-right-div'
                      : ''
                  }${column.sortable ? ' sortable' : ''}${
                    (resizable && column['allowResize'] !== false) ||
                    !!column['allowResize']
                      ? ' resizable'
                      : ''
                  }`}
                  tabIndex={column.sortable ? '0' : null}
                  onClick={column.sortable ? sort.bind(this, column) : null}
                  onKeyDown={
                    column.sortable ? sortOnEnter.bind(this, column) : null
                  }
                >
                  {headerSelection && column.field === 'checkbox' ? (
                    headerSelection
                  ) : (
                    <>
                      <span className="hcl-data-table-header">
                        {column.label}
                      </span>
                      {(resizable && column['allowResize'] !== false) ||
                      !!column['allowResize'] ? (
                        <span
                          className={`hcl-data-table-resizable`}
                          onMouseDown={onColumnMouseDown.bind(
                            this,
                            column,
                            index
                          )}
                        >
                          <span className={`resize-handle`} />
                        </span>
                      ) : null}
                    </>
                  )}

                  {column.sortable ? (
                    sortedColumn.name === column.field && sortedColumn.order ? (
                      <svg
                        width="16px"
                        height="16px"
                        className={`${prefix}-sorting${
                          sortedColumn.order === 'desc' ? ' desc' : ''
                        }`}
                        viewBox="0 0 16 16"
                        version="1.1"
                      >
                        <title>Sort Icon</title>
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            transform="translate(4.000000, 2.000000)"
                            stroke="#000000"
                          >
                            <line x1="4" y1="12" x2="4" y2="1" />
                            <polyline points="8 4.5 4 0.5 0 4.5" />
                          </g>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        width="16px"
                        className={`${prefix}-sorting`}
                        height="12px"
                        viewBox="0 0 16 16"
                        version="1.1"
                      >
                        <title>Unsorted Icon</title>
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g fill="#000000" fillRule="nonzero">
                            <g>
                              <path d="M0.848938817,3.92808987 C0.5730624,4.08135457 0.225174806,3.98195809 0.0719101257,3.70608167 C-0.0813545486,3.43020526 0.0180419086,3.08231766 0.293918326,2.92905298 L5.43677549,0.0719101257 C5.81765046,-0.139687074 6.28571429,0.135723263 6.28571429,0.571428571 L6.28571429,14.8571429 C6.28571429,15.1727341 6.02987697,15.4285714 5.71428571,15.4285714 C5.39869446,15.4285714 5.14285714,15.1727341 5.14285714,14.8571429 L5.14285714,1.54257969 L0.848938817,3.92808987 Z" />
                              <path
                                d="M14.857143,1.63915229 L10.602686,4.47545698 C10.3400982,4.65051555 9.98531571,4.57955904 9.81025714,4.31697121 C9.63519857,4.05438338 9.70615509,3.6996009 9.96874291,3.52454236 L15.1116001,0.0959709287 C15.4913456,-0.15719278 16.0000002,0.115030877 16.0000002,0.571428237 L16.0000002,14.8571425 C16.0000002,15.1727338 15.7441629,15.4285711 15.4285716,15.4285711 C15.1129803,15.4285711 14.857143,15.1727338 14.857143,14.8571425 L14.857143,1.63915229 Z"
                                transform="translate(12.857113, 7.713805) rotate(180.000000) translate(-12.857113, -7.713805) "
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    )
                  ) : null}
                </th>
              );
            })}
          </tr>
          {customHeaderFlag ? (
            <tr>
              {tableConfiguration.map((column, index) => {
                return (
                  <th
                    key={`customheader-${index}`}
                    style={{
                      minWidth: column.width,
                      left: column.marginLeft,
                      right: column.marginRight,
                      top: '50px',
                      ...column.styles
                    }}
                    className={`${
                      column.pinned === 'left'
                        ? 'sticky-div sticky-left-div'
                        : ''
                    }${
                      column.pinned === 'right'
                        ? 'sticky-div sticky-right-div'
                        : ''
                    }${column.sortable ? ' sortable' : ''}${
                      column.allowResize ? ' resizable' : ''
                    }`}
                  >
                    {column.columnHtml ? column.columnHtml : null}
                  </th>
                );
              })}
            </tr>
          ) : null}
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
                      right: column.marginRight,
                      ...column.styles
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
  /** Used to define the table type
   *  eg: zebra, compact, tall, borderless  */
  type: PropTypes.string,
  /** Data for table  */
  tableData: PropTypes.array,
  /** Column Configuration eg:
   * [ {
   *    label : 'Name', // Column Header
   *    field : 'name',// Column key
   *    sortable:true,// Is column Sortable
   *    width:'100px',// Minimum width for the column
   *    renderHtml: (model)=> {return <span>{model.name}</span>} // For passing Custom Html
   *    columnHtml: ( <Search ariaLabel="Search" className=""defaultValue="" iconTheme="default" />) // For passing custom html in data column
   *    pinned: 'right' // Pass 'right' to pin column right or pass 'left' to pin column left
   *    allowResize: true // Pass true to make column resizable.
   *    minResizeWidth: '40px', // minimum resize width
   *    maxResizeWidth: '120px', // maximum resize width
   * }] */
  tableConfig: PropTypes.array,
  /** Name of the custom class to apply to the Data Table. */
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
  triStateSorting: PropTypes.bool,
  /** To Enable resize for all table columns. For individual column config, check tableData's allowResize prop. */
  resizable: PropTypes.bool
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
  triStateSorting: false,
  resizable: false
};

export default DataTable;
