import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Search = (
    {
        type,
        size,
        theme,
        className,
        ...restProps
    }
) => {
    let [value, setValue] = useState('');
    let [clickableContent, setClickableContent] = useState('');
    const inputRef = useRef(null);
    const classnames = `${prefix}-search 
        ${type === 'clickable' ? `${prefix}-search-btn-only` : ''} 
        ${clickableContent} 
        ${size === 'small' ? `${prefix}-search-sm` : ''} 
        ${theme === 'white' ? `${prefix}-bg-white` : ''} 
        ${className.trim()}`;

    const iconTheme = `${prefix}-search-icon
        ${restProps.iconTheme === 'white' ? 'white' : ''}`;

    const showSearch = (event) => {
        event.preventDefault();
        setClickableContent('show');
        setTimeout(() => {
            inputRef.current.focus();
        }, 200)
    }

    const hideSearch = (e) => {
        if (clickableContent === 'show') {
            if (value === '') {
                setClickableContent('');
            }
        }
        if (restProps.onBlur) {
            restProps.onBlur(e)
        }
    }

    const clearSearch = (e) => {
        e.preventDefault();
        setValue('');
        inputRef.current.focus();
        if (restProps.onChange) {
            restProps.onChange('')
        }
    }

    const searchIcon = (
        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" className={iconTheme} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M15 14.3L10.7 10c1.9-2.3 1.6-5.8-.7-7.7S4.2.7 2.3 3 .7 8.8 3 10.7c2 1.7 5 1.7 7 0l4.3 4.3.7-.7zM2 6.5C2 4 4 2 6.5 2S11 4 11 6.5 9 11 6.5 11 2 9 2 6.5z" />
        </svg>
    )

    return (
        <div className={classnames}>
            {
                clickableContent === '' ?
                    (type === 'clickable' ?
                        (<button className={`${prefix}-search-btn`} onClick={showSearch}>{searchIcon}</button>) :
                        (<span className={`${prefix}-search-btn`}>{searchIcon}</span>)
                    ) : null
            }
            <input
                type="text"
                className={`${prefix}-search-input`}
                placeholder={restProps.placeholder}
                ref={inputRef}
                value={value}
                onChange={event => {
                    setValue(event.currentTarget.value);
                    if (restProps.onChange) {
                        restProps.onChange(event.currentTarget.value)
                    }
                }}
                onBlur={hideSearch}
            />
            <button className={`${prefix}-search-reset ${value !== '' ? `show` : ``}`} onMouseDown={clearSearch} tabIndex="-1" />
        </div>
    )
}

Search.propTypes = {
    type: PropTypes.oneOf(["clickable", "default"]),
    size: PropTypes.oneOf(["small", "default"]),
    theme: PropTypes.oneOf(["white", "default"]),
    iconTheme: PropTypes.oneOf(["white", "default"]),
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
};

Search.defaultProps = {
    type: 'default',
    size: 'default',
    theme: 'default',
    iconTheme: 'default',
    className: '',
    placeholder: 'Search...',
    onChange: () => { },
    onBlur: () => { }
};

export default Search;
