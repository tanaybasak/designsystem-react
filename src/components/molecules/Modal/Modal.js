import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../../settings';
import ActionBar from '../../atoms/ActionBar';

const Modal = ({
  type,
  label,
  heading,
  children,
  onClose,
  actions
}) => {
  const classNames = [`${prefix}-modal-container ${prefix}-modal-container-lg`];

  if(type === 'danger')
    {
      classNames.push(`${prefix}-modal-container-danger`);
    }

  return (
    <section className={`${prefix}-modal`}>
      <div className={classNames.join(' ')}>
        <button
          type='button'
          className={`${prefix}-modal-close`}
          onClick={onClose}
        />
        {(heading !== '' || label !== '') && (
          <header className={`${prefix}-modal-header`}>
            {label !== '' ? (
              <small className={`${prefix}-modal-label`}>{label}</small>
            ) : null}
            {heading !== '' && <h5>{heading}</h5>}
          </header>
        )}
        {children && (
          <div className={`${prefix}-modal-content`}>{children}</div>
        )}
        {actions.length > 0 && (
          <footer className={`${prefix}-modal-footer`}>
            <ActionBar actions={actions} />
          </footer>
        )}
      </div>
    </section>
  );
}

Modal.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  heading: PropTypes.string,
  onClose: PropTypes.func,
  actions: PropTypes.arrayOf([]),
  children: PropTypes.node.isRequired
};

Modal.defaultProps = {
  type: 'default',
  label: '',
  heading: '',
  onClose: () => {},
  actions: []
};

export default Modal;