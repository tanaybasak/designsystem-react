import React from 'react';
import propTypes from 'prop-types';
import prefix from '../../settings';
import Button from '../Button/Button';

const Actions = ({ actions }) => {
  const actionButtons = () => {
    return actions.map(
      (
        {
          label,
          handler,
          primary = false,
          danger = false,
          disabled = false,
          warning = false,
          neutral = false,
          type,
          ...restProps
        },
        index
      ) => {
        if (!type) {
          primary ? (type = 'primary') : (type = 'secondary');

          if (danger) {
            type === 'primary'
              ? (type = 'primary-danger')
              : (type = 'secondary-danger');
          }

          neutral ? (type = 'neutral') : null;
          warning ? (type = 'warning') : null;
        }
        return (
          <Button
            type={type}
            key={index}
            disabled={disabled}
            className={`${prefix}-modal-btn`}
            onClick={handler}
            {...restProps}
          >
            {label}
          </Button>
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
