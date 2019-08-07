import React from 'react';
import PropTypes from 'prop-types';

export default function Icon({ type, src, children, ...restProps }) {

    return (
        type === "img"?
            <img
                src={src}
                {...restProps}
            />:
            <svg
                {...restProps}
            >
                {children}
            </svg>
    );
};

const check = ({ type, children, src }, propName, componentName) => {
    if (propName === 'children' && type === 'svg' && !children) {
        return new Error(`The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`null\`.`);
    } else if (propName === 'src' && type === 'img' && !src) {
        return new Error(`The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`null\`.`);
    }
};

Icon.propTypes = {
    type: PropTypes.oneOf(['img', 'svg']).isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    src: check,
    onClick: PropTypes.func,
    children: check
};

Icon.defaultProps = {
    className: '',
    src: null,
    onClick: () => { },
    children: null,
};