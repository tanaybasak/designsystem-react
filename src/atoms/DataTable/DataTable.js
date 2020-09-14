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
  stickyHeaderMain,
  ...restProps
}) => {
  const [rows, updateTableRowData] = useState(tableData);
  const tableRef = useRef(null);
  const [tableConfiguration, setTableConfiguration] = useState([]);
  const [sortedColumn, updateSortedColumn] = useState({});
  const [isMouseDown, setIsMouseDown] = useState({
    currentElem: undefined,
    eleidx: -1,
    label: '',
    isDown: false,
    mouseX: undefined,
    mouseY: undefined
  });
  const [cellObj, setcellObj] = useState({});
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
      tableRef.current.parentElement.offsetWidth < tableRef.current.offsetWidth
    ) {
      tableRef.current.parentElement.style.overflow = 'auto';
    }
  }, [tableRef]);

  useEffect(() => {
    const { currentElem = undefined, label = '', isDown = false } = isMouseDown;
    if (currentElem && isDown) {
      /* 
        add/bind document events 
      */
      addListener(
        'datatablemousemove-' + (id ? id : `datatable-${tableId}`),
        'mousemove',
        e => {
          onPressMouseMove(e, e.target.dataset.column);
        },
        true
      );
      addListener(
        'datatablemouseup-' + (id ? id : `datatable-${tableId}`),
        'mouseup',
        e => {
          onPressMouseUp(e, e.target.dataset.column);
        },
        true
      );
    } else {
      console.log('removed event listeners ...');
      removeListeners(
        'datatablemousemove-' + (id ? id : `datatable-${tableId}`),
        'mousemove'
      );
      removeListeners(
        'datatablemouseup-' + (id ? id : `datatable-${tableId}`),
        'mouseup'
      );
    }
    // when component is un-mounted
    return () => {
      removeListeners(
        'datatablemousemove-' + (id ? id : `datatable-${tableId}`),
        'mousemove'
      );
      removeListeners(
        'datatablemouseup-' + (id ? id : `datatable-${tableId}`),
        'mouseup'
      );
    };
  }, [isMouseDown]);

  const onPressMouseMove = (e, col) => {
    e.preventDefault();
    var nThTarget = isMouseDown['isDown'] ? isMouseDown['currentElem'] : null;
    // console.log('what is this ???', isMouseDown);
    if (
      (isMouseDown['isDown'] && e.pageX - isMouseDown.mouseX > 1) ||
      e.pageX - isMouseDown.mouseX < -1
    ) {
      let { startX = null, startWidth = null, resizeElem = null } =
        cellObj &&
        nThTarget &&
        nThTarget.dataset &&
        nThTarget.dataset.column &&
        cellObj[nThTarget.dataset.column]
          ? cellObj[nThTarget.dataset.column]
          : {};
      let moveLength = e.pageX - startX;
      nThTarget
        ? (nThTarget.style.width = startWidth + moveLength + 'px')
        : null;
      console.log('==>', startWidth + moveLength, tableConfiguration);

      // let tempObj = { ...tableConfiguration };
      // tempObj[isMouseDown['eleidx']].width = startWidth + moveLength + 'px';

      // setcellObj({
      //   ...cellObj,
      //   [col]: {
      //     mouseUpWidth: startWidth + moveLength + 'px'
      //   }
      // });
      // setTableConfiguration({
      //   tempObj
      // });
    }

    // let tempObj = [...tableConfiguration];
    // tempObj.map((item, i) => {
    //   console.log("Are you coming in ????", item.label, col, (startWidth + moveLength));
    //   if (item.label === col && (startWidth + moveLength) >= item.width) {
    //     nThTarget ? (nThTarget.style.width = startWidth + moveLength + 'px') : null;
    //     // item.width = cellObj[col]['resizeElem'].clientWidth + 'px'
    //   }
    // });
  };

  const onPressMouseUp = (e, col) => {
    e.preventDefault();
    let tempObj = [...tableConfiguration];
    tempObj[isMouseDown['eleidx']].width =
      isMouseDown['currentElem'].style.width;
    // setTableConfiguration(tempObj);
    // debugger;
    isMouseDown['currentElem'].classList.remove('resizing');
    tempObj.map(item =>
      item.width && item.width.includes('calc') ? delete item.width : item
    );
    console.log(tempObj);
    let tempConfig = getColumnStructure(
      [...tempObj],
      expandRowTemplate ? true : false
    );
    // console.log(tempConfig);
    setTableConfiguration(tempConfig);

    if (cellObj && cellObj[col]) {
      // setcellObj({
      //   ...cellObj,
      //   [col]: {
      //     startWidth: cellObj[col]['resizeElem'].clientWidth
      //   }
      // });
      // Update
      // let tempObj = [...tableConfiguration];
      // tempObj.map((item, i) => {
      //   item.label === col ? item.width = (cellObj[col]["resizeElem"].clientWidth) + "px" : null
      // });
      // let tempConfig = getColumnStructure(
      //   [...tempObj],
      //   expandRowTemplate ? true : false
      // );
      // console.log(tempConfig);
      // setTableConfiguration(tempConfig);
      // setTableConfiguration(tempObj);
    }
    document.body.classList.remove('resize-table');
    setIsMouseDown({
      currentElem: undefined,
      eleidx: -1,
      label: '',
      isDown: false,
      mouseX: undefined,
      mouseY: undefined
    });
  };

  const reMouseDown = (column, ukey, e) => {
    var nThTarget =
      e.target.nodeName == 'SPAN' &&
      e.target.className === 'hcl-data-table-resizable'
        ? e.target.parentElement
        : null;
    document.body.classList.add('resize-table');
    e.target.parentElement.classList.add('resizing');
    // var nThTarget = e.target.nodeName == "TH" ? e.target : null;
    if (nThTarget && cellObj) {
      setcellObj({
        ...cellObj,
        [column.label]: {
          startX: e.pageX,
          startWidth: nThTarget.clientWidth,
          resizeElem: nThTarget
        }
      });
      setIsMouseDown({
        ...isMouseDown,
        currentElem: nThTarget,
        eleidx: tableConfiguration.findIndex(
          (item, i) => item.label === column.label
        ),
        label: column.label,
        isDown: true,
        mouseX: e.pageX,
        mouseY: e.pageY
      });
    } else {
      setIsMouseDown({
        ...isMouseDown,
        currentElem: undefined,
        eleidx: -1,
        label: '',
        isDown: false,
        mouseX: undefined,
        mouseY: undefined
      });
    }
  };

  const reMouseUp = (column, ukey, e) => {
    console.log('on mouseup ', tableConfiguration);

    setIsMouseDown({
      ...isMouseDown,
      eleidx: -1,
      isDown: false
    });
    document.body.classList.remove('resize-table');
  };

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
    stickyHeaderMain ? ' overflow-unset' : ''
  }${
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
              customHeaderFlag || column.columnHtml
                ? (customHeaderFlag = true)
                : null;
              return (
                <th
                  key={`heading-${index}`}
                  style={{
                    minWidth: column.width,
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
                    column.allowResize ? ' resizable' : ''
                  }`}
                  tabIndex={column.sortable ? '0' : null}
                  onClick={column.sortable ? sort.bind(this, column) : null}
                  onKeyDown={
                    column.sortable ? sortOnEnter.bind(this, column) : null
                  }
                >
                  {headerSelection && column.field === 'checkbox'
                    ? headerSelection
                    : (
                    <>
                      <span className="hcl-data-table-header">
                        {column.label}
                      </span>
                      {column.allowResize ? (
                        <span
                          className="hcl-data-table-resizable"
                          onMouseDown={
                            column.allowResize
                              ? reMouseDown.bind(
                                  this,
                                  column,
                                  `heading-${index}`
                                )
                              : null
                          }
                          onMouseUp={
                            column.allowResize
                              ? reMouseUp.bind(this, column, `heading-${index}`)
                              : null
                          }
                        ></span>
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
                    }${column.sortable ? ' sortable' : ''}`}
                  >
                    <div>{column.columnHtml ? column.columnHtml : null}</div>
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
  /** Used to fix/stick header on body scroll  */
  stickyHeaderMain: PropTypes.bool
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
  stickyHeaderMain: false
};

export default DataTable;
