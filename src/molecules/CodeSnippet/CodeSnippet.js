import React, { useState, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

import '../CodeSnippet/CodeSnippet.scss'

export default function CodeSnippet({ ...restProps }) {
  // const code = `function add(a, b) {
  //   return a + b;
  // }
  // `;

  const [code, setCode] = useState(
    `function add(a, b) {
      return a + b;
}
    `
  );

  return (
    <Editor
      value={code}
      onValueChange={code => setCode(code)}
      // highlight={code => highlight(code, languages.js)}
      highlight={code =>
        highlight(code, languages.js)
          .split('\n')
          .map(
            line => `<span class="container_editor_line_number">${line}</span>`
          )
          .join('\n')
      }
      padding={10}
      // style={{
      //   fontFamily: '"Fira code", "Fira Mono", monospace',
      //   fontSize: 12
      // }}
    />
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
