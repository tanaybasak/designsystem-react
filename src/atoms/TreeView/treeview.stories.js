import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
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
            displayChildren: false
          },
          {
            children: [],
            name: 'Sub Section 1.1.2',
            displayChildren: false
          }
        ],
        name: 'Sub Section 1.1',
        displayChildren: false
      },
      {
        children: [],
        name: 'Sub Section 1.2',
        displayChildren: false
      }
    ],
    name: 'Section 1',
    displayChildren: false
  },
  {
    children: [
      {
        children: [
          {
            children: [],
            name: 'Sub Section 2.1.1',
            displayChildren: false
          },
          {
            children: [],
            name: 'Sub Section 2.1.2',
            displayChildren: false
          }
        ],
        name: 'Sub Section 2.1',
        displayChildren: false
      },
      {
        children: [
          {
            children: [
              {
                children: [],
                name: 'Sub Section 2.2.1.1',
                displayChildren: false
              },
              {
                children: [],
                name: 'Sub Section 2.2.1.2',
                displayChildren: false
              }
            ],
            name: 'Sub Section 2.2.1',
            displayChildren: false
          },
          {
            children: [],
            name: 'Sub Section 2.2.2',
            displayChildren: false
          }
        ],
        name: 'Sub Section 2.2',
        displayChildren: false
      }
    ],
    name: 'Section 2',
    displayChildren: false
  },
  {
    children: [],
    name: 'Section 3',
    displayChildren: false
  }
];

const treeDataWithIcon = [
  {
    name: 'Main',
    displayChildren: true,
    type: 'folder',
    expandIcon: 'pi pi-export',
    collapsedIcon: 'pi pi-folder',
    action: [],
    children: [
      {
        name: '1',
        displayChildren: false,
        type: 'folder',
        expandIcon: 'pi pi-export',
        collapsedIcon: 'pi pi-folder',
        children: []
      },
      {
        name: '2',
        displayChildren: false,
        type: 'file',
        icon: 'pi pi-document',
        children: []
      },
      {
        name: '3',
        displayChildren: false,
        type: 'file',
        icon: 'pi pi-document',
        children: []
      },
      {
        name: '4',
        displayChildren: false,
        type: 'file',
        icon: 'pi pi-document',
        children: []
      }
    ]
  },
  {
    name: 'Folder 2',
    displayChildren: false,
    type: 'folder',
    expandIcon: 'pi pi-export',
    collapsedIcon: 'pi pi-folder',
    children: [
      {
        name: 'Folder 2.1',
        displayChildren: false,
        type: 'folder',
        expandIcon: 'pi pi-export',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            name: 'File 2.1.1',
            displayChildren: false,
            type: 'file',
            icon: 'pi pi-document',
            children: []
          },
          {
            name: 'Folder 2.1.2',
            displayChildren: false,
            type: 'folder',
            expandIcon: 'pi pi-export',
            collapsedIcon: 'pi pi-folder',
            children: []
          }
        ]
      },
      {
        name: 'Folder 2.2',
        displayChildren: false,
        type: 'folder',
        expandIcon: 'pi pi-export',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            name: 'Folder 2.2.1',
            displayChildren: false,
            type: 'folder',
            expandIcon: 'pi pi-export',
            collapsedIcon: 'pi pi-folder',
            children: [
              {
                name: 'File 2.2.1.1',
                displayChildren: false,
                type: 'file',
                icon: 'pi pi-document',
                children: []
              },
              {
                name: 'File 2.2.1.2',
                displayChildren: false,
                type: 'file',
                icon: 'pi pi-document',
                children: []
              }
            ]
          },
          {
            name: 'File 2.2.2',
            displayChildren: false,
            type: 'file',
            icon: 'pi pi-document',
            children: []
          }
        ]
      }
    ]
  },
  {
    name: 'File 3',
    displayChildren: false,
    type: 'file',
    icon: 'pi pi-document',
    children: []
  }
];

