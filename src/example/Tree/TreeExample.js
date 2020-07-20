/* eslint-disable no-console */
import React, { Component } from 'react';
import TreeView from '../../atoms/TreeView/TreeView';
import Modal from '../../molecules/Modal';
import Toast from '../../atoms/Toast';

class TreeExample extends Component {
  state = {
    nodeSelected: null,
    toast: {
      visible: false,
      type: 'success'
    },
    treeData: [
      {
        name: 'Main',
        displayChildren: true,
        type: 'folder',
        expandIcon: 'pi pi-View',
        action: [],
        children: [
          {
            name: '1',
            displayChildren: false,
            type: 'folder',
            children: []
          },
          {
            name: '2',
            displayChildren: false,
            type: 'file',
            draggable: true,
            children: []
          },
          {
            name: '3',
            displayChildren: false,
            type: 'file',
            draggable: true,
            children: []
          },
          {
            name: '4',
            displayChildren: false,
            type: 'file',
            draggable: true,
            children: []
          }
        ]
      },
      {
        name: 'Folder 2',
        displayChildren: false,
        type: 'folder',
        children: [
          {
            name: 'Folder 2.1',
            displayChildren: false,
            type: 'folder',
            children: [
              {
                name: 'File 2.1.1',
                displayChildren: false,
                type: 'file',
                draggable: true,
                children: []
              },
              {
                name: 'Folder 2.1.2',
                displayChildren: false,
                type: 'folder',
                children: []
              }
            ]
          },
          {
            name: 'Folder 2.2',
            displayChildren: false,
            type: 'folder',
            children: [
              {
                name: 'Folder 2.2.1',
                displayChildren: false,
                type: 'folder',
                children: [
                  {
                    name: 'File 2.2.1.1',
                    displayChildren: false,
                    type: 'file',
                    draggable: true,
                    children: []
                  },
                  {
                    name: 'File 2.2.1.2',
                    displayChildren: false,
                    type: 'file',
                    draggable: true,
                    children: []
                  }
                ]
              },
              {
                name: 'File 2.2.2',
                displayChildren: false,
                type: 'file',
                draggable: true,
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
        draggable: false,
        children: []
      }
    ],

    treeData1: [
      {
        name: 'Section 1',
        displayChildren: false,
        children: [
          {
            name: 'Sub Section 1.1',
            displayChildren: false,
            children: [
              {
                name: 'Sub Section 1.1.1',
                displayChildren: false,
                children: []
              },
              {
                name: 'Sub Section 1.1.2',
                displayChildren: false,
                children: []
              }
            ]
          },
          {
            name: 'Sub Section 1.2',
            displayChildren: false,
            children: []
          }
        ]
      },
      {
        name: 'Section 2',
        displayChildren: false,
        children: [
          {
            name: 'Sub Section 2.1',
            displayChildren: false,
            children: [
              {
                name: 'Sub Section 2.1.1',
                displayChildren: false,
                children: []
              },
              {
                name: 'Sub Section 2.1.2',
                displayChildren: false,
                children: []
              }
            ]
          },
          {
            name: 'Sub Section 2.2',
            displayChildren: false,
            children: [
              {
                name: 'Sub Section 2.2.1',
                displayChildren: false,
                children: [
                  {
                    name: 'Sub Section 2.2.1.1',
                    displayChildren: false,
                    children: []
                  },
                  {
                    name: 'Sub Section 2.2.1.2',
                    displayChildren: false,
                    children: []
                  }
                ]
              },
              {
                name: 'Sub Section 2.2.2',
                displayChildren: false,
                children: []
              }
            ]
          }
        ]
      },
      {
        name: 'Section 3',
        displayChildren: false,
        children: []
      }
    ],

    selectedNode: {},
    showModal: false
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
      <main className="hcl-content-main">
        <section className="hcl-container pt-5 mb-5">
          <div className="hcl-row">
            <div className="hcl-col-4 mb-2">
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
                isMoveNodeAllowed={(dragModel, dropModel, treeData) => {
                  if (
                    dragModel.type === 'file' &&
                    dropModel.type === 'folder'
                  ) {
                    return true;
                  } else if (
                    dragModel.type === 'folder' &&
                    dropModel.type === 'folder'
                  ) {
                    return true;
                  }
                  return false;
                }}
                isCopyAllowed={(dragModel, dropModel, treeData) => {
                  if (
                    dragModel.type === 'file' &&
                    dropModel.type === 'folder'
                  ) {
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
                      expandIcon: 'pi pi-export',
                      collapsedIcon: 'pi pi-folder'
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
                      icon: 'pi pi-document'
                    }
                  }
                ]}
                getOverFlowItems={model => {
                  let common = [
                    {
                      name: 'Rename',
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
                onOverflowAction={async (action, model) => {
                  console.log('action', action);
                  if (action === 'updateProperty') {
                    if (model.type === 'folder') {
                      model.type = 'file';
                    } else {
                      model.type = 'folder';
                    }

                    await this.timeout(3000);
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
                  console.log(model);

                  let textStatus = /^([a-z0-9]{5,})$/.test(model.name);
                  console.log('textStatus', textStatus);

                  return await textStatus;
                }}
                onMoveNode={async (dragModel, dropModel) => {
                  console.log(dragModel, dropModel);
                  return await this.timeout(3000);
                }}
                onCopyNode={async (dragModel, dropModel) => {
                  console.log(dragModel, dropModel);
                  return await this.timeout(3000);
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
                onActionCompletes={(action, node1, node2) => {
                  console.log('onActionCompletes', action);
                  console.log('node1', node1);
                  console.log('node2', node2);

                  if (action === 'edit') {
                    this.showToast(`${node1.name} renamed successfully`);
                  } else if (action === 'copy') {
                    this.showToast(`node pasted successfully`);
                  } else if (action === 'cut') {
                    this.showToast(`node moved successfully`);
                  } else if (action === 'delete') {
                    this.showToast(`node deleted successfully`);
                  }
                }}
                nodeSelected={this.state.nodeSelected}
              />
            </div>
            <div className="hcl-col-6 mb-2">
              <TreeView
                treeData={this.state.treeData1}
                type="single"
                onChange={selected => {
                  console.log('selected item', selected);
                }}
              />
            </div>
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
      </main>
    );
  }
}

export default TreeExample;
