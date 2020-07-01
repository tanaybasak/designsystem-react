import React from 'react';
import { storiesOf } from '@storybook/react';
//@update-path-build-start
import Tile from './Tile';
//@update-path-build-end

storiesOf('Tile', module)
  .add(
    'default',
    () => (
      <Tile type="readable">
        <div>
          <p>This is readable tile</p>
        </div>
      </Tile>
    ),
    {
      info: {
        text: `Description About Tile Component \n
        import { Tile } from '@patron/patron-react/tile';`,
      },
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
        text: `Description About Tile Component \n
        import { Tile } from '@patron/patron-react/tile';`,
      },
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
        text: `Description About Tile Component \n
        import { Tile } from '@patron/patron-react/tile';`,
      },
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
        text: `Description About Tile Component \n
        import { Tile } from '@patron/patron-react/tile';`,
      },
    }
  )
  .add(
    'expandable- top left arrow',
    () => (
      <Tile id="hcl-expandable-id" type="expandable" expandableType="top">
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
        text: `Description About Tile Component \n
        import { Tile } from '@patron/patron-react/tile';`,
      },
    }
  );
