import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  findNextSiblingAncestor,
  findLastVisibleChildren
} from '../../util/treeUtil';

const TreeNode = ({
  node,
  expandedIcon,
  collapsedIcon,
  onSelectNode,
  selectedNode
}) => {
  const [showChildren, toggleNode] = useState(node.showChildren);

  const toggleTreeNode = () => {
    toggleNode(!showChildren);
  };

  const selectNode = e => {
    e.stopPropagation();
    onSelectNode(node, e);
  };

  const focusNode = node => {
    if (node.classList.contains('tree-item')) {
      node.children[0].focus();
    }
  };

  const keyDown = e => {
    var key = e.which || e.keyCode;
    const nodeElement = e.currentTarget;
    switch (key) {
      case 40: {
        if (
          nodeElement.parentElement.getAttribute('aria-expanded') === 'true' &&
          nodeElement.nextElementSibling &&
          nodeElement.nextElementSibling.children &&
          nodeElement.nextElementSibling.children.length > 0
        ) {
          focusNode(nodeElement.nextElementSibling.children[0]);
        } else {
          if (nodeElement.parentElement.nextElementSibling) {
            focusNode(nodeElement.parentElement.nextElementSibling);
          } else {
            const nextSiblingAncestor = findNextSiblingAncestor(nodeElement);
            if (nextSiblingAncestor) {
              focusNode(nextSiblingAncestor);
            }
          }
        }
        e.preventDefault();
        break;
      }
      case 38: {
        if (nodeElement.parentElement.previousElementSibling) {
          const lastElement = findLastVisibleChildren(
            nodeElement.parentElement.previousElementSibling
          );
          focusNode(lastElement);
        } else {
          const parentNodeElement =
            nodeElement.parentElement.parentElement.parentElement;
          if (parentNodeElement) {
            focusNode(parentNodeElement);
          }
        }
        e.preventDefault();
        break;
      }
      case 39: {
        if (
          nodeElement.parentElement.hasAttribute('aria-expanded') &&
          nodeElement.parentElement.getAttribute('aria-expanded') === 'false'
        ) {
          toggleNode(true);
        }
        e.preventDefault();
        break;
      }
      case 37: {
        if (
          nodeElement.parentElement.hasAttribute('aria-expanded') &&
          nodeElement.parentElement.getAttribute('aria-expanded') === 'true'
        ) {
          toggleNode(false);
        } else {
          const parentNodeElement =
            nodeElement.parentElement.parentElement.parentElement;
          if (parentNodeElement) {
            focusNode(parentNodeElement);
          }
        }
        e.preventDefault();
        break;
      }
      case 13: {
        selectNode(e);
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  return (
    <li className="tree-item" role="treeitem" aria-expanded={showChildren}>
      {node.children && node.children.length != 0 ? (
        <div
          className="tree-node"
          tabIndex="0"
          onKeyDown={keyDown}
          onClick={toggleTreeNode}
        >
          <i
            className={`toggle-icon ${
              showChildren ? expandedIcon : collapsedIcon
            }`}
          />

          {node.expandIcon && !showChildren ? (
            <i className={node.expandIcon} />
          ) : null}

          {node.collapsedIcon && showChildren ? (
            <i className={node.collapsedIcon} />
          ) : null}

          {node.icon ? <i className={node.icon}> </i> : null}

          <span
            onClick={selectNode}
            className={selectedNode === node ? 'highlight' : ''}
          >
            {node.name}
          </span>
        </div>
      ) : (
        <div className="tree-node pl-5" tabIndex="0" onKeyDown={keyDown}>
          {node.icon ? <i className={node.icon}> </i> : null}
          <span
            onClick={selectNode}
            className={selectedNode === node ? 'highlight' : ''}
          >
            {node.name}
          </span>
        </div>
      )}

      {node.children && node.children.length > 0 && showChildren ? (
        <ul role="group" className="tree-nested">
          {node.children.map((subnode, index) => {
            return (
              <TreeNode
                node={subnode}
                key={`treeNodeIndex-${index}`}
                expandedIcon={expandedIcon}
                collapsedIcon={collapsedIcon}
                onSelectNode={onSelectNode}
                selectedNode={selectedNode}
              />
            );
          })}
        </ul>
      ) : null}
    </li>
  );
};

TreeNode.propTypes = {
  node: PropTypes.any,
  selectedNode: PropTypes.any,
  expandedIcon: PropTypes.string,
  collapsedIcon: PropTypes.string,
  onSelectNode: PropTypes.func
};

TreeNode.defaultProps = {
  node: {},
  expandedIcon: 'caret caret-down',
  collapsedIcon: 'caret',
  onSelectNode: () => {},
  selectedNode: {}
};

export default TreeNode;
