import React from 'react';
import prefix from '../settings';

export const Info = (
  <svg
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="https://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 32 32"
    aria-hidden="true"
    style={{ willChange: 'transform', fill: '#4696d2' }}
    className={`${prefix}-notification-icon`}
  >
    <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z" />
  </svg>
);

export const Copy = (
  <svg
    style={{ fill: '#0066b0' }}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className="hcl-btn-icon"
  >
    <rect
      data-name="&lt;Transparent Rectangle&gt;"
      width="16"
      height="16"
      fill="none"
    />
    <path d="M11.5,3h-5A2.5,2.5,0,0,0,4,5.5v7A2.5,2.5,0,0,0,6.5,15h5A2.5,2.5,0,0,0,14,12.5v-7A2.5,2.5,0,0,0,11.5,3ZM13,12.5A1.5,1.5,0,0,1,11.5,14h-5A1.5,1.5,0,0,1,5,12.5v-7A1.5,1.5,0,0,1,6.5,4h5A1.5,1.5,0,0,1,13,5.5ZM6,7h6V8H6Zm0,3h5v1H6ZM4.5,2A1.5,1.5,0,0,0,3,3.5V9H2V3.5A2.5,2.5,0,0,1,4.5,1H9V2Z" />
  </svg>
);

export const Success = (
  <svg
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="https://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
    style={{ willChange: 'transform', fill: '#589d25' }}
    className={`${prefix}-notification-icon`}
  >
    <path d="M10 1c-4.9 0-9 4.1-9 9s4.1 9 9 9 9-4 9-9-4-9-9-9zM8.7 13.5l-3.2-3.2 1-1 2.2 2.2 4.8-4.8 1 1-5.8 5.8z" />
    <path
      fill="none"
      d="M8.7 13.5l-3.2-3.2 1-1 2.2 2.2 4.8-4.8 1 1-5.8 5.8z"
      data-icon-path="inner-path"
      opacity="0"
    />
  </svg>
);

export const Danger = (
  <svg
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="https://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
    style={{ willChange: 'transform', fill: '#e0182d' }}
    className={`${prefix}-notification-icon`}
  >
    <path d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm3.5 13.5l-8-8 1-1 8 8-1 1z" />
    <path
      d="M13.5 14.5l-8-8 1-1 8 8-1 1z"
      data-icon-path="inner-path"
      opacity="0"
    />
  </svg>
);

export const Warning = (
  <svg
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="https://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
    style={{ willChange: 'transform', fill: '#fac43b' }}
    className={`${prefix}-notification-icon`}
  >
    <path d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm-.8 4h1.5v7H9.2V5zm.8 11c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
    <path
      d="M9.2 5h1.5v7H9.2V5zm.8 11c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
      data-icon-path="inner-path"
      opacity="0"
    />
  </svg>
);

export const checkmark = (
  <svg
    className="hcl-btn-icon"
    data-name="Refresh-line-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect
      data-name="&lt;Transparent Rectangleh&gt;"
      width="16"
      height="16"
      fill="none"
    />
    <path d="M5.89,12.91,1,8l.71-.71L5.89,11.5l8.4-8.41L15,3.8Z" />
  </svg>
);

export const inlineClose = (
  <svg
    data-name="Refresh-line-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className="hcl-btn-icon"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M8.71,8,13,12.29l-.71.71L8,8.71,3.71,13,3,12.29,7.29,8,3,3.71,3.71,3,8,7.29,12.29,3l.71.71Z" />
  </svg>
);

export const edit = (
  <svg
    className="hcl-btn-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect
      data-name="&lt;Transparent Rectangle&gt;"
      width="16"
      height="16"
      fill="none"
    />
    <path d="M13.56,3.52,12.48,2.44a1.5,1.5,0,0,0-2.13,0l-8.2,8.21A.47.47,0,0,0,2,11v2.5a.5.5,0,0,0,.5.5H5a.47.47,0,0,0,.35-.15l8.21-8.2a1.51,1.51,0,0,0,0-2.13Zm-9.85,7,6-6,1.79,1.79-6,6ZM3,11.21,4.79,13H3Zm9.85-6.27h0l-.6.61-1.8-1.8.61-.6a.5.5,0,0,1,.71,0l1.08,1.08a.49.49,0,0,1,.15.35A.49.49,0,0,1,12.85,4.94Z" />
  </svg>
);

export const Close = (
  <svg version="1.1" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <polygon
      points="15.393,2.021 13.979,0.607 8,6.586 2.021,0.607 0.607,2.021 6.586,8 0.607,13.979 2.021,15.393 8,9.414 
           13.979,15.393 15.393,13.979 9.414,8 "
    />
  </svg>
);

