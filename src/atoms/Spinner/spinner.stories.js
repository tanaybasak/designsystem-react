import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
/*
 *@ModuleStart
 */
import Spinner from './Spinner';
/*
 *@ModuleEnd
 */
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Spinner', module)
  .add('basic', () => <Spinner title={text('Label', 'Loading')} />, {
    info: {
      text: 'Description About Spinner Component'
    }
  })
  .add('small', () => <Spinner small title={text('Label', 'Loading')} />, {
    info: {
      text: 'Description About Spinner Component'
    }
  });
