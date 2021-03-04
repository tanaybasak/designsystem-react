import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
//@update-path-build-start
import Link from './Link';
//@update-path-build-end

storiesOf('Components/Link', module).add(
  'default',
  () => <Link href={text('URL', '#')}>{text('Label', 'Link')}</Link>,
  {
    info: {
      text: `Description About Link Component \n
      
      import { Link } from '@patron/patron-react/link';`
    }
  }
);
