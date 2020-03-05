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
  onToggleNode,
  updateTreeData,
  updateTreeDataPosition,
  globalOverFlowAction,
  onOverFlowActionChange,
  onOverflowAction,
  updateTreeNodeDataMain,
  dragRules,
  onDragNode,
  draggedNode,
  draggedNodeLevel,
  onDragOverTree,
  parentNode,

  onCutNode,
  cutNode,
  cutNodeLevel
}) => {
  //   const [showChildren, toggleNode] = useState(
  //     node[configuration.displayChildren]
  //   );

  //   const [, updateState] = React.useState();
  //   const forceUpdate = useCallback(() => updateState({}), []);

  const updateNodeToggleStatus = status => {
    //let node = { ...nodeData };
    if (status !== undefined) {
      node[configuration.displayChildren] = status;
      //toggleNode(status);
    } else {
      node[configuration.displayChildren] = !node[
        configuration.displayChildren
      ];
      //toggleNode(!node[configuration.displayChildren]);
    }

    //updateNodeData(node);

    updateTreeNodeDataMain(node, level);
  };

  const [showText, updateTextStatus] = useState(false);

  const [droppableNode, updateDroppableNode] = useState(false);

  //   const [nodeData, updateNodeData] = useState(node);

  const [addBorder, updateBorderStatus] = useState('');
  const [highlightRow, updateHighlightRowStatus] = useState('');

  const toggleTreeNode = () => {
    updateNodeToggleStatus();
    if (onToggleNode) {
      onToggleNode(node);
    }
  };

  //   useEffect(() => {
  // }, [node]);

  const nodeClicked = async e => {
    if (e.currentTarget.getAttribute('action')) {
      if (e.currentTarget.getAttribute('action') === 'edit') {
        updateTextStatus(true);
        //onOverflowAction(e.currentTarget.getAttribute('action'), node);
      } else if (e.currentTarget.getAttribute('action') === 'cut') {
        onCutNode(node, level);
        // overflowItem.push({
        //     name: 'Paste',
        //     action: 'paste'
        //   })
        //onOverflowAction(e.currentTarget.getAttribute('action'), node);
      } else {
        let nodeData = await onOverflowAction(
          e.currentTarget.getAttribute('action'),
          node
        );
        updateTreeNodeDataMain(nodeData, level);
      }
    }
  };

  const stopPropagation = e => {
    e.stopPropagation();
  };

  const updateNodeNameOnBlur = async event => {
    //event.stopPropagation()
    let nodeTemp = { ...node };
    nodeTemp[configuration.name] = event.currentTarget.value;
    let flag = await onOverFlowActionChange('edit', nodeTemp);
    if (flag) {
      updateTextStatus(false);
      updateTreeNodeDataMain(nodeTemp, level);
      //updateNodeData(nodeTemp);
    } else {
      updateTextStatus(false);
    }
  };

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

  const dropRuleMatching = () => {
    let droppable = false;
    if (dragRules) {
      dragRules.map(rule => {
        const conditionStatus = getConditionStatus(rule.condition, draggedNode);
        if (conditionStatus) {
          droppable = getConditionStatus(rule.dropRegion, node);
        }
      });
    }
    return droppable;
  };

  const dragLeave = ev => {
    updateBorderStatus('');
  };

  const allowDropLevel = ev => {
    if (level.startsWith(draggedNodeLevel)) {
      return;
    }

    const position = getDropRegionPlaceholderPositionLevel(ev);
    let isDroppable = true;
    if (parentNode != null) {
      isDroppable = onDragOverTree(draggedNode, parentNode);
    }

    if (isDroppable) {
      ev.preventDefault();
      updateDroppableNode(true);
      dropRegionPlaceholder(ev, position);
    } else {
      updateDroppableNode(false);
    }

    // if (draggedNode !== node && parentNode != null) {
    //   let isDroppable = onDragOverTree(draggedNode, parentNode);

    //   if (isDroppable) {
    //     ev.preventDefault();
    //     updateDroppableNode(true);
    //     dropRegionPlaceholder(ev)

    //   } else {
    //     updateDroppableNode(false);
    //   }
    // } else if (parentNode == null) {
    //   ev.preventDefault();
    //   dropRegionPlaceholder(ev)
    // }
  };
  const allowDrop = ev => {
    ev.stopPropagation();

    if (level.startsWith(draggedNodeLevel)) {
      return;
    }

    const position = getDropRegionPlaceholderPosition(ev);
    let isDroppable = false;
    if (position === 'middle') {
      isDroppable = onDragOverTree(draggedNode, node);
    } else {
      isDroppable = true;
      if (parentNode != null) {
        isDroppable = onDragOverTree(draggedNode, parentNode);
      }
    }

    if (isDroppable) {
      ev.preventDefault();
      updateDroppableNode(true);
      dropRegionPlaceholder(ev, position);
    } else {
      updateDroppableNode(false);
      updateHighlightRowStatus('');
      updateBorderStatus('');
    }

    // if (draggedNode !== node && parentNode != null) {
    //     let isDroppable = onDragOverTree(draggedNode, parentNode);

    //     if (isDroppable) {
    //       ev.preventDefault();
    //       updateDroppableNode(true);
    //       dropRegionPlaceholder(ev)

    //     } else {
    //       updateDroppableNode(false);
    //     }
    //   } else if (parentNode == null) {
    //     ev.preventDefault();
    //     dropRegionPlaceholder(ev)
    //   }
    // if (draggedNode !== node && parentNode != null) {
    //   let isDroppable = onDragOverTree(draggedNode, parentNode);

    //   if (isDroppable) {
    //     ev.preventDefault();
    //     updateDroppableNode(true);
    //     dropRegionPlaceholder(ev)

    //   } else {
    //     updateDroppableNode(false);
    //   }
    // } else if (parentNode == null) {
    //   ev.preventDefault();
    //   dropRegionPlaceholder(ev)
    // }
  };

  const clearAll = ev => {
    updateHighlightRowStatus('');
    updateBorderStatus('');
  };

  const dropRegionPlaceholder = (ev, position) => {
    //const position = getDropRegionPlaceholderPosition(ev);
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

  const getDropRegionPlaceholderPosition = ev => {
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
  const getDropRegionPlaceholderPositionLevel = ev => {
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

  const dragOverNode = ev => {
    if (level.startsWith(draggedNodeLevel)) {
      return;
    }
    if (draggedNode !== node) {
      let isDroppable = onDragOverTree(draggedNode, node);

      if (isDroppable) {
        ev.preventDefault();
        updateDroppableNode(true);
      } else {
        updateDroppableNode(false);
      }
    } else {
      updateDroppableNode(false);
    }

    // if (dropRuleMatching()) {
    //   ev.preventDefault();
    //   updateDroppableNode(false)
    // }else{
    //     updateDroppableNode(true)
    // }
    ev.stopPropagation();
  };
  const dragEnter = ev => {
    if (level.startsWith(draggedNodeLevel)) {
      return;
    }
    if (draggedNode !== node && parentNode !== null) {
      let isDroppable = onDragOverTree(draggedNode, parentNode);

      if (isDroppable) {
        ev.preventDefault();
        updateBorderStatus('add-border');
      }
    } else if (parentNode === null) {
      ev.preventDefault();
      updateBorderStatus('add-border');
    }
  };

  const highlightRowFn = ev => {
    ev.stopPropagation();
    if (level.startsWith(draggedNodeLevel)) {
      return;
    }

    if (draggedNode !== node) {
      let isDroppable = onDragOverTree(draggedNode, node);

      if (isDroppable) {
        updateHighlightRowStatus('highlight-row');
      }
    }

    // if(droppableNode){
    //     updateHighlightRowStatus('highlight-row');
    // }
    //ev.preventDefault();
  };

  const cancelHighlightRow = ev => {
    ev.stopPropagation();
    //ev.preventDefault();
    updateHighlightRowStatus('');
  };

  const drag = (data, ev) => {
    ev.dataTransfer.setData('text', level);
    onDragNode(node, level);
  };

  const drop = (dropdata, ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const position = getDropRegionPlaceholderPosition(ev);
    updateBorderStatus('');
    updateHighlightRowStatus('');
    var data = ev.dataTransfer.getData('text');
    updateTreeData(data, level);
  };

  const dropLevel = (dropdata, ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const position = getDropRegionPlaceholderPosition(ev);
    updateBorderStatus('');
    updateHighlightRowStatus('');
    var data = ev.dataTransfer.getData('text');
    updateElementPosition(position, data);
    // if (position === 'top') {
    //   updateTreeDataPosition(data, level);
    // } else if (position === 'bottom') {
    //   let newLevel = level;
    //   newLevel = newLevel.slice(0, -1) + (parseInt(newLevel.substr(-1)) + 1);
    //   updateTreeDataPosition(data, newLevel);
    // } else {
    //   updateTreeData(data, level);
    // }
  };

  const dropOnlyLevel = (dropdata, ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const position = getDropRegionPlaceholderPositionLevel(ev);
    updateBorderStatus('');
    updateHighlightRowStatus('');
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
          updateTreeDataPosition(data, level);
        } else {
          let newLevel = level;
          let topIndex =
            parseInt(newLevel.substr(newLevel.lastIndexOf('-') + 1)) - 1;
          if (topIndex < 0) {
            topIndex = 0;
          }
          newLevel =
            newLevel.substr(0, newLevel.lastIndexOf('-') + 1) + topIndex;
          updateTreeDataPosition(data, newLevel);
        }
      } else {
        updateTreeDataPosition(data, level);
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
          updateTreeDataPosition(data, newLevel);
        } else {
          updateTreeDataPosition(data, level);
        }
      } else {
        let newLevel = level;
        let bottomIndex =
          parseInt(newLevel.substr(newLevel.lastIndexOf('-') + 1)) + 1;
        newLevel =
          newLevel.substr(0, newLevel.lastIndexOf('-') + 1) + bottomIndex;
        updateTreeDataPosition(data, newLevel);
      }
    } else {
      updateTreeData(data, level);
    }
  };

  let overflowItem = [];

  globalOverFlowAction.map(actionSet => {
    if (actionSet.condition === 'all') {
      overflowItem = [...overflowItem, ...actionSet.values];
    } else {
      const conditionStatus = getConditionStatus(actionSet.condition, node);
      if (conditionStatus) {
        overflowItem = [...overflowItem, ...actionSet.values];
      }
    }
  });

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
  let draggable = false;
  if (dragRules) {
    dragRules.map(rule => {
      const conditionStatus = getConditionStatus(rule.condition, node);
      if (conditionStatus) {
        draggable = true;
      }
    });
  }

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
          if (onToggleNode) {
            onToggleNode(node);
          }
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
          if (onToggleNode) {
            onToggleNode(node);
          }
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
          onClick={toggleTreeNode}
          onDrop={dropOnlyLevel.bind(this, node)}
          onDragOver={allowDropLevel}
          //   onDragEnter={dragEnter}
          onDragLeave={clearAll}
          onDragEnd={clearAll}
        >
          <i
            className={`toggle-icon ${
              node[configuration.displayChildren] ? expandedIcon : collapsedIcon
            }`}
          />

          {node[configuration.expandIcon] &&
          node[configuration.displayChildren] ? (
            <i className={node[configuration.expandIcon]} />
          ) : iconClassObj.expandIcon && node[configuration.displayChildren] ? (
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

          {showText ? (
            <TextInput
              type="text"
              autoFocus={true}
              className="tree-textbox"
              value={node[configuration.name]}
              onBlur={updateNodeNameOnBlur}
              onClick={stopPropagation}
            />
          ) : (
            <span
              onClick={selectNode}
              className={`hcl-text-node${
                selectedNode === node ? ' highlight' : ''
              } ${highlightRow}${cutNode === node ? ' hcl-cut-node' : ''}`}
              title={node[configuration.name]}
              draggable={draggable}
              onDragStart={drag.bind(this, node)}
            >
              <div
                onDragOver={allowDrop}
                onDrop={dropLevel.bind(this, node)}
                //onDragEnter={highlightRowFn}
                //onDragLeave={cancelHighlightRow}
                // onDrop={drop.bind(this, node)}
                // onDragOver={dragOverNode}
              >
                {node[configuration.name]}
              </div>
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
          //   onDragEnter={dragEnter}
          onDragLeave={clearAll}
          onDrop={dropOnlyLevel.bind(this, node)}
          onDragOver={allowDropLevel}
          onDragEnd={clearAll}
        >
          {/* {node[configuration.icon] ? (
            <i className={node[configuration.icon]}> </i>
          ) : iconClassObj.icon ? (
            <i className={iconClassObj.icon} />
          ) : null} */}

          {node[configuration.expandIcon] &&
          node[configuration.displayChildren] ? (
            <i className={node[configuration.expandIcon]} />
          ) : iconClassObj.expandIcon && node[configuration.displayChildren] ? (
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

          {showText ? (
            <TextInput
              type="text"
              autoFocus={true}
              className="tree-textbox"
              value={node[configuration.name]}
              onBlur={updateNodeNameOnBlur}
              onClick={stopPropagation}
            />
          ) : (
            <span
              onClick={selectNode}
              className={`hcl-text-node${
                selectedNode === node ? ' highlight' : ''
              } ${highlightRow}${cutNode === node ? ' hcl-cut-node' : ''}`}
              title={node[configuration.name]}
              draggable={draggable}
              onDragStart={drag.bind(this, node)}
            >
              <div
                onDragOver={allowDrop}
                onDrop={dropLevel.bind(this, node)}
                // onDragEnter={highlightRowFn}
                //onDragLeave={cancelHighlightRow}
                // onDrop={drop.bind(this, node)}
                // onDragOver={dragOverNode}
              >
                {node[configuration.name]}
              </div>
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
                onDragNode={onDragNode}
                onDragOverTree={onDragOverTree}
                dragRules={dragRules}
                collapsedIcon={collapsedIcon}
                onSelectNode={onSelectNode}
                draggedNode={draggedNode}
                draggedNodeLevel={draggedNodeLevel}
                level={level + '-' + subIndex}
                selectedNode={selectedNode}
                onToggleNode={onToggleNode}
                configuration={configuration}
                updateTreeData={updateTreeData}
                updateTreeDataPosition={updateTreeDataPosition}
                globalOverFlowAction={globalOverFlowAction}
                onOverflowAction={onOverflowAction}
                onOverFlowActionChange={onOverFlowActionChange}
                updateTreeNodeDataMain={updateTreeNodeDataMain}
                onCutNode={onCutNode}
                cutNode={cutNode}
                cutNodeLevel={cutNodeLevel}
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
  onDragNode: PropTypes.any,
  expandedIcon: PropTypes.string,
  collapsedIcon: PropTypes.string,
  onSelectNode: PropTypes.func,
  onToggleNode: PropTypes.func,
  updateTreeData: PropTypes.func,
  updateTreeDataPosition: PropTypes.func,
  onOverFlowActionChange: PropTypes.func,
  onDragOverTree: PropTypes.func,
  onOverflowAction: PropTypes.func,
  updateTreeNodeDataMain: PropTypes.func,
  configuration: PropTypes.any,
  globalOverFlowAction: PropTypes.any,
  draggedNode: PropTypes.any,
  parentNode: PropTypes.any,
  draggedNodeLevel: PropTypes.string,

  onCutNode: PropTypes.func,
  cutNode: PropTypes.any,
  cutNodeLevel: PropTypes.string
};

TreeNode.defaultProps = {
  node: {},
  level: 0,
  iconClass: null,
  dragRules: null,
  globalOverFlowAction: null,
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  onSelectNode: () => {},
  onToggleNode: () => {},
  updateTreeData: () => {},
  selectedNode: {},
  configuration: {},
  onOverFlowActionChange: () => {},
  onOverflowAction: () => {},
  updateTreeDataPosition: () => {},
  updateTreeNodeDataMain: () => {},
  onDragOverTree: () => {},
  onDragNode: () => {},
  draggedNode: null,
  parentNode: null,
  draggedNodeLevel: '',
  onCutNode: () => {},
  cutNode: null,
  cutNodeLevel: ''
};

export default TreeNode;
