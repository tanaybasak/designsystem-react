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

storiesOf('Components/Dropdown', module)
  .add(
    'default',
    () => (
      <Dropdown
        items={object('Items', items)}
        label={text('Label', 'Dropdown Label')}
        onChange={action('Dropdown-Onchange')}
        disabled={boolean('disabled', false)}
        isGhostMode={boolean('Ghost Mode', false)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component`,
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        document: ['Dropdown']
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
        isGhostMode={boolean('Ghost Mode', false)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component`,
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        document: ['Dropdown']
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
        isGhostMode={boolean('Ghost Mode', false)}
        disabled={boolean('disabled', false)}
      />
    ),
    {
      info: {
        text: `Description About Dropdown Component`,
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        document: ['Dropdown']
      }
    }
  );