export const User = (
  <svg
    style={{ fill: 'var(--default_icon_high)', width: '100%', height: '100%' }}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M8,8A3.5,3.5,0,1,0,4.5,4.5,3.5,3.5,0,0,0,8,8ZM8,2A2.5,2.5,0,1,1,5.5,4.5,2.5,2.5,0,0,1,8,2Zm5,10.5V15H12V12.5A2.5,2.5,0,0,0,9.5,10h-3A2.5,2.5,0,0,0,4,12.5V15H3V12.5A3.5,3.5,0,0,1,6.5,9h3A3.5,3.5,0,0,1,13,12.5Z" />
  </svg>
);

export const activeUser = (
  <svg
    xmlns="https://www.w3.org/2000/svg"
    style={{ fill: 'var(--white)', width: '100%', height: '100%' }}
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M4.5,4.5A3.5,3.5,0,1,1,8,8,3.5,3.5,0,0,1,4.5,4.5ZM9.5,9h-3A3.5,3.5,0,0,0,3,12.5V15H13V12.5A3.5,3.5,0,0,0,9.5,9Z" />
  </svg>
);

export const CheckMark = (
  <svg
    style={{ fill: 'var(--secondary_icon)', width: '100%', height: '100%' }}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M5.89,12.91,1,8l.71-.71L5.89,11.5l8.4-8.41L15,3.8Z" />
  </svg>
);

export const Error = <span style={{ color: 'var(--danger_icon)' }}>!</span>;

export const boldIcon = (
  <svg
    className="hcl-btn-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M8.25,13.25H4.5V2.75H8.25a2.75,2.75,0,0,1,2,4.67,3.25,3.25,0,0,1-2,5.83ZM6,11.75H8.25a1.75,1.75,0,0,0,0-3.5H6Zm0-5H8.25a1.25,1.25,0,0,0,0-2.5H6Z" />
  </svg>
);

export const boldSelected = (
  <svg
    className="hcl-btn-icon"
    style={{ fill: 'var(--active_icon)' }}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M8.25,14H3.75V2h4.5a3.5,3.5,0,0,1,3.5,3.5,3.46,3.46,0,0,1-.52,1.83,4,4,0,0,1-3,6.67Zm-1.5-3h1.5a1,1,0,0,0,0-2H6.75Zm0-5h1.5a.5.5,0,0,0,0-1H6.75Z" />
  </svg>
);

export const italicIcon = (
  <svg
    className="hcl-btn-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M9.59,4,7.45,12H10v1H3.5V12H6.41L8.55,4H6V3h6.5V4Z" />
  </svg>
);

export const italicSelected = (
  <svg
    className="hcl-btn-icon"
    style={{ fill: 'var(--active_icon)' }}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M10,4.5l-1.87,7H10v2H3.5v-2H6l1.87-7H6v-2h6.5v2Z" />
  </svg>
);

export const underlineIcon = (
  <svg
    className="hcl-btn-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M13,14H3V13H13ZM12,8V2H11V8A3,3,0,0,1,5,8V2H4V8a4,4,0,0,0,8,0Z" />
  </svg>
);

export const underlineSelected = (
  <svg
    className="hcl-btn-icon"
    style={{ fill: 'var(--active_icon)' }}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M13,12.5v2H3v-2ZM8,12a4.51,4.51,0,0,0,4.5-4.5v-6h-2v6a2.5,2.5,0,0,1-5,0v-6h-2v6A4.51,4.51,0,0,0,8,12Z" />
  </svg>
);

export const bulletList = (
  <svg
    className="hcl-btn-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <g>
      <path d="M15,4V5H8V4ZM8,12h7V11H8ZM3.5,3A1.5,1.5,0,1,0,5,4.5,1.5,1.5,0,0,0,3.5,3Zm0,7A1.5,1.5,0,1,0,5,11.5,1.5,1.5,0,0,0,3.5,10Z" />
    </g>
  </svg>
);

export const bulletListSelected = (
  <svg
    className="hcl-btn-icon"
    style={{ fill: 'var(--active_icon)' }}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M15,3.5v2H8v-2Zm-7,9h7v-2H8ZM3.5,2.5a2,2,0,1,0,2,2A2,2,0,0,0,3.5,2.5Zm0,7a2,2,0,1,0,2,2A2,2,0,0,0,3.5,9.5Z" />
  </svg>
);

export const numberList = (
  <svg
    className="hcl-btn-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M15,4V5H8V4ZM8,12h7V11H8ZM4,9H2v1H4v1H3a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H5V13H3V12H4a1,1,0,0,0,1-1V10A1,1,0,0,0,4,9ZM4,2H3v.5H2v1H3V6H2V7H5V6H4Z" />
  </svg>
);

