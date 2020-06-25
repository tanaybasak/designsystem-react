import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TreeNode from './TreeNode';
import {
  updateTreeNode,
  updateNodePosition,
  deleteNode,
  copyNode
} from '../../util/treeUtil';

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
  onActionCompletes
}) => {
  let [treeInfo, updateTree] = useState(treeData);

  let [selectedNode, updateSelectedNode] = useState({});

  let [draggedNode, updateDraggedNode] = useState({});
  let [draggedNodeLevel, updateDraggedNodeLevel] = useState('');

  let [cutNode, updateCutNode] = useState({});
  let [cutNodeLevel, updateCutNodeLevel] = useState('');

  let [copiedNode, updateCopyNode] = useState({});

  useEffect(() => {
    updateTree(treeData);
  }, [treeData]);

  useEffect(() => {
    updateSelectedNode(nodeSelected);
  }, [nodeSelected]);

  const isMoveNodeAllowedMain = (x, y) => {
    return isMoveNodeAllowed ? isMoveNodeAllowed(x, y, treeInfo) : true;
  };

  const isCopyAllowedMain = (x, y) => {
    return isCopyAllowed ? isCopyAllowed(x, y, treeInfo) : true;
  };

  const onSelectNode = node => {
    updateSelectedNode(node);
    if (onChange) {
      onChange(node);
    }
  };

  const onToggleNode = event => {
    if (onToggle) {
      onToggle(event);
    }
  };

  let defaultConfig = {
    displayChildren: 'displayChildren',
    expandIcon: 'expandIcon',
    collapsedIcon: 'collapsedIcon',
    icon: 'icon',
    children: 'children',
    name: 'name',
    hasChildren: 'hasChildren',
    draggable: 'draggable'
  };

  const updateTreeState = (action, config) => {
    if (action === 'draggedNode') {
      updateDraggedNode(config.node);
      updateDraggedNodeLevel(config.level);
    } else if (action === 'cutNode') {
      updateCutNode(config.node);
      updateCopyNode(null);
      updateCutNodeLevel(config.level);
    } else if (action === 'copyNode') {
      updateCutNode(null);
      updateCopyNode(config.node);
      updateCutNodeLevel(null);
    }
  };

  const updateTreeDataBasedOnAction = async (action, config) => {
    if (action === 'delete') {
      let flag = onDeleteNode ? await onDeleteNode(config.node) : true;
      if (flag) {
        const updatedTree = deleteNode(treeInfo, config.level);
        updateTree(updatedTree);
        if (onActionCompletes) {
          onActionCompletes(action, updatedTree, config.node);
        }
      }
    } else if (action === 'copy-paste') {
      let flag = onCopyNode ? await onCopyNode(copiedNode, config.node) : true;
      if (flag) {
        const updatedTree = copyNode(treeInfo, config.level, config.copyNode);
        updateTree(updatedTree);
        if (onActionCompletes) {
          onActionCompletes('copy', updatedTree, config.copyNode, config.node);
        }
      }
    } else if (action === 'cut-paste') {
      let flag = onMoveNode ? await onMoveNode(cutNode, config.node) : true;
      if (flag) {
        const updatedTree = updateNodePosition(
          treeInfo,
          config.cutNodeLevel,
          config.level
        );
        updateTree(updatedTree);
        updateTreeState('cutNode', { node: null, level: '' });
        if (onActionCompletes) {
          onActionCompletes('cut', updatedTree, cutNode, config.node);
        }
      }
    } else if (action === 'toggle-node') {
      updateTree(updateTreeNode(treeInfo, config.node, config.level));
      if (onToggleNode) {
        onToggleNode(config.node);
      }
    } else if (action === 'node-update') {
      updateTree(updateTreeNode(treeInfo, config.node, config.level));
      if (onActionCompletes) {
        onActionCompletes('custom-action', treeInfo, config.node);
      }
    } else if (action === 'edit') {
      let flag = await onRenamingNode(config.node);
      if (flag) {
        const updatedTree = updateTreeNode(treeInfo, config.node, config.level);
        updateTree(updatedTree);
        if (onActionCompletes) {
          onActionCompletes(action, updatedTree, config.node);
        }
      }

      return flag;
    } else if (action === 'move-node') {
      let flag = onMoveNode ? await onMoveNode(draggedNode, config.node) : true;
      if (flag) {
        let dropNodeArray = config.dropNode.split('-');
        const dropNodeIndex = parseInt(dropNodeArray.splice(-1));
        if (dropNodeArray.length === 0) {
          dropNodeArray = null;
        } else {
          dropNodeArray = dropNodeArray.join('-');
        }
        const updatedTree = updateNodePosition(
          treeInfo,
          config.draggedNode,
          dropNodeArray,
          dropNodeIndex
        );
        updateTree(updatedTree);
        if (onActionCompletes) {
          onActionCompletes('drop', updatedTree, draggedNode, config.node);
        }
      }
    }
  };

  const configuration = { ...defaultConfig, ...config };
  const classnames = `${prefix}-tree ${className.trim()}`;
  return (
    <ul role="tree" className={classnames}>
      {treeInfo.map((node, index) => {
        return (
          <TreeNode
            node={node}
            key={`index-${index}`}
            expandedIcon={expandedIcon}
            collapsedIcon={collapsedIcon}
            iconClass={iconClass}
            dragRules={dragRules}
            isMoveNodeAllowed={isMoveNodeAllowedMain}
            isCopyAllowed={isCopyAllowedMain}
            draggedNode={draggedNode}
            draggedNodeLevel={draggedNodeLevel}
            level={index + ''}
            parentNode={null}
            onSelectNode={type === 'single' ? onSelectNode : null}
            selectedNode={type === 'single' ? selectedNode : null}
            configuration={configuration}
            onOverflowAction={onOverflowAction}
            copiedNode={copiedNode}
            cutNode={cutNode}
            getOverFlowItems={getOverFlowItems}
            cutNodeLevel={cutNodeLevel}
            updateTreeDataBasedOnAction={updateTreeDataBasedOnAction}
            updateTreeState={updateTreeState}
          />
        );
      })}
    </ul>
  );
};

TreeView.propTypes = {
  /** Tree Data */
  treeData: PropTypes.any,
  /** Used to pass icon classname for each node */
  iconClass: PropTypes.any,
  /** Used to specify draggable node */
  dragRules: PropTypes.any,
  /** Used to set selected node */
  nodeSelected: PropTypes.any,
  /** To Specify Expand Icon */
  expandedIcon: PropTypes.string,
  /** To Specify Collapsed Icon */
  collapsedIcon: PropTypes.string,
  /** Style class of the component */
  className: PropTypes.string,
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
  onActionCompletes: PropTypes.func
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
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  className: '',
  type: 'default',
  config: {},
  onOverflowAction: null,
  getOverFlowItems: null,
  nodeSelected: null,
  onMoveNode: null,
  onCopyNode: null,
  onDeleteNode: null,
  onActionCompletes: null
};

export default TreeView;
