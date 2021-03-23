import React from 'react';
import addons, { types } from '@storybook/addons';
import PageTheme from '../PageTheme';

addons.register('my/themetoolbar', () => {
  addons.add('my-toolbar-addon/theme-toolbar', {
    title: 'Example Storybook toolbar',
    //👇 Sets the type of UI element in Storybook
    type: types.TOOL,
    //👇 Shows the Toolbar UI element if either the Canvas or Docs tab is active
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ({ active }) => <PageTheme />
  });
});
