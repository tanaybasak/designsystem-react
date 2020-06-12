import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  findNextSiblingAncestor,
  findLastVisibleChildren,
  getConditionStatus,
  isInSameLevel
} from '../../util/treeUtil';
import Overflowmenu from '../../molecules/Overflowmenu';
import TextInput from '../TextInput';
const TreeNode = ({
  node,
  level,
  expandedIcon,
  collapsedIcon,
  iconClass,
  onSelectNode,
  selectedNode,
  configuration,
  onOverflowAction,
  dragRules,
  draggedNode,
  draggedNodeLevel,
  isMoveNodeAllowed,
  isCopyAllowed,
  parentNode,
  getOverFlowItems,
  cutNode,
  copiedNode,
  cutNodeLevel,
  updateTreeDataBasedOnAction,
  updateTreeState
}) => {
  // Toggle Tree Node Section
  const updateNodeToggleStatus = status => {
    if (typeof status === 'boolean') {
      node[configuration.displayChildren] = status;
    } else {
      node[configuration.displayChildren] = !node[
        configuration.displayChildren
      ];
    }
    updateTreeDataBasedOnAction('toggle-node', {
      node: node,
      level: level
    });
  };

  // Overflow Menu Section
  const [overflowItemList, updateOverflowItemList] = useState([]);

  const tiggerOverflowMenu = e => {
    e.stopPropagation();
    e.preventDefault();
    getOverflowMenuList();
  };
  const getOverflowMenuList = () => {
    const overflowList = getOverFlowItems(node);
    if (!level.startsWith(cutNodeLevel)) {
      if (
        cutNode &&
        cutNode[configuration.name] &&
        isMoveNodeAllowed(cutNode, node)
      ) {
        if (cutNodeLevel.substr(0, cutNodeLevel.lastIndexOf('-')) !== level) {
          overflowList.push({
            name: 'Paste',
            action: 'paste'
          });
        }
      } else if (copiedNode && isCopyAllowed(copiedNode, node)) {
        overflowList.push({
          name: 'Paste',
          action: 'paste'
        });
      }
    }
    updateOverflowItemList(overflowList);
  };

  const overflowListOnEnter = e => {
    e.stopPropagation();
    var key = e.which || e.keyCode;
    if (
      key === 13 &&
      !(
        e.target &&
        e.target.classList &&
        e.target.classList.contains('hcl-overflow-option-btn')
      )
    ) {
      getOverflowMenuList();
      e.currentTarget.querySelector('.hcl-ellipsis').click();
      e.preventDefault();
    }
  };

  const onOverflowItemSelect = async action => {
    if (action.action) {
      const actionName = action.action;
      if (actionName === 'edit') {
        updateTextStatus(true);
      } else if (actionName === 'cut') {
        updateTreeState('cutNode', {
          node: node,
          level: level
        });
        onOverflowAction(actionName, node);
      } else if (actionName === 'copy') {
        updateTreeState('copyNode', {
          node: node,
          level: level
        });
        onOverflowAction(actionName, node);
      } else if (actionName === 'paste') {
        if (cutNodeLevel) {
          updateTreeDataBasedOnAction('cut-paste', {
            cutNodeLevel: cutNodeLevel,
            level: level,
            node: node
          });
        } else {
          updateTreeDataBasedOnAction('copy-paste', {
            node: node,
            level: level,
            copyNode: copiedNode
          });
        }
      } else if (actionName === 'delete') {
        updateTreeDataBasedOnAction('delete', {
          level: level,
          node: node
        });
      } else {
        let nodeData = await onOverflowAction(actionName, node);
        updateTreeDataBasedOnAction('node-update', {
          node: nodeData,
          level: level
        });
      }
    }
  };

  // Overflow Menu Text Field Action Section

  const [showText, updateTextStatus] = useState(false);
  const [formStatus, updateFormStaus] = useState(false);

  const updateTextNodeOnBlur = e => {
    updateTreeNodeName(e.currentTarget.value);
  };

  const stopPropagation = e => {
    e.stopPropagation();
  };

  const getTextNode = () => {
    return (
      <div className="hcl-form-group hcl-text-container">
        <TextInput
          type="text"
          autoFocus
          value={node[configuration.name]}
          onBlur={updateTextNodeOnBlur}
          onKeyDown={updateTreenodeNameOnEnter}
          data-invalid={formStatus}
          onClick={stopPropagation}
        />
        <button onClick={closeTextField}>X</button>
      </div>
    );
  };

  const updateTreeNodeName = async value => {
    let nodeTemp = { ...node };
    if (nodeTemp[configuration.name] !== value) {
      nodeTemp[configuration.name] = value;

      let flag = await updateTreeDataBasedOnAction('edit', {
        level: level,
        node: nodeTemp
      });
      if (flag) {
        updateTextStatus(false);
        updateFormStaus(false);
      } else {
        updateFormStaus(true);
      }
    } else {
      updateTextStatus(false);
      updateFormStaus(false);
    }
  };

  const updateTreenodeNameOnEnter = event => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      updateTreeNodeName(event.currentTarget.value);
    } else if (event.key === 'Escape') {
      updateTextStatus(false);
      updateFormStaus(false);
    }
  };

  const closeTextField = event => {
    event.stopPropagation();
    event.preventDefault();
    updateTextStatus(false);
    updateFormStaus(false);
    //updateTreeNodeName('');
    //updateTreeNodeName(event.currentTarget.parentElement.children[0].value);
  };

  // Node Icon Section

  let iconClassObj = {};
  if (iconClass) {
    iconClass.map(actionSet => {
      if (actionSet.condition === 'all') {
        iconClassObj = actionSet.values;
      } else {
        const conditionStatus = getConditionStatus(actionSet.condition, node);
        if (conditionStatus) {
          iconClassObj = actionSet.values;
        }
      }
    });
  }

  // On Node Selection Section

  const selectNode = e => {
    if (onSelectNode) {
      e.stopPropagation();
      if (e.metaKey) {
        onSelectNode(null, e);
      } else {
        onSelectNode(node, e);
      }
    }
  };

  // On Node Focus Section

  const focusNode = node => {
    if (node.classList.contains('tree-item')) {
      node.children[0].focus();
    }
  };

  // Drag Node Section

  let draggable = false;
  if (isMoveNodeAllowed) {
    if (
      node[configuration.draggable] === true ||
      node[configuration.draggable] === false
    ) {
      draggable = node[configuration.draggable];
    } else {
      if (dragRules) {
        dragRules.map(rule => {
          const conditionStatus = getConditionStatus(rule.condition, node);
          if (conditionStatus) {
            draggable = true;
          }
        });
      }
    }
  }

  // Drag Start Node Section

  const dragStart = ev => {
    ev.dataTransfer.setData('text', level);
    //ev.dataTransfer.dropEffect = "move"

    updateTreeState('draggedNode', {
      node: node,
      level: level
    });
  };

  //Placeholder Utility Section

  const getDropRegionPlaceholderFromNode = ev => {
    const element = ev.currentTarget.getBoundingClientRect();
    const height = element.height;
    if (ev.clientY >= element.y && ev.clientY < element.y + height / 4) {
      return 'top';
    } else if (
      ev.clientY >= element.y + height / 4 &&
      ev.clientY <= element.y + (height / 4) * 3
    ) {
      return 'middle';
    } else if (
      ev.clientY > element.y + (height / 4) * 3 &&
      ev.clientY <= element.y + height
    ) {
      return 'bottom';
    }
  };

  const getDropRegionPlaceholderOutsideNode = ev => {
    const element = ev.currentTarget.getBoundingClientRect();
    const height = element.height;
    if (ev.clientY >= element.y && ev.clientY <= element.y + height / 2) {
      return 'top';
    } else if (
      ev.clientY > element.y + height / 2 &&
      ev.clientY <= element.y + height
    ) {
      return 'bottom';
    }
  };

  //Highlight Drop Region Section

  const [addBorder, updateBorderStatus] = useState('');
  const [highlightRow, updateHighlightRowStatus] = useState('');

  const dropRegionPlaceholder = (ev, position) => {
    if (position === 'top') {
      updateBorderStatus('add-border');
      updateHighlightRowStatus('');
    } else if (position === 'middle') {
      updateHighlightRowStatus('highlight-row');
      updateBorderStatus('');
    } else if (position === 'bottom') {
      updateBorderStatus('add-border-bottom');
      updateHighlightRowStatus('');
    }
  };

  const clearAll = () => {
    updateHighlightRowStatus('');
    updateBorderStatus('');
  };

  // Drag Over Node Section

  const onDragOverNode = ev => {
    ev.stopPropagation();
    if (level.startsWith(draggedNodeLevel)) {
      return;
    }
    if (
      draggedNodeLevel.substr(0, draggedNodeLevel.lastIndexOf('-')) === level
    ) {
      return;
    }

    const position = getDropRegionPlaceholderFromNode(ev);
    let isDroppable = false;
    if (position === 'middle') {
      isDroppable = isMoveNodeAllowed(draggedNode, node);
    } else {
      isDroppable = true;
      if (parentNode != null) {
        isDroppable = isMoveNodeAllowed(draggedNode, parentNode);
      }
    }

    if (isDroppable) {
      //ev.currentTarget.style.cursor = "pointer"
      ev.preventDefault();
      dropRegionPlaceholder(ev, position);
    } else {
      //ev.currentTarget.style.cursor = "no-drop"
      clearAll();
    }
  };

  const onDragOverOutsideNode = ev => {
    //ev.dataTransfer.dropEffect = "none"

    if (level.startsWith(draggedNodeLevel)) {
      //ev.currentTarget.style.cursor = "no-drop"
      return;
    }

    const position = getDropRegionPlaceholderOutsideNode(ev);
    let isDroppable = true;
    if (parentNode != null) {
      isDroppable = isMoveNodeAllowed(draggedNode, parentNode);
    }

    if (isDroppable) {
      //ev.currentTarget.style.cursor = "pointer";
      ev.preventDefault();
      dropRegionPlaceholder(ev, position);
    }
  };

  // On Drop Section

  const onDropOverNode = ev => {
    const position = getDropRegionPlaceholderFromNode(ev);
    onDrop(ev, position);
  };

  const onDropOutsideNode = ev => {
    const position = getDropRegionPlaceholderOutsideNode(ev);
    onDrop(ev, position);
  };

  const onDrop = (ev, position) => {
    ev.preventDefault();
    ev.stopPropagation();
    clearAll();
    var data = ev.dataTransfer.getData('text');
    updateElementPosition(position, data);
  };

  const updateElementPosition = (position, data) => {
    if (position === 'top') {
      if (isInSameLevel(data, level)) {
        if (
          parseInt(data.substr(data.lastIndexOf('-') + 1)) >
          parseInt(level.substr(level.lastIndexOf('-') + 1))
        ) {
          updateTreeDataBasedOnAction('move-node', {
            draggedNode: data,
            dropNode: level,
            node: node
          });
        } else {
          let newLevel = level;
          let topIndex =
            parseInt(newLevel.substr(newLevel.lastIndexOf('-') + 1)) - 1;
          if (topIndex < 0) {
            topIndex = 0;
          }
          newLevel =
            newLevel.substr(0, newLevel.lastIndexOf('-') + 1) + topIndex;
          updateTreeDataBasedOnAction('move-node', {
            draggedNode: data,
            dropNode: newLevel,
            node: node
          });
        }
      } else {
        updateTreeDataBasedOnAction('move-node', {
          draggedNode: data,
          dropNode: level,
          node: node
        });
      }
    } else if (position === 'bottom') {
      if (isInSameLevel(data, level)) {
        if (
          parseInt(data.substr(data.lastIndexOf('-') + 1)) >
          parseInt(level.substr(level.lastIndexOf('-') + 1))
        ) {
          let newLevel = level;
          let bottomIndex =
            parseInt(newLevel.substr(newLevel.lastIndexOf('-') + 1)) + 1;
          newLevel =
            newLevel.substr(0, newLevel.lastIndexOf('-') + 1) + bottomIndex;
          updateTreeDataBasedOnAction('move-node', {
            draggedNode: data,
            dropNode: newLevel,
            node: node
          });
        } else {
          updateTreeDataBasedOnAction('move-node', {
            draggedNode: data,
            dropNode: level,
            node: node
          });
        }
      } else {
        let newLevel = level;
        let bottomIndex =
          parseInt(newLevel.substr(newLevel.lastIndexOf('-') + 1)) + 1;
        newLevel =
          newLevel.substr(0, newLevel.lastIndexOf('-') + 1) + bottomIndex;
        updateTreeDataBasedOnAction('move-node', {
          draggedNode: data,
          dropNode: newLevel,
          node: node
        });
      }
    } else {
      updateTreeDataBasedOnAction('cut-paste', {
        cutNodeLevel: data,
        level: level
      });
    }
  };

  const keyDown = e => {
    // e.preventDefault()
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
          updateNodeToggleStatus(true);
          //toggleNode(true);
        }
        e.preventDefault();
        break;
      }
      case 37: {
        if (
          nodeElement.parentElement.hasAttribute('aria-expanded') &&
          nodeElement.parentElement.getAttribute('aria-expanded') === 'true'
        ) {
          updateNodeToggleStatus(false);
          //toggleNode(false);
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

  const getTitleNode = () => {
    return (
      <span
        onClick={selectNode}
        className={`tree-text-node${
          selectedNode === node ? ' highlight' : ''
        } ${highlightRow}${cutNode === node ? ' hcl-cut-node' : ''}`}
        title={node[configuration.name]}
        draggable={draggable}
        onDragStart={dragStart}
      >
        <div onDragOver={onDragOverNode} onDrop={onDropOverNode}>
          {node[configuration.name]}
        </div>
      </span>
    );
  };

  const getOverflowNode = () => {
    return (
      <div
        onClick={tiggerOverflowMenu}
        onKeyDown={overflowListOnEnter}
        className="treenode-overflow"
      >
        <Overflowmenu
          listItems={overflowItemList}
          onClick={onOverflowItemSelect}
          direction="right"
        />
      </div>
    );
  };

  return (
    <li
      className="tree-item"
      role="treeitem"
      aria-expanded={`${node[configuration.displayChildren]}`}
    >
      {(node[configuration.children] &&
        node[configuration.children].length != 0) ||
      node[configuration.hasChildren] ? (
        <div
          className={`tree-node ${addBorder}`}
          tabIndex="0"
          level={level}
          onKeyDown={keyDown}
          onClick={updateNodeToggleStatus}
          onDrop={onDropOutsideNode}
          onDragOver={onDragOverOutsideNode}
          onDragLeave={clearAll}
          onDragEnd={clearAll}
        >
          <i
            className={`toggle-icon ${
              node[configuration.displayChildren] ? expandedIcon : collapsedIcon
            }`}
          />
          <div className="treenode-action-wrapper">
            <div
              className={`treenode-content-wrapper${
                getOverFlowItems ? ' with-overflow' : ''
              }`}
            >
              {node[configuration.expandIcon] &&
              node[configuration.displayChildren] ? (
                <i className={node[configuration.expandIcon]} />
              ) : iconClassObj.expandIcon &&
                node[configuration.displayChildren] ? (
                <i className={iconClassObj.expandIcon} />
              ) : null}

              {node[configuration.collapsedIcon] &&
              !node[configuration.displayChildren] ? (
                <i className={node[configuration.collapsedIcon]} />
              ) : iconClassObj.collapsedIcon &&
                !node[configuration.displayChildren] ? (
                <i className={iconClassObj.collapsedIcon} />
              ) : null}

              {node[configuration.icon] ? (
                <i className={node[configuration.icon]}> </i>
              ) : iconClassObj.icon ? (
                <i className={iconClassObj.icon} />
              ) : null}

              {showText ? getTextNode() : getTitleNode()}
            </div>
            {getOverFlowItems ? getOverflowNode() : null}
          </div>
        </div>
      ) : (
        <div
          className={`tree-node no-children-exist ${addBorder}`}
          tabIndex="0"
          level={level}
          onKeyDown={keyDown}
          onDragLeave={clearAll}
          onDrop={onDropOutsideNode}
          onDragOver={onDragOverOutsideNode}
          onDragEnd={clearAll}
        >
          <div className="treenode-action-wrapper">
            <div
              className={`treenode-content-wrapper${
                getOverFlowItems ? ' with-overflow' : ''
              }`}
            >
              {node[configuration.expandIcon] &&
              node[configuration.displayChildren] ? (
                <i className={node[configuration.expandIcon]} />
              ) : iconClassObj.expandIcon &&
                node[configuration.displayChildren] ? (
                <i className={iconClassObj.expandIcon} />
              ) : null}

              {node[configuration.collapsedIcon] &&
              !node[configuration.displayChildren] ? (
                <i className={node[configuration.collapsedIcon]} />
              ) : iconClassObj.collapsedIcon &&
                !node[configuration.displayChildren] ? (
                <i className={iconClassObj.collapsedIcon} />
              ) : null}

              {node[configuration.icon] ? (
                <i className={node[configuration.icon]}> </i>
              ) : iconClassObj.icon ? (
                <i className={iconClassObj.icon} />
              ) : null}

              {showText ? getTextNode() : getTitleNode()}
            </div>
            {getOverFlowItems ? getOverflowNode() : null}
          </div>
        </div>
      )}

      {node[configuration.children] &&
      node[configuration.children].length > 0 &&
      node[configuration.displayChildren] ? (
        <ul role="group" className="tree-nested">
          {node[configuration.children].map((subnode, subIndex) => {
            return (
              <TreeNode
                node={subnode}
                iconClass={iconClass}
                parentNode={node}
                key={`treeNodeIndex-${subIndex}`}
                expandedIcon={expandedIcon}
                isMoveNodeAllowed={isMoveNodeAllowed}
                isCopyAllowed={isCopyAllowed}
                dragRules={dragRules}
                collapsedIcon={collapsedIcon}
                onSelectNode={onSelectNode}
                draggedNode={draggedNode}
                draggedNodeLevel={draggedNodeLevel}
                level={level + '-' + subIndex}
                selectedNode={selectedNode}
                configuration={configuration}
                onOverflowAction={onOverflowAction}
                cutNode={cutNode}
                cutNodeLevel={cutNodeLevel}
                copiedNode={copiedNode}
                getOverFlowItems={getOverFlowItems}
                updateTreeDataBasedOnAction={updateTreeDataBasedOnAction}
                updateTreeState={updateTreeState}
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
  iconClass: PropTypes.any,
  dragRules: PropTypes.any,
  level: PropTypes.string,
  selectedNode: PropTypes.any,
  expandedIcon: PropTypes.string,
  collapsedIcon: PropTypes.string,
  onSelectNode: PropTypes.func,
  isMoveNodeAllowed: PropTypes.func,
  isCopyAllowed: PropTypes.func,
  onOverflowAction: PropTypes.func,
  configuration: PropTypes.any,
  draggedNode: PropTypes.any,
  parentNode: PropTypes.any,
  draggedNodeLevel: PropTypes.string,
  getOverFlowItems: PropTypes.func,
  cutNode: PropTypes.any,
  cutNodeLevel: PropTypes.string,
  copiedNode: PropTypes.any,
  updateTreeDataBasedOnAction: PropTypes.func,
  updateTreeState: PropTypes.func
};

TreeNode.defaultProps = {
  node: {},
  level: 0,
  iconClass: null,
  dragRules: null,
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  onSelectNode: () => {},
  selectedNode: {},
  configuration: {},
  onOverflowAction: () => {},
  isMoveNodeAllowed: () => {},
  isCopyAllowed: () => {},
  draggedNode: null,
  parentNode: null,
  draggedNodeLevel: '',
  cutNode: null,
  copiedNode: null,
  cutNodeLevel: '',
  getOverFlowItems: null,
  updateTreeDataBasedOnAction: () => {},
  updateTreeState: () => {}
};

export default TreeNode;
