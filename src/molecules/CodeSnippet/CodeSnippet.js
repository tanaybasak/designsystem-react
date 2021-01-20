import React, { useState, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

import './CodeSnippet.scss';

export default function CodeSnippet({
  type,
  width,
  height,
  onEdit,
  onCopy,
  value,
  ...restProps
}) {
  const [code, setCode] = useState(value);

  const _copyToClipboard = data => {
    const el = document.createElement('textarea');
    el.value = data;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div className={`${prefix}-codesnippet-wrapper`}>
      <div
        className={`${prefix}-codesnippet`}
        style={{
          height: height,
          width: width
        }}
      >
        <Editor
          value={code}
          onValueChange={type === 'edit' ? code => setCode(code) : null}
          highlight={code =>
            highlight(code, languages.js)
              .split('\n')
              .map(
                line =>
                  `<span class="container_editor_line_number">${line}</span>`
              )
              .join('\n')
          }
          padding={10}
          textareaClassName={`textarea ${type === 'read' ? 'no-cursor' : null}`}
          preClassName="preClassName"
        />
        <button
          className={`${prefix}-codesnippet-copy`}
          title="Copy to clipboard"
          onClick={() => {
            _copyToClipboard(code);
          }}
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 32 32"
            aria-hidden="true"
            style={{ willChange: 'transform' }}
          >
            <path d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z" />
            <path d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

CodeSnippet.propTypes = {
  /** There are two variants of CodeSnippet: 1) Read  2) Edit. By default read only CodeSnippet will be created.  */
  type: PropTypes.string,
  /** To set width of CodeSnippet */
  width: PropTypes.string,
  /** To set height of CodeSnippet */
  height: PropTypes.string,
  /** Callback funnction which will be triggered on editing CodeSnippet */
  onEdit: PropTypes.func,
  /** Callback funnction which will be triggered on copying CodeSnippet */
  onCopy: PropTypes.func,
  /** Code in CodeSnippet */
  value: PropTypes.string
};

CodeSnippet.defaultProps = {
  type: 'read',
  width: '30rem',
  height: '30rem',
  onEdit: () => {},
  onCopy: () => {},
  value: ''
};
