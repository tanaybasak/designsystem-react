import React from 'react';
import { prefix } from '../../settings';

type Props = {
    children: any,
    className: string,
    onClick?: () => void,
    href: string,
    target?: string
};

export default function Link(props: Props) {
    return (
        <a className={`${prefix}-link ${prefix}-link--${props.className}`}
            href={props.href}
            onClick={props.onClick}
        >
            {props.children}
        </a>
    )
};