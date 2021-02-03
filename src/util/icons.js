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
    className="hcl-default-icon"
  >
    <rect
      data-name="&lt;Transparent Rectangleh&gt;"
      width="16"
      height="16"
      fill="none"
    />
    <path d="M8.71,8,13,12.29l-.71.71L8,8.71,3.71,13,3,12.29,7.29,8,3,3.71,3.71,3,8,7.29,12.29,3l.71.71Z" />
  </svg>
);

export const edit = (
  <svg
    className="hcl-default-icon"
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
    preserveAspectRatio="xMidYMid meet"
    className="hcl-user-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 8C9.933 8 11.5 6.433 11.5 4.5C11.5 2.567 9.933 1 8 1C6.067 1 4.5 2.567 4.5 4.5C4.5 6.433 6.067 8 8 8ZM8 2C9.38071 2 10.5 3.11929 10.5 4.5C10.5 5.88071 9.38071 7 8 7C6.61929 7 5.5 5.88071 5.5 4.5C5.5 3.11929 6.61929 2 8 2ZM13 12.5V15H12V12.5C12 11.837 11.7366 11.2011 11.2678 10.7322C10.7989 10.2634 10.163 10 9.5 10H6.5C5.11929 10 4 11.1193 4 12.5V15H3V12.5C3 10.567 4.567 9 6.5 9H9.5C11.433 9 13 10.567 13 12.5Z"
      fill="#262626"
    />
  </svg>
);

/** Only for testing */
export const User2 = (
  <svg
    preserveAspectRatio="xMidYMid meet"
    className="hcl-user-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <rect width="48" height="48" fill="none" />
    <path d="M24,24A10.5,10.5,0,1,0,13.5,13.5,10.51,10.51,0,0,0,24,24ZM24,6a7.5,7.5,0,1,1-7.5,7.5A7.5,7.5,0,0,1,24,6ZM39,37.5V45H36V37.5A7.5,7.5,0,0,0,28.5,30h-9A7.5,7.5,0,0,0,12,37.5V45H9V37.5A10.51,10.51,0,0,1,19.5,27h9A10.51,10.51,0,0,1,39,37.5Z" />
  </svg>
);
