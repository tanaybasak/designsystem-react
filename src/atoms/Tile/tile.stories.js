import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import { Tile, SelectableTile, ClickableTile, ExpandableTile } from './index';
//@update-path-build-end

storiesOf('Components/Tile', module)
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
        text: `Description About Tile Component`,
        document: ['Tile']
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
        text: `Description About Tile Component`,
        document: ['ClickableTile']
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
        text: `Description About Tile Component`,
        document: ['SelectableTile']
      }
    }
  )
  .add(
    'expandable - default',
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
        text: `Description About Tile Component`,
        document: ['ExpandableTile']
      }
    }
  )
  .add(
    'expandable- top left arrow',
    () => (
      <ExpandableTile
        id="hcl-expandable-id-2"
        expanded={boolean('expanded', false)}
        expandableType="nw"
        foldContentAbove={text('Content Above', 'Content Above')}
        foldContentBelow={text('Content Below', 'Content below')}
      />
    ),
    {
      info: {
        text: `Description About Tile Component`,
        document: ['ExpandableTile']
      }
    }
  )
  .add(
    'expandable- top right arrow',
    () => (
      <ExpandableTile
        id="hcl-expandable-id-3"
        expanded={boolean('expanded', false)}
        expandableType="ne"
        foldContentAbove={text('Content Above', 'Content Above')}
        foldContentBelow={text('Content Below', 'Content below')}
      />
    ),
    {
      info: {
        text: `Description About Tile Component`,
        document: ['ExpandableTile']
      }
    }
  )
  .add(
    'expandable- bottom left arrow',
    () => (
      <ExpandableTile
        id="hcl-expandable-id-4"
        expanded={boolean('expanded', false)}
        expandableType="sw"
        foldContentAbove={text('Content Above', 'Content Above')}
        foldContentBelow={text('Content Below', 'Content below')}
      />
    ),
    {
      info: {
        text: `Description About Tile Component`,
        document: ['ExpandableTile']
      }
    }
  );
