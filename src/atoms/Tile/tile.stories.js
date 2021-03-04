import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
//@update-path-build-start
import Tile from './Tile';
//@update-path-build-end

storiesOf('Components/Tile', module)
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
        import { Tile } from '@patron/patron-react/tile';`
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
        text: `Description About Tile Component \n
        import { Tile } from '@patron/patron-react/tile';`
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
        text: `Description About Tile Component \n
        import { Tile } from '@patron/patron-react/tile';`
      }
    }
  )
  .add(
    'expandable',
    () => (
      <Tile
        id="hcl-expandable-id"
        type="expandable"
        foldContentAbove={text('Content Above', 'Content Above')}
        foldContentBelow={text('Content Below', 'Content Below')}
        onChange={action('Toggle')}
      />
    ),
    {
      info: {
        text: `Description About Tile Component \n
        import { Tile } from '@patron/patron-react/tile';`
      }
    }
  )
  .add(
    'expandable- top left arrow',
    () => (
      <Tile
        id="hcl-expandable-id-2"
        type="expandable"
        expandableType="top"
        foldContentAbove={text('Content Above', 'Content Above')}
        foldContentBelow={text('Content Below', 'Content below')}
        onChange={action('Toggle')}
      />
    ),
    {
      info: {
        text: `Description About Tile Component \n
        import { Tile } from '@patron/patron-react/tile';`
      }
    }
  );
