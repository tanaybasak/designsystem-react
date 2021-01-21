import React, { useState, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/themes/prism.css';

import { Copy } from '../../util/icons';

import './CodeSnippet.scss';

export default function CodeSnippet({
  type,
  width,
  height,
  onEdit,
  onCopy,
  value,
  lanaguage,
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
    onCopy();
  };

  return (
    <div
      className={`${prefix}-codesnippet-wrapper`}
      style={{
        height: height,
        width: width
      }}
    >
      <div
        className={`${prefix}-codesnippet`}
        style={{
          height: height,
          width: width
        }}
        {...restProps}
      >
        <Editor
          value={code}
          onValueChange={type === 'edit' ? code => {setCode(code)
            onEdit()} : null}
          highlight={code =>
            highlight(code, languages[lanaguage])
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
          className={`${prefix}-codesnippet-copy hcl-btn hcl-ghost`}
          title="Copy to clipboard"
          onClick={() => {
            _copyToClipboard(code);
          }}
        >
          {Copy}
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
  value: PropTypes.string,
  /** To pass the programming language */
  language: PropTypes.string
};

CodeSnippet.defaultProps = {
  type: 'read',
  width: '30rem',
  height: '30rem',
  onEdit: () => {},
  onCopy: () => {},
  value: '',
  language: ''
};
