import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text } from '@storybook/addon-knobs';
//@update-path-build-start
import DeterminateProgressBar from './DeterminateProgressBar';
//@update-path-build-end

storiesOf('ProgressBar', module).add(
  'default',
  () => (
    <div className="hcl-form-group">
      <DeterminateProgressBar
        label={text('label', 'Downloading ...')}
        value={number('value', 30)}
        max={number('max', 100)}
        subText={text('subText', 'Subtext Data')}
      />
    </div>
  ),
  {
    info: {
      text: `Description About ProgressBar Component \n
      
      import { DeterminateProgressBar } from '@patron/patron-react/password'`
    }
  }
);
