import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Button from './Button';
//@update-path-build-end

const classOptions = [
  'primary',
  'primary-danger',
  'secondary',
  'secondary-danger',
  'ghost',
  'warning',
  'neutral'
];

storiesOf('Button', module).add(
  'default',
  () => (
    <Button
      type={select('Type', classOptions, 'primary')}
      title="Default"
      disabled={boolean('Disabled', false)}
      small={boolean('Small', false)}
      onClick={action('button-click')}
    >
      {text('Label', 'Click Me')}
    </Button>
  ),
  {
    info: {
      text: `Description About Button Component \n

    import { Button } from '@patron/patron-react/button';
      
      `
    }
  }
);