const treeDataWithDragandDropOverflow = [
  {
    name: 'Main',
    displayChildren: true,
    type: 'folder',
    expandIcon: 'pi pi-export',
    collapsedIcon: 'pi pi-folder',
    draggable: true,
    action: [],
    children: [
      {
        name: '1',
        displayChildren: false,
        type: 'folder',
        draggable: true,
        expandIcon: 'pi pi-export',
        collapsedIcon: 'pi pi-folder',
        children: []
      },
      {
        name: '2',
        displayChildren: false,
        type: 'file',
        draggable: true,
        icon: 'pi pi-document',
        children: []
      },
      {
        name: '3',
        displayChildren: false,
        type: 'file',
        draggable: true,
        icon: 'pi pi-document',
        children: []
      },
      {
        name: '4',
        displayChildren: false,
        type: 'file',
        draggable: true,
        icon: 'pi pi-document',
        children: []
      }
    ]
  },
  {
    name: 'Folder 2',
    displayChildren: false,
    type: 'folder',
    draggable: true,
    expandIcon: 'pi pi-export',
    collapsedIcon: 'pi pi-folder',
    children: [
      {
        name: 'Folder 2.1',
        displayChildren: false,
        type: 'folder',
        draggable: true,
        expandIcon: 'pi pi-export',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            name: 'File 2.1.1',
            displayChildren: false,
            type: 'file',
            draggable: true,
            icon: 'pi pi-document',
            children: []
          },
          {
            name: 'Folder 2.1.2',
            displayChildren: false,
            type: 'folder',
            draggable: true,
            expandIcon: 'pi pi-export',
            collapsedIcon: 'pi pi-folder',
            children: []
          }
        ]
      },
      {
        name: 'Folder 2.2',
        displayChildren: false,
        type: 'folder',
        draggable: true,
        expandIcon: 'pi pi-export',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            name: 'Folder 2.2.1',
            displayChildren: false,
            type: 'folder',
            draggable: true,
            expandIcon: 'pi pi-export',
            collapsedIcon: 'pi pi-folder',
            children: [
              {
                name: 'File 2.2.1.1',
                displayChildren: false,
                type: 'file',
                draggable: true,
                icon: 'pi pi-document',
                children: []
              },
              {
                name: 'File 2.2.1.2',
                displayChildren: false,
                type: 'file',
                draggable: true,
                icon: 'pi pi-document',
                children: []
              }
            ]
          },
          {
            name: 'File 2.2.2',
            displayChildren: false,
            type: 'file',
            draggable: true,
            icon: 'pi pi-document',
            children: []
          }
        ]
      }
    ]
  },
  {
    name: 'File 3',
    displayChildren: false,
    type: 'file',
    draggable: true,
    icon: 'pi pi-document',
    children: []
  }
];

const timeout = ms => {
  const p1 = new Promise(resolve => setTimeout(resolve, ms));
  return p1
    .then(function() {
      return true;
    })
    .catch(
      // Log the rejection reason
      () => {
        return false;
      }
    );
};

storiesOf('TreeView', module)
  .add('default', () => <TreeView treeData={object('Tree Data', treeData)} />, {
    info: {
      text: `Description About TreeView Component \n
        
        import { TreeView } from '@patron/patron-react/treeview';
        
        `
    }
  })
  .add(
    'with selection',
    () => <TreeView treeData={object('Tree Data', treeData)} type="single" />,
    {
      info: {
        text: `Description About TreeView Component \n
        
        import { TreeView } from '@patron/patron-react/treeview';
        
        `
      }
    }
  )
  .add(
    'with icon',
    () => (
      <TreeView
        treeData={object('Tree Data', treeDataWithIcon)}
        type="single"
      />
    ),
    {
      info: {
        text: `Description About TreeView Component \n
        
        import { TreeView } from '@patron/patron-react/treeview';
        
        `
      }
    }
  )
  .add(
    'with Drag&Drop',
    () => (
      <TreeView
        isMoveNodeAllowed={(dragModel, dropModel) => {
          if (dragModel.type === 'file' && dropModel.type === 'folder') {
            return true;
          } else if (
            dragModel.type === 'folder' &&
            dropModel.type === 'folder'
          ) {
            return true;
          }
          return false;
        }}
        isCopyAllowed={(dragModel, dropModel) => {
          if (dragModel.type === 'file' && dropModel.type === 'folder') {
            return true;
          } else if (
            dragModel.type === 'folder' &&
            dropModel.type === 'folder'
          ) {
            return true;
          }
          return false;
        }}
        treeData={treeDataWithDragandDropOverflow}
        getOverFlowItems={model => {
          let common = [
            {
              name: 'Update',
              action: 'edit'
            },
            {
              name: 'Cut',
              action: 'cut'
            },
            {
              name: 'Copy',
              action: 'copy'
            },
            {
              name: 'Delete',
              action: 'delete'
            }
          ];

          let file = [
            ...common,
            ...[
              {
                name: 'Update Property',
                action: 'updateProperty'
              }
            ]
          ];

          if (model.type === 'folder') {
            return common;
          } else {
            return file;
          }
        }}
        onOverflowAction={action('on overflow action')}
        onOverFlowActionChange={action('on overflow action change')}
        onDeleteNode={async model => {
          return await timeout(3000);
        }}
        onRenamingNode={async model => {
          return await timeout(3000);
        }}
        type="single"
        onChange={action('on change')}
        onToggle={action('on toggle')}
      />
    ),
    {
      info: {
        text: `Description About TreeView Component \n
        
        import { TreeView } from '@patron/patron-react/treeview';
        
        `
      }
    }
  );
