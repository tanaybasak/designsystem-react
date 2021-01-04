import React from 'react';
import { storiesOf } from '@storybook/react';
// import { array } from '@storybook/addon-knobs';
//@update-path-build-start
import Timeline from './Timeline';
//@update-path-build-end
import { object } from '@storybook/addon-knobs';

const timelineObject = [
  {
    label: 'Overview',
    link: 'Overview'
  },
  {
    label: 'Guidelines',
    link: 'Guidelines'
  },
  {
    label: 'General',
    link: 'General'
  }
];

storiesOf('Timeline', module).add(
  'default',
  () => <Timeline listItems={object('ListItems', timelineObject)} />,
  {
    info: {
      text: `Description About Tile Component \n
        import { Timeline } from '@patron/patron-react/timeline';`
    }
  }
);
