import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TreeNode from './TreeNode';

const TreeView = ({
  treeData,
  expandedIcon,
  onChange,
  collapsedIcon,
  className,
  config,
  onToggle,
  type,
  globalOverFlowAction,
  onOverflowAction,
  onOverFlowActionChange
}) => {
  let [selectedNode, updateSelectedNode] = useState({});

  let [treeInfo, updateTree] = useState(treeData);

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

  const updateTreeData = (draggedNode, dropNode) => {
    let draggedNodeArray = draggedNode.split('-');
    let dropNodeArry = dropNode.split('-');
    let treeInfoTemp = [...treeInfo];
    let dropModel = treeInfoTemp[parseInt(dropNodeArry.splice(0, 1))];
    dropNodeArry.map(arrayNumber => {
      dropModel = dropModel.children[parseInt(arrayNumber)];
    });
    if (!dropModel.children) {
      dropModel.children = [];
    }
    const spliceIndex = parseInt(draggedNodeArray.splice(0, 1));
    let model = treeInfoTemp[spliceIndex];
    if (draggedNodeArray.length > 0) {
      draggedNodeArray.map((arrayNumber, index) => {
        if (draggedNodeArray.length - 1 === index) {
          let requestedModel = model.children[parseInt(arrayNumber)];
          model.children.splice(parseInt(arrayNumber), 1);
          model = requestedModel;
        } else {
          model = model.children[parseInt(arrayNumber)];
        }
      });
    } else {
      treeInfoTemp.splice(spliceIndex, 1);
    }
    dropModel.children.push(model);
    updateTree(treeInfoTemp);
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
            level={index + ''}
            onSelectNode={type === 'single' ? onSelectNode : null}
            selectedNode={type === 'single' ? selectedNode : null}
            onToggleNode={onToggle ? onToggleNode : null}
            configuration={configuration}
            updateTreeData={updateTreeData}
            globalOverFlowAction={globalOverFlowAction}
            onOverflowAction={onOverflowAction}
            onOverFlowActionChange={onOverFlowActionChange}
          />
        );
      })}
    </ul>
  );
};

TreeView.propTypes = {
  /** Tree Data */
  treeData: PropTypes.any,
  /** To Specify Expand Icon */
  expandedIcon: PropTypes.string,
  /** To Specify Collapsed Icon */
  collapsedIcon: PropTypes.string,
  /** Style class of the component */
  className: PropTypes.string,

  globalOverFlowAction: PropTypes.any,

  onOverflowAction:PropTypes.func,
  onOverFlowActionChange:PropTypes.func,

  /** Callback function on selecting tree node */
  onChange: PropTypes.func,
  /** Callback function on expanding/collapsing tree node */
  onToggle: PropTypes.func,
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
  onChange: null,
  onToggle: null,
  globalOverFlowAction: null,
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  className: '',
  type: 'default',
  config: {},
  onOverflowAction : null,
  onOverFlowActionChange : null
};

export default TreeView;
