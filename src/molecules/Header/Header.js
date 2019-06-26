import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Header = ({ className, ...restProps }) => {
    const classnames = `${prefix}-navbar ${prefix}-navbar-expand-lg ${className}`.trim();

    return (

        <header className={classnames} {...restProps}>
            <button
                data-component="hamburger"
                className={`${prefix}-navbar-hamburger`}
                role="button"
                data-toggle="collapse"
                data-target="#collapsibleContent"
                aria-controls="collapsibleContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className={`${prefix}-icon-2`}>
                    <span />
                    <span />
                    <span />
                </span>
            </button>
            <a
                href="/"
                className={`${prefix}-navbar-brand`}
            >
                <img
                    src={require("../../../assets/images/logo.png")}
                    alt="Logo"
                />
            </a>
            <div
                className={`${prefix}-collapse ${prefix}-navbar-collapse`}
                id="collapsibleContent"
            >
                <ul className={`${prefix}-navbar-nav mr-auto hidden`}>
                    <li className={`${prefix}-nav-item ${prefix}-active`}>
                        <a href="#" className={`${prefix}-nav-link`}>Tab 1</a>
                    </li>
                </ul>
                <form
                    action="#"
                    data-component="search"
                    className={`${prefix}-navbar-search ml-auto search-btn-only`}
                >
                    <button className={`${prefix}-navbar-search-btn`}>
                        <svg
                            focusable="false"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${prefix}-navbar-search-icon`}
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <path
                                d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"
                            />
                        </svg>
                    </button>
                    <input
                        type="text"
                        className={`${prefix}-navbar-search-input`}
                        placeholder="Search..."
                    />
                    <button className={`${prefix}-navbar-search-close`}>&times;</button>
                </form>
                <ul className={`${prefix}-navbar-nav toolbar`}>
                    <li className={`${prefix}-nav-item`}>
                        <span className={`${prefix}-icon-1 bg-white`} />
                    </li>
                </ul>
            </div>
            <button className={`${prefix}-navbar-search-btn ${prefix}-navbar-expand-lg`}>
                <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${prefix}-navbar-search-icon`}
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                >
                    <path
                        d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"
                    />
                </svg>
            </button>
        </header>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool
};

Header.defaultProps = {
    className: '',
    disabled: false
};

export default Header;