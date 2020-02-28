import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  findNextSiblingAncestor,
  findLastVisibleChildren
} from '../../util/treeUtil';
import Overflowmenu from '../../molecules/Overflowmenu';
import TextInput from '../TextInput';
const TreeNode = ({
  node,
  level,
  expandedIcon,
  collapsedIcon,
  onSelectNode,
  selectedNode,
  configuration,
  onToggleNode,
  updateTreeData,
  globalOverFlowAction,
  onOverFlowActionChange,
  onOverflowAction
}) => {
  const [showChildren, toggleNode] = useState(
    node[configuration.displayChildren]
  );

  const [showText, updateTextStatus] = useState(false);

  const [nodeData, updateNodeData] = useState(node);

  const [addBorder , updateBorderStatus] = useState('');

  const toggleTreeNode = () => {
    toggleNode(!showChildren);
    if (onToggleNode) {
      onToggleNode(nodeData);
    }
  };

  const nodeClicked = e => {
    if (e.currentTarget.getAttribute('action')) {
      if (e.currentTarget.getAttribute('action') === 'edit') {
        updateTextStatus(true);
      }
      onOverflowAction(e.currentTarget.getAttribute('action'), nodeData);
    }
  };

  const stopPropagation = e => {
    e.stopPropagation();
  };

  const updateNodeNameOnBlur = async event => {
    let nodeTemp = { ...nodeData };
    nodeTemp[configuration.name] = event.currentTarget.value;
    //console.log("onOverFlowActionChange('edit', nodeTemp)" , onOverFlowActionChange('edit', nodeTemp))
    let flag = await onOverFlowActionChange('edit', nodeTemp);
    if(flag){
        updateTextStatus(false);
        updateNodeData(nodeTemp);
    }else{
        updateTextStatus(false);
    }
  }

  const selectNode = e => {
    if (onSelectNode) {
      e.stopPropagation();
      onSelectNode(node, e);
    }
  };

  const focusNode = node => {
    if (node.classList.contains('tree-item')) {
      node.children[0].focus();
    }
  };

  const allowDrop = ev => {
    ev.preventDefault();
    console.log("updateBorderStatus")
    //updateBorderStatus('add-border')

  };

  const dragLeave = ev => {
    updateBorderStatus('')
  }

  const dragEnter = ev => {
    updateBorderStatus('add-border')
  }

  const drag = (data, ev) => {
    ev.dataTransfer.setData('text', level);
  };

  const drop = (dropdata, ev) => {
    ev.preventDefault();
    updateBorderStatus('')
    var data = ev.dataTransfer.getData('text');
    updateTreeData(data, level);
  };

  let overflowItem = [];

  globalOverFlowAction.map( actionSet => {

    if(actionSet.condition === "all"){
        overflowItem = [...overflowItem , ...actionSet.values]
    }else{
        let conditionStatus = true;
        actionSet.condition.map( condition => {
            if(conditionStatus){
                if(condition.operand === "="){
                    if(nodeData[condition.operator] === condition.value){
                        conditionStatus = true;
                        
                    }else{
                        conditionStatus = false;
                    }
                }
            }
            
            
        })

        if(conditionStatus){
            overflowItem = [...overflowItem , ...actionSet.values]
        }


    }
  })

  const keyDown = e => {
    var key = e.which || e.keyCode;
    const nodeElement = e.currentTarget;
    switch (key) {
      case 40: {
        if (
          nodeElement.parentElement.getAttribute('aria-expanded') === 'true' &&
          nodeElement.nextElementSibling &&
          nodeElement.nextElementSibling.children &&
          nodeElement.nextElementSibling.children.length > 0
        ) {
          focusNode(nodeElement.nextElementSibling.children[0]);
        } else {
          if (nodeElement.parentElement.nextElementSibling) {
            focusNode(nodeElement.parentElement.nextElementSibling);
          } else {
            const nextSiblingAncestor = findNextSiblingAncestor(nodeElement);
            if (nextSiblingAncestor) {
              focusNode(nextSiblingAncestor);
            }
          }
        }
        e.preventDefault();
        break;
      }
      case 38: {
        if (nodeElement.parentElement.previousElementSibling) {
          const lastElement = findLastVisibleChildren(
            nodeElement.parentElement.previousElementSibling
          );
          focusNode(lastElement);
        } else {
          const parentNodeElement =
            nodeElement.parentElement.parentElement.parentElement;
          if (parentNodeElement) {
            focusNode(parentNodeElement);
          }
        }
        e.preventDefault();
        break;
      }
      case 39: {
        if (
          nodeElement.parentElement.hasAttribute('aria-expanded') &&
          nodeElement.parentElement.getAttribute('aria-expanded') === 'false'
        ) {
          if (onToggleNode) {
            onToggleNode(nodeData);
          }

          toggleNode(true);
        }
        e.preventDefault();
        break;
      }
      case 37: {
        if (
          nodeElement.parentElement.hasAttribute('aria-expanded') &&
          nodeElement.parentElement.getAttribute('aria-expanded') === 'true'
        ) {
          if (onToggleNode) {
            onToggleNode(nodeData);
          }
          toggleNode(false);
        } else {
          const parentNodeElement =
            nodeElement.parentElement.parentElement.parentElement;
          if (parentNodeElement) {
            focusNode(parentNodeElement);
          }
        }
        e.preventDefault();
        break;
      }
      case 13: {
        selectNode(e);
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  return (
    <li className="tree-item" role="treeitem" aria-expanded={`${showChildren}`}>
      {(nodeData[configuration.children] &&
        nodeData[configuration.children].length != 0) ||
      nodeData[configuration.hasChildren] ? (
        <div
          className={`tree-node ${addBorder}`}
          tabIndex="0"
          level={level}
          onKeyDown={keyDown}
          onClick={toggleTreeNode}
          draggable="true"
          onDragStart={drag.bind(this, nodeData)}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={drop.bind(this, nodeData)}
          onDragOver={allowDrop}
        >
          <i
            className={`toggle-icon ${
              showChildren ? expandedIcon : collapsedIcon
            }`}
          />

          {nodeData[configuration.expandIcon] && showChildren ? (
            <i className={nodeData[configuration.expandIcon]} />
          ) : null}

          {nodeData[configuration.collapsedIcon] && !showChildren ? (
            <i className={nodeData[configuration.collapsedIcon]} />
          ) : null}

          {nodeData[configuration.icon] ? (
            <i className={nodeData[configuration.icon]}> </i>
          ) : null}

          {showText ? (
            <TextInput
              type="text"
              autoFocus={true}
              className="tree-textbox"
              value={nodeData[configuration.name]}
              onBlur={updateNodeNameOnBlur}
              onClick={stopPropagation}
            />
          ) : (
            <span
              onClick={selectNode}
              className={selectedNode === nodeData ? 'highlight' : ''}
            >
              {nodeData[configuration.name]}
            </span>
          )}

          {globalOverFlowAction ? (
            <span onClick={stopPropagation} className="treenode-overflow">
              <Overflowmenu
                listItems={overflowItem}
                onClick={nodeClicked}
                direction="right"
              />
            </span>
          ) : null}
        </div>
      ) : (
        <div
          className={`tree-node no-toggle-element ${addBorder}`}
          tabIndex="0"
          level={level}
          onKeyDown={keyDown}
          draggable="true"
          onDragStart={drag.bind(this, nodeData)}
          onDrop={drop.bind(this, nodeData)}
          onDragOver={allowDrop}
        >
          {nodeData[configuration.icon] ? (
            <i className={nodeData[configuration.icon]}> </i>
          ) : null}

          {showText ? (
            <TextInput
              type="text"
              autoFocus={true}
              className="tree-textbox"
              value={nodeData[configuration.name]}
              onBlur={updateNodeNameOnBlur}
              onClick={stopPropagation}
            />
          ) : (
            <span
              onClick={selectNode}
              className={selectedNode === nodeData ? 'highlight' : ''}
            >
              {nodeData[configuration.name]}
            </span>
          )}
        {
            globalOverFlowAction ? (<span onClick={stopPropagation} className="treenode-overflow">
            <Overflowmenu
              listItems={overflowItem}
              onClick={nodeClicked}
              direction="right"
            />
          </span>) : null
        }
          
        </div>
      )}

      {nodeData[configuration.children] &&
      nodeData[configuration.children].length > 0 &&
      showChildren ? (
        <ul role="group" className="tree-nested">
          {nodeData[configuration.children].map((subnode, subIndex) => {
            return (
              <TreeNode
                node={subnode}
                key={`treeNodeIndex-${subIndex}`}
                expandedIcon={expandedIcon}
                collapsedIcon={collapsedIcon}
                onSelectNode={onSelectNode}
                level={level + '-' + subIndex}
                selectedNode={selectedNode}
                onToggleNode={onToggleNode}
                configuration={configuration}
                updateTreeData={updateTreeData}
                globalOverFlowAction={globalOverFlowAction}
                onOverflowAction={onOverflowAction}
                onOverFlowActionChange={onOverFlowActionChange}
              />
            );
          })}
        </ul>
      ) : null}
    </li>
  );
};

TreeNode.propTypes = {
  node: PropTypes.any,
  level: PropTypes.string,
  selectedNode: PropTypes.any,
  expandedIcon: PropTypes.string,
  collapsedIcon: PropTypes.string,
  onSelectNode: PropTypes.func,
  onToggleNode: PropTypes.func,
  updateTreeData: PropTypes.func,
  onOverFlowActionChange: PropTypes.func,
  onOverflowAction: PropTypes.func,
  configuration: PropTypes.any,
  globalOverFlowAction: PropTypes.any
};

TreeNode.defaultProps = {
  node: {},
  level: 0,
  globalOverFlowAction: null,
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  onSelectNode: () => {},
  onToggleNode: () => {},
  updateTreeData: () => {},
  selectedNode: {},
  configuration: {},
  onOverFlowActionChange: () => {},
  onOverflowAction: () => {}
};

export default TreeNode;
