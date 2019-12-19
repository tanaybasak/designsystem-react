import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
//@update-path-build-start
import Link from './Link';
//@update-path-build-end
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
      text: `Description About Link Component \n
      
      import { Link } from 'patron-react/link'`
    }
  }
);
