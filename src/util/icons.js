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
    style={{ fill: 'var(--default_icon_high)' }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M5.63,9h-2a1.5,1.5,0,0,0-1.5,1.5v2A1.5,1.5,0,0,0,3.63,14h2a1.5,1.5,0,0,0,1.5-1.5v-2A1.5,1.5,0,0,0,5.63,9Zm.5,3.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5v-2a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5ZM11.5,7A2.5,2.5,0,1,0,9,4.5,2.5,2.5,0,0,0,11.5,7Zm0-4A1.5,1.5,0,1,1,10,4.5,1.5,1.5,0,0,1,11.5,3ZM5.37,2.25a.51.51,0,0,0-.86,0l-2.6,4.5a.5.5,0,0,0,0,.5.5.5,0,0,0,.43.25h5.2A.5.5,0,0,0,8,7.25a.5.5,0,0,0,0-.5ZM3.21,6.5l1.73-3,1.73,3Zm11,3.66-2.5-1.81a.49.49,0,0,0-.59,0L8.58,10.16a.49.49,0,0,0-.18.56l.95,2.93a.5.5,0,0,0,.48.35h3.08a.5.5,0,0,0,.48-.35l.95-2.93A.5.5,0,0,0,14.16,10.16ZM12.55,13H10.19l-.73-2.24,1.91-1.39,1.91,1.39Z" />
  </svg>
);

export const activeUser = (
  <svg
    style={{ fill: 'var(--primary_icon)' }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M7.13,10.5v2A1.5,1.5,0,0,1,5.63,14h-2a1.5,1.5,0,0,1-1.5-1.5v-2A1.5,1.5,0,0,1,3.63,9h2A1.5,1.5,0,0,1,7.13,10.5ZM11.5,7A2.5,2.5,0,1,0,9,4.5,2.5,2.5,0,0,0,11.5,7ZM5.37,2.25a.51.51,0,0,0-.86,0l-2.6,4.5a.5.5,0,0,0,0,.5.5.5,0,0,0,.43.25h5.2A.5.5,0,0,0,8,7.25a.5.5,0,0,0,0-.5Zm8.79,7.91-2.5-1.81a.49.49,0,0,0-.59,0L8.58,10.16a.49.49,0,0,0-.18.56l.95,2.93a.5.5,0,0,0,.48.35h3.08a.5.5,0,0,0,.48-.35l.95-2.93A.5.5,0,0,0,14.16,10.16Z" />
  </svg>
);

export const CheckMark = (
  <svg
    style={{ fill: 'var(--secondary_icon)' }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M5.89,12.91,1,8l.71-.71L5.89,11.5l8.4-8.41L15,3.8Z" />
  </svg>
);

/** Only for testing */
export const Error = (
  <svg
    style={{ fill: 'var(--danger_icon)' }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <rect width="16" height="16" fill="none" />
    <path d="M8.5,9.5h-1V4.25h1Zm-.5,1a.75.75,0,1,0,.75.75A.76.76,0,0,0,8,10.5ZM15,8A7,7,0,1,1,8,1,7,7,0,0,1,15,8ZM14,8a6,6,0,1,0-6,6A6,6,0,0,0,14,8Z" />
  </svg>
);
