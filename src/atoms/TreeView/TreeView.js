import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TreeNode from './TreeNode';
import { updateTreeNode, updateNodePosition } from '../../util/treeUtil';

const TreeView = ({
  treeData,
  expandedIcon,
  onChange,
  collapsedIcon,
  className,
  config,
  onToggle,
  type,
  onOverflowAction,
  onOverFlowActionChange,
  iconClass,
  dragRules,
  onDragOver,
  getOverFlowItems
}) => {
  let [treeInfo, updateTree] = useState(treeData);

  let [selectedNode, updateSelectedNode] = useState({});

  let [draggedNode, updateDraggedNode] = useState({});
  let [draggedNodeLevel, updateDraggedNodeLevel] = useState('');

  let [cutNode, updateCutNode] = useState({});
  let [cutNodeLevel, updateCutNodeLevel] = useState('');

  const onCutNode = (node, level) => {
    updateCutNode(node);
    updateCutNodeLevel(level);
  };

  const onDragNode = (node, level) => {
    updateDraggedNode(node);
    updateDraggedNodeLevel(level);
  };

  const onDragOverTree = (x, y) => {
    return onDragOver(x, y, treeInfo);
  };

  const updateTreeNodeDataMain = (node, level) => {
    updateTree(updateTreeNode(treeInfo, node, level));
  };

  const onSelectNode = event => {
    updateSelectedNode(event);
    onChange(event);
  };

  const onToggleNode = event => {
    onToggle(event);
  };

  let defaultConfig = {
    displayChildren: 'displayChildren',
    expandIcon: 'expandIcon',
    collapsedIcon: 'collapsedIcon',
    icon: 'icon',
    children: 'children',
    name: 'name',
    hasChildren: 'hasChildren'
  };

  const updateTreeDataPosition = (draggedNode, dropNode) => {
    let dropNodeArray = dropNode.split('-');
    const dropNodeIndex = parseInt(dropNodeArray.splice(-1));
    if (dropNodeArray.length === 0) {
      dropNodeArray = null;
    } else {
      dropNodeArray = dropNodeArray.join('-');
    }
    updateTree(
      updateNodePosition(treeInfo, draggedNode, dropNodeArray, dropNodeIndex)
    );
  };

  const updateTreeData = (draggedNode, dropNode) => {
    updateTree(updateNodePosition(treeInfo, draggedNode, dropNode));
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
            onDragNode={onDragNode}
            onDragOverTree={onDragOverTree}
            draggedNode={draggedNode}
            draggedNodeLevel={draggedNodeLevel}
            level={index + ''}
            parentNode={null}
            onSelectNode={type === 'single' ? onSelectNode : null}
            selectedNode={type === 'single' ? selectedNode : null}
            onToggleNode={onToggle ? onToggleNode : null}
            configuration={configuration}
            updateTreeData={updateTreeData}
            updateTreeDataPosition={updateTreeDataPosition}
            onOverflowAction={onOverflowAction}
            onOverFlowActionChange={onOverFlowActionChange}
            updateTreeNodeDataMain={updateTreeNodeDataMain}
            onCutNode={onCutNode}
            cutNode={cutNode}
            getOverFlowItems={getOverFlowItems}
            cutNodeLevel={cutNodeLevel}
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
  /** To Specify Expand Icon */
  expandedIcon: PropTypes.string,
  /** To Specify Collapsed Icon */
  collapsedIcon: PropTypes.string,
  /** Style class of the component */
  className: PropTypes.string,

  onOverflowAction: PropTypes.func,
  onOverFlowActionChange: PropTypes.func,

  onDragOver: PropTypes.func,
  /** Callback function on selecting tree node */
  onChange: PropTypes.func,
  /** Callback function on expanding/collapsing tree node */
  onToggle: PropTypes.func,

  getOverFlowItems: PropTypes.func,
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
  onDragOver: null,
  onToggle: null,
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  className: '',
  type: 'default',
  config: {},
  onOverflowAction: null,
  onOverFlowActionChange: null,
  getOverFlowItems: null
};

export default TreeView;
