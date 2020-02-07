import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Select from './Select';
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
  }
];
storiesOf('Select', module).add(
  'default',
  () => (
    <Select
      items={object('Items', items)}
      label={text('Label', 'Select Option')}
      onChange={action('onChange')}
    />
  ),
  {
    info: {
      text: `Description About Select Component\n
      import { Select } from '@patron/patron-react/select'`
    }
  }
);
