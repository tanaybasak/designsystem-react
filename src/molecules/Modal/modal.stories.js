import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Modal from './Modal';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const typeOptions = {
  Danger: 'danger',
  Default: 'default'
};

const actions = [
  { label: 'Save', primary: true },
  { label: 'Close', primary: false }
];

storiesOf('Modal', module).add(
  'basic',
  () => (
    <Modal
      actions={object('Actions', actions)}
      heading={text('Heading', 'Heading')}
      label={text('Label', 'label')}
      onClose={action('Modal on Close')}
      type={select('Type', typeOptions, 'danger')}
    >
      <p>This is test Content</p>
    </Modal>
  ),
  {
    info: {
      text: `Description About Modal Component \n
      import { Modal } from 'patron-react/modal'`
    }
  }
);
