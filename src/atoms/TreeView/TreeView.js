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
  onRenamingNode
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
    return isMoveNodeAllowed(x, y, treeInfo);
  };

  const isCopyAllowedMain = (x, y) => {
    return isCopyAllowed(x, y, treeInfo);
  };

  const onSelectNode = node => {
    updateSelectedNode(node);
    onChange(node);
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
      let flag = await onDeleteNode(config.node);
      if (flag) {
        updateTree(deleteNode(treeInfo, config.level));
      }
    } else if (action === 'copy-paste') {
      updateTree(copyNode(treeInfo, config.level, config.copyNode));
    } else if (action === 'cut-paste') {
      updateTree(
        updateNodePosition(treeInfo, config.cutNodeLevel, config.level)
      );
      updateTreeState('cutNode', { node: null, level: '' });
    } else if (action === 'toggle-node') {
      updateTree(updateTreeNode(treeInfo, config.node, config.level));
      if (onToggleNode) {
        onToggleNode(config.node);
      }
    } else if (action === 'node-update') {
      updateTree(updateTreeNode(treeInfo, config.node, config.level));
    } else if (action === 'edit') {
      let flag = await onRenamingNode(config.node);
      if (flag) {
        updateTree(updateTreeNode(treeInfo, config.node, config.level));
      }

      return flag;
    } else if (action === 'move-node') {
      let dropNodeArray = config.dropNode.split('-');
      const dropNodeIndex = parseInt(dropNodeArray.splice(-1));
      if (dropNodeArray.length === 0) {
        dropNodeArray = null;
      } else {
        dropNodeArray = dropNodeArray.join('-');
      }
      updateTree(
        updateNodePosition(
          treeInfo,
          config.draggedNode,
          dropNodeArray,
          dropNodeIndex
        )
      );
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

  iconClass: PropTypes.any,

  dragRules: PropTypes.any,

  nodeSelected: PropTypes.any,
  /** To Specify Expand Icon */
  expandedIcon: PropTypes.string,
  /** To Specify Collapsed Icon */
  collapsedIcon: PropTypes.string,
  /** Style class of the component */
  className: PropTypes.string,

  onOverflowAction: PropTypes.func,

  isMoveNodeAllowed: PropTypes.func,
  isCopyAllowed: PropTypes.func,
  /** Callback function on selecting tree node */
  onChange: PropTypes.func,
  /** Callback function on expanding/collapsing tree node */
  onToggle: PropTypes.func,
  onDeleteNode: PropTypes.func,
  getOverFlowItems: PropTypes.func,
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
  type: PropTypes.oneOf(['default', 'single'])
};

TreeView.defaultProps = {
  treeData: [],
  iconClass: null,
  dragRules: null,
  onChange: null,
  isMoveNodeAllowed: () => {},
  isCopyAllowed: () => {},
  onDeleteNode: null,
  onRenamingNode: null,
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  className: '',
  type: 'default',
  config: {},
  onOverflowAction: null,
  getOverFlowItems: null,
  nodeSelected: null
};

export default TreeView;
