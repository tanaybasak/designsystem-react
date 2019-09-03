import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Checkbox from '../Checkbox';
import Overflowmenu from '../../molecules/Overflowmenu';

const DataTable = ({ id, tableData, selectable, className, onSort, overflowMenu, overflowMenuItems, overflowMenuOnClick, ...restProps }) => {
    const { heading, content } = tableData;
    const [selected, setSelected] = useState(new Array(content.length));
    const [allSelected, setAllSelected] = useState(false);
    const classnames = `${prefix}-data-table ${className}`.trim();

    const _overflowMenuOnClick = (event, index) => {
        const comp = event.currentTarget;
        comp.dataset.index = index;
        overflowMenuOnClick(event);
    };

    const updateAllSelected = (selectedRows) => {
        let result = content.length ? true : false;
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
        let result = content.length ? true : false;
        for (let i = 0; i < sel.length; i++) {
            if (!sel[i]) {
                result = false;
            }
        }
        setAllSelected(result);
    };

    const setSelection = event => {
        const newSelected = [...selected];
        newSelected[parseInt(event.currentTarget.dataset.index)] = event.currentTarget.checked;
        setSelected(newSelected);
        updateAllSelected(newSelected);
    };

    const sort = event => {
        const col = event.currentTarget;
        if (col.classList.contains('desc')) {
            col.classList.remove('desc');
            col.dataset.order = "asc";
        } else {
            col.classList.add("desc");
            col.dataset.order = "desc";
        }
        onSort(event);
    };

    return (
        <table
            id={id}
            className={classnames}
            {...restProps}
        >
            <thead>
                <tr>
                    {
                        selectable ?
                            <th>
                                <Checkbox
                                    id={`${id}_checkbox_all`}
                                    checked={allSelected}
                                    onChange={selectAll}
                                />
                            </th>
                            : null
                    }
                    {
                        heading.map(({ content, title, sortable }, index) => (
                            <th
                                key={`heading-${index}`}
                                title={title}
                                className={sortable ? 'sortable' : ''}
                                data-column={content}
                                onClick={sortable ? sort : null}
                            >
                                {content}
                            </th>
                        ))
                    }
                    {
                        overflowMenu ?
                            <th />
                            : null
                    }
                </tr>
            </thead>
            <tbody>
                {
                    content.map((row, index) => (
                        <tr key={`row-${index}`}>
                            {
                                selectable ?
                                    <td>
                                        <Checkbox
                                            id={`${id}_checkbox_${index}`}
                                            data-index={index}
                                            checked={selected[index]}
                                            onChange={setSelection}
                                        />
                                    </td>
                                    : null
                            }
                            {
                                row.map((col, i) => (
                                    <td
                                        key={`col-${index}-${i}`}
                                        title={col.title}
                                    >
                                        {col.content}
                                    </td>
                                ))
                            }
                            {
                                overflowMenu ?
                                    <td>
                                        <Overflowmenu
                                            listItems={overflowMenuItems}
                                            onClick={event => _overflowMenuOnClick(event, index)}
                                            ellipsisType="horizontal"
                                        />
                                    </td>
                                    : null
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

DataTable.propTypes = {
    id: PropTypes.string.isRequired,
    tableData: PropTypes.any,
    selectable: PropTypes.bool,
    className: PropTypes.string,
    onSort: PropTypes.func,
    overflowMenu: PropTypes.bool,
    overflowMenuItems: PropTypes.array,
    overflowMenuOnClick: PropTypes.func
};

DataTable.defaultProps = {
    id: null,
    tableData: {},
    selectable: false,
    className: '',
    onSort: () => { },
    overflowMenu: false,
    overflowMenuItems: [],
    overflowMenuOnClick: () => { }
};

export default DataTable;
