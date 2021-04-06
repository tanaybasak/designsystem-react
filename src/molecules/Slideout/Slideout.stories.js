import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select, boolean, object } from '@storybook/addon-knobs';
import icons from '../../../.storybook/iconList';
//@update-path-build-start
import Slideout from './Slideout';
//@update-path-build-end

const typeOptions = {
  default: 'default',
  danger: 'danger',
  warning: 'warning',
  ghost: 'ghost'
};

const varientOptions = {
  default: 'default',
  large: 'large'
};

const directionOptions = {
  right: 'right',
  left: 'left'
};

const actions = [
  { label: 'Save', disabled: true, type: 'primary' },
  {
    label: 'Close',
    type: 'secondary'
  }
];

storiesOf('Components/Slideout', module)
  .add(
    'default',
    () => (
      <Slideout
        isOpen={boolean('isopen', true)}
        header={text('Title', 'Default')}
        type={select('type', typeOptions, 'default')}
        varient={select('varient', varientOptions, 'default')}
        direction={select('direction', directionOptions, 'right')}
        onClose={action('close button clicked')}
        onOutsideClick={action('clicked outside')}
        actions={object('Actions', actions)}
        onEscClose={boolean('isopen', true)}
      >
        hello
      </Slideout>
    ),
    {
      info: {
        text: `Description About Slideout Component`,
        document: ['Slideout']
      }
    }
  )
  .add(
    'large',
    () => (
      <Slideout
        isOpen={boolean('isopen', true)}
        header={text('Title', 'Default')}
        type={select('type', typeOptions, 'default')}
        varient={select('varient', varientOptions, 'large')}
        direction={select('direction', directionOptions, 'right')}
        onClose={action('close button clicked')}
        onOutsideClick={action('clicked outside')}
        actions={object('Actions', actions)}
        onEscClose={boolean('isopen', true)}
      >
        hello
      </Slideout>
    ),
    {
      info: {
        text: `Description About Slideout Component`,
        document: ['Slideout']
      }
    }
  );
