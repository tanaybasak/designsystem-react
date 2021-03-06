import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, object } from '@storybook/addon-knobs';
//@update-path-build-start
import List from './List';
//@update-path-build-end

const classOrderedOpts = [
  'decimal',
  'upper-alpha',
  'lower-alpha',
  'lower-roman',
  'upper-roman'
];

const classUnorderedOpts = ['circle', 'square', 'disc'];

const listItems = [
  {
    child: [
      {
        name: 'List Level 1-1',
        value: 'll-1-1'
      },
      {
        name: 'List Level 1-2',
        value: 'll-1-2'
      }
    ],
    name: 'List Level 1',
    value: 'll-1'
  },
  {
    child: [
      {
        name: 'List 2-1',
        value: 'll-2-1'
      },
      {
        name: 'List 2-2',
        value: 'll-2-2'
      }
    ],
    name: 'List 2',
    value: 'll-2'
  },
  {
    child: [
      {
        name: 'List Level 3-1',
        value: 'll-3-1'
      },
      {
        name: 'List Level 3-2',
        value: 'll-3-2'
      }
    ],
    name: 'List Level 3',
    value: 'll-3'
  }
];

storiesOf('Components/List', module)
  .add(
    'ordered',
    () => (
      <List
        type={select('Type', classOrderedOpts, 'decimal')}
        listItems={object('List Items', listItems)}
      />
    ),
    {
      info: {
        text: `Description About List Component`,
        document: ['List']
      }
    }
  )
  .add(
    'default',
    () => (
      <List
        type={select('Type', classUnorderedOpts, 'disc')}
        listItems={object('List Items', listItems)}
      />
    ),
    {
      info: {
        text: `Description About List Component`,
        document: ['List']
      }
    }
  );
