import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
//@update-path-build-start
import TreeView from './TreeView';
import Notification from '../Notification';
import TreeNodeTemplate from './TreeNodeTemplate';
import Checkbox from '../Checkbox';
//@update-path-build-end

const getCustomTree = () => {
  let treeData = [];
  for (let i = 0; i < 5; i++) {
    let maintreeObj = {
      name: 'Tree 1 Name ' + i,
      type: 'folder',
      key: `node-${i}`
    };
    maintreeObj.children = [];
    for (let j = 0; j < 3; j++) {
      let childtreeObj = {
        name: 'Tree 1 Child Name ' + i + '-' + j,
        type: 'folder',
        key: `node-${i}-${j}`
      };
      childtreeObj.children = [];
      for (let k = 0; k < 2; k++) {
        let grandChild = {
          name: 'Tree 1 Grand Child Name ' + i + '-' + j + '-' + k,
          type: 'file',
          key: `node-${i}-${j}-${k}`
        };

        childtreeObj.children.push(grandChild);
      }
      maintreeObj.children.push(childtreeObj);
    }

    treeData.push(maintreeObj);
  }

  console.log(treeData);

  return treeData;
};

const treeData = getCustomTree();

storiesOf('Tree', module)
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
        treeData={object('Tree Data', treeData)}
        type="single"
        iconClass={[
          {
            condition: [
              {
                operator: 'type',
                operand: '=',
                value: 'folder'
              }
            ],
            values: {
              expandIcon: <i className="p-hclsw p-hclsw-export" />,
              collapsedIcon: <i className="p-hclsw p-hclsw-folder" />
            }
          },
          {
            condition: [
              {
                operator: 'type',
                operand: '=',
                value: 'file'
              }
            ],
            values: {
              icon: <i className="p-hclsw p-hclsw-document" />
            }
          }
        ]}
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
        dragRules={[
          {
            condition: [
              {
                operator: 'type',
                operand: '=',
                value: 'folder'
              }
            ]
          },
          {
            condition: [
              {
                operator: 'type',
                operand: '=',
                value: 'file'
              }
            ]
          }
        ]}
        isDropAllowed={(dragModel, dropModel, parentNode, treeData) => {
          let canDropInsideDropModel = false;
          let canDropInsideParentModel = false;

          if (dropModel.type === 'folder') {
            canDropInsideDropModel = true;
          }

          if (
            parentNode === undefined ||
            parentNode === null ||
            parentNode.type === 'folder'
          ) {
            canDropInsideParentModel = true;
          }
          return [canDropInsideDropModel, canDropInsideParentModel];
        }}
        treeData={treeData}
        draggable="internal"
        onActionCompletes={action('on overflow action change')}
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
  )
  .add(
    'with Overflow Menu',
    () => (
      <TreeView
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
        treeData={treeData}
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
        onActionCompletes={action('on overflow action change')}
        onDeleteNode={async () => {
          return true;
        }}
        isMoveNodeAllowed={(dragModel, dropModel, parentNode, treeData) => {
          let canDropInsideDropModel = false;

          if (dropModel.type === 'folder') {
            canDropInsideDropModel = true;
          }

          return canDropInsideDropModel;
        }}
        onRenamingNode={async value => {
          if (value.name.length > 2) {
            return [true];
          } else {
            return [
              false,
              // eslint-disable-next-line react/jsx-key
              <Notification
                //subtitle={errorMessage}
                closable={false}
                title="Please Enter minimum 3 character"
                type="warning"
                visible
              />
            ];
          }
        }}
        overflowOnHover={boolean('OverflowOnHover', false)}
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
  )
  .add(
    'with custom template',
    () => (
      <TreeView
        treeData={object('Tree Data', treeData)}
        customTemplate={node => {
          return (
            <TreeNodeTemplate>
              <Checkbox id={node.key} label={`${node.name}`} value={node.key} />
            </TreeNodeTemplate>
          );
        }}
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
