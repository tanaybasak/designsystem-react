import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Link from './Link';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Link', module).add(
  'basic',
  () => (
    <Link
      className=""
      href={text('Link', '#')}
      onClick={function noRefCheck() {}}
    >
      {text('Label', 'Link')}
    </Link>
  ),
  {
    info: {
      text: 'Description About Link Component'
    }
  }
);
