import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, object, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Modal from './Modal';
//@update-path-build-end

const typeOptions = {
  Danger: 'danger',
  Default: 'default',
  Warning: 'warning',
  Ghost: 'ghost'
};

const actions = [
  { label: 'Save', disabled: true, type: 'primary' },
  {
    label: 'Close',
    type: 'secondary'
  }
];

storiesOf('Components/Modal', module).add(
  'default',
  () => (
    <Modal
      actions={object('Actions', actions)}
      heading={text('Heading', 'Heading')}
      label={text('Label', 'label')}
      showClose={boolean('showClose', true)}
      onClose={action('Modal on Close')}
      type={select('Type', typeOptions, 'danger')}
    >
      <p>This is a new modal</p>
    </Modal>
  ),
  {
    info: {
      text: `Description About Modal Component`,
      document: ['Modal']
    }
  }
);
