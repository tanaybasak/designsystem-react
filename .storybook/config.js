import { configure, addParameters, addDecorator } from '@storybook/react';
import customTheme from './sample-theme';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

addParameters({
  options: {
    theme: customTheme,
    panelPosition: 'bottom'
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
