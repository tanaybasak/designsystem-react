import React from 'react';
import { storiesOf } from '@storybook/react';
// import { array } from '@storybook/addon-knobs';
//@update-path-build-start
import Timeline from './Timeline';
//@update-path-build-end

storiesOf('Timeline', module).add(
  'default',
  () => (
    <Timeline listItems={['overview', 'general-guidelines', 'documentation']} />
  ),
  {
    info: {
      text: `Description About Tile Component \n
        import { Timeline } from '@patron/patron-react/timeline';`
    }
  }
);
