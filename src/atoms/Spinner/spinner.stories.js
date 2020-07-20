import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
//@update-path-build-start
import Spinner from './Spinner';
//@update-path-build-end

storiesOf('Spinner', module)
  .add('default', () => <Spinner title={text('Title', 'Loading')} />, {
    info: {
      text: `Description About Spinner Component \n
      import { Spinner } from '@patron/patron-react/spinner';`
    }
  })
  .add('small', () => <Spinner small title={text('Title', 'Loading')} />, {
    info: {
      text: `Description About Spinner Component \n
      import { Spinner } from '@patron/patron-react/spinner';`
    }
  });
