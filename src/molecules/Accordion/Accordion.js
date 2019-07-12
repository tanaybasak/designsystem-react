import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Accordion = ({ uncontrolled, className, children, ...restProps }) => {
    const [expanded, setExpanded] = useState(children.map(child => child.props.expanded || false));

    const classnames = `${prefix}-accordion ${className}`.trim();

    const toggleContent = (event) => {
        const comp = event.currentTarget;
        const index = parseInt(comp.dataset.index);
        setExpanded(expanded.map((child, i) => i === index ? !child : uncontrolled ? child : false));
    }


    return (
        <ul className={classnames} {...restProps}>
            {
                React.Children.map(children, (child, index) => {
                    return cloneElement(child, {
                        onExpand: event => {
                            toggleContent(event);
                        },
                        expanded: expanded[index],
                        dataIndex: index
                    });
                })
            }
        </ul>
    );
};

Accordion.propTypes = {
    uncontrolled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.any
};

Accordion.defaultProps = {
    uncontrolled: false,
    className: '',
    children: ''
};

export default Accordion;