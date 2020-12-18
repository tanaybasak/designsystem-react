import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
//@update-path-build-start
import InlineEdit from './InlineEdit';
import Button from '../../atoms/Button';
//@update-path-build-end
import icons from '../../../.storybook/iconList';

storiesOf('InlineEdit', module)
  .add(
    'default',
    () => (
      <InlineEdit
        value={text('Value', 'Content')}
        onTextUpdate={action('Inline-TextUpdate')}
        formStatus={boolean('formStatus', false)}
        errorMessage={text('Error message', '')}
        onClose={action('Inline-Close')}
        loader={boolean('Loader', false)}
      />
    ),
    {
      info: {
        text: `Description About InlineEdit Component \n 

      import { InlineEdit } from '@patron/patron-react/inlineEdit';
      import { Button } from '@patron/patron-react/button';
      `
      }
    }
  )
  .add(
    'with custom button',
    () => (
      <InlineEdit
        value={text('Value', 'Content')}
        onTextUpdate={action('Inline-TextUpdate')}
        formStatus={boolean('formStatus', false)}
        customIcon={
          <Button type="neutral">
            <i
              className={`p-hclsw p-hclsw-${select(
                'Icon Class',
                icons,
                'user'
              )}`}
            />
          </Button>
        }
        errorMessage={text('Error message', '')}
        onClose={action('Inline-Close')}
        loader={boolean('Loader', false)}
      />
    ),
    {
      info: {
        text: `Description About InlineEdit Component \n 

      import { InlineEdit } from '@patron/patron-react/inlineEdit';
      import { Button } from '@patron/patron-react/button';
      `
      }
    }
  );
