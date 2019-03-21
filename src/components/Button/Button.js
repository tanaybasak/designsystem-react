import React from 'react';
import { prefix } from '../../settings';

type Props = {
    children: any,
    className: string,
    onClick: () => void,
};

export default function Button(props: Props) {
    return (
        <button
            className={`${prefix}-btn ${prefix}-btn--${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};