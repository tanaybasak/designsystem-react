import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Accordion = ({ className, children, ...restProps }) => {
    const classnames = `${prefix}-accordion ${className}`.trim();

    return (
        <ul className={classnames} {...restProps}>
            {children}
        </ul>
    );
};

Accordion.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

Accordion.defaultProps = {
    className: '',
    children: ''
};

export default Accordion;