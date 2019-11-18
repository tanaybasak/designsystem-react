import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
import Select from './Select';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

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
  'basic',
  () => (
    <Select
      items={object('Items', items)}
      label={text('Label', 'Select Option')}
      onChange={action('onChange')}
    />
  ),
  {
    info: {
      text: 'Description About Select Component'
    }
  }
);
