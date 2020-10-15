import { configure, addParameters, addDecorator } from '@storybook/react';
import customTheme from './sample-theme';
import cssVars from 'css-vars-ponyfill';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import '../src/story.css';
import './config.css';
import '@patron/patron-css/patron/index.css';
import '@patron/patron-icon/dist/patron-font.css';
cssVars({
  rootElement: document // default
});
addParameters({
  options: {
    theme: customTheme,
    panelPosition: 'bottom',
    storySort: (a, b) => a[1].id.localeCompare(b[1].id)
  }
});

addDecorator(withKnobs);

addDecorator(
  withInfo({
    inline: true,
    source: true,
    header: false,
    maxPropArrayLength: 10,
    maxPropStringLength: 400
  })
);

addDecorator(withA11y);

// automatically import all files ending in *.stories.js
configure(require.context('../src/', true, /\.stories\.js$/), module);
