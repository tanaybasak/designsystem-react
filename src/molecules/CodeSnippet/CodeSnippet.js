import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import { Copy } from '../../util/icons';

export default function CodeSnippet({
  type,
  width,
  height,
  onEdit,
  onCopy,
  value,
  language,
  ...restProps
}) {
  const [code, setCode] = useState(value);

  useEffect(() => {
    setCode(value);
  }, [value]);
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
    onCopy(code);
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
          onValueChange={
            type === 'edit'
              ? code => {
                  setCode(code);
                  onEdit(code);
                }
              : null
          }
          style={{
            fontFamily: '"Roboto Mono", "Fira Mono", monospace',
            fontSize: 14
          }}
          highlight={code =>
            highlight(code, languages[language] ? languages[language] : null)
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
  type: PropTypes.oneOf(['read', 'edit']),
  /** To set width of CodeSnippet */
  width: PropTypes.string,
  /** To set height of CodeSnippet */
  height: PropTypes.string,
  /** Callback funnction which will be triggered on editing CodeSnippet
   *
   * @signature
   * ```code``` : snippet code
   */
  onEdit: PropTypes.func,
  /** Callback funnction which will be triggered on copying CodeSnippet
   *
   * @signature
   * ```code``` : snippet code
   */
  onCopy: PropTypes.func,
  /**
   * Code in CodeSnippet. Wrap the code in *backticks(``)*
   * */
  value: PropTypes.string.isRequired,
  /**
   * To pass the programming language
   * Supported languages are mentioned below
   * */
  language: PropTypes.string
};

CodeSnippet.defaultProps = {
  type: 'read',
  width: '30rem',
  height: '30rem',
  onEdit: () => {},
  onCopy: () => {},
  value: '',
  language: 'javascript'
};
