import React from 'react';
import addons, { types } from '@storybook/addons';
import Document from '../Document';
addons.register('my/tab', (main, a) => {
  addons.add('my-panel-addon/tab', {
    type: types.TAB,
    title: 'Document',
    //👇 Checks the current route for the story
    route: ({ storyId, refId }) =>
      refId ? `/mytab/${refId}_${storyId}` : `/mytab/${storyId}`,
    //👇 Shows the Tab UI element in mytab view mode
    match: ({ viewMode }) => viewMode === 'mytab',
    render: props => <Document main={main} status={props.active} />
  });
});
