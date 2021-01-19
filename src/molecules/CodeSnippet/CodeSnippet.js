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

  return (
    <div
      className="hcl-codesnippet"

      style={{
        height: '30rem',
        width: '30rem',
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
        textareaClassName={`textarea ${type === 'read' ? 'no-cursor' : null}` }
        preClassName="preClassName"
      />
    </div>
  );
}

CodeSnippet.propTypes = {
  /** Boolean value to set if CodeSnippet is controlled or uncontrolled */
  uncontrolled: PropTypes.bool,
  /** Name of the custom class to apply to the accordion */
  className: PropTypes.string,
  /** CodeSnippet Items to be added in CodeSnippet */
  children: PropTypes.any
};

CodeSnippet.defaultProps = {
  uncontrolled: false,
  className: '',
  children: ''
};
