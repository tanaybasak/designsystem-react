import React from 'react';

type Props = {
    className: string,
    children: any,
    type: string
};

export default function Heading(props: Props) {
    const Element = props.type;
    return (
        <Element className={props.children}>
            {props.children}
        </Element>
    );
};