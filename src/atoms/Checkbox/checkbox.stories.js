import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import Checkbox from './Checkbox';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Checkbox', module).add(
  'basic',
  () => (
    <Checkbox
      id="checkbox1"
      value={text('Value', 'standard')}
      label={text('Label', 'Checkbox Label')}
      disabled={boolean('Disabled', false)}
      onChange={action(event)}
    />
  ),
  {
    info: {
      text: 'Description About Checkbox Component'
    }
  }
);
