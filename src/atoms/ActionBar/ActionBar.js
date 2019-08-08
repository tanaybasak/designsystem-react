import React from 'react';
import propTypes from 'prop-types';
import prefix from '../../settings';

const ActionBar = ({ actions }) => {
  const actionButtons = () => {
    return actions.map(
      ({ label, handler, primary = false, danger = false }) => {
        const classNames = [`${prefix}-btn ${prefix}-modal-btn`];
        classNames.push(`${prefix}-${primary ? `primary` : `secondary`}`);

        if (danger) {
          classNames.push(`${prefix}-danger`);
        }

        return (
          <button
            type="button"
            key={label}
            className={classNames.join(' ')}
            onClick={handler}
          >
            {label}
          </button>
        );
      }
    );
  };
  return <div className={`${prefix}-action-bar`}>{actionButtons()}</div>;
};

ActionBar.propTypes = {
  actions: propTypes.array.isRequired
};
export default ActionBar;
