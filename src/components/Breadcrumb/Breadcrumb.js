import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../settings';
import './Breadcrumb.scss';

export default function Breadcrumb(props) {
    return (
        <div className={`${prefix}-breadcrumb`}>
            <ol className={`${prefix}-breadcrumb__container`}>
                {
                    props.breadcrumbs.length ?
                        props.breadcrumbs.map((item, index) => (
                            <li
                                key={`${item.value}-${index}`}
                                className={`${prefix}-breadcrumb__item ${props.activeBreadcrumb === index ? `${prefix}-breadcrumb__item--active` : ``}`}
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
};

Breadcrumb.defaultProps = {
    activeBreadcrumb: 0
};

Breadcrumb.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array.isRequired,
    activeBreadcrumb: PropTypes.number
};