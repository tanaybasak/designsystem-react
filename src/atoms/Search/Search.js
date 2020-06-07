import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

const Search = ({
  type,
  size,
  defaultValue,
  theme,
  className,
  iconTheme,
  disabled,
  ...restProps
}) => {
  let [value, setValue] = useState('');
  let [clickableContent, setClickableContent] = useState('');
  const inputRef = useRef(null);
  const classnames = `${prefix}-search 
        ${type === 'clickable' ? `${prefix}-search-btn-only` : ''} 
        ${clickableContent} 
        ${size === 'small' ? `${prefix}-search-sm` : ''} 
        ${theme === 'white' ? `${prefix}-bg-white` : ''} 
        ${className.trim()}`;

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const icon = `${prefix}-search-icon
        ${iconTheme === 'white' ? 'white' : ''}`;

  const showSearch = event => {
    event.preventDefault();
    setClickableContent('show');
    setTimeout(() => {
      inputRef.current.focus();
    }, 200);
  };

  const hideSearch = e => {
    if (clickableContent === 'show') {
      if (value === '') {
        setClickableContent('');
      }
    }
    if (restProps.onBlur) {
      restProps.onBlur(e);
    }
  };

  const clearSearch = e => {
    e.preventDefault();
    setValue('');
    inputRef.current.focus();
    if (restProps.onChange) {
      restProps.onChange('');
    }
  };

  const searchIcon = (
    <svg
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className={icon}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M15 14.3L10.7 10c1.9-2.3 1.6-5.8-.7-7.7S4.2.7 2.3 3 .7 8.8 3 10.7c2 1.7 5 1.7 7 0l4.3 4.3.7-.7zM2 6.5C2 4 4 2 6.5 2S11 4 11 6.5 9 11 6.5 11 2 9 2 6.5z" />
    </svg>
  );

  return (
    <div className={classnames}>
      {clickableContent === '' ? (
        type === 'clickable' ? (
          <button
            className={`${prefix}-search-btn`}
            disabled={disabled}
            onClick={showSearch}
          >
            {searchIcon}
          </button>
        ) : (
          <span className={`${prefix}-search-btn`}>{searchIcon}</span>
        )
      ) : null}
      <input
        type="text"
        className={`${prefix}-search-input`}
        placeholder={restProps.placeholder}
        ref={inputRef}
        value={value}
        disabled={disabled}
        {...restProps}
        onChange={event => {
          setValue(event.currentTarget.value);
          if (restProps.onChange) {
            restProps.onChange(event.currentTarget.value);
          }
        }}
        onBlur={hideSearch}
      />
      <button
        className={`${prefix}-search-reset ${value !== '' ? `show` : ``}`}
        disabled={disabled}
        onMouseDown={clearSearch}
        tabIndex="-1"
      />
    </div>
  );
};

Search.propTypes = {
  /** Type of Search
    default : Normal Search 
    clickable : Clickable/Header Search  
     */
  type: PropTypes.oneOf(['clickable', 'default']),
  /** Size of Search
    default : Normal Search 
    small : applying small search styles  
   */
  size: PropTypes.oneOf(['small', 'default']),
  /** used for changing the background color of search component
    default : Normal Search with grey background
    white : applying white background in the search text field  
  */
  theme: PropTypes.oneOf(['white', 'default']),
  /** used for changing the color of search icon 
    default : Normal Search 
    white : applying white color to the search icon  
   */
  iconTheme: PropTypes.oneOf(['white', 'default']),
  /** Class/clasess will be applied on the parent div of Search  */
  className: PropTypes.string,
  /* Default values */
  defaultValue: PropTypes.string,
  /** Placeholder for the search text field  */
  placeholder: PropTypes.string,
  /** call back function which will return the entered character  */
  onChange: PropTypes.func,
  /** call back function triggered on focus out */
  onBlur: PropTypes.func,
  /** Specifying the component is disabled or not. */
  disabled: PropTypes.bool
};

Search.defaultProps = {
  type: 'default',
  size: 'default',
  theme: 'default',
  defaultValue: '',
  disabled: false,
  iconTheme: 'default',
  className: '',
  placeholder: 'Search...',
  onChange: () => {},
  onBlur: () => {}
};

export default Search;
