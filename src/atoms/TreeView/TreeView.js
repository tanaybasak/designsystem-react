import React, { useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TreeNode from './TreeNode';

const TreeView = ({
  treeData,
  expandedIcon,
  onChange,
  collapsedIcon,
  className
}) => {
  let [selectedNode, updateSelectedNode] = useState({});

  const onSelectNode = event => {
    updateSelectedNode(event);
    onChange(event);
  };

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
            onSelectNode={onSelectNode}
            selectedNode={selectedNode}
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
  onChange: PropTypes.func
};

TreeView.defaultProps = {
  treeData: [],
  onChange: () => {},
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  className: ''
};

export default TreeView;
