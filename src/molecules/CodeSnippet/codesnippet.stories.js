import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

//@update-path-build-start
import CodeSnippet from './CodeSnippet';
//@update-path-build-end

const code = `
class Accordion {
  constructor(element, options) {
    this.element = element;

    this.state = {
      uncontrolled: options.uncontrolled || false,
      ...options
    };

    const childs = ele => Array.from(ele.children);
    this.elements = childs(this.element).flatMap(el =>
      childs(el).filter(el => (el))
    );
  }

  toggleHeight = (item, status, isChanged) => {
    const collapseElement = item.children[1];
    if (!status) {
      if (isChanged) {
        const content = item.children[1].children[0];
        collapseElement.style.height = content.offsetHeight + 'px';
        setTimeout(() => {
          collapseElement.style.height = 0;
          collapseElement.style.overflow = 'hidden';
        });
      }
    } else {
      const content = item.children[1].children[0];
      collapseElement.style.height = content.offsetHeight + 'px';
      setTimeout(() => {
        collapseElement.style.height = 'auto';
        collapseElement.style.overflow = 'visible';
      }, 300);
    }
  };

  toggleContent = event => {
    const comp = event.currentTarget;
    const item = comp.parentNode;
    const expanded = item.classList.contains('expanded');
    if (this.state.uncontrolled) {
      if (expanded) {
        item.classList.remove('expanded');
        this.toggleHeight(item, false, expanded);
      }
    } else {
      this.elements.forEach(element => {
        const itm = element.parentNode;
        const isChanged = itm.classList.contains('expanded');
        itm.classList.remove('expanded');
        this.toggleHeight(itm, false, isChanged);
      });
    }
    if (!expanded) {
      item.classList.add('expanded');
      this.toggleHeight(item, true, false);
    }
  };

  attachEvents = () => {
    this.elements.forEach(item => {
      item.addEventListener('click', this.toggleContent);
      item.addEventListener('keypress', event => {
        event.preventDefault();
        if (event.keyCode === 13) {
          this.toggleContent(event);
        }
      });
    });
  };
}

export default Accordion;

`;
storiesOf('CodeSnippet', module).add(
  'default',
  () => (
    <CodeSnippet
      type={select('Type', ['read', 'edit'], 'read')}
      value={code}
      language="javascript"
      width="40rem"
      height="25rem"
      onCopy={action('onCopy triggered')}
      onEdit={action('onEdit triggered')}
    />
  ),
  {
    info: {
      text: `Description About CodeSnippet Component \n

      import { CodeSnippet} from '@patron/patron-react/codesnippet';
    import 'prismjs/components/prism-javascript';`
    }
  }
);
