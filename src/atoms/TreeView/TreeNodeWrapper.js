import React, {
  useContext,
  cloneElement,
  useState,
  useRef,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

import TreeDispatchContext from './treeDispatchContext';
import TreeStateContext from './treeStateContext';
import TreeFunctionContext from './treeFunctionContext';
import {
  findNextSiblingAncestor,
  findLastVisibleChildren,
  getDropRegionPlaceholderFromNode,
  getDropRegionPlaceholderOutsideNode,
  isInSameLevel,
  updateNodePosition
} from '../../util/treeUtil';
import TreeNodeTemplate from './TreeNodeTemplate';
import NodeIcon from './NodeIcon';
import TreeInlineEditor from './TreeInlineEditor';
import NodeContent from './NodeContent';
import TreeViewOverflow from './TreeViewOverflow';
import Spinner from '../Spinner';

const TreeNodeWrapper = ({
  node,
  level,
  parentNode,
  displayChildren,
  hasChildren
}) => {
  const dispatch = useContext(TreeDispatchContext);
  const state = useContext(TreeStateContext);
  const callbackContext = useContext(TreeFunctionContext);

  const configuration = state.configuration;

  const [showText, updateTextStatus] = useState(false);
  const [loadingState, updateLoadingState] = useState(false);

  let draggable = false;
  if (state.draggable !== 'none') {
    if (
      node[configuration.draggable] === true ||
      node[configuration.draggable] === false
    ) {
      draggable = node[configuration.draggable];
    } else if (state.dragRules) {
      if (state.dragRules.operator && node[state.dragRules.operator]) {
        draggable =
          state.dragRules.values[
            node[state.dragRules.operator].replace(/ /g, '_')
          ];
      } else {
        draggable = state.dragRules.values;
      }
    } else if (callbackContext.isDraggable) {
      draggable = callbackContext.isDraggable(node);
    }
  }

  const updateNodeToggleStatus = async status => {
    if (typeof status !== 'boolean') {
      status.stopPropagation();
      status.preventDefault();
    }

    if (
      node[configuration.hasChildren] &&
      (!node[configuration.children] ||
        node[configuration.children].length === 0)
    ) {
      if (callbackContext.onToggle) {
        updateLoadingState(true);
        let children = await callbackContext.onToggle(node);
        if (children && children.length > 0) {
          let nodeTemp = { ...node };
          nodeTemp[configuration.children] = children;
          dispatch({
            type: 'TOGGLE_NODE_STATUS_LAZY_LOAD',
            data: {
              node: nodeTemp,
              level: level
            }
          });
          updateLoadingState(false);
        }
      }
    } else {
      dispatch({
        type: 'TOGGLE_NODE_STATUS',
        data: { node, level }
      });
      if (callbackContext.onToggle) {
        callbackContext.onToggle(node);
      }
    }
  };

  const selectNode = e => {
    e.stopPropagation();
    if (e.metaKey) {
      dispatch({ type: 'CLEAR_SELECTED_NODE' });
    } else {
      dispatch({ type: 'SET_SELECTED_NODE', data: node });
    }
    if (callbackContext.onChange) {
      callbackContext.onChange(node, e);
    }
  };

  const focusNode = node => {
    if (node.classList.contains(`${prefix}-tree-item`)) {
      node.children[0].focus();
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
        if (state.type === 'single') {
          selectNode(e);
          e.preventDefault();
        } else {
          if (callbackContext.onKeyDown) {
            callbackContext.onKeyDown(e, node, parentNode, level);
          }
        }

        break;
      }
      default:
        if (callbackContext.onKeyDown) {
          callbackContext.onKeyDown(e, node, parentNode, level);
        }

        break;
    }
  };

  /** Drag And Drop Start */

  const dragStart = ev => {
    ev.dataTransfer.setData('text', level);
    dispatch({
      type: 'SET_DRAGGED_NODE',
      data: { draggedNode: node, draggedNodeLevel: level }
    });
  };

  const onDropRestructure = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    var data = state.draggedNodeLevel; //ev.dataTransfer.getData('text');
    let position = null;
    if (ev.currentTarget.classList.contains('canDropAsChildren')) {
      position = getDropRegionPlaceholderFromNode(ev);
    } else if (ev.currentTarget.classList.contains('canDropInSameLevel')) {
      position = getDropRegionPlaceholderOutsideNode(ev);
    }

    updateElementPosition(position, data);
    clearAllRestructure(ev);
  };
  const clearAllRestructure = ev => {
    let element = ev.currentTarget;
    element.classList.remove('drop-on-above');
    element.classList.remove('drop-on-node');
    element.classList.remove('drop-on-below');
    element.classList.remove('canDropAsChildren');
    element.classList.remove('canDropInSameLevel');
    element.classList.remove('notDroppable');
  };
  const dragEnd = ev => {
    dispatch({
      type: 'CLEAR_DRAGGED_NODE'
    });
    clearAllRestructure(ev);
  };

  const updateElementPosition = (position, data) => {
    if (position === 'top') {
      if (isInSameLevel(data, level)) {
        if (
          parseInt(data.substr(data.lastIndexOf('-') + 1)) >
          parseInt(level.substr(level.lastIndexOf('-') + 1))
        ) {
          moveNode(level);
        } else {
          let newLevel = level;
          let topIndex =
            parseInt(newLevel.substr(newLevel.lastIndexOf('-') + 1)) - 1;
          if (topIndex < 0) {
            topIndex = 0;
          }
          newLevel =
            newLevel.substr(0, newLevel.lastIndexOf('-') + 1) + topIndex;
          moveNode(newLevel);
        }
      } else {
        moveNode(level);
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
          moveNode(newLevel);
        } else {
          moveNode(level);
        }
      } else {
        let newLevel = level;
        let bottomIndex =
          parseInt(newLevel.substr(newLevel.lastIndexOf('-') + 1)) + 1;
        newLevel =
          newLevel.substr(0, newLevel.lastIndexOf('-') + 1) + bottomIndex;
        moveNode(newLevel);
      }
    } else {
      let flag = callbackContext.onMoveNode
        ? callbackContext.onMoveNode(state.draggedNode, node)
        : true;
      if (flag) {
        const updatedTree = updateNodePosition(
          state.treeInfo,
          data,
          level,
          null,
          configuration
        );
        dispatch({ type: 'SET_TREE_DATA', data: updatedTree });
        if (callbackContext.onActionCompletes) {
          callbackContext.onActionCompletes(
            'drop',
            updatedTree,
            state.draggedNode,
            node
          );
        }
      }
    }
  };

  const moveNode = async dropNodeLevel => {
    let flag = callbackContext.onMoveNode
      ? await callbackContext.onMoveNode(state.draggedNode, node)
      : true;
    if (flag) {
      let dropNodeArray = dropNodeLevel.split('-');
      const dropNodeIndex = parseInt(dropNodeArray.splice(-1));
      if (dropNodeArray.length === 0) {
        dropNodeArray = null;
      } else {
        dropNodeArray = dropNodeArray.join('-');
      }
      const updatedTree = updateNodePosition(
        state.treeInfo,
        state.draggedNodeLevel,
        dropNodeArray,
        dropNodeIndex,
        configuration
      );
      dispatch({ type: 'SET_TREE_DATA', data: updatedTree });
      if (callbackContext.onActionCompletes) {
        callbackContext.onActionCompletes(
          'drop',
          updatedTree,
          state.draggedNode,
          node
        );
      }
    }
  };

  const onDragOverNodeRestructure = ev => {
    if (ev.currentTarget.classList.contains('notDroppable')) {
      return;
    }
    if (
      ev.currentTarget.classList.contains('canDropAsChildren') ||
      ev.currentTarget.classList.contains('canDropInSameLevel')
    ) {
      ev.preventDefault();
    } else {
      let dropAllowed = isMoveNodeAllowedMainRestructure();
      let canDropAsChildren = dropAllowed[0];
      let canDropInSameLevel = dropAllowed[1];
      if (canDropAsChildren || canDropInSameLevel) {
        ev.preventDefault();
        ev.currentTarget.classList.add(
          canDropAsChildren ? 'canDropAsChildren' : null
        );
        ev.currentTarget.classList.add(
          canDropInSameLevel ? 'canDropInSameLevel' : null
        );
      } else {
        ev.currentTarget.classList.add('notDroppable');
      }
    }

    if (
      ev.currentTarget.classList.contains('canDropAsChildren') &&
      ev.currentTarget.classList.contains('canDropInSameLevel')
    ) {
      const position = getDropRegionPlaceholderFromNode(ev);
      highlightDropZone(position, ev.currentTarget);
    } else if (ev.currentTarget.classList.contains('canDropInSameLevel')) {
      const position = getDropRegionPlaceholderOutsideNode(ev);
      highlightDropZone(position, ev.currentTarget);
    } else if (
      ev.currentTarget.classList.contains('canDropAsChildren') &&
      !ev.currentTarget.classList.contains('canDropInSameLevel')
    ) {
      highlightDropZone('middle', ev.currentTarget);
    }
  };

  const isMoveNodeAllowedMainRestructure = () => {
    if (level.startsWith(state.draggedNodeLevel)) {
      return [false, false];
    }

    let isDroppable =
      callbackContext.isDropAllowed &&
      callbackContext.isDropAllowed(
        state.draggedNode,
        node,
        parentNode,
        state.treeInfo
      );

    if (
      state.draggedNodeLevel.substr(
        0,
        state.draggedNodeLevel.lastIndexOf('-')
      ) === level
    ) {
      isDroppable = [false, isDroppable[1]];
    }

    return isDroppable;
  };

  const highlightDropZone = (position, element) => {
    if (position === 'top') {
      element.classList.add('drop-on-above');
      element.classList.remove('drop-on-node');
      element.classList.remove('drop-on-below');
    } else if (position === 'middle') {
      element.classList.add('drop-on-node');

      element.classList.remove('drop-on-above');
      element.classList.remove('drop-on-below');
    } else if (position === 'bottom') {
      element.classList.add('drop-on-below');
      element.classList.remove('drop-on-above');
      element.classList.remove('drop-on-node');
    }
  };
  /** Drag And Drop End */
  const parentRef = useRef(null);
  useEffect(() => {
    parentRef.current.firstElementChild.style.height =
      parentRef.current.offsetHeight + 'px';
  }, [parentRef]);

  return (
    <div
      className={`${prefix}-tree-node${
        state.selectedNode &&
        ((node[configuration.key] &&
          state.selectedNode[configuration.key] === node[configuration.key]) ||
          state.selectedNode === node)
          ? ` ${prefix}-node-highlight`
          : ''
      }${
        (state.cutNode &&
          node[configuration.key] &&
          state.cutNode[configuration.key] === node[configuration.key]) ||
        state.cutNode === node
          ? ` ghost`
          : ''
      }${
        (state.draggedNode &&
          node[configuration.key] &&
          state.draggedNode[configuration.key] === node[configuration.key]) ||
        state.draggedNode === node
          ? ` ghost`
          : ''
      }${hasChildren ? `` : ' no-children-exist'}`}
      tabIndex="0"
      level={level}
      onKeyDown={keyDown}
      onClick={
        state.type === 'single'
          ? selectNode
          : callbackContext.onClick
          ? callbackContext.onClick.bind(this, node, parentNode, level)
          : null
      }
      onDragStart={
        state.draggable !== 'none'
          ? state.draggable === 'internal'
            ? dragStart
            : callbackContext.onDragStart &&
              callbackContext.onDragStart.bind(this, node, parentNode, level)
          : null
      }
      onDrop={
        state.draggable !== 'none'
          ? state.draggable === 'internal'
            ? state.draggedNode
              ? onDropRestructure
              : null
            : callbackContext.onDrop &&
              callbackContext.onDrop.bind(this, node, parentNode, level)
          : null
      }
      onDragOver={
        state.draggable !== 'none'
          ? state.draggable === 'internal'
            ? state.draggedNode
              ? onDragOverNodeRestructure
              : null
            : callbackContext.onDragOver &&
              callbackContext.onDragOver.bind(this, node, parentNode, level)
          : null
      }
      onDragEnter={
        state.draggable !== 'none'
          ? state.draggable === 'external'
            ? callbackContext.onDragEnter &&
              callbackContext.onDragEnter.bind(this, node, parentNode, level)
            : null
          : null
      }
      onDragLeave={
        state.draggable !== 'none'
          ? state.draggable === 'internal'
            ? state.draggedNode
              ? clearAllRestructure
              : null
            : callbackContext.onDragLeave &&
              callbackContext.onDragLeave.bind(this, node, parentNode, level)
          : null
      }
      onDragEnd={
        state.draggable !== 'none'
          ? state.draggable === 'internal'
            ? state.draggedNode
              ? dragEnd
              : null
            : callbackContext.onDragEnd &&
              callbackContext.onDragEnd.bind(this, node, parentNode, level)
          : null
      }
      onDoubleClick={
        callbackContext.onDoubleClick ? callbackContext.onDoubleClick : null
      }
      ref={parentRef}
    >
      <div className={`${prefix}-node-highlight-wrapper`} />
      {hasChildren ? (
        loadingState ? (
          <Spinner className={`${prefix}-toggle-icon`} small />
        ) : displayChildren ? (
          state.expandedIcon ? (
            cloneElement(state.expandedIcon, {
              className: `${prefix}-toggle-icon ${state.expandedIcon.props.className}`,
              onClick: updateNodeToggleStatus
            })
          ) : (
            <i
              className={`${prefix}-toggle-icon caret caret-down`}
              onClick={updateNodeToggleStatus}
            />
          )
        ) : state.collapsedIcon ? (
          cloneElement(state.collapsedIcon, {
            className: `${prefix}-toggle-icon ${state.collapsedIcon.props.className}`,
            onClick: updateNodeToggleStatus
          })
        ) : (
          <i
            className={`${prefix}-toggle-icon caret`}
            onClick={updateNodeToggleStatus}
          />
        )
      ) : null}

      {callbackContext.customTemplate ? (
        callbackContext.customTemplate(node, parentNode, level)
      ) : (
        <TreeNodeTemplate
          draggable={state.draggable !== 'none' ? draggable : null}
        >
          <NodeIcon node={node} />

          {callbackContext.customNodeTemplate ? (
            callbackContext.customNodeTemplate(node, parentNode, level)
          ) : showText ? (
            <TreeInlineEditor
              content={node[configuration.name]}
              node={node}
              level={level}
              updateTextStatus={updateTextStatus}
            />
          ) : (
            <NodeContent content={node[configuration.name]} />
          )}

          {callbackContext.customActionTemplate ? (
            <div
              className={`${prefix}-treenode-action ${
                state.overflowOnHover ? 'action-on-hover' : ''
              }`}
              onClick={e => {
                e.stopPropagation();
              }}
              onKeyDown={e => {
                e.stopPropagation();
                // var key = e.which || e.keyCode;
                // if (
                //   key === 13 &&
              }}
            >
              {callbackContext.customActionTemplate(node, parentNode, level)}
            </div>
          ) : callbackContext.getOverFlowItems ? (
            <TreeViewOverflow
              node={node}
              level={level}
              updateTextStatus={updateTextStatus}
            />
          ) : null}
        </TreeNodeTemplate>
      )}
    </div>
  );
};

TreeNodeWrapper.propTypes = {
  node: PropTypes.object,
  level: PropTypes.string,
  parentNode: PropTypes.object,
  displayChildren: PropTypes.bool,
  hasChildren: PropTypes.bool
};

TreeNodeWrapper.defaultProps = {
  node: null,
  level: null,
  parentNode: null,
  displayChildren: false,
  hasChildren: false
};

export default TreeNodeWrapper;
