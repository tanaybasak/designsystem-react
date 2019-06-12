import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Checkbox from '../Checkbox';

const DataTable = ({ id, tableData, selectable, className, ...restProps }) => {
    const { heading, content } = tableData;
    const [selected, setSelected] = useState(new Array(content.length));
    const [allSelected, setAllSelected] = useState(false);
    const classnames = `${prefix}-data-table ${className}`.trim();

    const updateAllSelected = (t_selected) => {
        let result = content.length ? true : false;
        for (let i = 0; i < t_selected.length; i++) {
            if (!t_selected[i]) {
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

    return (
        <table
            id={id}
            className={classnames}
            {...restProps}
        >
            <thead>
                <tr>
                    {
                        selectable ? <th>
                            <Checkbox id={`${id}_checkbox_all`} checked={allSelected} onChange={selectAll} />
                        </th> : null
                    }
                    {heading.map((col, index) => (<th key={`heading-${index}`} title={col.title}>{col.content}</th>))}
                </tr>
            </thead>
            <tbody>
                {
                    content.map((row, index) => (
                        <tr key={`row-${index}`}>
                            {
                                selectable ? <td>
                                    <Checkbox id={`${id}_checkbox_${index}`} data-index={index} checked={selected[index]} onChange={setSelection} />
                                </td> : null
                            }
                            {
                                row.map((col, i) => (
                                    <td key={`col-${index}-${i}`} title={col.title}>{col.content}</td>
                                ))
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
    className: PropTypes.string
};

DataTable.defaultProps = {
    id: null,
    tableData: {},
    selectable: false,
    className: ''
};

export default DataTable;