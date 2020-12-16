import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import Button from './Button';
//@update-path-build-end
import icons from '../../../.storybook/iconList';

const classOptions = [
  'primary',
  'primary-danger',
  'secondary',
  'secondary-danger',
  'ghost',
  'warning',
  'neutral'
];

const typeOptions = ['button', 'reset', 'submit'];

storiesOf('Button', module)
  .add(
    'default',
    () => (
      <Button
        type={select('Type', classOptions, 'primary')}
        kind={select('Kind', typeOptions, 'button')}
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
  )
  .add(
    'with icon',
    () => (
      <Button
        type={select('Type', classOptions, 'primary')}
        kind={select('Kind', typeOptions, 'button')}
        title="Default"
        disabled={boolean('Disabled', false)}
        small={boolean('Small', false)}
        onClick={action('button-click')}
      >
        <i
          className={`p-hclsw p-hclsw-${select('Icon Class', icons, 'user')}`}
        />
      </Button>
    ),
    {
      info: {
        text: `Description About Button Component \n

    import { Button } from '@patron/patron-react/button';
      
      `
      }
    }
  )
  .add(
    'with text and icon',
    () => (
      <Button
        type={select('Type', classOptions, 'primary')}
        kind={select('Kind', typeOptions, 'button')}
        title="Default"
        disabled={boolean('Disabled', false)}
        small={boolean('Small', false)}
        onClick={action('button-click')}
      >
        {text('Label', 'Click Me')}
        <i
          className={`hcl-btn-icon p-hclsw p-hclsw-${select(
            'Icon Class',
            icons,
            'user'
          )}`}
        />
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
