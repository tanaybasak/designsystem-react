/* eslint-disable no-console */
import React, { Component } from 'react';
import { TreeNodeTemplate, TreeView } from '../../atoms/TreeView';
import Modal from '../../molecules/Modal';
import Toast from '../../atoms/Toast';
import Checkbox from '../../atoms/Checkbox';
import Button from '../../atoms/Button/Button';
import Tag from '../../atoms/Tag/Tag';
import { Overflowmenu, MenuItem } from '../../molecules/Overflowmenu';
import Notification from '../../atoms/Notification';
const getCustomTree = () => {
  let treeData = [];
  for (let i = 0; i < 5; i++) {
    let maintreeObj = {
      name: 'Tree 1 Name ' + i,
      type: 'folder',
      //draggableX:false,
      //icon: 'p-hclsw p-hclsw-export',
      //collapsedIcon:'p-hclsw p-hclsw-folder',
      //id: `node-${i}`,
      hasChildren: true
    };
    maintreeObj.children = [];
    for (let j = 0; j < 2; j++) {
      let childtreeObj = {
        name: 'Tree 1 Child Name ' + i + '-' + j,
        //draggableX:false,
        //expandIcon: 'p-hclsw p-hclsw-export',
        //collapsedIcon:'p-hclsw p-hclsw-folder',
        type: 'folder'
        //id: `node-${i}-${j}`
      };
      childtreeObj.children = [];
      for (let k = 0; k < 2; k++) {
        let grandChild = {
          name: 'Tree 1 Grand Child Name ' + i + '-' + j + '-' + k,
          type: 'file'
          //draggableX:true,
          //icon: 'p-hclsw p-hclsw-document',
          //id: `node-${i}-${j}-${k}`
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
let dynamicId = 1;
class TreeExample extends Component {
  state = {
    //nodeSelected: null,
    toast: {
      visible: false,
      type: 'success'
    },
    treeData: getCustomTree(),
    selectedNode: {},
    // config: { key: 'id'},

    showModal: false,
    expandedNode: { 'node-0': true, 'node-0-1': true },
    nodeSelected: null //{ id: 'node-0-1-1' }
  };

  getClonedModel = model => {
    console.log(model);
    //let newModal = {...model}
    model.id = `Temp-${++dynamicId}`;
    //newModal.children = []
    model.children &&
      model.children.length > 0 &&
      model.children.map(data => {
        this.getClonedModel(data);
        // data.id= `Temp-${++dynamicId}`;
        // newModal.children.push( {...data});
      });

    return model;
  };

  showToast = message => {
    if (!this.state.toast.visible) {
      this.setState(
        {
          toast: {
            visible: true,
            title: message
          }
        },
        () => {
          setTimeout(() => {
            this.hideToast();
          }, 5000);
        }
      );
    }
  };

  hideToast = () => {
    if (this.state.toast.visible) {
      this.setState({
        toast: {
          visible: false
        }
      });
    }
  };

  timeout = ms => {
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

  //   onclick = () => {
  //       console.log("On Click")
  //   }

  confirmDelete = ms => {
    // var p = new Promise(function(resolve, reject){
    //     resolve()
    // });

    const p = new Promise(
      function (resolve, reject) {
        this.onAccept = resolve;
        this.onReject = reject;
      }.bind(this)
    );

    return p
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

  render() {
    return (
      <section className="hcl-container pt-5 mb-5">
        <div className="hcl-row">
          <div className="hcl-col-4 mb-2">
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
              // getIcons={node => {
              //   if (node.type === 'folder') {
              //     return {
              //       expandIcon: <i className="p-hclsw p-hclsw-export"></i>,
              //       collapsedIcon: <i className="p-hclsw p-hclsw-folder"></i>
              //     };
              //   } else {
              //     return {
              //       icon: <i className="p-hclsw p-hclsw-document"></i>
              //     };
              //   }
              // }}
              //   expandedIcon={<i className="p-hclsw p-hclsw-export"></i>}
              //   collapsedIcon={<i className="p-hclsw p-hclsw-add"></i>}
              //   dragRules={[
              //     {
              //       condition: [
              //         {
              //           operator: 'type',
              //           operand: '=',
              //           value: 'folder'
              //         }
              //       ]
              //     },
              //     {
              //       condition: [
              //         {
              //           operator: 'type',
              //           operand: '=',
              //           value: 'file'
              //         }
              //       ]
              //     }
              //   ]}
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
              isMoveNodeAllowed={(
                dragModel,
                dropModel,
                parentNode,
                treeData
              ) => {
                let canDropInsideDropModel = false;

                if (dropModel.type === 'folder') {
                  canDropInsideDropModel = true;
                }

                return canDropInsideDropModel;
              }}
              isCopyAllowed={(dragModel, dropModel, treeData) => {
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
              treeData={this.state.treeData}
              dragRules={{
                operator: 'type',
                values: {
                  file: true,
                  folder: true
                }
              }}
              //   dragRules={{
              //     values: true
              //   }}
              //   isDraggable={node => {
              //     return node.type === 'folder' ? false : true;
              //   }}
              //   iconClass={[
              //     {
              //       condition: [
              //         {
              //           operator: 'type',
              //           operand: '=',
              //           value: 'folder'
              //         }
              //       ],
              //       values: {
              //         expandIcon: <i className="p-hclsw p-hclsw-export"></i>,
              //         collapsedIcon: <i className="p-hclsw p-hclsw-folder"></i>
              //       }
              //     },
              //     {
              //       condition: [
              //         {
              //           operator: 'type',
              //           operand: '=',
              //           value: 'file'
              //         }
              //       ],
              //       values: {
              //         icon: (
              //           <svg
              //             focusable="false"
              //             preserveAspectRatio="xMidYMid meet"
              //             xmlns="http://www.w3.org/2000/svg"
              //             width="20"
              //             height="20"
              //             viewBox="0 0 32 32"
              //             aria-hidden="true"
              //             style={{ willChange: 'transform', fill: '#4696d2' }}
              //           >
              //             <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z" />
              //           </svg>
              //         )
              //       }
              //     }
              //   ]}
              getOverFlowItems={model => {
                let common = [
                  {
                    name: 'Rename',
                    action: 'edit',
                    icon: <i className="p-hclsw p-hclsw-edit"></i>
                  },
                  {
                    name: 'Cut',
                    action: 'cut',
                    icon: <i className="p-hclsw p-hclsw-cut"></i>
                  },
                  {
                    name: 'Copy',
                    action: 'copy',
                    icon: <i className="p-hclsw p-hclsw-copy"></i>
                  },
                  {
                    name: 'Paste',
                    action: 'paste',
                    icon: <i className="p-hclsw p-hclsw-paste"></i>,
                    disabled: true
                  },
                  {
                    name: 'Delete',
                    icon: <i className="p-hclsw p-hclsw-delete"></i>,
                    action: 'delete'
                  }
                ];

                let file = [
                  ...common,
                  ...[
                    {
                      name: 'Update Property',
                      action: 'updateProperty',
                      icon: <i className="p-hclsw p-hclsw-document"></i>
                    }
                  ]
                ];

                if (model.type === 'folder') {
                  return common;
                } else {
                  return file;
                }
              }}
              onOverflowAction={async (action, model) => {
                console.log('action', action, model);

                if (action === 'copy') {
                  return JSON.parse(JSON.stringify(model));
                  //   this.setState({
                  //     copiedNodeFromOneTreeToAnother: model
                  //   });
                }
                if (action === 'updateProperty') {
                  if (model.type === 'folder') {
                    model.type = 'file';
                  } else {
                    model.type = 'folder';
                  }

                  await this.timeout(0);
                  return model;
                } else {
                  return model;
                }
              }}
              onDeleteNode={async model => {
                //console.log(model);

                this.setState({
                  showModal: true,
                  selectedNode: model
                });
                return await this.confirmDelete();
              }}
              onRenamingNode={async model => {
                console.log('On Renaming Node');
                if (model.name.length > 5) {
                  return [true];
                }

                return [
                  false,
                  <Notification
                    //subtitle={errorMessage}
                    closable={false}
                    title="Please Enter minimum 5 character"
                    type="warning"
                    visible
                  />
                ];
                //   let textStatus = /^([a-z0-9]{5,})$/.test(model.name);
                //   console.log('textStatus', textStatus);

                //   return await textStatus;
              }}
              onMoveNode={async (dragModel, dropModel) => {
                console.log(dragModel, dropModel);
                return await this.timeout(0);
              }}
              onCopyNode={async (dragModel, dropModel) => {
                var data_copy = JSON.parse(JSON.stringify(dragModel));
                let clonedModel = this.getClonedModel(data_copy);
                return await clonedModel;
              }}
              type="single"
              onChange={selected => {
                console.log('Selected Node', selected);
                // this.setState({
                //   nodeSelected: selected
                // });
              }}
              //   onToggle={async node => {
              //     console.log('On Toggle', node);
              //     await this.timeout(3000);
              //     let children = []
              //     for (let j = 0; j < 2; j++) {
              //       let childtreeObj = {
              //         name: 'Tree 1 Child Name ' +node.id  + '-' + j,
              //         type: 'folder',
              //         hasChildren:true,
              //         id: `node-${node.id}-${j}`
              //       };
              //       children.push(childtreeObj)
              //     }
              //     return children;
              //   }}
              onActionCompletes={(action, node1, node2, node3) => {
                console.log(action, node1, node2, node3);
                // console.log('onActionCompletes', action);
                // console.log('node1', node1);
                // console.log('node2', node2);

                // if (action === 'edit') {
                //   this.showToast(`${node2.name} renamed successfully`);
                // } else if (action === 'copy') {
                //   this.showToast(
                //     `${node2.name} node pasted successfully inside ${node3.name}`
                //   );
                // } else if (action === 'cut') {
                //   this.showToast(
                //     `${node2.name} node moved successfully inside ${node3.name}`
                //   );
                // } else if (action === 'delete') {
                //   this.showToast(`${node2.name} deleted successfully`);
                // } else if (action === 'drop') {
                //   this.showToast(
                //     `${node2.name} node moved successfully inside ${node3.name}`
                //   );
                // }
              }}
              nodeSelected={this.state.nodeSelected}
              config={this.state.config}
              // customTemplate={node => {
              //   return (
              //     <TreeNodeTemplate>
              //       <Checkbox
              //         id={node.id}
              //         label={`${node.name}`}
              //         value={node.id}
              //       />
              //     </TreeNodeTemplate>
              //   );
              // }}
              overflowOnHover={true}
              //   customNodeTemplate={node => {
              //     return (
              //       <Checkbox id={node.id} label={node.name} value={node.id} />
              //     );
              //   }}
              // customActionTemplate={node => {
              //   console.log(node);

              // //   return (
              // //     <Overflowmenu
              // //       attachElementToBody={true}
              // //       direction="bottom-right"
              // //       customTemplate={
              // //         <button className="hcl-btn hcl-ghost">
              // //           <i className="p-hclsw p-hclsw-release"></i>
              // //         </button>
              // //       }
              // //       ellipsisType="vertical"
              // //       onClick={(item, index, e) => {
              // //         console.log('OVERFLOW SELECT');
              // //         console.log(item, index, e);
              // //       }}
              // //     >
              // //       <MenuItem item={'copy'}>
              // //         <i className="p-hclsw p-hclsw-copy"></i>Copy
              // //       </MenuItem>
              // //       <MenuItem item={'remove'} danger={true}>
              // //         <i className="p-hclsw p-hclsw-delete"></i>Delete
              // //       </MenuItem>
              // //       <MenuItem item={'view'}>
              // //         <i className="p-hclsw p-hclsw-view"></i>View
              // //       </MenuItem>
              // //     </Overflowmenu>
              // //   );
              //   return node.type === 'file' ? (
              //     <Button className="hcl-btn hcl-primary hcl-sm">Edit</Button>
              //   ) : (
              //     <Tag>10</Tag>
              //   );
              // }}
              expandedNodes={this.state.expandedNode}
              draggable="internal"
              onDragStart={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDragOver={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDragLeave={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDragEnter={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDragEnd={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDrop={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDoubleClick={(v1, v2, v3, v4) => {
                console.log('Double Start ', v1, v2, v3, v4);
              }}
              onKeyDown={(v1, v2, v3, v4) => {
                console.log(v1, v2, v3, v4);
              }}
              //   onClick={(v1, v2, v3, v4) => {
              //     console.log(v1, v2, v3, v4);
              //   }}
            />
          </div>
          {/* <div className="hcl-col-6 mb-2">
            <TreeView
              //   expandedIcon={<i className="p-hclsw p-hclsw-export"></i>}
              //   collapsedIcon={<i className="p-hclsw p-hclsw-add"></i>}
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
              isMoveNodeAllowed={(
                dragModel,
                dropModel,
                parentNode,
                treeData
              ) => {
                let canDropInsideDropModel = false;

                if (dropModel.type === 'folder') {
                  canDropInsideDropModel = true;
                }

                return canDropInsideDropModel;
              }}
              isCopyAllowed={(dragModel, dropModel, treeData) => {
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
              treeData={this.state.treeData}
              getIcons={node => {
                if (node.type === 'floder') {
                  return <svg></svg>;
                }
              }}
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
                    expandIcon: <i className="p-hclsw p-hclsw-export"></i>,
                    collapsedIcon: <i className="p-hclsw p-hclsw-folder"></i>
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
                    icon: (
                      <svg
                        focusable="false"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        style={{ willChange: 'transform', fill: '#4696d2' }}
                      >
                        <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 7zm4 17.12h-8v-2.24h2.88v-6.76H13v-2.24h4.13v9H20z" />
                      </svg>
                    )
                  }
                }
              ]}
              getOverFlowItems={model => {
                let common = [
                  {
                    name: 'Rename',
                    action: 'edit',
                    icon: <i className="p-hclsw p-hclsw-folder"></i>
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
              onOverflowAction={async (action, model) => {
                console.log('action', action, model);

                if (action === 'copy') {
                  this.setState({
                    copiedNodeFromOneTreeToAnother: model
                  });
                }
                if (action === 'updateProperty') {
                  if (model.type === 'folder') {
                    model.type = 'file';
                  } else {
                    model.type = 'folder';
                  }

                  await this.timeout(0);
                  return model;
                } else {
                  return model;
                }
              }}
              onDeleteNode={async model => {
                //console.log(model);

                this.setState({
                  showModal: true,
                  selectedNode: model
                });
                return await this.confirmDelete();
              }}
              onRenamingNode={async model => {
                console.log('On Renaming Node');
                if (model.name.length > 5) {
                  return [true];
                }

                return [
                  false,
                  <Notification
                    //subtitle={errorMessage}
                    closable={false}
                    title="Please Enter minimum 5 character"
                    type="warning"
                    visible
                  />
                ];
                //   let textStatus = /^([a-z0-9]{5,})$/.test(model.name);
                //   console.log('textStatus', textStatus);

                //   return await textStatus;
              }}
              onMoveNode={async (dragModel, dropModel) => {
                console.log(dragModel, dropModel);
                return await this.timeout(0);
              }}
              onCopyNode={async (dragModel, dropModel) => {
                console.log(dragModel, dropModel);
                return await this.timeout(0);
              }}
              type="single"
              onChange={selected => {
                console.log('Selected Node', selected);
                this.setState({
                  nodeSelected: selected
                });
              }}
              onToggle={node => {
                console.log('On Toggle', node);
              }}
              onActionCompletes={(action, node1, node2, node3) => {
                console.log(action, node1, node2, node3);
                // console.log('onActionCompletes', action);
                // console.log('node1', node1);
                // console.log('node2', node2);

                // if (action === 'edit') {
                //   this.showToast(`${node1.name} renamed successfully`);
                // } else if (action === 'copy') {
                //   this.showToast(`node pasted successfully`);
                // } else if (action === 'cut') {
                //   this.showToast(`node moved successfully`);
                // } else if (action === 'delete') {
                //   this.showToast(`node deleted successfully`);
                // }
              }}
              //nodeSelected={this.state.nodeSelected}
              config={{ key: 'id' }}
              //   customTemplate={node => {
              //     return (
              //       <TreeNodeTemplate>
              //         <Checkbox
              //           id={node.id}
              //           label={`${node.name}`}
              //           value={node.id}
              //         />
              //       </TreeNodeTemplate>
              //     );
              //   }}
              overflowOnHover={true}
              //   customNodeTemplate={node => {
              //     return (
              //       <Checkbox id={node.id} label={node.name} value={node.id} />
              //     );
              //   }}
              // customActionTemplate={node => {
              //   console.log(node);

              // //   return (
              // //     <Overflowmenu
              // //       attachElementToBody={true}
              // //       direction="bottom-right"
              // //       customTemplate={
              // //         <button className="hcl-btn hcl-ghost">
              // //           <i className="p-hclsw p-hclsw-release"></i>
              // //         </button>
              // //       }
              // //       ellipsisType="vertical"
              // //       onClick={(item, index, e) => {
              // //         console.log('OVERFLOW SELECT');
              // //         console.log(item, index, e);
              // //       }}
              // //     >
              // //       <MenuItem item={'copy'}>
              // //         <i className="p-hclsw p-hclsw-copy"></i>Copy
              // //       </MenuItem>
              // //       <MenuItem item={'remove'} danger={true}>
              // //         <i className="p-hclsw p-hclsw-delete"></i>Delete
              // //       </MenuItem>
              // //       <MenuItem item={'view'}>
              // //         <i className="p-hclsw p-hclsw-view"></i>View
              // //       </MenuItem>
              // //     </Overflowmenu>
              // //   );
              //   return node.type === 'file' ? (
              //     <Button className="hcl-btn hcl-primary hcl-sm">Edit</Button>
              //   ) : (
              //     <Tag>10</Tag>
              //   );
              // }}
              expandedNodes={this.state.expandedNode}
              draggable="internal"
              onDragStart={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDragOver={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDragLeave={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDragEnter={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDragEnd={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDrop={(v1, v2, v3, v4) => {
                console.log('Drag Start ', v1, v2, v3, v4);
              }}
              onDoubleClick={(v1, v2, v3, v4) => {
                console.log('Double Start ', v1, v2, v3, v4);
              }}
              onKeyDown={(v1, v2, v3, v4) => {
                console.log(v1, v2, v3, v4);
              }}
              //   onClick={(v1, v2, v3, v4) => {
              //     console.log(v1, v2, v3, v4);
              //   }}
            />
          </div> */}
        </div>
        <button
          onClick={() => {
            this.setState({
              nodeSelected: ''
            });
          }}
        >
          Clear Selection
        </button>

        {this.state.showModal ? (
          <Modal
            actions={[
              {
                label: 'Yes',
                primary: true,
                handler: () => {
                  this.setState({
                    showModal: false
                  });

                  this.onAccept();
                }
              },
              {
                label: 'No',
                primary: false,
                handler: () => {
                  this.setState({
                    showModal: false
                  });
                  this.onReject();
                }
              }
            ]}
            heading="Delete Confirmation"
            type="danger"
          >
            <h5>
              Are you sure want to delete{' '}
              <span style={{ fontWeight: 'bold' }}>
                {this.state.selectedNode.name}
              </span>{' '}
              ?
            </h5>
          </Modal>
        ) : null}

        <Toast
          type="success"
          subtitle={this.state.toast.title}
          visible={this.state.toast.visible}
        />
      </section>
    );
  }
}

export default TreeExample;
