import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

// eslint-disable-next-line no-unused-vars
const Wizard = ({ direction, model, readOnly, className }) => {
  let classnames = [`${prefix}-wizard-container`];
  if (className) {
    classnames.push(className);
  }

  return (
    <div type={direction} className={classnames.join(' ')}>
      {model.map((item, idx) => {
        return (
          <div className={`${prefix}-item-container`} key={idx}>
            <div className={`${prefix}-item-title`}>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

Wizard.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
  model: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    })
  ),
  readOnly: PropTypes.bool
};

Wizard.defaultProps = {
  direction: 'horizontal',
  className: '',
  model: [],
  readOnly: true
};

export default Wizard;
