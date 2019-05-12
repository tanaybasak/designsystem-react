import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Modal({ children, type, label, heading, footer, onClose, onSave, onDelete }) {
    return (
        <section className={`${prefix}-modal ${prefix}-modal-hide`} >
            <div className={`${prefix}-modal-container ${prefix}-modal-container-lg  ${type === 'danger' ? `${prefix}-modal-container-danger` : ''}`}>
                <header className={`${prefix}-modal-header`}>
                    {label !== '' ? <small className={`${prefix}-modal-label`}>{label}</small> : null}
                    <h5>{heading}</h5>
                </header>
                <div className={`${prefix}-modal-content`}>
                    {children}
                </div>
                {footer ?
                    <footer className={`${prefix}-modal-footer`}>
                        <button className={`${prefix}-btn ${prefix}-primary ${prefix}-primary-outline`} onClick={onClose}>Cancel</button>
                        {type === 'danger' ?
                            <button className={`${prefix}-btn ${prefix}-danger`} onClick={onDelete}>Delete</button>
                            :
                            <button className={`${prefix}-btn ${prefix}-primary`} onClick={onSave}>Save</button>
                        }
                    </footer>
                    : null
                }
                <button className={`${prefix}-modal-close`} onClick={onClose} ></button>
            </div>
        </section >
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    heading: PropTypes.string.isRequired,
    footer: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onSave: PropTypes.func,
};

Modal.defaultProps = {
    children: null,
    type: 'default',
    label: '',
    heading: 'heading',
    footer: false,
    onClose: null,
    onDelete: null,
    onSave: null,
};