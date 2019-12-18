import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, object, text, boolean, number } from '@storybook/addon-knobs';
//@update-path-build-start
import Dropdown from './Dropdown';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const items = [
  {
    id: 'option-1',
    text: 'Option 1'
  }
];

storiesOf('Dropdown', module)
  .add(
    'bottom',
    () => (
      <Dropdown
        type={'bottom'}
        items={object('Item', items)}
        label={text('Label', 'Dropdown Label')}
        onChange={action(event)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component \n
        import { Dropdown } from 'patron-react/dropdown'`
      }
    }
  )
  .add(
    'top',
    () => (
      <Dropdown
        type={'top'}
        items={object('Item', items)}
        label={text('Label', 'Dropdown Label')}
        selectedIndex={number('Selected Index', 0)}
        onChange={action(event)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component \n
        import { Dropdown } from 'patron-react/dropdown'`
      }
    }
  );
