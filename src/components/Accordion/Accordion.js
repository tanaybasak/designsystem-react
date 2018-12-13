import React from 'react';
import PropTypes from 'prop-types';
import './Accordion.scss';

export const Accordion = props => {
    const { accordionId, expandAll, onTabChange } = props;
    const activeIndex = Number(props.activeIndex);
    return (
        <div id={`patron-accordion-${accordionId}`}>
            {props.children && props.children.map((item, index) => (
                React.cloneElement(item,
                    {
                        key: `${props.accordionId}-${index}`,
                        isActive: activeIndex === index,
                        expandAll,
                        accordionId,
                        onTabChange,
                        index
                    })
            ))}
        </div>
    )
}

Accordion.propTypes = {
    accordionId: PropTypes.string.isRequired,
    expandAll: PropTypes.string,
    onTabChange: PropTypes.func
};

Accordion.defaultProps = {
    accordionId: "test-id",
    expandAll: "true",
    onTabChange: () => 'Accordion Clicked'
};

export const AccordionTab = props => {
    const { accordionId, expandAll, children, header, onTabChange, index, isActive } = props;
    return (
        <div id={`patron-accordion-${accordionId}-container`}
            className="patron-accordion-container"
        >
            <input
                id={`patron-accordion-${accordionId}-${index}`}
                aria-expanded={isActive}
                type="checkbox"
                onChange={event => {
                    if (expandAll === 'false') {
                        document.querySelectorAll(`#patron-accordion-${accordionId} #patron-accordion-${accordionId}-container input`)
                            .forEach(item => {
                                const isActiveElmFlag = item === event.currentTarget ? event.currentTarget.checked : false;
                                item.setAttribute('aria-expanded', isActiveElmFlag);
                                item.checked = isActiveElmFlag;
                            });
                    }
                    onTabChange(event);
                }}
                defaultChecked={isActive}
            />
            <label
                htmlFor={`patron-accordion-${accordionId}-${index}`}
                className="patron-accordion-header"
            >
                <h5>
                    {header}
                </h5>
            </label>
            <article
                className="patron-accordion-body"
            >
                {children}
            </article>
        </div>
    )
}

AccordionTab.propTypes = {
    header: PropTypes.string.isRequired
};

AccordionTab.defaultProps = {
    header: "test-accordion"
};