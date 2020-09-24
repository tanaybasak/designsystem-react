import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TreeNode from './TreeNode';
import TreeStateContext from './treeStateContext';
import TreeDispatchContext from './treeDispatchContext';
import TreeFunctionContext from './treeFunctionContext';
import { treeReducer } from './treeReducer';

const initialState = {
  treeInfo: [],
  expandedNodes: {},
  selectedNode: null,
  draggedNode: null,
  draggedNodeLevel: null,
  cutNode: null,
  cutNodeLevel: null,
  copiedNode: null,
  configuration: {
    expandIcon: 'expandIcon',
    collapsedIcon: 'collapsedIcon',
    icon: 'icon',
    children: 'children',
    name: 'name',
    hasChildren: 'hasChildren',
    draggable: 'draggable',
    key: 'key'
  },
  expandedIcon: null,
  collapsedIcon: null,
  iconClass: null,
  dragRules: null,
  overflowOnHover: false,
  type: 'default',
  draggable: 'none'
};

const TreeView = ({
  treeData,
  nodeSelected,
  expandedIcon,
  onChange,
  collapsedIcon,
  className,
  config,
  onToggle,
  type,
  onOverflowAction,
  iconClass,
  dragRules,
  isMoveNodeAllowed,
  isCopyAllowed,
  getOverFlowItems,
  onDeleteNode,
  onRenamingNode,
  onMoveNode,
  onCopyNode,
  onActionCompletes,
  overflowOnHover,
  expandedNodes,
  customTemplate,
  customActionTemplate,
  customNodeTemplate,
  draggable,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragEnd,
  onDoubleClick,
  onKeyDown,
  onClick,
  isDropAllowed,
  getIcons,
  isDraggable
}) => {
  const [state, dispatch] = useReducer(treeReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_TREE_DATA', data: treeData });
  }, [treeData]);

  useEffect(() => {
    if (config) {
      dispatch({ type: 'SET_CONFIGURATION', data: config });
    }

    //dispatch({ type: 'SET_EXPANDED_NODE', data: expandedNodes });
  }, [config]);

  useEffect(() => {
    if (expandedNodes) {
      dispatch({ type: 'SET_EXPANDED_NODE', data: expandedNodes });
    }
  }, [expandedNodes]);

  useEffect(() => {
    if (nodeSelected) {
      dispatch({ type: 'SET_SELECTED_NODE', data: nodeSelected });
    }
  }, [nodeSelected]);

  useEffect(() => {
    if (expandedIcon && collapsedIcon) {
      dispatch({
        type: 'SET_TOGGLE_ICON',
        data: {
          expandedIcon: expandedIcon,
          collapsedIcon: collapsedIcon
        }
      });
    }
  }, [expandedIcon, collapsedIcon]);

  useEffect(() => {
    if (dragRules) {
      dispatch({ type: 'SET_DRAG_RULES', data: dragRules });
    }
  }, [dragRules]);

  useEffect(() => {
    if (iconClass) {
      dispatch({ type: 'SET_ICON_CLASS', data: iconClass });
    }
  }, [iconClass]);

  useEffect(() => {
    if (overflowOnHover) {
      dispatch({ type: 'SET_OVERFLOW_ON_HOVER' });
    }
  }, [overflowOnHover]);

  useEffect(() => {
    if (type) {
      dispatch({ type: 'SET_TREE_VIEW_TYPE', data: type });
    }
  }, [type]);

  useEffect(() => {
    if (draggable && draggable !== 'none') {
      dispatch({ type: 'SET_DRAGGABLE', data: draggable });
    }
  }, [draggable]);

  const classnames = `${prefix}-tree ${className.trim()}`;
  return (
    <ul role="tree" className={classnames}>
      <TreeDispatchContext.Provider value={dispatch}>
        <TreeStateContext.Provider value={state}>
          <TreeFunctionContext.Provider
            value={{
              onChange: onChange,
              onToggle: onToggle,
              onDeleteNode: onDeleteNode,
              onCopyNode: onCopyNode,
              onMoveNode: onMoveNode,
              onActionCompletes: onActionCompletes,
              onOverflowAction: onOverflowAction,
              onRenamingNode: onRenamingNode,
              isCopyAllowed: isCopyAllowed,
              isMoveNodeAllowed: isMoveNodeAllowed,
              isDropAllowed: isDropAllowed,
              getOverFlowItems: getOverFlowItems,
              customTemplate: customTemplate,
              customActionTemplate: customActionTemplate,
              customNodeTemplate: customNodeTemplate,
              getIcons: getIcons,
              onDragStart: onDragStart,
              onDragOver: onDragOver,
              onDragEnter: onDragEnter,
              onDragLeave: onDragLeave,
              onDrop: onDrop,
              onDragEnd: onDragEnd,
              onDoubleClick: onDoubleClick,
              onKeyDown: onKeyDown,
              onClick: onClick,
              isDraggable: isDraggable
            }}
          >
            {state.treeInfo.map((node, index) => {
              return (
                <TreeNode
                  node={node}
                  key={`index-${index}`}
                  level={index + ''}
                  parentNode={null}
                />
              );
            })}
          </TreeFunctionContext.Provider>
        </TreeStateContext.Provider>
      </TreeDispatchContext.Provider>
    </ul>
  );
};

