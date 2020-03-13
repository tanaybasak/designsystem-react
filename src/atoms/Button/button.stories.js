import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Button from './Button';
//@update-path-build-end

const classOptions = {
  Primary: 'hcl-primary',
  'Primary Danger': 'hcl-primary hcl-danger',
  'Primary Danger Small': 'hcl-primary hcl-danger hcl-sm',
  'Primary Small': 'hcl-primary hcl-sm',
  Secondary: 'hcl-secondary',
  'Secondary Danger': 'hcl-secondary hcl-danger',
  'Secondary Danger Small': 'hcl-secondary hcl-danger hcl-sm',
  Ghost: 'hcl-ghost'
};

storiesOf('Button', module).add(
  'default',
  () => (
    <Button
      title="Default"
      className={select('Type', classOptions, 'hcl-primary')}
      disabled={boolean('Disabled', false)}
      onClick={action('button-click')}
    >
      {text('Label', 'Click Me')}
    </Button>
  ),
  {
    info: {
      text: `Description About Button Component \n

    import { Button } from '@patron/patron-react/button'
      
      `
    }
  }
);
