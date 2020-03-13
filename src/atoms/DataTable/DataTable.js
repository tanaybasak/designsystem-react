import React, { useState } from "react";
import PropTypes from "prop-types";
import prefix from "../../settings";
import Checkbox from "../Checkbox";
import Overflowmenu from "../../molecules/Overflowmenu";

const DataTable = ({
  id,
  tableData,
  selectable,
  className,
  onSort,
  overflowMenu,
  overflowMenuItems,
  overflowMenuOnClick,
  ...restProps
}) => {
  const { columns, rows } = tableData;
  const [selected, setSelected] = useState(new Array(rows.length));
  const [allSelected, setAllSelected] = useState(false);
  const classnames = `${prefix}-data-table ${className}`.trim();
  const fields = new Array(rows.length);

  const _overflowMenuOnClick = (event, index) => {
    const comp = event.currentTarget;
    comp.dataset.index = index;
    overflowMenuOnClick(event);
  };

  const updateAllSelected = selectedRows => {
    let result = rows.length ? true : false;
    for (let i = 0; i < selectedRows.length; i++) {
      if (!selectedRows[i]) {
        result = false;
      }
    }
    setAllSelected(result);
  };

  const selectAll = event => {
    const newSelected = new Array(selected.length);
    const sel = event.currentTarget.checked;
    newSelected.fill(sel, 0, selected.length);
    setSelected(newSelected);
    let result = rows.length ? true : false;
    for (let i = 0; i < sel.length; i++) {
      if (!sel[i]) {
        result = false;
      }
    }
    setAllSelected(result);
  };

  const setSelection = event => {
    const newSelected = [...selected];
    newSelected[parseInt(event.currentTarget.dataset.index)] =
      event.currentTarget.checked;
    setSelected(newSelected);
    updateAllSelected(newSelected);
  };

  const sort = event => {
    const col = event.currentTarget;
    if (col.classList.contains("desc")) {
      col.classList.remove("desc");
      col.dataset.order = "asc";
    } else {
      col.classList.add("desc");
      col.dataset.order = "desc";
    }
    onSort(event);
  };

  return (
    <table id={id} className={classnames} {...restProps}>
      <thead>
        <tr>
          {selectable ? (
            <th>
              <Checkbox
                id={`${id}_checkbox_all`}
                checked={allSelected}
                onChange={selectAll}
              />
            </th>
          ) : null}
          {columns.map(({ label, field, sortable, title }, index) => {
            fields[index] = field;
            return (
              <th
                key={`heading-${index}`}
                title={title}
                className={sortable ? "sortable" : ""}
                data-column={label}
                onClick={sortable ? sort : null}
              >
                {label}
              </th>
            );
          })}
          {overflowMenu ? <th /> : null}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={`row-${index}`}>
            {selectable ? (
              <td>
                <Checkbox
                  id={`${id}_checkbox_${index}`}
                  data-index={index}
                  checked={selected[index]}
                  onChange={setSelection}
                />
              </td>
            ) : null}
            {fields.map((field, i) => (
              <td key={`col-${index}-${i}`} title={row[field]}>
                {row[field]}
              </td>
            ))}
            {overflowMenu ? (
              <td>
                <Overflowmenu
                  listItems={overflowMenuItems}
                  onClick={event => _overflowMenuOnClick(event, index)}
                  ellipsisType="horizontal"
                />
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

DataTable.propTypes = {
  /** Unique id for Table */
  id: PropTypes.string.isRequired,
  /** Data for table  */
  tableData: PropTypes.any,
  /** Boolean value to make records selectable in Data Table */
  selectable: PropTypes.bool,
  /** Name of the custom class to apply to the Data Table
   * eg: hcl-data-table-zebra, hcl-data-table-compact, hcl-data-table-tall, hcl-data-table-borderless */
  className: PropTypes.string,
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
  overflowMenuOnClick: PropTypes.func
};

DataTable.defaultProps = {
  id: null,
  tableData: {},
  selectable: false,
  className: "",
  onSort: () => {},
  overflowMenu: false,
  overflowMenuItems: [],
  overflowMenuOnClick: () => {}
};

export default DataTable;