TreeView.propTypes = {
  /** Tree Data */
  treeData: PropTypes.array,
  /** Used to pass icon classname for each node */
  iconClass: PropTypes.any,
  /** Used to specify draggable node */
  dragRules: PropTypes.any,
  /** Used to set selected node */
  nodeSelected: PropTypes.any,
  /** To Specify Expand Icon */
  expandedIcon: PropTypes.node,
  /** To Specify Collapsed Icon */
  collapsedIcon: PropTypes.node,
  /** Style class of the component */
  className: PropTypes.string,
  /** used to display overflow menu on hover  */
  overflowOnHover: PropTypes.bool,
  /** Callback function on selecting overflow menu item */
  onOverflowAction: PropTypes.func,
  /** Callback function used for specifying rules on drag and drop or cut and paste */
  isMoveNodeAllowed: PropTypes.func,
  /** Callback function used for specifying rules on copy and paste */
  isCopyAllowed: PropTypes.func,
  /** Callback function on selecting tree node */
  onChange: PropTypes.func,
  /** Callback function on expanding/collapsing tree node */
  onToggle: PropTypes.func,
  /** Callback function on deleting tree node from overflow menu */
  onDeleteNode: PropTypes.func,
  /** Callback function for setting overflow menu actions
   *  eg:
   * [
   * {name: 'Rename',action: 'edit'}
   * {name: 'Cut',action: 'cut'}
   * {name: 'Copy',action: 'copy'}
   * {name: 'Delete',action: 'delete'}
   * ]
   *
   */
  getOverFlowItems: PropTypes.func,
  /** Callback function on renaming tree node from overflow menu */
  onRenamingNode: PropTypes.func,
  /** Configuration Object for updating propery name in tree data
 {
  displayChildren: 'displayChildren',
  expandIcon: 'expandIcon',
  collapsedIcon: 'collapsedIcon',
  icon: 'icon',
  children: 'children',
  name: 'name',
  hasChildren: 'hasChildren'
}
*/
  config: PropTypes.any,
  /** Type of Treeview
   * default : Component without any node selection
   * single : Component with node selection
   */
  type: PropTypes.oneOf(['default', 'single']),
  /** Callback function on moving node  */
  onMoveNode: PropTypes.func,
  /** Callback function on pasting node  */
  onCopyNode: PropTypes.func,
  /** Callback function after completing the overflow action  */
  onActionCompletes: PropTypes.func,
  /** Array of objects which stores the expanded node list */
  expandedNodes: PropTypes.object,
  /** Callback function used to pass custom template */
  customTemplate: PropTypes.func,
  /** Callback function used to pass custom template which will place in the right end of the node */
  customActionTemplate: PropTypes.func,
  /** Callback function used to pass custom template for node content */
  customNodeTemplate: PropTypes.func,
  draggable: PropTypes.oneOf(['none', 'internal', 'external']),
  /** Callback function to add custom drag start function */
  onDragStart: PropTypes.func,
  /** Callback function to add custom drag over function */
  onDragOver: PropTypes.func,
  /** Callback function to add custom drag enter function */
  onDragEnter: PropTypes.func,
  /** Callback function to add custom drag leave function */
  onDragLeave: PropTypes.func,
  /** Callback function to add custom drop function */
  onDrop: PropTypes.func,
  /** Callback function to add custom drag end function */
  onDragEnd: PropTypes.func,
  /** Callback function to add double click function */
  onDoubleClick: PropTypes.func,
  /** Callback function to add keydown function */
  onKeyDown: PropTypes.func,
  /** Callback function to add on click function */
  onClick: PropTypes.func,
  /** Callback function is used to validate the drop region on drag and drop */
  isDropAllowed: PropTypes.func,
  /** Callback function is used to provide custom icon for node */
  getIcons: PropTypes.func,
  /** Callback function is used to define whether the node is draggable */
  isDraggable: PropTypes.func
};

TreeView.defaultProps = {
  treeData: [],
  iconClass: null,
  dragRules: null,
  onChange: null,
  onToggle: null,
  isMoveNodeAllowed: null,
  isCopyAllowed: null,
  onRenamingNode: null,
  expandedIcon: null,
  collapsedIcon: null,
  className: '',
  type: 'default',
  config: {},
  onOverflowAction: null,
  getOverFlowItems: null,
  nodeSelected: null,
  onMoveNode: null,
  onCopyNode: null,
  onDeleteNode: null,
  onActionCompletes: null,
  overflowOnHover: false,

  expandedNodes: null,
  customTemplate: null,
  customActionTemplate: null,
  customNodeTemplate: null,
  draggable: 'none',
  onDragStart: null,
  onDragOver: null,
  onDragEnter: null,
  onDragLeave: null,
  onDrop: null,
  onDragEnd: null,
  onDoubleClick: null,
  onKeyDown: null,
  onClick: null,
  isDropAllowed: null,
  getIcons: null,
  isDraggable: null
};

export default TreeView;
