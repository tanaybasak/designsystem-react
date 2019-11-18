import React from 'react';
import { storiesOf } from '@storybook/react';
import Tile from './Tile';
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('Tile', module)
  .add(
    'basic',
    () => (
      <Tile type="readable">
        <div>
          <p>This is readable tile</p>
        </div>
      </Tile>
    ),
    {
      info: {
        text: 'Description About Tile Component'
      }
    }
  )
  .add(
    'clickable',
    () => (
      <Tile href="" type="clickable">
        <div>
          <p>This is clickable tile</p>
        </div>
      </Tile>
    ),
    {
      info: {
        text: 'Description About Tile Component'
      }
    }
  )
  .add(
    'selectable',
    () => (
      <Tile type="selectable">
        <div>
          <p>This is selectable tile</p>
        </div>
      </Tile>
    ),
    {
      info: {
        text: 'Description About Tile Component'
      }
    }
  )
  .add(
    'expandable',
    () => (
      <Tile id="hcl-expandable-id" type="expandable">
        <div>
          <p>Content shown prior expand</p>
        </div>
        <div>
          <p>Content shown after expand</p>
        </div>
      </Tile>
    ),
    {
      info: {
        text: 'Description About Tile Component'
      }
    }
  );
