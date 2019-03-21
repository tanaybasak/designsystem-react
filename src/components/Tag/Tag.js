import React from 'react';
import { prefix } from '../../settings';
import './Tag.scss';

type Props = {
    children: any,
    className: string,
    isCloseable?: boolean,
    onClick: () => void,
    onClose: (event: any) => void
};

export default function Tag(props: Props) {
    return (
        <div className={`${prefix}-tag ${prefix}-tag--${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
            {
                props.isCloseable ?
                    <span
                        className={`${prefix}-tag--is-closeable`}
                        onClick={event => { event.stopPropagation(); props.onClose(event); }}
                    >
                        &#9747;
                </span>
                    : null
            }
        </div>
    );
};

Tag.defaultProps = {
    onClose: event => { console.log('Tag close button clicked') }
};