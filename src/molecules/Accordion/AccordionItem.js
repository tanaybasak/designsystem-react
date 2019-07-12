import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Paragraph from '../../atoms/Paragraph';

const AccordionItem = ({ title, expanded, onChange, onExpand, className, children, dataIndex, ...restProps }) => {

    const classnames = `${prefix}-accordion-item ${className}`.trim();

    return (
        <li
            className={`${classnames}${expanded ? ' expanded' : ''}`}
            data-index={dataIndex}
            onClick={
                event => {
                    onChange(event);
                    onExpand(event);
                }
            }
            {...restProps}
        >
            <span className={`${prefix}-accordion-icon`} />
            <span className={`${prefix}-accordion-title`}>{title}</span>
            <Paragraph className={`${prefix}-accordion-content`}>
                {children}
            </Paragraph>
        </li>
    );
};

AccordionItem.propTypes = {
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool,
    onChange: PropTypes.func,
    onExpand: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.any,
    dataIndex: PropTypes.number
};

AccordionItem.defaultProps = {
    title: null,
    expanded: false,
    onChange: () => { },
    onExpand: () => { },
    className: '',
    children: '',
    dataIndex: null
};

export default AccordionItem;