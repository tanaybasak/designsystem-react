import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import TextEditor from './TextEditor';
import { updateTreeNode } from '../../util/treeUtil';
import TreeDispatchContext from './treeDispatchContext';
import TreeStateContext from './treeStateContext';
import TreeFunctionContext from './treeFunctionContext';
const TreeInlineEditor = ({ content, node, level }) => {
  const [formStatus, updateFormStaus] = useState(false);
  const [errorMessage, updateErrorMessage] = useState(null);

  const dispatch = useContext(TreeDispatchContext);
  const state = useContext(TreeStateContext);
  const callbackContext = useContext(TreeFunctionContext);

  const configuration = state.configuration;

  const updateNodeText = value => {
    updateTreeNodeName(value);
  };

  const updateTreeNodeName = async value => {
    let nodeTemp = { ...node };
    if (nodeTemp[configuration.name] !== value) {
      nodeTemp[configuration.name] = value;

      let flag = await callbackContext.onRenamingNode(nodeTemp);
      if (flag[0]) {
        const updatedTree = updateTreeNode(
          state.treeInfo,
          nodeTemp,
          level,
          configuration
        );
        dispatch({ type: 'SET_TREE_DATA', data: updatedTree });
        if (callbackContext.onActionCompletes) {
          callbackContext.onActionCompletes('edit', updatedTree, nodeTemp);
        }

        updateFormStaus(false);
        updateErrorMessage('');
        dispatch({ type: 'SET_RENAME_NODE_ID', data: null });
      } else {
        updateFormStaus(true);
        updateErrorMessage(flag[1]);
      }
    } else {
      updateFormStaus(false);
      dispatch({ type: 'SET_RENAME_NODE_ID', data: null });
    }
  };

  const closeTextField = () => {
    dispatch({ type: 'SET_RENAME_NODE_ID', data: null });
    updateFormStaus(false);
  };

  return (
    <TextEditor
      value={content}
      onTextUpdate={updateNodeText}
      formStatus={formStatus}
      errorMessage={errorMessage}
      onClose={closeTextField}
    />
  );
};

TreeInlineEditor.propTypes = {
  content: PropTypes.any,
  node: PropTypes.object,
  level: PropTypes.string
};

TreeInlineEditor.defaultProps = {
  content: null,
  node: null,
  level: null
};

export default TreeInlineEditor;
