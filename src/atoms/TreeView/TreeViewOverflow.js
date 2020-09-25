import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import { Overflowmenu, MenuItem } from '../../molecules/Overflowmenu';

import TreeDispatchContext from './treeDispatchContext';
import TreeStateContext from './treeStateContext';
import TreeFunctionContext from './treeFunctionContext';
import {
  copyNode,
  deleteNode,
  updateNodePosition,
  updateTreeNode
} from '../../util/treeUtil';

const TreeViewOverflow = ({ node, level, updateTextStatus }) => {
  const dispatch = useContext(TreeDispatchContext);
  const state = useContext(TreeStateContext);
  const callbackContext = useContext(TreeFunctionContext);

  const configuration = state.configuration;

  const [overflowItemList, updateOverflowItemList] = useState([]);

  const tiggerOverflowMenu = e => {
    e.stopPropagation();
    e.preventDefault();
    getOverflowMenuList();
  };

  const enablePasteAction = list => {
    const found = list.find(element => element.action === 'paste');

    if (found) {
      found.disabled = false;
    } else {
      list.push({
        name: 'Paste',
        action: 'paste'
      });
    }

    return list;
  };

  const getOverflowMenuList = () => {
    let overflowList = callbackContext.getOverFlowItems(node);
    if (!level.startsWith(state.cutNodeLevel)) {
      if (
        state.cutNode &&
        state.cutNode[configuration.name] &&
        callbackContext.isMoveNodeAllowed(
          state.cutNode,
          node,
          null,
          state.treeInfo
        )
      ) {
        if (
          state.cutNodeLevel.substr(0, state.cutNodeLevel.lastIndexOf('-')) !==
          level
        ) {
          overflowList = enablePasteAction(overflowList);
        }
      } else if (
        state.copiedNode &&
        callbackContext.isCopyAllowed(state.copiedNode, node, state.treeInfo)
      ) {
        overflowList = enablePasteAction(overflowList);
      }
    }
    updateOverflowItemList(overflowList);
  };

  const overflowListOnEnter = e => {
    e.stopPropagation();
    var key = e.which || e.keyCode;
    if (
      key === 13 &&
      !(
        e.target &&
        e.target.classList &&
        e.target.classList.contains(`${prefix}-overflow-option-item`)
      )
    ) {
      getOverflowMenuList();
      e.currentTarget.querySelector(`.${prefix}-overflow-btn`).click();
      e.preventDefault();
    }
  };

  const onOverflowItemSelect = async action => {
    if (action.action) {
      const actionName = action.action;
      if (actionName === 'edit') {
        updateTextStatus(true);
      } else if (actionName === 'cut') {
        dispatch({
          type: 'SET_CUT_NODE',
          data: { cutNode: node, cutNodeLevel: level }
        });

        callbackContext.onOverflowAction(actionName, node);
      } else if (actionName === 'copy') {
        let tempCopiedNode = { ...node };
        if (callbackContext.onOverflowAction) {
          const updatedCopiedNode = await callbackContext.onOverflowAction(
            actionName,
            {
              ...node
            }
          );
          if (updatedCopiedNode) {
            tempCopiedNode = updatedCopiedNode;
          }
        }
        dispatch({
          type: 'SET_COPIED_NODE',
          data: tempCopiedNode
        });
      } else if (actionName === 'paste') {
        if (state.cutNodeLevel) {
          let flag = callbackContext.onMoveNode
            ? await callbackContext.onMoveNode(state.cutNode, node)
            : true;
          if (flag) {
            const updatedTree = updateNodePosition(
              state.treeInfo,
              state.cutNodeLevel,
              level,
              null,
              configuration
            );
            dispatch({ type: 'SET_TREE_DATA', data: updatedTree });
            if (callbackContext.onActionCompletes) {
              callbackContext.onActionCompletes(
                'cut',
                updatedTree,
                state.cutNode,
                node
              );
            }
          }
        } else {
          let clonedCopyModel = callbackContext.onCopyNode
            ? await callbackContext.onCopyNode(state.copiedNode, node)
            : true;
          if (clonedCopyModel) {
            const updatedTree = copyNode(
              state.treeInfo,
              level,
              clonedCopyModel,
              configuration
            );
            dispatch({ type: 'SET_TREE_DATA', data: updatedTree });
            if (callbackContext.onActionCompletes) {
              callbackContext.onActionCompletes(
                'copy',
                updatedTree,
                clonedCopyModel,
                node
              );
            }
          }
        }
      } else if (actionName === 'delete') {
        let flag = callbackContext.onDeleteNode
          ? await callbackContext.onDeleteNode(node)
          : true;
        if (flag) {
          const updatedTree = deleteNode(state.treeInfo, level, configuration);
          dispatch({ type: 'SET_TREE_DATA', data: updatedTree });
          if (callbackContext.onActionCompletes) {
            callbackContext.onActionCompletes(actionName, updatedTree, node);
          }
        }
      } else {
        let nodeData = await callbackContext.onOverflowAction(actionName, node);
        dispatch({
          type: 'SET_TREE_DATA',
          data: updateTreeNode(state.treeInfo, nodeData, level, configuration)
        });
        if (callbackContext.onActionCompletes) {
          callbackContext.onActionCompletes(
            'custom-action',
            state.treeInfo,
            nodeData
          );
        }
      }
    }
  };

  return (
    <div
      onClick={tiggerOverflowMenu}
      onKeyDown={overflowListOnEnter}
      className={`${prefix}-treenode-action ${
        state.overflowOnHover ? 'action-on-hover' : ''
      }`}
    >
      <Overflowmenu
        attachElementToBody
        scrollListner
        direction="bottom-right"
        ellipsisType="vertical"
        onClick={onOverflowItemSelect}
      >
        {overflowItemList.map((menu, index) => {
          return (
            <MenuItem
              item={menu}
              key={`menu-${index}`}
              danger={menu.danger}
              separator={menu.separator}
              disabled={menu.disabled}
              link={menu.link}
            >
              {menu.icon ? (
                <span style={{ marginRight: '.5rem', verticalAlign: 'middle' }}>
                  {menu.icon}
                </span>
              ) : null}
              {menu.name}
            </MenuItem>
          );
        })}
      </Overflowmenu>
    </div>
  );
};

TreeViewOverflow.propTypes = {
  node: PropTypes.object,
  level: PropTypes.string,
  updateTextStatus: PropTypes.func
};

TreeViewOverflow.defaultProps = {
  node: null,
  level: null,
  updateTextStatus: null
};

export default TreeViewOverflow;
