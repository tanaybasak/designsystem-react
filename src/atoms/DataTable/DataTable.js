import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { getColumnStructure } from '../../util/tableUtil';
import { addListener, removeListeners } from '../../util/eventManager';
import { moveElementInArray } from '../../util/treeUtil';

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
  columnDraggable,
  showDraggableIcon,
  showDraggableIconOnHover,
  removeHeaderNowrap,
  isHeaderSticky,
  onColumnAfterResize,
  initSortedColumn,
  onColumnReorder,
  selectedItem,
  uniqueKey,
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
    if (initSortedColumn) {
      updateSortedColumn(initSortedColumn);
    }
  }, [initSortedColumn]);

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

  let tableClass = [`${prefix}-data-table`];
  if (type.includes('compact')) {
    tableClass.push(`${prefix}-data-table-compact`);
  } else if (type.includes('tall')) {
    tableClass.push(`${prefix}-data-table-tall`);
  }
  if (type.includes('zebra')) {
    tableClass.push(`${prefix}-data-table-zebra`);
  }
  if (resizable) {
    tableClass.push(`${prefix}-data-table-fixed`);
  }

  // const classnames = `${prefix}-data-table-wrapper data-table-sticky-header${
  //   type.includes('borderless') ? ` ${prefix}-data-table-borderless` : ''
  // } ${className}`.trim();

  const classnames = `${prefix}-data-table-wrapper${
    isHeaderSticky
      ? ' data-table-sticky-header'
      : resizable
      ? ' data-table-header'
      : ''
  }${
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
    if (!e.type.match(/touch/)) {
      e.preventDefault();
      e.stopPropagation();
    }

    const { button, touches } = e;
    if (!e.type.match(/touch/)) {
      // For mouse Pointers
      if (button !== 0) return;
    } else if (touches && touches.length > 1) {
      return;
    }
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
    nThTarget = e.currentTarget.parentElement.parentElement.parentElement
      .previousElementSibling
      ? e.currentTarget.parentElement.parentElement.previousElementSibling
          .children[parseInt(idx, 10)]
      : e.currentTarget.parentElement;

    nThTarget.classList.add('hovered');

    let clientX = 0;
    if (
      resizeLineRef &&
      resizeLineRef.current &&
      tableRef &&
      tableRef.current
    ) {
      let tableEleBounding = tableRef.current.getBoundingClientRect();
      if (!e.type.match(/touch/)) {
        clientX = e.clientX;
      } else {
        clientX = e.touches[0].clientX;
      }
      resizeLineRef.current.style.left = clientX - tableEleBounding.left + `px`;
      resizeDividerData['left'] = clientX - tableEleBounding.left;

      /* MouseDownColumn data collected */
      mouseDownColumnData['column'] = column;
      mouseDownColumnData['idx'] = idx;
      mouseDownColumnData['startX'] = clientX;
      mouseDownColumnData['clientWidth'] = nThTarget
        ? nThTarget.getBoundingClientRect().width
        : 0;
      mouseDownColumnData['currentElement'] = nThTarget;
    }

    /* On Mouse move */
    const onPressMouseMove = e => {
      if (!e.type.match(/touch/)) {
        e.preventDefault();
        e.stopPropagation();
      }

      let mouseMoveClientX = 0;

      if (!e.type.match(/touch/)) {
        mouseMoveClientX = e.clientX;
      } else {
        mouseMoveClientX = e.touches[0].clientX;
      }

      if (isMouseDown) {
        const { startX, clientWidth } = mouseDownColumnData;

        moveLength = e && startX ? mouseMoveClientX - startX : 0;
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
      if (!e.type.match(/touch/)) {
        e.preventDefault();
        e.stopPropagation();
      }

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
      removeListeners('datatablemouseup-' + column[`label`] + idx, 'touchend');
      removeListeners(
        'datatablemousemove-' + column[`label`] + idx,
        'mousemove'
      );
      removeListeners(
        'datatablemousemove-' + column[`label`] + idx,
        'touchmove'
      );
      await setTableConfiguration(tempConfig);
      await setMouseDownonResize(false);
      if (onColumnAfterResize)
        onColumnAfterResize({ field: column['field'], width: column['width'] });
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
      'datatablemousemove-' + column[`label`] + idx,
      'touchmove',
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
    addListener(
      'datatablemouseup-' + column[`label`] + idx,
      'touchend',
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

  /* Table column re-order starts */

  let dragSrcEl;
  let dropDirection;

  const onDragStart = e => {
    e.currentTarget.classList.add('dragged-col');
    e.dataTransfer.effectAllowed = 'move';
    dragSrcEl = e.currentTarget;
    e.dataTransfer.setData('text', e.currentTarget.innerHTML);
  };

  const onDragOver = (pinned, e) => {
    if (pinned) {
      return;
    }
    e.preventDefault();
    let domRect = e.currentTarget.getBoundingClientRect();
    let tableEleBounding = tableRef.current.getBoundingClientRect();
    tableRef.current.parentElement.style.position = `relative`;
    resizeLineRef.current.style.display = 'block';
    e.currentTarget.style.cursor = 'grabbing';
    if (domRect.x + domRect.width / 2 < e.clientX) {
      dropDirection = 'right';
      resizeLineRef.current.style.left =
        domRect.x + domRect.width - tableEleBounding.left + `px`;
    } else {
      dropDirection = 'left';
      resizeLineRef.current.style.left =
        domRect.x - tableEleBounding.left + `px`;
    }
  };

  const onDragLeave = () => {
    resizeLineRef.current.style.display = 'none';
  };

  const onDragEnd = e => {
    resizeLineRef.current.style.display = 'none';
    tableRef.current.parentElement.style.position = ``;
    e.currentTarget.classList.remove('dragged-col');
    e.currentTarget.style.cursor = 'pointer';
  };

  const getIndex = field => {
    let indexField;
    tableConfiguration.forEach((config, index) => {
      if (config.field === field) {
        indexField = index;
      }
    });
    return indexField;
  };

  const onDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    let clonedNode = dragSrcEl.cloneNode(true);
    let DraggedColumn = clonedNode.getAttribute('data-column');
    let indexDragged = getIndex(DraggedColumn);
    let indexInsertedBeforeCol = e.currentTarget.getAttribute('data-column');
    let indexInsertedBefore = getIndex(indexInsertedBeforeCol);
    let tempTableConfig = [...tableConfiguration];
    e.currentTarget.style.cursor = 'pointer';

    if (dropDirection === 'right') {
      if (indexDragged < indexInsertedBefore) {
        moveElementInArray(tempTableConfig, indexDragged, indexInsertedBefore);
      } else {
        moveElementInArray(
          tempTableConfig,
          indexDragged,
          indexInsertedBefore + 1
        );
      }
    } else {
      if (indexDragged < indexInsertedBefore) {
        moveElementInArray(
          tempTableConfig,
          indexDragged,
          indexInsertedBefore - 1
        );
      } else {
        moveElementInArray(tempTableConfig, indexDragged, indexInsertedBefore);
      }
    }
    setTableConfiguration(tempTableConfig);
    onColumnReorder(tempTableConfig);
  };
  /* Table column re-order ends */

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
        className={tableClass.join(` `)}
        role="grid"
        {...restProps}
      >
        <thead>
          <tr>
            {tableConfiguration.map((column, index) => {
              customHeaderFlag || column.columnHtml
                ? (customHeaderFlag = true)
                : null;
              const thClassName = [];
              if (column.pinned === 'left') {
                thClassName.push('sticky-div sticky-left-div');
              }
              if (column.pinned === 'right') {
                thClassName.push('sticky-div sticky-right-div');
              }
              if (column.sortable) {
                thClassName.push('sortable');
              }
              if (
                (resizable && column['allowResize'] !== false) ||
                !!column['allowResize']
              ) {
                thClassName.push('resizable');
              }
              if (columnDraggable) {
                thClassName.push('draggable');
              }
              if (column.headerCellClass) {
                thClassName.push(column.headerCellClass);
              }
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
                  title={column.label ? column.label.toString() : ''}
                  data-column={column.field}
                  className={thClassName.join(' ')}
                  tabIndex={column.sortable ? '0' : null}
                  onClick={column.sortable ? sort.bind(this, column) : null}
                  onKeyDown={
                    column.sortable ? sortOnEnter.bind(this, column) : null
                  }
                  draggable={columnDraggable && !column.pinned ? true : false}
                  onDragStart={onDragStart}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver.bind(this, column.pinned)}
                  onDrop={
                    columnDraggable && !column.pinned ? onDrop : undefined
                  }
                  onDragEnd={onDragEnd}
                >
                  <div className={`${prefix}-data-table-header-wrapper`}>
                    {headerSelection && column.field === 'checkbox' ? (
                      headerSelection
                    ) : (
                      <>
                        {showDraggableIcon &&
                        columnDraggable &&
                        !column.pinned ? (
                          <svg
                            className={`draggable-column mr-1${
                              showDraggableIconOnHover
                                ? ' draggable-column-onhover'
                                : ''
                            }`}
                            width="7.5px"
                            height="12px"
                            viewBox="0 0 10 16"
                            version="1.1"
                          >
                            <title>drag_indicator</title>
                            <desc>Created with Sketch.</desc>
                            <g
                              id="Icons"
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                id="Outlined"
                                transform="translate(-617.000000, -246.000000)"
                              >
                                <g
                                  id="Action"
                                  transform="translate(100.000000, 100.000000)"
                                >
                                  <g
                                    id="Outlined-/-Action-/-drag_indicator"
                                    transform="translate(510.000000, 142.000000)"
                                  >
                                    <g>
                                      <polygon
                                        id="Path"
                                        points="0 0 24 0 24 24 0 24"
                                      />
                                      <path
                                        d="M11,18 C11,19.1 10.1,20 9,20 C7.9,20 7,19.1 7,18 C7,16.9 7.9,16 9,16 C10.1,16 11,16.9 11,18 Z M9,10 C7.9,10 7,10.9 7,12 C7,13.1 7.9,14 9,14 C10.1,14 11,13.1 11,12 C11,10.9 10.1,10 9,10 Z M9,4 C7.9,4 7,4.9 7,6 C7,7.1 7.9,8 9,8 C10.1,8 11,7.1 11,6 C11,4.9 10.1,4 9,4 Z M15,8 C16.1,8 17,7.1 17,6 C17,4.9 16.1,4 15,4 C13.9,4 13,4.9 13,6 C13,7.1 13.9,8 15,8 Z M15,10 C13.9,10 13,10.9 13,12 C13,13.1 13.9,14 15,14 C16.1,14 17,13.1 17,12 C17,10.9 16.1,10 15,10 Z M15,16 C13.9,16 13,16.9 13,18 C13,19.1 13.9,20 15,20 C16.1,20 17,19.1 17,18 C17,16.9 16.1,16 15,16 Z"
                                        id="🔹-Icon-Color"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        ) : null}
                        <span
                          className={`hcl-data-table-header${
                            removeHeaderNowrap ? ' nowrap' : ''
                          }`}
                        >
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
                            onTouchStart={onColumnMouseDown.bind(
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
                      sortedColumn.name === column.field &&
                      sortedColumn.order ? (
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
                            <g transform="translate(4.000000, 2.000000)">
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
                            <g fillRule="nonzero">
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
                  </div>
                </th>
              );
            })}
          </tr>
          {customHeaderFlag ? (
            <tr>
              {tableConfiguration.map((column, index) => {
                const thclassName = [];
                if (column.pinned === 'left') {
                  thclassName.push('sticky-div sticky-left-div');
                }
                if (column.pinned === 'right') {
                  thclassName.push('sticky-div sticky-right-div');
                }
                if (column.sortable) {
                  thclassName.push('sortable');
                }
                if (
                  (resizable && column['allowResize'] !== false) ||
                  !!column['allowResize']
                ) {
                  thclassName.push('resizable');
                }
                if (column.headerCellClass) {
                  thclassName.push(column.headerCellClass);
                }
                return (
                  <th
                    key={`customheader-${index}`}
                    style={{
                      minWidth: column.width,
                      left: column.marginLeft,
                      right: column.marginRight,
                      ...column.styles
                    }}
                    className={thclassName.join(' ')}
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
              <tr
                tabIndex={0}
                className={
                  selectedItem && selectedItem[row[uniqueKey]]
                    ? `${prefix}-active-row`
                    : null
                }
                onClick={onRowSelect ? onRowSelect.bind(this, row) : null}
              >
                {tableConfiguration.map((column, i) => {
                  const tdclassName = [];
                  if (column.pinned === 'left') {
                    tdclassName.push('sticky-div sticky-left-div');
                  }
                  if (column.pinned === 'right') {
                    tdclassName.push('sticky-div sticky-right-div');
                  }
                  if (column.bodyCellClass) {
                    tdclassName.push(column.bodyCellClass);
                  }
                  return (
                    <td
                      key={`col-${index}-${i}`}
                      title={
                        column.renderHtml
                          ? null
                          : row[column.field]
                          ? row[column.field].toString()
                          : ''
                      }
                      data-label={column.field}
                      className={tdclassName.join(' ')}
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
                  );
                })}
              </tr>
              {expandRowTemplate && row.expanded ? (
                <tr tabIndex={0} className={`${prefix}-expanded-row`}>
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
  /** Unique id */
  id: PropTypes.string.isRequired,
  /** Used to define the table type
   * * ```borderless``` : with no borders
   * * ```compact``` : Compact Table
   * * ```tall``` : Tall Table
   * * ```zebra``` : Row striping.
   *
   * eg :
   * ```
   * type = "borderless compact zebra"
   * ```
   * */
  type: PropTypes.string,
  /** Data record array to be displayed  */
  tableData: PropTypes.array,
  /** Column Configuration
   *
   * * ```label``` : Column Header
   * * ```field``` : Column key which is present in the ***tableData*** props
   * * ```sortable``` : ***boolean*** value to show sorting icon
   * * ```width``` : minimum width for the column in px
   * * ```renderHtml``` : For passing Custom Html
   * * ```columnHtml``` : For passing custom html in the column header
   * * ```pinned``` : Pass ***'right'*** to pin column right side or pass ***'left'*** to pin column left side
   * * ```allowResize``` : ***boolean*** value to make column resizable
   * * ```minResizeWidth``` : ***number*** value to specify minimum resize width.
   * * ```maxResizeWidth``` : ***number*** value to specify maximum resize width.
   * * ```headerCellClass``` : For passing custom class name for <th> under <thead> element
   * * ```bodyCellClass``` : For passing custom class name for <td> under <tbody> element
   *
   * ```
   * [ {
   *    label : 'Name',
   *    field : 'name',
   *    sortable:true,
   *    width:'100px',
   *    renderHtml: (model)=> {return <span>{model.name}</span>} ,
   *    columnHtml: ( <Search ariaLabel="Search" className=""defaultValue="" iconTheme="default" />) ,
   *    pinned: 'right' ,
   *    allowResize: true ,
   *    minResizeWidth: 40,
   *    maxResizeWidth: 120,
   *    headerCellClass: 'custom-class-name',
   *    bodyCellClass: 'custom-class-name',
   * }]
   * ```*/
  tableConfig: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      field: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      width: PropTypes.string,
      pinned: PropTypes.oneOf(['right', 'left']),
      allowResize: PropTypes.bool,
      minResizeWidth: PropTypes.number,
      maxResizeWidth: PropTypes.number,
      renderHtml: PropTypes.func,
      columnHtml: PropTypes.node,
      headerCellClass: PropTypes.string,
      bodyCellClass: PropTypes.string
    })
  ),
  /** Name of the custom class to apply to the Data Table. */
  className: PropTypes.string,

  /** Call back function to sort table data
   *
   * @signature
   * * ```column``` : sorted column
   * * ```order``` : sorting order
   * * ```data``` : table data
   */
  onSort: PropTypes.func,
  /** Call back function on selecting row
   *
   * @signature
   * ```data``` : selected Table row data
   */
  onRowSelect: PropTypes.func,
  /** @ignore  */
  expandRowTemplate: PropTypes.func,
  /** Used for passing template for Table header  */
  headerSelection: PropTypes.node,
  /** When this property is set, sorting in each column iterates through three sort states: ascending, descending, and unsort.  */
  triStateSorting: PropTypes.bool,
  /** When this property is set, columns become draggable and can be swiched with other column  */
  columnDraggable: PropTypes.bool,
  /** When this property is set, icnon for coloumn reorder will apprear; default value is 'true'  */
  showDraggableIcon: PropTypes.bool,
  /** To Enable resize for all table columns. For individual column config, check tableConfig's allowResize prop. */
  resizable: PropTypes.bool,
  /** For Sticky Headers. */
  isHeaderSticky: PropTypes.bool,
  /**
   * Event after Column Resize.
   *
   * @signature
   * ```column config``` : resized column configuration object
   *
   * */
  onColumnAfterResize: PropTypes.func,
  /** Used to initialize the sorting icon.
   *
   * * ```order``` : sorting order. possible values are 'asc' and 'desc'
   * * ```name``` : Field Name
   *
   * ```
   * {
   *    order: 'asc',
   *    name: 'name'
   * }
   * ```
   */
  initSortedColumn: PropTypes.object,
  /**
   * onColumnReorder will be tiggered on each column reorder and receive updated tableConfig as parameter
   *
   * @signature
   * ```treeconfig``` : tree configuration object
   * */
  onColumnReorder: PropTypes.func,
  /** Unique Key name for updating selectedItem in items data */
  uniqueKey: PropTypes.string,
  /** unique id of item for default selection eg: {[id]: true } */
  selectedItem: PropTypes.object,
  /** Icon Reorder will appear on hover */
  showDraggableIconOnHover: PropTypes.bool,
  /** Used to remove nowwrap style from header title */
  removeHeaderNowrap: PropTypes.bool
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
  resizable: false,
  columnDraggable: false,
  showDraggableIcon: true,
  isHeaderSticky: false,
  onColumnAfterResize: () => {},
  initSortedColumn: {},
  uniqueKey: 'id',
  onColumnReorder: () => {},
  showDraggableIconOnHover: false,
  removeHeaderNowrap: false
};

export default DataTable;
