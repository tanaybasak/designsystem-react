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
    id="icon"
    style={{ fill: '#fff' }}
    xmlns="http://www.w3.org/2000/svg"
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
      id="checkmark"
      d="M5.89,12.91,1,8l.71-.71L5.89,11.5l8.4-8.41L15,3.8Z"
    />
  </svg>
);

export const edit = (
  <svg
    id="icon"
    style={{ fill: '#474747' }}
    xmlns="http://www.w3.org/2000/svg"
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
      id="edit-alt"
      d="M13.56,3.52,12.48,2.44a1.5,1.5,0,0,0-2.13,0l-8.2,8.21A.47.47,0,0,0,2,11v2.5a.5.5,0,0,0,.5.5H5a.47.47,0,0,0,.35-.15l8.21-8.2a1.51,1.51,0,0,0,0-2.13Zm-9.85,7,6-6,1.79,1.79-6,6ZM3,11.21,4.79,13H3Zm9.85-6.27h0l-.6.61-1.8-1.8.61-.6a.5.5,0,0,1,.71,0l1.08,1.08a.49.49,0,0,1,.15.35A.49.49,0,0,1,12.85,4.94Z"
    />
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
