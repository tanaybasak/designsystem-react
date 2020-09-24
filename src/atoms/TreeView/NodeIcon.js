import React, { cloneElement, useContext } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';

import TreeStateContext from './treeStateContext';
import TreeFunctionContext from './treeFunctionContext';
import { getConditionStatus } from '../../util/treeUtil';

const NodeIcon = ({ node }) => {
  const state = useContext(TreeStateContext);
  const callbackContext = useContext(TreeFunctionContext);

  const configuration = state.configuration;

  const displayChildren =
    state.expandedNodes && state.expandedNodes[node[configuration.key]];

  let expandIcon = null;
  let collapsedIcon = null;
  let icon = null;
  if (callbackContext.getIcons) {
    let icons = callbackContext.getIcons(node);
    expandIcon = icons.expandIcon;
    collapsedIcon = icons.collapsedIcon;
    icon = icons.icon;
  } else if (state.iconClass) {
    let iconClassObj = {};
    state.iconClass.map(actionSet => {
      if (actionSet.condition === 'all') {
        iconClassObj = actionSet.values;
      } else {
        const conditionStatus = getConditionStatus(actionSet.condition, node);
        if (conditionStatus) {
          iconClassObj = actionSet.values;
        }
      }
    });

    expandIcon = iconClassObj.expandIcon;
    collapsedIcon = iconClassObj.collapsedIcon;
    icon = iconClassObj.icon;
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
