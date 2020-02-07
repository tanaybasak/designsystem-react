import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Notification from './Notification';
//@update-path-build-end

const notificationType = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger'
};

storiesOf('Notification', module).add(
  'default',
  () => (
    <Notification
      title={text('Title', 'Notification Title')}
      subtitle={text('Subtitle', 'Notification Sub Title')}
      type={select('Type', notificationType, 'info')}
      closable={boolean('Closable', true)}
      visible={boolean('Visible', true)}
      onClose={action(event)}
    />
  ),
  {
    info: {
      text: `Description About Notification Component\n
      
      import { Notification } from '@patron/patron-react/notification'
      
      `
    }
  }
);
