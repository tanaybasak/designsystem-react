import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Paragraph from './Paragraph';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Paragraph', module).add(
  'basic',
  () => <Paragraph>{text('Label', 'Hello Storybook')}</Paragraph>,
  {
    info: {
      text: 'Description About Paragraph Component'
    }
  }
);
