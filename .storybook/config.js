import { configure, addParameters, addDecorator } from '@storybook/react';
import customTheme from './sample-theme';
import React from "react";
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import '../src/story.css';
import './config.css';
import '@patron/patron-css/patron/index.css';
import '@patron/patron-icon/dist/patron-font.css'
import Container from './Container';

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

addDecorator((story, config) => {
    return <Container story={story} config={config} />;
  });

addDecorator(withA11y);

// automatically import all files ending in *.stories.js
configure(require.context('../src/', true, /\.stories\.js$/), module);
