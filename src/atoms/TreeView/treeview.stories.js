import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
//@update-path-build-start
import TreeView from './TreeView';
//@update-path-build-end

const treeData = [
  {
    children: [
      {
        children: [
          {
            children: [],
            name: 'Sub Section 1.1.1',
            showChildren: false
          },
          {
            children: [],
            name: 'Sub Section 1.1.2',
            showChildren: false
          }
        ],
        name: 'Sub Section 1.1',
        showChildren: false
      },
      {
        children: [],
        name: 'Sub Section 1.2',
        showChildren: false
      }
    ],
    name: 'Section 1',
    showChildren: false
  },
  {
    children: [
      {
        children: [
          {
            children: [],
            name: 'Sub Section 2.1.1',
            showChildren: false
          },
          {
            children: [],
            name: 'Sub Section 2.1.2',
            showChildren: false
          }
        ],
        name: 'Sub Section 2.1',
        showChildren: false
      },
      {
        children: [
          {
            children: [
              {
                children: [],
                name: 'Sub Section 2.2.1.1',
                showChildren: false
              },
              {
                children: [],
                name: 'Sub Section 2.2.1.2',
                showChildren: false
              }
            ],
            name: 'Sub Section 2.2.1',
            showChildren: false
          },
          {
            children: [],
            name: 'Sub Section 2.2.2',
            showChildren: false
          }
        ],
        name: 'Sub Section 2.2',
        showChildren: false
      }
    ],
    name: 'Section 2',
    showChildren: false
  },
  {
    children: [],
    name: 'Section 3',
    showChildren: false
  }
];

storiesOf('TreeView', module)
  .add('default', () => <TreeView treeData={object('Tree Data', treeData)} />, {
    info: {
      text: `Description About TreeView Component \n
        
        import { TreeView } from '@patron/patron-react/treeview';
        
        `
    }
  })
  .add(
    'selection',
    () => <TreeView treeData={object('Tree Data', treeData)} type="single" />,
    {
      info: {
        text: `Description About TreeView Component \n
        
        import { TreeView } from '@patron/patron-react/treeview';
        
        `
      }
    }
  );
