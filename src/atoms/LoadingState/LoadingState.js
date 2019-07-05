import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

import Breadcrumb from '../Breadcrumb';
import { Accordion, AccordionItem } from "../../molecules/Accordion";

const LoadingState = (
    {
        type,
        className,
        ...restProps
    }
) => {
    const classnames = `${prefix}-loading ${className ? className.trim() : ''}`;

    let content = null;

    if (type === 'button') {
        content = (<button className={`hcl-btn ${classnames}`}>Primary Button</button>);
    } else if (type === 'breadcrumb') {
        content = (
            <Breadcrumb
                id="breadcrumb"
                className={`custom-breadcrumb ${prefix}-loading`}
                model={[
                    { label: "Breadcrumb 1", url: "" },
                    { label: "Breadcrumb 2", url: "https://google.co.in" },
                    { label: "Breadcrumb 3" }
                ]}
            />
        );
    } else if (type === 'accordion') {
        content = (
            <ul className="hcl-accordion hcl-loading">
                <li className="hcl-accordion-item expanded" data-index="0">
                    <span className="hcl-accordion-icon" />
                    <span className="hcl-accordion-title"><span /></span>
                    <p className="hcl-accordion-content" />
                </li>
                <li className="hcl-accordion-item" data-index="1">
                    <span className="hcl-accordion-icon" />
                    <span className="hcl-accordion-title"><span /></span>

                </li>
                <li className="hcl-accordion-item" data-index="2">
                    <span className="hcl-accordion-icon" />
                    <span className="hcl-accordion-title"><span /></span>
                </li>
                <li className="hcl-accordion-item" data-index="3">
                    <span className="hcl-accordion-icon" />
                    <span className="hcl-accordion-title"><span /></span>
                </li>
            </ul>
        );
    } else if (type === 'datatable') {
        const num = [1, 2, 3, 4];
        content = (
            <table className={`${prefix}-data-table ${classnames}`}>
                <thead>
                    <tr>
                        {
                            restProps.tableData.heading.map(({ content, title, sortable }, index) => (
                                <th
                                    key={`heading-${index}`}
                                    title={title}
                                    className={sortable ? 'sortable' : ''}
                                    data-column={content}
                                >
                                    {content}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        num.map((row, index) => (
                            <tr key={`row-${index}`}>

                                {
                                    restProps.tableData.heading.map((col, i) => (
                                        <td key={`col-${index}-${i}`}>
                                            <span />
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
    return (
        content
    )
}

LoadingState.propTypes = {
    type: PropTypes.oneOf(["button", "breadcrumb", "accordion", "datatable"])
};

LoadingState.defaultProps = {
    type: 'button'
};

export default LoadingState;
