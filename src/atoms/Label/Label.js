import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Label = ({ className, children, ...restProps }) => {
    const classnames = `${prefix}-label ${className}`.trim();

    return (
        <label className={classnames} {...restProps}>
            {children}
        </label>
    );
}

Label.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    htmlFor: PropTypes.string,
    onClick: PropTypes.func
};

Label.defaultProps = {
    children: null,
    className: "",
    htmlFor: "",
    onClick: () => { }
};

export default Label;
