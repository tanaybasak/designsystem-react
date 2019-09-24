import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Link from '../Link';

function BreadcrumbItem({ onClick, children, active, href, itemClass }) {

    const defaultStyle = {
        breadcrumbItem: `${prefix}-breadcrumb-item`,
        breadcrumbLink: `${prefix}-link`
    };

    return (
        <li
            className={`${defaultStyle.breadcrumbItem} ${itemClass ? itemClass : ''} ${active ? prefix + '-breadcrumb-item-active' : ''}`}
            onClick={onClick}
        >
            <Link
                href={href ? href : 'javascript:void(0);'}
                className={`${defaultStyle.breadcrumbLink}`}
            >
                {children}
            </Link>
        </li>
    );
}

BreadcrumbItem.propTypes = {
    active: PropTypes.bool,
    href: PropTypes.string,
    itemClass: PropTypes.string,
    onClick: PropTypes.func
};
BreadcrumbItem.defaultProps = {
    active: false,
    href: '',
    itemClass: '',
    onClick: () => { }
};

export default BreadcrumbItem;