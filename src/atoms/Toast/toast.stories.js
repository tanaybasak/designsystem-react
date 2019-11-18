import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import Toast from './Toast';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const typeOptions = {
  Info: 'info',
  Error: 'error',
  Success: 'success',
  Warning: 'warning'
};

storiesOf('Toast', module).add(
  'basic',
  () => (
    <Toast
      caption={text('Caption', 'Time stamp [00:00:00]')}
      closable={boolean('Closable', false)}
      icon={null}
      iconDescription={text('Icon Description', 'close')}
      onClose={action('notification-onclose')}
      subtitle={text('Notification Subtitle', 'Subtitle text goes here.')}
      title={text('Notification Title', 'Notification title')}
      type={select('Type', typeOptions, 'info')}
      visible={boolean('Visible', true)}
    />
  ),
  {
    info: {
      text: 'Description About Toast Component'
    }
  }
);
