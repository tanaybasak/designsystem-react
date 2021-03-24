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
    displayChildren: 'displayChildren',
    draggable: 'draggable',
    key: 'key',
    externalExpandNode: false
  },
  expandedIcon: null,
  collapsedIcon: null,
  iconClass: null,
  dragRules: null,
  overflowOnHover: false,
  type: 'default',
  draggable: 'none',
  renameNodeId: null
};

const TreeView = ({
  treeData,
  nodeSelected,
  expandedNodes,
  expandedIcon,
  collapsedIcon,
  className,
  config,
  type,
  onChange,
  onToggle,
  iconClass,
  getIcons,

  overflowOnHover,
  getOverFlowItems,
  onOverflowAction,
  onDeleteNode,
  onRenamingNode,
  onMoveNode,
  onCopyNode,
  isMoveNodeAllowed,
  isCopyAllowed,
  onActionCompletes,

  dragRules,
  isDraggable,
  draggable,
  isDropAllowed,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragEnd,

  customTemplate,
  customActionTemplate,
  customNodeTemplate,

  onDoubleClick,
  onKeyDown,
  onClick,
  renameNodeId
}) => {
  const [state, dispatch] = useReducer(treeReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_TREE_DATA', data: treeData });
  }, [treeData]);

  useEffect(() => {
    if (config) {
      dispatch({ type: 'SET_CONFIGURATION', data: config });
    }
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

  useEffect(() => {
    dispatch({ type: 'SET_RENAME_NODE_ID', data: renameNodeId });
  }, [renameNodeId]);

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
  /** Used to pass default selected node. */
  nodeSelected: PropTypes.object,
  /** Array of objects which stores the expanded node list
   * expected format
   *
   * ```
   * { [uniqueKey] : true , [uniqueNodeKey] : true}
   * ```
   * eg :
   *
   * ```
   * { 'node-0': true, 'node-0-1': true }
   * ```
   */
  expandedNodes: PropTypes.object,
  /** used to customize expanded icon */
  expandedIcon: PropTypes.node,
  /** used to customize collapsed icon */
  collapsedIcon: PropTypes.node,
  /** Style class of the component */
  className: PropTypes.string,
  /** Configuration Object for updating propery name in tree data
   *
   *
   * ```externalExpandNode``` :  if true, tree component will used expandedNodes props to store expanded nodes
   *
   * Default Configuration
   *
   * ```
   * {
   *    expandIcon: 'expandIcon',
   *    collapsedIcon: 'collapsedIcon',
   *    icon: 'icon',
   *    children: 'children',
   *    name: 'name',
   *    hasChildren: 'hasChildren',
   *    displayChildren:'displayChildren',
   *    draggable: 'draggable',
   *    key: 'key',
   *    externalExpandNode:false
   * }
   * ```
   */
  config: PropTypes.object,
  /** Type of Treeview
   * * ```default``` : Component without any node selection
   * * ```single``` : Component with node selection
   */
  type: PropTypes.oneOf(['default', 'single']),
  /** Callback function on selecting a tree node
   *
   * @signature
   * * ```node``` : selected tree node
   * * ```event``` : click event
   */
  onChange: PropTypes.func,
  /** Callback function on expanding/collapsing tree node.
   *
   * @signature
   * ```node``` : toggled tree node
   */
  onToggle: PropTypes.func,
  /** Used to provide custom icon for node
   *
   *
   * * ```operator``` : operator is any property which exist on each tree node.
   * * ```icon``` : this icon display for all node whose type is matching with file.
   * * ```expandedIcon``` : this icon display for all node whose "type" is matching with "folder" and node should be expanded.
   * * ```collapsedIcon``` : this icon display for all node whose "type" is matching with "folder" and node should be collapsed.
   *
   *
   * eg:
   *
   * ```
   *    {
   *        operator: 'type',
   *        values: {
   *            file: {
   *                icon: <i className="p-hclsw p-hclsw-document" />
   *            },
   *            folder: {
   *                expandedIcon: <i className="p-hclsw p-hclsw-export" />,
   *                collapsedIcon: <i className="p-hclsw p-hclsw-folder" />
   *            }
   *        }
   *    }
   * ```
   *
   * can use any property present in the node.
   *
   */
  iconClass: PropTypes.object,
  /** Callback function is used to provide custom icon for node
   * This callback can be used if icon passing logic is complex, or not possible to acheive with the help of "iconClass" props
   *
   * @signature
   * ```node``` : tree node
   */
  getIcons: PropTypes.func,

  /** used to display overflow menu on hover. This can be used for showing "customActionTemplate" on hover  */
  overflowOnHover: PropTypes.bool,
  /** Callback function for setting overflow menu actions
   *
   * this function expect below object format.
   *  eg:
   *
   * ```
   * [
   *    {name: 'Rename',action: 'edit',icon:<i className="p-hclsw p-hclsw-edit" />}
   *    {name: 'Cut',action: 'cut',icon:<i className="p-hclsw p-hclsw-edit" />}
   *    {name: 'Copy',action: 'copy',icon:<i className="p-hclsw p-hclsw-edit" />}
   *    {name: 'Delete',action: 'delete',icon:<i className="p-hclsw p-hclsw-edit" />}
   * ]
   * ```
   *
   *
   * @signature
   * ```node``` : tree node
   *
   *
   */
  getOverFlowItems: PropTypes.func,
  /** Callback function on selecting overflow menu items.
   * This function mainly used to write logic on custom overlflow menu action. This method is used for *copy* and *cut* overflow action.
   * * need to make a reference copy of model on copy action from overflow menu and that model should be returned from this call back
   * * All the other custom overflow action, in which tree node is changed, need to return that changed tree node from the function
   *
   * @signature
   * * ```action``` : Overflow Action name.
   * * ```node``` : Tree Node
   * */
  onOverflowAction: PropTypes.func,

  /** Callback function on deleting tree node from overflow menu.
   *
   * this function expect a boolean value. If true node will get deleted.
   *
   * ```
   * onDeleteNode = { async () => true}
   *
   * ```
   *
   * @signature
   * node : tree node
   *
   */
  onDeleteNode: PropTypes.func,
  /** Callback function on renaming tree node from overflow menu
   *
   * this function expect an array.
   * * ```[true]``` : the node will get renamed
   * * ```[false , error_message]``` : error message will be shown as an overlay
   * * ```error_message``` : it can be an html element
   *
   * @signature
   * node : tree node
   *
   */
  onRenamingNode: PropTypes.func,
  /** Callback function used for specifying rules on cut and paste
   * @signature
   * * ```cutNode``` : cut node
   * * ```pasteNode``` : node where paste action validation checks
   * * ```treeData``` : Tree Data
   *
   */
  isMoveNodeAllowed: PropTypes.func,
  /** Callback function on cut paste action or drag and drop
   * this will trigger before the drop or paste action
   * @signature
   * * ```cutNode``` : cut node
   * * ```pasteNode``` : node where paste action happening
   */
  onMoveNode: PropTypes.func,
  /** Callback function on copy paste action
   * this will trigger before the paste action after copying a node
   * @signature
   * * ```copiedNode``` : copied Node
   * * ```pasteNode```: node where paste action happening
   */
  onCopyNode: PropTypes.func,

  /** Callback function used for specifying rules on copy and paste
   * expect a boolean value. Paste button will be enabled if it returns true
   * @signature
   * * ```copiedNode``` : copied Node
   * * ```pasteNode``` : node where paste action happening
   * * ```treeData``` : Tree Data
   */
  isCopyAllowed: PropTypes.func,
  /** Callback function after completing the overflow action or drag and drop
   * @signature
   * * ```action``` : action name
   * * ```treeData``` : Tree Data
   * * ```updatedNode``` : this can be renamed node, dragged node , cut/copy node or deleted node
   * * ```drop/paste node``` : this can be the node in which dragged or cut or copied node pasted
   */
  onActionCompletes: PropTypes.func,

  /**
   * Used to specify draggable node
   *
   * ```
   * {
   * operator: 'type', // operator is any property which exist on each tree node.
   *   values: {
   *     file: true, // node with type "file" is draggable
   *     folder: false // // node with type "folder" is not draggable
   *   }
   * }
   * ```
   */
  dragRules: PropTypes.any,
  /** Callback function is used to define whether the node is draggable
   * This callback can be used if node draggable logic is complex, or not possible to acheive with the help of "dragRules" props
   * @signature
   * ```node``` : tree node
   */
  isDraggable: PropTypes.func,
  /** Used for setting drag and drop behaviour for the tree component
   * * ```none``` : default value. There is no dragging functionality
   * * ```internal``` : Internal drag and drop functionality will be set. Need to define isDropAllowed call back function inorder to specify the drag and drop rules
   * * ```external``` : Dragging is possible. Need to the write common drag and drop html5 function to add the behaviour
   */
  draggable: PropTypes.oneOf(['none', 'internal', 'external']),
  /** Callback function is used to validate the drop region on drag and drop
   * expect an array of boolean value
   * eg :
   *
   * ```
   * [canDropInside , canDropInSameLevel]
   * ```
   * * ```canDropInside``` : true mean dragged node can be placed as children of dropNode
   * * ```canDropInSameLevel``` : true mean dragged node can be placed above or below the dropNode
   *
   * @signature
   * * ```draggedNode``` : dragged Node
   * * ```dropNode``` : Mouse Over Node
   * * ```parentNode``` : parent node of Mouse Over Node
   * * ```treeData``` : tree Data
   */
  isDropAllowed: PropTypes.func,
  /** Callback function to add custom drag start function
   * this will enable only when "draggable" prop should set to "external"
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   * * ```event``` : Event
   */
  onDragStart: PropTypes.func,
  /** Callback function to add custom drag over function
   * this will enable only when "draggable" prop should set to "external"
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   * * ```event``` : Event
   */
  onDragOver: PropTypes.func,
  /** Callback function to add custom drag enter function
   * this will enable only when "draggable" prop should set to "external"
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   * * ```event``` : Event
   */
  onDragEnter: PropTypes.func,
  /** Callback function to add custom drag leave function
   * this will enable only when "draggable" prop should set to "external"
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   * * ```event``` : Event
   */
  onDragLeave: PropTypes.func,
  /** Callback function to add custom drop function
   * this will enable only when "draggable" prop should set to "external"
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   * * ```event``` : Event
   */
  onDrop: PropTypes.func,
  /** Callback function to add custom drag end function
   * this will enable only when "draggable" prop should set to "external"
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   * * ```event``` : Event
   */
  onDragEnd: PropTypes.func,

  /** Callback function used to pass custom template. Only expand/collapse icon will be present.
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   */
  customTemplate: PropTypes.func,
  /** Callback function used to pass custom template which will place in the right end of the node. This is used to define custom action in which can add link,button,overflow menu etc
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   */
  customActionTemplate: PropTypes.func,
  /** Callback function used to pass custom template for node content
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   */
  customNodeTemplate: PropTypes.func,

  /**
   *
   * Callback function to add double click function
   *
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   * * ```event``` : event
   */
  onDoubleClick: PropTypes.func,
  /**
   * Callback function to add keydown function
   *
   * @signature
   * * ```event``` : event
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   * */
  onKeyDown: PropTypes.func,
  /**
   *
   * Callback function to add on click function
   *
   * @signature
   * * ```node``` : node
   * * ```parentNode``` :Parent Node
   * * ```level``` : node level
   * * ```event``` : event
   * */
  onClick: PropTypes.func,

  /**
   * rename text field will show based on the id
   */
  renameNodeId: PropTypes.string
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
  isDraggable: null,
  renameNodeId: null
};

export default TreeView;
