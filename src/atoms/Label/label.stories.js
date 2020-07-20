import React from 'react';
import { storiesOf } from '@storybook/react';
//@update-path-build-start
import Label from './Label';
//@update-path-build-end

storiesOf('Label', module).add('default', () => <Label>This is label</Label>, {
  info: {
    text: `Description About Label Component\n
      import { Label } from '@patron/patron-react/label';`
  }
});
