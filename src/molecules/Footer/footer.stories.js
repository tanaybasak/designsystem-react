import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, text, boolean } from '@storybook/addon-knobs';
import Footer from './Footer';
import '../../story.css';
import 'patron-css/dist/patron-style.css';
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
  ]
storiesOf('UI Shell Footer', module).add(
  'basic',
  () => (
    <Footer
      caption={text('Caption', 'Copyright © HCL Software. All rights reserved')}
      links={object('Links' , links)}
      onClick={action('Footer OnClick')}
    />
  ),
  {
    info: {
      text: 'Description About Footer Component'
    }
  }
);
