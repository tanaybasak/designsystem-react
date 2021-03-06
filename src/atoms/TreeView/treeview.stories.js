import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
//@update-path-build-start
import TreeView from './TreeView';
import Notification from '../Notification';
import TreeNodeTemplate from './TreeNodeTemplate';
import Checkbox from '../Checkbox';
import Button from '../Button/Button';
//@update-path-build-end
let dynamicId = 1;
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
  return treeData;
};
const getCustomTreeLazyLoad = () => {
  let treeData = [];
  for (let i = 0; i < 5; i++) {
    let maintreeObj = {
      name: 'Tree 1 Name ' + i,
      type: 'folder',
      hasChildren: true,
      key: `node-${i}`
    };

    treeData.push(maintreeObj);
  }
  return treeData;
};
const getClonedModel = model => {
  model.key = `Temp-${++dynamicId}`;
  model.children &&
    model.children.length > 0 &&
    model.children.map(data => {
      return getClonedModel(data);
    });

  return model;
};

const timeout = ms => {
  const p1 = new Promise(resolve => setTimeout(resolve, ms));
  return p1
    .then(function () {
      return true;
    })
    .catch(
      // Log the rejection reason
      () => {
        return false;
      }
    );
};

const treeData = getCustomTree();
const treeDataLazyLoad = getCustomTreeLazyLoad();

