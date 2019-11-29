import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TreeNode from './TreeNode';

const TreeView = ({ treeData, expandedIcon, onChange, collapsedIcon }) => {
  const onSelectNode = event => {
    onChange(event);
  };

  return (
    <ul role="tree" className="hcl-tree">
      {treeData.map((node, index) => {
        return (
          <TreeNode
            node={node}
            key={`index-${index}`}
            expandedIcon={expandedIcon}
            collapsedIcon={collapsedIcon}
            onSelectNode={onSelectNode}
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
  onChange: PropTypes.func
};

TreeView.defaultProps = {
  treeData: [],
  onChange: () => {},
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret'
};

export default TreeView;
