import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const LoadingState = (
    {
        type,
        className,
        ...restProps
    }
) => {
    const classnames = `${prefix}-loading ${className ? className.trim() : ''}`;
    let content = null;

    switch (type) {
        case 'default': {
            content = (<div className={`${prefix}-rectagle ${classnames}`} style={{ 'width': restProps.width, 'height': restProps.height }} />);
            break;
        }
        case 'breadcrumb': {
            content = (
                <ul className={`${prefix}-breadcrumb ${classnames}`} aria-label="breadcrumb">
                    <li className={`${prefix}-breadcrumb-item`}>
                        <a href="#" className={`${prefix}-link`} />
                    </li>
                    <li className={`${prefix}-breadcrumb-item ${prefix}-breadcrumb-item-active`}>
                        <a href="#" className={`${prefix}-link`} />
                    </li>
                    <li className={`${prefix}-breadcrumb-item`}>
                        <a href="#" className={`${prefix}-link`} />
                    </li>
                </ul>
            );
            break;
        }
        case 'accordion': {
            content = (
                <ul className={`${prefix}-accordion ${classnames}`}>
                    <li className={`${prefix}-accordion-item expanded`}>
                        <h4 className={`${prefix}-accordion-title`}>
                            <span />
                        </h4>
                        <p className={`${prefix}-accordion-content`} />
                    </li>
                    <li className={`${prefix}-accordion-item`}>
                        <h4 className={`${prefix}-accordion-title`}>
                            <span />
                        </h4>
                        <p className={`${prefix}-accordion-content`} />
                    </li>
                    <li className={`${prefix}-accordion-item`}>
                        <h4 className={`${prefix}-accordion-title`}>
                            <span />
                        </h4>
                        <p className={`${prefix}-accordion-content`} />
                    </li>
                </ul>
            );
            break;
        }
        case 'datatable': {
            const num = Array.from(Array(4).keys());
            content = (
                <table className={`${prefix}-data-table ${classnames}`}>
                    <thead>
                        <tr>
                            {
                                restProps.tableData.rows.map(({ label, sortable, title }, index) => (
                                    <th
                                      key={`heading-${index}`}
                                      title={title}
                                      className={sortable ? 'sortable' : ''}
                                    >
                                      {label}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            num.map((row, index) => (
                                <tr key={`row-${index}`}>

                                    {
                                        restProps.tableData.rows.map((col, i) => (
                                            <td key={`col-${index}-${i}`}>
                                                <span />
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            );
            break;
        }
        case 'tab': {
            content = (
                <section className={`${prefix}-tab ${classnames}`} data-component="tabs">
                    <nav data-tabs role="navigation">
                        <ul role="tablist" className={`${prefix}-tabs-nav`}>
                            <li role="tab" className={`${prefix}-tabs-nav-item`}>
                                <a className={`${prefix}-tabs-nav-link`} />
                            </li>
                            <li role="tab" className={`${prefix}-tabs-nav-item`}>
                                <a className={`${prefix}-tabs-nav-link`} />
                            </li>
                            <li role="tab" className={`${prefix}-tabs-nav-item ${prefix}-tabs-disabled active`}>
                                <a className={`${prefix}-tabs-nav-link`} />
                            </li>
                        </ul>
                    </nav>
                </section>
            )
            break;
        }
        case 'slider': {
            content = (
                <div className={`${prefix}-slider ${classnames}`}>
                    <label className={`${prefix}-slider-bottom-range`} />
                    <input className={`${prefix}-slider-input`} type="range" min="0" max="100" />
                    <label className={`${prefix}-slider-top-range`} />
                    <input className={`${prefix}-slider-text-input`} type="text" />
                </div>
            )
            break;
        }
        default:
            break;
    }

    return (
        content
    )
}

LoadingState.propTypes = {
    type: PropTypes.oneOf(["default", "breadcrumb", "accordion", "datatable", "tab", "slider"]),
    className: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

LoadingState.defaultProps = {
    type: 'default',
    className: '',
    width: null,
    height: null
};

export default LoadingState;
