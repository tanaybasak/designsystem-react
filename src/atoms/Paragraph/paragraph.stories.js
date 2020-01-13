import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
//@update-path-build-start
import Paragraph from './Paragraph';
//@update-path-build-end

storiesOf('Paragraph', module).add(
  'default',
  () => <Paragraph>{text('Label', 'Hello Storybook')}</Paragraph>,
  {
    info: {
      text: `Description About Paragraph Component \n
      
      import { Paragraph } from 'patron-react/paragraph'
      
      `
    }
  }
);
