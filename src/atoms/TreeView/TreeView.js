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
  type
}) => {
  let [selectedNode, updateSelectedNode] = useState({});

  const onSelectNode = event => {
    updateSelectedNode(event);
    onChange(event);
  };

  const onToggleNode = event => {
    onToggle(event);
  };

  let defaultConfig = {
    displayChildren: 'showChildren',
    expandIcon: 'expandIcon',
    collapsedIcon: 'collapsedIcon',
    icon: 'icon',
    children: 'children',
    name: 'name',
    hasChildren: 'hasChildren'
  };

  const configuration = { ...defaultConfig, ...config };
  const classnames = `${prefix}-tree ${className.trim()}`;
  return (
    <ul role="tree" className={classnames}>
      {treeData.map((node, index) => {
        return (
          <TreeNode
            node={node}
            key={`index-${index}`}
            expandedIcon={expandedIcon}
            collapsedIcon={collapsedIcon}
            onSelectNode={type === 'single' ? onSelectNode : null}
            selectedNode={type === 'single' ? selectedNode : null}
            onToggleNode={onToggle ? onToggleNode : null}
            configuration={configuration}
          />
        );
      })}
    </ul>
  );
};

TreeView.propTypes = {
  treeData: PropTypes.any,
  expandedIcon: PropTypes.string,
  collapsedIcon: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  config: PropTypes.any,
  type: PropTypes.oneOf(['default', 'single'])
};

TreeView.defaultProps = {
  treeData: [],
  onChange: null,
  onToggle: null,
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  className: '',
  type: 'default',
  config: {}
};

export default TreeView;
