import React from 'react';
import PropTypes from 'prop-types';
import prefix from "../../settings";
import Paragraph from '../../atoms/Paragraph/Paragraph';

export default function ActionBar({ ...restProps }) {

    return (
        <section className="hcl-actionbar" aria-label="Table Action Bar">
            <div className="hcl-actionbar-list">
                <button className="hcl-btn hcl-ghost hcl-sm"><span>Button</span>
                    <svg className="hcl-btn-icon" width="16" height="16" viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                    >
                        <path d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                            fillRule="evenodd"
                        />
                    </svg>
                </button>
                <button className="hcl-btn hcl-ghost hcl-sm"><span>Button</span>
                    <svg className="hcl-btn-icon" width="16" height="16" viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                    >
                        <path d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                            fillRule="evenodd"
                        />
                    </svg>
                </button>
                <button className="hcl-btn hcl-ghost hcl-sm"><span>Button</span>
                    <svg className="hcl-btn-icon" width="16" height="16" viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                    >
                        <path d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                            fillRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div className="hcl-actionbar-summary">
                <span className="mr-2 hcl-type-zeta">
                    5
            </span>
                <span className="hcl-actionbar-text hcl-type-zeta">
                    items selected
            </span>
                <button className="hcl-actionbar-cancel">Cancel</button>
            </div>
        </section>
    );
}

ActionBar.propTypes = {

};

ActionBar.defaultProps = {

};