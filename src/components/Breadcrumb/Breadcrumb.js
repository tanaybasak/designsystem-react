import PropTypes from 'prop-types';
import React from 'react';
import { prefix } from '../../settings';
import './Breadcrumb.scss';

const Breadcrumb = props => (
    <div className={`${prefix}-breadcrumb`}>
        <ol className={`${prefix}-breadcrumb_container`}>
            {
                props.breadcrumbs.length ?
                    props.breadcrumbs.map((item, index) => (
                        <li
                            key={`${item.value}-${index}`}
                            className={`${prefix}-breadcrumb_item ${props.activeBreadcrumb === index ? `${prefix}-breadcrumb_item--active` : ``}`}
                            data-value={item.value}
                            onClick={props.onClick}
                        >
                            <a href="JavaScript:void(0)">
                                {item.label}
                            </a>
                        </li>
                    ))
                    : null
            }
        </ol>
    </div>
);

Breadcrumb.propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    activeBreadcrumb: PropTypes.number.isRequired
};

export default Breadcrumb;