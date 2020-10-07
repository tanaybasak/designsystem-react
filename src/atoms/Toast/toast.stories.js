import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Toast from './Toast';
//@update-path-build-end

const typeOptions = {
  Info: 'info',
  Danger: 'danger',
  Success: 'success',
  Warning: 'warning'
};

storiesOf('Toast', module).add(
  'default',
  () => (
    <Toast
      caption={text('Caption', 'Time stamp [00:00:00]')}
      closable={boolean('Closable', false)}
      icon={null}
      iconDescription={text('Icon Description', 'close')}
      onClose={action('notification-onclose')}
      subtitle={text('Subtitle', 'Subtitle text goes here.')}
      title={text('Title', 'Notification title')}
      type={select('Type', typeOptions, 'info')}
      visible={boolean('Visible', true)}
    />
  ),
  {
    info: {
      text: `Description About Toast Component
      
      import { Toast } from '@patron/patron-react/toast';

      `
    }
  }
);
