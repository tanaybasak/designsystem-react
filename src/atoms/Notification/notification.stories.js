import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import Notification from './Notification';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const notificationType = {
  Info: 'hcl-info',
  Success: 'hcl-success',
  Warning: 'hcl-warning',
  Danger: 'hcl-danger'
};

storiesOf('Notification', module).add(
  'basic',
  () => (
    <Notification
      className={select('Type', notificationType, 'hcl-info')}
      closable={boolean('Closable', false)}
      onClose={action(event)}
      subtitle={text('Subtitle', 'Notification Sub Title')}
      title={text('Title', 'Notification Title')}
      visible={boolean('Visible', true)}
    />
  ),
  {
    info: {
      text: 'Description About Notification Component'
    }
  }
);
