import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, text } from '@storybook/addon-knobs';
//@update-path-build-start
import Footer from './Footer';
//@update-path-build-end
const links = [
  {
    label: 'Legal'
  },
  {
    label: 'Disclaimer'
  },
  {
    label: 'Privacy'
  },
  {
    label: 'Terms of use'
  },
  {
    label: 'Contact Us'
  }
];
storiesOf('Components/Footer', module).add(
  'default',
  () => (
    <Footer
      caption={text('Caption', 'Copyright © HCL Software. All rights reserved')}
      links={object('Links', links)}
      onClick={action('Footer OnClick')}
    />
  ),
  {
    info: {
      text: `Description About Footer Component`,
      document: ['Footer']
    }
  }
);
