import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
//@update-path-build-start
import Spinner from './Spinner';
//@update-path-build-end

storiesOf('Components/Spinner', module)
  .add('default', () => <Spinner title={text('Title', 'Loading')} />, {
    info: {
      text: `Description About Spinner Component`,
      document: ['Spinner']
    }
  })
  .add('small', () => <Spinner small label={text('Label', 'Loading..')} />, {
    info: {
      text: `Description About Spinner Component`,
      document: ['Spinner']
    }
  });
