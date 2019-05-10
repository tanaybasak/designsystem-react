import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../../../settings';

export default function Modal({ type, label, heading, content, footer }) {

    return (
        <section className="hcl-modal hcl-modal-hide">
            <div className={`hcl-modal-container hcl-modal-container-lg  ${type === 'danger' ? 'hcl-modal-container-danger ' : null}`}>
                <header className="hcl-modal-header">
                    {label !== '' ? <small className="hcl-modal-label">{label}</small> : null}
                    <h5>{heading}</h5>
                </header>
                <div className="hcl-modal-content">
                    {content !== '' ? <p> {content}</p> : null}
                </div>
                {footer ?
                    <footer className="hcl-modal-footer ">
                        <button id="hcl-modal-cancel-type3" className="hcl-btn hcl-primary hcl-primary-outline">Cancel</button>

                        {type === 'danger' ?
                            <button class="hcl-btn hcl-danger">Delete</button>
                            :
                            <button className="hcl-btn hcl-primary">Save</button>
                        }
                    </footer>
                    : null
                }
                <button id="hcl-modal-close-type1" className="hcl-modal-close"></button>
            </div>
        </section>
    );
};

Modal.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    heading: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    footer: PropTypes.bool,
};

Modal.defaultProps = {
    type: 'default',
    label: '',
    // heading: 'heading',
    // content: 'This is temporary content',
    footer: false,
};