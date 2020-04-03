import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, text } from '@storybook/addon-knobs';
//@update-path-build-start
import Dropdown from './Dropdown';
//@update-path-build-end

const items = [
  {
    id: 'option-1',
    text: 'Option 1'
  }
];

storiesOf('Dropdown', module)
  .add(
    'default',
    () => (
      <Dropdown
        items={object('Items', items)}
        label={text('Label', 'Dropdown Label')}
        selectedItem={text('Selected Index')}
        onChange={action(event)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component \n
        import { Dropdown } from '@patron/patron-react/dropdown'`
      }
    }
  )
  .add(
    'top',
    () => (
      <Dropdown
        type={'top'}
        items={object('Items', items)}
        label={text('Label', 'Dropdown Label')}
        selectedIndex={text('Selected Index')}
        onChange={action(event)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component \n
        import { Dropdown } from '@patron/patron-react/dropdown'`
      }
    }
  );
