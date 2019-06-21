import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Search = (
    {
        type,
        size,
        background,
        ...restProps

    }
) => {
    let [value, setValue] = useState('');
    let [newType, setType] = useState('');
    const inputRef = useRef(null);

    const showSearch = (event) => {
        event.preventDefault();
        setType('show');
        setTimeout(() => {
            inputRef.current.focus();
        }, 150)
    }

    const hideSearch = () => {
        if (value === '') {
            setType('');
        }
    }

    const clearSearch = (e) => {
        e.preventDefault();
        setValue('');
        inputRef.current.focus();
    }

    return (
        <div className={`${prefix}-search ${type === 'icon' ? `${prefix}-search-btn-only` : ''} ${newType} ${size === 'small' ? `${prefix}-search-sm` : ''} ${background === 'white' ? `${prefix}-bg-white` : ''}`}>
            {
                newType === '' ? (
                    <button className={`${prefix}-search-btn`} onClick={type === 'icon' ? showSearch : null}>
                        <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" className={`${prefix}-search-icon`} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M15 14.3L10.7 10c1.9-2.3 1.6-5.8-.7-7.7S4.2.7 2.3 3 .7 8.8 3 10.7c2 1.7 5 1.7 7 0l4.3 4.3.7-.7zM2 6.5C2 4 4 2 6.5 2S11 4 11 6.5 9 11 6.5 11 2 9 2 6.5z" />
                        </svg>
                    </button>
                ) : null
            }
            <input
                type="text"
                className={`${prefix}-search-input`}
                placeholder="Search..."
                ref={inputRef}
                value={value}
                onChange={event => {
                    setValue(event.currentTarget.value);
                    if (restProps.onChange) {
                        restProps.onChange(event.currentTarget.value)
                    }
                }}
                onBlur={newType === 'show' ? hideSearch : null}

            />
            <button className={`${prefix}-search-reset ${value !== '' ? `show` : ``}`} onMouseDown={clearSearch} tabIndex="-1" />
        </div>
    )
}

Search.propTypes = {
    type: PropTypes.oneOf(["icon", "normal"]),
    size: PropTypes.oneOf(["small", "normal"]),
    background: PropTypes.oneOf(["white", "normal"]),
    onChange: PropTypes.func
};

Search.defaultProps = {
    type: 'normal',
    size: 'normal',
    background: 'normal',
    onChange: () => { }
};

export default Search;
