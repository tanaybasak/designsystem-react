import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = props => (
    <React.Fragment>
        <div className="patron-modal">
            <div className="patron-modal-dialog">
                <div className="patron-modal-content">
                    <div className="patron-modal-header">
                        <h4>{props.title}</h4>
                        <button
                            type="button"
                            className="patron-modal-close"
                            data-btn-type="cancel"
                            onClick={props.onClick}
                        />
                    </div>
                    <div className="patron-modal-body">
                        <props.render />
                    </div>
                    {props.footer && props.footer.length ?
                        <div className="patron-modal-footer">
                            {props.footer.map((item, index) => (
                                <button
                                    className={`patron-btn patron-btn-${item.type}`}
                                    data-btn-type={item.btnType}
                                    key={`${item.btnType}-${index}`}
                                    onClick={props.onClick}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
        <div className="patron-modal-backdrop"></div>
    </React.Fragment>
);

Modal.defaultProps = {
    title: 'Modal Title',
    onClick: event => { event.preventDefault(); },
    footer: [],
    render: (() => <div>Body</div>)(),
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    footer: PropTypes.array,
    render: PropTypes.func.isRequired,
};

export default Modal;