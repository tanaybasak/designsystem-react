import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';

//@update-path-build-start
import CodeSnippet from './CodeSnippet';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
//@update-path-build-end

const code =    `function add(a, b) {
  return a + b;
}
function add(a, b) {
return a + b;
}
function add(a, b) {
return a + b;
}
function add(a, b) {
return a + b;
}
}
function add(a, b) {
return a + b;
}
function add(a, b) {
return a + b;
}
function add(a, b) {
return a + b;
}
}
function add(a, b) {
return a + b;
}
function add(a, b) {  
return a + b;
}
function add(a, b) {
return a + b;
}
`
storiesOf('CodeSnippet', module).add(
  'default',
  () => (
    <CodeSnippet type="edit" value={code}/>
  ),
  {
    info: {
      text: `Description About CodeSnippet Component
      
      import { CodeSnippet} from '@patron/patron-react/codesnippet';
      
      `
    }
  }
);
