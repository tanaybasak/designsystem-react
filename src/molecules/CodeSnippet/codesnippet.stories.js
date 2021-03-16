import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

//@update-path-build-start
import CodeSnippet from './CodeSnippet';
//@update-path-build-end

const code = `
class Rectangle {

    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    // Getter
    get area() {
        return this.calcArea();
    }

    // Method
    calcArea() {
        return this.height * this.width;
    }
}

const square = new Rectangle(10, 10);

`;
storiesOf('Components/CodeSnippet', module).add(
  'default',
  () => (
    <CodeSnippet
      type={select('Type', ['read', 'edit'], 'read')}
      value={code}
      language="javascript"
      width="100%"
      height="100%"
      onCopy={action('onCopy triggered')}
      onEdit={action('onEdit triggered')}
    />
  ),
  {
    info: {
      text: `Description About CodeSnippet Component \n

      import { CodeSnippet} from '@patron/patron-react/codesnippet';
    import 'prismjs/components/prism-javascript';`,

      className: 'hcl-col-12 hcl-col-lg-6'
    }
  }
);
