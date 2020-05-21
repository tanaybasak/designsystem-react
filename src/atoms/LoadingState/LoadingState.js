import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const LoadingState = ({ type, className, ...restProps }) => {
  const classnames = `${prefix}-loading ${className ? className.trim() : ''}`;

  const defaultLoadingState = () => {
    return (
      <div
        className={`${prefix}-rectagle ${classnames}`}
        style={{ width: restProps.width, height: restProps.height }}
      />
    );
  };

  const breadcrumbLoadingState = () => {
    return (
      <ul
        className={`${prefix}-breadcrumb ${classnames}`}
        aria-label="breadcrumb"
      >
        <li className={`${prefix}-breadcrumb-item`}>
          <a href="#" className={`${prefix}-link`} />
        </li>
        <li
          className={`${prefix}-breadcrumb-item ${prefix}-breadcrumb-item-active`}
        >
          <a href="#" className={`${prefix}-link`} />
        </li>
        <li className={`${prefix}-breadcrumb-item`}>
          <a href="#" className={`${prefix}-link`} />
        </li>
      </ul>
    );
  };

  const accordionLoadingState = () => {
    return (
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
  };

  const tabLoadingState = () => {
    return (
      <section className={`${prefix}-tab ${classnames}`} data-component="tabs">
        <nav data-tabs role="navigation">
          <ul role="tablist" className={`${prefix}-tabs-nav`}>
            <li role="tab" className={`${prefix}-tabs-nav-item`}>
              <a className={`${prefix}-tabs-nav-link`} />
            </li>
            <li role="tab" className={`${prefix}-tabs-nav-item`}>
              <a className={`${prefix}-tabs-nav-link`} />
            </li>
            <li
              role="tab"
              className={`${prefix}-tabs-nav-item ${prefix}-tabs-disabled active`}
            >
              <a className={`${prefix}-tabs-nav-link`} />
            </li>
          </ul>
        </nav>
      </section>
    );
  };

  const sliderLoadingState = () => {
    return (
      <div className={`${prefix}-slider-wrapper ${classnames}`}>
        <div className={`${prefix}-slider `}>
          <label className={`${prefix}-slider-bottom-range`} />
          <div className={`${prefix}-slider-input-wrapper`}>
            <input
              className={`${prefix}-slider-input`}
              type="range"
              min="0"
              max="100"
              disabled
            />
          </div>
          <label className={`${prefix}-slider-top-range`} />
          <input className={`${prefix}-slider-text-input hcl-form-control`} type="number" disabled />
        </div>
      </div>
    );
  };

  const tableLoadingState = () => {
    const num = Array.from(Array(4).keys());
    return (
      <div className={`${prefix}-data-table-wrapper`}>
        <table className={`${prefix}-data-table ${classnames}`}>
          <thead>
            <tr>
              {restProps.tableConfig.map(
                ({ label, sortable, title }, index) => (
                  <th
                    key={`heading-${index}`}
                    title={title}
                    className={sortable ? 'sortable' : ''}
                  >
                    <div className="header-text-wrapper">{label}</div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {num.map((row, index) => (
              <tr key={`row-${index}`}>
                {restProps.tableConfig.map((col, i) => (
                  <td key={`col-${index}-${i}`}>
                    <div
                      className="body-content-wrapper"
                      style={{ width: '100%' }}
                    >
                      <span />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const getTemplate = () => {
    if (type === 'default') {
      return defaultLoadingState();
    } else if (type === 'breadcrumb') {
      return breadcrumbLoadingState();
    } else if (type === 'accordion') {
      return accordionLoadingState();
    } else if (type === 'tab') {
      return tabLoadingState();
    } else if (type === 'slider') {
      return sliderLoadingState();
    } else if (type === 'datatable') {
      return tableLoadingState();
    }
  };

  return getTemplate();
};

LoadingState.propTypes = {
  /** type of loading state eg : default , breadcrumb , accordion , datatable, tab, slider */
  type: PropTypes.oneOf([
    'default',
    'breadcrumb',
    'accordion',
    'datatable',
    'tab',
    'slider'
  ]),
  /** Class/clasess will be applied on the parent div of Loading State */
  className: PropTypes.string,
  /** Width of loading State. Use this props for default Loading state */
  width: PropTypes.string,
  /** Height of loading State. Use this props for default Loading state */
  height: PropTypes.string
};

LoadingState.defaultProps = {
  type: 'default',
  className: '',
  width: null,
  height: null
};

export default LoadingState;
