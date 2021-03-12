import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import { Tile, SelectableTile, ClickableTile, ExpandableTile } from './index';
//@update-path-build-end

storiesOf('Tile', module)
  .add(
    'default',
    () => (
      <Tile>
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
      <ClickableTile href={text('href', '')}>
        <div>
          <p>This is clickable tile</p>
        </div>
      </ClickableTile>
    ),
    {
      info: {
        text: `Description About Tile Component \n
        import { ClickableTile } from '@patron/patron-react/tile';`
      }
    }
  )
  .add(
    'selectable',
    () => (
      <SelectableTile selected={boolean('selected', false)}>
        <div>
          <p>This is selectable tile</p>
        </div>
      </SelectableTile>
    ),
    {
      info: {
        text: `Description About Tile Component \n
        import { SelectableTile } from '@patron/patron-react/tile';`
      }
    }
  )
  .add(
    'expandable',
    () => (
      <ExpandableTile
        id="hcl-expandable-id"
        expanded={boolean('expanded', false)}
        foldContentAbove={text('Content Above', 'Content Above')}
        foldContentBelow={text('Content Below', 'Content Below')}
      />
    ),
    {
      info: {
        text: `Description About Tile Component \n
        import { ExpandableTile } from '@patron/patron-react/tile';`
      }
    }
  )
  .add(
    'expandable- top left arrow',
    () => (
      <ExpandableTile
        id="hcl-expandable-id-2"
        expanded={boolean('expanded', false)}
        expandableType="top"
        foldContentAbove={text('Content Above', 'Content Above')}
        foldContentBelow={text('Content Below', 'Content below')}
      />
    ),
    {
      info: {
        text: `Description About Tile Component \n
        import { ExpandableTile } from '@patron/patron-react/tile';`
      }
    }
  );
