import React from 'react';
import propTypes from 'prop-types';
import prefix from '../../settings';

const Actions = ({ actions }) => {
  const actionButtons = () => {
    return actions.map(
      ({
        label,
        handler,
        primary = false,
        danger = false,
        disabled = false,
        warning = false,
        neutral = false,
        ...restProps
      }) => {
        const classNames = [`${prefix}-btn ${prefix}-modal-btn`];
        classNames.push(`${prefix}-${primary ? `primary` : `secondary`}`);

        if (danger) {
          classNames.push(`${prefix}-danger`);
        }

        if (warning) {
          classNames.push(`${prefix}-warning`);
        }

        if (neutral) {
          classNames.push(`${prefix}-neutral`);
        }

        return (
          <button
            type="button"
            key={label}
            disabled={disabled}
            className={classNames.join(' ')}
            {...restProps}
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

Actions.propTypes = {
  actions: propTypes.array.isRequired
};
export default Actions;
