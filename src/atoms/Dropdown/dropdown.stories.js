import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, object, text } from '@storybook/addon-knobs';
//@update-path-build-start
import Dropdown from './Dropdown';
//@update-path-build-end

const items = [
  {
    id: 'option-1',
    text: 'Option 1'
  },
  {
    id: 'option-2',
    text: 'Option 2'
  },
  {
    id: 'option-3',
    text: 'Option 3'
  },
  {
    id: 'option-4',
    text: 'Option 4'
  }
];

storiesOf('Dropdown', module)
  .add(
    'default',
    () => (
      <Dropdown
        items={object('Items', items)}
        label={text('Label', 'Dropdown Label')}
        onChange={action('Dropdown-Onchange')}
        disabled={boolean('disabled', false)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component \n
        import { Dropdown } from '@patron/patron-react/dropdown';`
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
        selectedItem={text('Item', 'option-2')}
        onChange={action('Dropdown-Onchange')}
        disabled={boolean('disabled', false)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component \n
        import { Dropdown } from '@patron/patron-react/dropdown';`
      }
    }
  )
  .add(
    'multselect',
    () => (
      <Dropdown
        dropdownType="multi"
        items={object('Items', items)}
        label={text('Label', 'MultiSelect Label')}
        onChange={action('Dropdown-Onchange')}
        disabled={boolean('disabled', false)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component \n
        import { Dropdown } from '@patron/patron-react/dropdown';`
      }
    }
  );