storiesOf('Components/Tree', module)
  .add('default', () => <TreeView treeData={object('Tree Data', treeData)} />, {
    info: {
      text: `Description About TreeView Component`,
      document: ['TreeView'],
      className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4'
    }
  })
  .add(
    'with selection',
    () => (
      <TreeView
        treeData={object('Tree Data', treeData)}
        type="single"
        onChange={action('On Selection')}
      />
    ),
    {
      info: {
        text: `Description About TreeView Component`,
        document: ['TreeView'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4'
      }
    }
  )
  .add(
    'with icon',
    () => (
      <TreeView
        treeData={object('Tree Data', treeData)}
        type="single"
        // iconClass={{
        //   operator: 'type',
        //   values: {
        //     file: {
        //       icon: <i className="p-hclsw p-hclsw-document" />
        //     },
        //     folder: {
        //       expandedIcon: <i className="p-hclsw p-hclsw-export" />,
        //       collapsedIcon: <i className="p-hclsw p-hclsw-folder" />
        //     }
        //   }
        // }}
        iconClass={{
          operator: 'type',
          values: {
            file: {
              icon: <i className="p-hclsw p-hclsw-document" />
            },
            folder: {
              icon: <i className="p-hclsw p-hclsw-folder" />
            }
          }
        }}
        // iconClass={{
        //   values: {
        //     icon: (
        //       <svg
        //         focusable="false"
        //         preserveAspectRatio="xMidYMid meet"
        //         xmlns="https://www.w3.org/2000/svg"
        //         width="20"
        //         height="20"
        //         viewBox="0 0 20 20"
        //         aria-hidden="true"
        //         style={{ willChange: 'transform', fill: '#589d25' }}
        //       >
        //         <path d="M10 1c-4.9 0-9 4.1-9 9s4.1 9 9 9 9-4 9-9-4-9-9-9zM8.7 13.5l-3.2-3.2 1-1 2.2 2.2 4.8-4.8 1 1-5.8 5.8z" />
        //         <path
        //           fill="none"
        //           d="M8.7 13.5l-3.2-3.2 1-1 2.2 2.2 4.8-4.8 1 1-5.8 5.8z"
        //           data-icon-path="inner-path"
        //           opacity="0"
        //         />
        //       </svg>
        //     )
        //   }
        // }}
      />
    ),
    {
      info: {
        text: `Description About TreeView Component`,
        document: ['TreeView'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4'
      }
    }
  )
  .add(
    'with Drag&Drop',
    () => (
      <TreeView
        iconClass={{
          operator: 'type',
          values: {
            file: {
              icon: <i className="p-hclsw p-hclsw-document" />
            },
            folder: {
              icon: <i className="p-hclsw p-hclsw-folder" />
            }
          }
        }}
        dragRules={{
          operator: 'type',
          values: {
            file: true,
            folder: false
          }
        }}
        isDropAllowed={(dragModel, dropModel, parentNode) => {
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
        text: `Description About TreeView Component`,
        document: ['TreeView'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        snippet: `
        <TreeView
        iconClass={{
          operator: 'type',
          values: {
            file: {
              icon: <i className="p-hclsw p-hclsw-document" />
            },
            folder: {
              icon: <i className="p-hclsw p-hclsw-folder" />
            }
          }
        }}
        dragRules={{
          operator: 'type',
          values: {
            file: true,
            folder: false
          }
        }}
        isDropAllowed={(dragModel, dropModel, parentNode) => {
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
        treeData={${JSON.stringify(treeData)}}
        draggable="internal"
        onActionCompletes={()=>{}}
        type="single"
        onChange={action('on change')}
        onToggle={action('on toggle')}
      />
        `
      }
    }
  )
  .add(
    'with Overflow Menu',
    () => (
      <TreeView
        iconClass={{
          operator: 'type',
          values: {
            file: {
              icon: <i className="p-hclsw p-hclsw-document" />
            },
            folder: {
              icon: <i className="p-hclsw p-hclsw-folder" />
            }
          }
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
        treeData={treeData}
        getOverFlowItems={model => {
          let common = [
            {
              name: 'Rename',
              action: 'edit',
              icon: <i className="p-hclsw p-hclsw-edit" />
            },
            {
              name: 'Cut',
              action: 'cut',
              icon: <i className="p-hclsw p-hclsw-cut" />
            },
            {
              name: 'Copy',
              action: 'copy',
              icon: <i className="p-hclsw p-hclsw-copy" />
            },
            {
              name: 'Paste',
              action: 'paste',
              icon: <i className="p-hclsw p-hclsw-paste" />,
              disabled: true
            },
            {
              name: 'Delete',
              icon: <i className="p-hclsw p-hclsw-delete" />,
              action: 'delete'
            }
          ];

          let file = [
            ...common,
            ...[
              {
                name: 'Update Property',
                action: 'updateProperty',
                icon: <i className="p-hclsw p-hclsw-document" />
              }
            ]
          ];

          if (model.type === 'folder') {
            return common;
          } else {
            return file;
          }
        }}
        onOverflowAction={(overflowAction, model) => {
          if (overflowAction === 'copy') {
            return JSON.parse(JSON.stringify(model));
          }
        }}
        onActionCompletes={action('on overflow action change')}
        onDeleteNode={async () => {
          return true;
        }}
        isMoveNodeAllowed={(dragModel, dropModel) => {
          let canDropInsideDropModel = false;

          if (dropModel.type === 'folder') {
            canDropInsideDropModel = true;
          }

          return canDropInsideDropModel;
        }}
        onCopyNode={async dragModel => {
          var data_copy = JSON.parse(JSON.stringify(dragModel));

          let clonedModel = getClonedModel(data_copy);

          return await clonedModel;
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
        text: `Description About TreeView Component`,
        document: ['TreeView'],
        internal: ['Notification'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        snippet: `
        let dynamicId = 1;
        const getClonedModel = model => {
            model.key = \`temp-\${++dynamicId}\`;
            model.children &&
              model.children.length > 0 &&
              model.children.map(data => {
                return getClonedModel(data);
              });
          
            return model;
          };
        return(

        <TreeView
        iconClass={{
          operator: 'type',
          values: {
            file: {
              icon: <i className="p-hclsw p-hclsw-document" />
            },
            folder: {
              icon: <i className="p-hclsw p-hclsw-folder" />
            }
          }
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
        treeData={${JSON.stringify(treeData)}}
        getOverFlowItems={model => {
          let common = [
            {
              name: 'Rename',
              action: 'edit',
              icon: <i className="p-hclsw p-hclsw-edit" />
            },
            {
              name: 'Cut',
              action: 'cut',
              icon: <i className="p-hclsw p-hclsw-cut" />
            },
            {
              name: 'Copy',
              action: 'copy',
              icon: <i className="p-hclsw p-hclsw-copy" />
            },
            {
              name: 'Paste',
              action: 'paste',
              icon: <i className="p-hclsw p-hclsw-paste" />,
              disabled: true
            },
            {
              name: 'Delete',
              icon: <i className="p-hclsw p-hclsw-delete" />,
              action: 'delete'
            }
          ];

          let file = [
            ...common,
            ...[
              {
                name: 'Update Property',
                action: 'updateProperty',
                icon: <i className="p-hclsw p-hclsw-document" />
              }
            ]
          ];

          if (model.type === 'folder') {
            return common;
          } else {
            return file;
          }
        }}
        onOverflowAction={(overflowAction, model) => {
          if (overflowAction === 'copy') {
            return JSON.parse(JSON.stringify(model));
          }
        }}
        onActionCompletes={action('on overflow action change')}
        onDeleteNode={async () => {
          return true;
        }}
        isMoveNodeAllowed={(dragModel, dropModel) => {
          let canDropInsideDropModel = false;

          if (dropModel.type === 'folder') {
            canDropInsideDropModel = true;
          }

          return canDropInsideDropModel;
        }}
        onCopyNode={async dragModel => {
          var data_copy = JSON.parse(JSON.stringify(dragModel));

          let clonedModel = getClonedModel(data_copy);

          return await clonedModel;
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
      />)`
      }
    }
  )
  .add(
    'with custom template',
    () => (
      <TreeView
        treeData={treeData}
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
        text: `Description About TreeView Component`,
        document: ['TreeView', 'TreeNodeTemplate'],
        internal: ['Checkbox'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        snippet: `
        <TreeView
        treeData={${JSON.stringify(treeData)}}
        customTemplate={node => {
          return (
            <TreeNodeTemplate>
              <Checkbox id={node.key} label={\`\${node.name}\`} value={node.key} />
            </TreeNodeTemplate>
          );
        }}
      />`
      }
    }
  )
  .add(
    'with Lazy Load',
    () => (
      <TreeView
        treeData={treeDataLazyLoad}
        onToggle={async node => {
          await timeout(3000);
          let children = [];
          for (let j = 0; j < 2; j++) {
            let childtreeObj = {
              name: 'Tree 1 Child Name ' + node.key + '-' + j,
              type: 'folder',
              hasChildren: true,
              key: `node-${node.key}-${j}`
            };
            children.push(childtreeObj);
          }
          return children;
        }}
      />
    ),
    {
      info: {
        text: `Description About TreeView Component`,
        document: ['TreeView'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        snippet: `

        const timeout = ms => {
            const p1 = new Promise(resolve => setTimeout(resolve, ms));
            return p1
              .then(function () {
                return true;
              })
              .catch(
                // Log the rejection reason
                () => {
                  return false;
                }
              );
          };
          return(
        <TreeView
        treeData={${JSON.stringify(treeDataLazyLoad)}}
        onToggle={async node => {
          await timeout(3000);
          let children = [];
          for (let j = 0; j < 2; j++) {
            let childtreeObj = {
              name: 'Tree 1 Child Name ' + node.key + '-' + j,
              type: 'folder',
              hasChildren: true,
              key: \`node-\${node.key}-\${j}\`
            };
            children.push(childtreeObj);
          }
          return children;
        }}
      />)`
      }
    }
  )
  .add(
    'with Custom Action Template',
    () => (
      <TreeView
        treeData={treeData}
        overflowOnHover
        customActionTemplate={node => {
          return node.type === 'folder' ? (
            <Button
              type="ghost"
              small
              style={{ margin: 0 }}
              className="hcl-secondary-bg-hover"
              aria-label="add file"
            >
              <i className="p-hclsw p-hclsw-add filled" />
            </Button>
          ) : (
            <>
              <Button
                type="ghost"
                small
                style={{ margin: 0 }}
                className="hcl-secondary-bg-hover"
                aria-label="delete file"
              >
                <i className="p-hclsw p-hclsw-delete" />
              </Button>
            </>
          );
        }}
      />
    ),
    {
      info: {
        text: `Description About TreeView Component`,
        document: ['TreeView'],
        internal: ['Button'],
        className: 'hcl-col-12 hcl-col-sm-8 hcl-col-lg-4',
        snippet: `
        <TreeView
        treeData={${JSON.stringify(treeData)}}
        overflowOnHover
        customActionTemplate={node => {
          return node.type === 'folder' ? (
            <Button
              type="ghost"
              small
              style={{ margin: 0 }}
              className="hcl-secondary-bg-hover"
              aria-label="add file"
            >
              <i className="p-hclsw p-hclsw-add filled" />
            </Button>
          ) : (
            <>
              <Button
                type="ghost"
                small
                style={{ margin: 0 }}
                className="hcl-secondary-bg-hover"
                aria-label="delete file"
              >
                <i className="p-hclsw p-hclsw-delete" />
              </Button>
            </>
          );
        }}
      />`
      }
    }
  );
