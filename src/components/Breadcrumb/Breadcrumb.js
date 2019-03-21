import React from 'react';
import { prefix } from '../../settings';
import './Breadcrumb.scss';

type Item = {
    label: number | string,
    value: number | string
};

type Props = {
    className: string,
    onClick: () => void,
    breadcrumbs: Array<Item>,
    activeBreadcrumb?: number
};

export default function Breadcrumb(props: Props) {
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