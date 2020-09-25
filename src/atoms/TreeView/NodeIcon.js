import React, { cloneElement, useContext } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

import TreeStateContext from './treeStateContext';
import TreeFunctionContext from './treeFunctionContext';

const NodeIcon = ({ node }) => {
  const state = useContext(TreeStateContext);
  const callbackContext = useContext(TreeFunctionContext);

  const configuration = state.configuration;

  const displayChildren = configuration.externalExpandNode
    ? state.expandedNodes && state.expandedNodes[node[configuration.key]]
    : node[configuration.displayChildren];

  let expandIcon = null;
  let collapsedIcon = null;
  let icon = null;
  if (
    !(
      node[configuration.expandIcon] ||
      node[configuration.collapsedIcon] ||
      node[configuration.icon]
    )
  ) {
    if (callbackContext.getIcons) {
      let icons = callbackContext.getIcons(node);
      expandIcon = icons.expandIcon;
      collapsedIcon = icons.collapsedIcon;
      icon = icons.icon;
    } else if (state.iconClass) {
      if (state.iconClass.operator) {
        expandIcon =
          state.iconClass.values[node[state.iconClass.operator]].expandedIcon;
        collapsedIcon =
          state.iconClass.values[node[state.iconClass.operator]].collapsedIcon;
        icon = state.iconClass.values[node[state.iconClass.operator]].icon;
      } else {
        expandIcon = state.iconClass.values.expandedIcon;
        collapsedIcon = state.iconClass.values.collapsedIcon;
        icon = state.iconClass.values.icon;
      }
    }
  }

  return (
    <>
      {node[configuration.expandIcon] && displayChildren ? (
        <i
          className={`${prefix}-tree-node-icon ${
            node[configuration.expandIcon]
          }`}
        />
      ) : expandIcon && displayChildren ? (
        cloneElement(expandIcon, {
          className: `${prefix}-tree-node-icon ${expandIcon.props.className}`
        })
      ) : null}

      {node[configuration.collapsedIcon] && !displayChildren ? (
        <i
          className={`${prefix}-tree-node-icon ${
            node[configuration.collapsedIcon]
          }`}
        />
      ) : collapsedIcon && !displayChildren ? (
        cloneElement(collapsedIcon, {
          className: `${prefix}-tree-node-icon ${collapsedIcon.props.className}`
        })
      ) : null}

      {node[configuration.icon] ? (
        <i className={`${prefix}-tree-node-icon ${node[configuration.icon]}`}>
          {' '}
        </i>
      ) : icon ? (
        cloneElement(icon, {
          className: `${prefix}-tree-node-icon ${icon.props.className}`
        })
      ) : null}
    </>
  );
};

NodeIcon.propTypes = {
  node: PropTypes.object
};

NodeIcon.defaultProps = {
  node: null
};

export default React.memo(NodeIcon);
