import React from 'react';
import { storiesOf } from '@storybook/react';
// import { array } from '@storybook/addon-knobs';
//@update-path-build-start
import InPageNavigation from './InPageNavigation';
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

storiesOf('InPageNavigation', module).add(
  'default',
  () => <InPageNavigation listItems={object('ListItems', timelineObject)} />,
  {
    info: {
      text: `Description About Tile Component \n
        import { InPageNavigation } from '@patron/patron-react/InPageNavigation';`
    }
  }
);
