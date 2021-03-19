import React from 'react';
import addons , { types } from '@storybook/addons';

import { makeDecorator } from '@storybook/addons';
// import { StoryFn, StoryApi, ClientStoryApi } from '@storybook/addons';
import Document from '../Document';
import { useStorybookState } from '@storybook/api/dist';
import { useStorybookApi } from '@storybook/api/dist';
// var _addons = require("@storybook/addons");

// console.log(_addons.StoryFn)
//import { addDecorator } from '@storybook/react';
addons.register('my/tab', (main, a) => {
  addons.add('my-panel-addon/tab', {
    type: types.TAB,
    title: 'Doc',
    //👇 Checks the current route for the story
    route: ({ storyId, refId }) =>
      refId ? `/mytab/${refId}_${storyId}` : `/mytab/${storyId}`,
    //👇 Shows the Tab UI element in mytab view mode
    match: ({ viewMode }) => viewMode === 'mytab',
    render: props => {

        const state = useStorybookState();
        const storybookApi = useStorybookApi();


      return <Document main={main} status={props.active} />;
    }
  });
});
