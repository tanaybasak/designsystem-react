/* eslint-disable react/jsx-key */
import React, { Component } from 'react';
import TreeView from '../../atoms/TreeView/TreeView';
import Button from '../../atoms/Button/Button';
import treeData from './treedata.json';
import Notification from '../../atoms/Notification';
import { ToolBar, ToolBarActions } from '../../molecules/ToolBar';
import './treeview.css';
class TreeviewWithNewFolder extends Component {
  state = {
    treeData: treeData,
    config: { key: 'id', externalExpandNode: true },
    expandedNodes: null,
    selectedNode: null,
    newfolderNode: null,
    customNodeStyle: null,
    errorMessage: null,
    formStatus: false,
    showBusyLoader: false,
    renameNodeId: null
  };

  createNewFolder = () => {
    const tempFolder = {
      name: 'New Folder',
      type: 'folder',
      id: `temp-node-${new Date().getTime()}`
    };

    const treeData = [...this.state.treeData];

    this.addNewFolderToSelectedNode(
      treeData,
      this.state.selectedNode,
      tempFolder
    );

    const expandedNodes = { ...this.state.expandedNodes };
    expandedNodes[this.state.selectedNode.id] = true;

    this.setState({
      treeData: treeData,
      expandedNodes: expandedNodes,
      newfolderNode: tempFolder,
      renameNodeId: tempFolder.id
    });
  };

  addNewFolderToSelectedNode(treeData, item, newItem) {
    treeData.map(data => {
      if (data.id === item.id) {
        if (data.children && Array.isArray(data.children)) {
          data.children.push(newItem);
        } else {
          data.children = [];
          data.children.push(newItem);
        }
      }
      if (data.children && data.children.length > 0) {
        this.addNewFolderToSelectedNode(data.children, item, newItem);
      }
    });
  }

  render() {
    return (
      <div className="tree-newfolder-wrapper">
        <ToolBar>
          <ToolBarActions>
            <Button
              disabled={
                this.state.selectedNode &&
                this.state.selectedNode.type === 'folder'
                  ? false
                  : true
              }
              kind="button"
              onClick={this.createNewFolder}
              small
              type="secondary"
            >
              New Folder
            </Button>
          </ToolBarActions>
        </ToolBar>
        <div className="tree-wrapper">
          <TreeView
            treeData={this.state.treeData}
            renameNodeId={this.state.renameNodeId}
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
            nodeStyleTemplate={this.nodeStyleTemplate}
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
            customNodeStyle={this.state.customNodeStyle}
            type="single"
            config={this.state.config}
            onChange={node => {
              this.setState({
                selectedNode: node
              });
            }}
            onToggle={async node => {
              const expandedNodes = { ...this.state.expandedNodes };
              if (expandedNodes[node.id]) {
                delete expandedNodes[node.id];
              } else {
                expandedNodes[node.id] = true;
              }

              this.setState({
                expandedNodes: expandedNodes
              });
            }}
            nodeSelected={this.state.selectedNode}
            expandedNodes={this.state.expandedNodes}
          />
        </div>
      </div>
    );
  }
}

export default TreeviewWithNewFolder;