export const numberListSelected = (
  <svg
    className="hcl-btn-icon"
    style={{ fill: 'var(--active_icon)' }}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M15,3.5v2H8v-2Zm-7,9h7v-2H8ZM4,9H2v1H4v1H3a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H5V13H3V12H4a1,1,0,0,0,1-1V10A1,1,0,0,0,4,9ZM4,2H3v.5H2v1H3V6H2V7H5V6H4Z" />
  </svg>
);

export const linkIcon = (
  <svg
    className="hcl-btn-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M6.15,11.69l.7.7-.73.73A3,3,0,1,1,1.88,8.88l3-3a3,3,0,1,1,4.24,4.24l-.7-.7A2,2,0,0,0,5.58,6.58l-3,3a2,2,0,0,0,2.84,2.84ZM12,3a3,3,0,0,0-2.12.88l-.73.73.7.7.73-.73a2,2,0,0,1,2.84,2.84l-3,3A2,2,0,0,1,7.58,7.58l-.7-.7a3,3,0,1,0,4.24,4.24l3-3A3,3,0,0,0,12,3Z" />
  </svg>
);

export const linkSelected = (
  <svg
    className="hcl-btn-icon"
    style={{ fill: 'var(--active_icon)' }}
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M12,2.5a3.54,3.54,0,0,0-2.48,1l-.73.73,1.42,1.42.73-.73a1.5,1.5,0,1,1,2.12,2.12l-3,3a1.51,1.51,0,0,1-.52.34,3.5,3.5,0,0,0-5-4.88l-3,3A3.51,3.51,0,0,0,4,14.5a3.54,3.54,0,0,0,2.48-1l.73-.73L5.79,11.33l-.73.73A1.5,1.5,0,1,1,2.94,9.94l3-3a1.51,1.51,0,0,1,.52-.34,3.5,3.5,0,0,0,5,4.88l3-3A3.51,3.51,0,0,0,12,2.5ZM7.5,9a1.5,1.5,0,0,1,.44-1.06L6.57,6.57A1.55,1.55,0,0,1,7,6.5,1.5,1.5,0,0,1,8.06,9.06l1.37,1.37A1.55,1.55,0,0,1,9,10.5,1.5,1.5,0,0,1,7.5,9Z" />
  </svg>
);

export const unlinkIcon = (
  <svg
    id="icon"
    className="hcl-btn-icon"
    xmlns="https://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect
      id="_Transparent_Rectangle_"
      data-name="&lt;Transparent Rectangle&gt;"
      width="16"
      height="16"
      fill="none"
    />
    <path
      id="unlinked"
      d="M3,6.5H1v-1H3Zm1.23-3L2.82,2.11l-.71.71L3.53,4.23ZM6.5,1h-1V3h1ZM13,9.5v1h2v-1Zm-1.23,3,1.41,1.42.71-.71-1.42-1.41ZM9.5,15h1V13h-1ZM6.42,12.42A2,2,0,0,1,3.58,9.58l2-2-.7-.7-2,2A3,3,0,0,0,5,14a3,3,0,0,0,2.12-.88l2-2-.7-.7ZM14,5a3,3,0,0,0-3-3,3,3,0,0,0-2.12.88l-2,2,.7.7,2-2a2,2,0,0,1,2.84,2.84l-2,2,.7.7,2-2A3,3,0,0,0,14,5Z"
    />
  </svg>
);

export const addMoreIcon = (
  <svg viewBox="0 0 32 32">
    <rect
      data-name="&lt;Transparent Rectangle&gt;"
      width="32"
      height="32"
      fill="none"
    />
    <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Zm1-13h7v2H17v7H15V17H8V15h7V8h2Z" />
  </svg>
);

export const chevronIcon = (
  <svg viewBox="0 0 16 16">
    <rect
      data-name="&lt;Transparent Rectangle&gt;"
      width="16"
      height="16"
      fill="none"
    />
    <path d="M12.29,10.71,8,6.41l-4.29,4.3L3,10,8,5l5,5Z" />
  </svg>
);

export const unsortIcon = (
  <svg
    className={`${prefix}-sorting`}
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <title> unsorted - click to sort</title>
    <rect fill="none" />
    <path d="M7.29,4.71,5.5,2.91V9h-1V2.91L2.71,4.71,2,4,5,1,8,4Zm6,6.58-1.79,1.8V7h-1v6.09l-1.79-1.8L8,12l3,3,3-3Z" />
  </svg>
);
