import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Modal({ type, label, heading, content, footer, onClose , onSave, onDelete}) {
    return (
        <section className={`${prefix}-modal ${prefix}-modal-hide`} >
            <div className={`${prefix}-modal-container ${prefix}-modal-container-lg  ${type === 'danger' ? `${prefix}-modal-container-danger` : null}`}>
                <header className={`${prefix}-modal-header`}>
                    {label !== '' ? <small className={`${prefix}-modal-label`}>{label}</small> : null}
                    <h5>{heading}</h5>
                </header>
                <div className={`${prefix}-modal-content`}>
                    {content !== '' ? <p> {content}</p> : null}
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
    type: PropTypes.string,
    label: PropTypes.string,
    heading: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    footer: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onSave: PropTypes.func,
};

Modal.defaultProps = {
    type: 'default',
    label: '',
    heading: 'heading',
    content: 'This is temporary content',
    footer: false,
    onClose: null,
    onDelete: null,
    onSave: null,
};