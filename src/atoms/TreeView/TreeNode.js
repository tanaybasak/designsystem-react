import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import TreeStateContext from './treeStateContext';
import TreeNodeWrapper from './TreeNodeWrapper';
const TreeNode = ({ node, level, parentNode }) => {
  const state = useContext(TreeStateContext);

  const configuration = state.configuration;

  const displayChildren =
    state.expandedNodes && state.expandedNodes[node[configuration.key]];

  return (
    <li
      className={`${prefix}-tree-item`}
      role="treeitem"
      aria-expanded={
        (node[configuration.children] &&
          node[configuration.children].length != 0) ||
        node[configuration.hasChildren]
          ? displayChildren
            ? true
            : false
          : null
      }
    >
      <TreeNodeWrapper
        node={node}
        level={level}
        parentNode={parentNode}
        displayChildren={displayChildren}
        hasChildren={
          (node[configuration.children] &&
            node[configuration.children].length !== 0) ||
          node[configuration.hasChildren]
        }
      />

      {node[configuration.children] &&
      node[configuration.children].length > 0 &&
      displayChildren ? (
        <ul role="group" className={`${prefix}-tree-nested`}>
          {node[configuration.children].map((subnode, subIndex) => {
            return (
              <TreeNode
                node={subnode}
                key={`treeNodeIndex-${subIndex}`}
                level={level + '-' + subIndex}
                parentNode={node}
              />
            );
          })}
        </ul>
      ) : null}
    </li>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object,
  level: PropTypes.string,
  parentNode: PropTypes.object
};

TreeNode.defaultProps = {
  node: null,
  level: null,
  parentNode: null
};

export default TreeNode;
