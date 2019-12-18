import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import Label from './Label';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Label', module).add('basic', () => <Label>This is label</Label>, {
  info: {
    text: `Description About Label Component\n
      import { Label } from 'patron-react/label'`
  }
});
