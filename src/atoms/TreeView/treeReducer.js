import { updateTreeNode } from '../../util/treeUtil';

export const treeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TREE_DATA': {
      return {
        ...state,
        treeInfo: action.data,
        draggedNode: null,
        draggedNodeLevel: null,
        cutNode: null,
        cutNodeLevel: null
      };
    }
    case 'SET_EXPANDED_NODE': {
      return {
        ...state,
        expandedNodes: action.data
      };
    }
    case 'SET_CONFIGURATION': {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          ...action.data
        }
      };
    }
    case 'SET_SELECTED_NODE': {
      return {
        ...state,
        selectedNode: action.data
      };
    }
    case 'CLEAR_SELECTED_NODE': {
      return {
        ...state,
        selectedNode: null
      };
    }
    case 'SET_DRAGGED_NODE': {
      return {
        ...state,
        draggedNode: action.data.draggedNode,
        draggedNodeLevel: action.data.draggedNodeLevel,
        copiedNode: null,
        cutNode: null,
        cutNodeLevel: null
      };
    }
    case 'CLEAR_DRAGGED_NODE': {
      return {
        ...state,
        draggedNode: null,
        draggedNodeLevel: null
      };
    }
    case 'SET_CUT_NODE': {
      return {
        ...state,
        cutNode: action.data.cutNode,
        cutNodeLevel: action.data.cutNodeLevel,
        copiedNode: null
      };
    }
    case 'SET_COPIED_NODE': {
      return {
        ...state,
        copiedNode: action.data,
        cutNode: null,
        cutNodeLevel: null
      };
    }

    case 'UPDATE_NODE': {
      action.node.displayChildren = !action.node.displayChildren;
      let treeData = []; //updateTreeNode([...state], action.node, action.level);
      return {
        ...state,
        treedata: treeData
      };
    }
    case 'RENAME_NODE': {
      return {
        ...state,
        renameLevel: action.level
      };
    }
    case 'RESET_RENAME_NODE': {
      return {
        ...state,
        renameLevel: null
      };
    }
    case 'TOGGLE_NODE_STATUS': {
      if (state.configuration['externalExpandNode']) {
        const expandedNodes = { ...state.expandedNodes };
        const nodeKey = action.data.node[state.configuration['key']];
        if (expandedNodes[nodeKey]) {
          delete expandedNodes[nodeKey];
        } else {
          expandedNodes[nodeKey] = true;
        }
        return {
          ...state,
          expandedNodes: expandedNodes
        };
      } else {
        const node = { ...action.data.node };
        node[state.configuration['displayChildren']] = !node[
          state.configuration['displayChildren']
        ];
        const updatedTree = updateTreeNode(
          state.treeInfo,
          node,
          action.data.level,
          state.configuration
        );

        return {
          ...state,
          treeInfo: updatedTree
        };
      }
    }
    case 'TOGGLE_NODE_STATUS_LAZY_LOAD': {
      if (state.configuration['externalExpandNode']) {
        const expandedNodes = { ...state.expandedNodes };
        const nodeKey = action.data.node[state.configuration['key']];
        if (expandedNodes[nodeKey]) {
          delete expandedNodes[nodeKey];
        } else {
          expandedNodes[nodeKey] = true;
        }

        const updatedTree = updateTreeNode(
          state.treeInfo,
          action.data.node,
          action.data.level,
          state.configuration
        );
        return {
          ...state,
          expandedNodes: expandedNodes,
          treeInfo: updatedTree
        };
      } else {
        const node = { ...action.data.node };
        node[state.configuration['displayChildren']] = !node[
          state.configuration['displayChildren']
        ];
        const updatedTree = updateTreeNode(
          state.treeInfo,
          node,
          action.data.level,
          state.configuration
        );

        return {
          ...state,
          treeInfo: updatedTree
        };
      }
    }
    case 'SET_ICON_CLASS': {
      return {
        ...state,
        iconClass: action.data
      };
    }
    case 'SET_DRAG_RULES': {
      return {
        ...state,
        dragRules: action.data
      };
    }
    case 'SET_TOGGLE_ICON': {
      return {
        ...state,
        expandedIcon: action.data.expandedIcon,
        collapsedIcon: action.data.collapsedIcon
      };
    }
    case 'SET_OVERFLOW_ON_HOVER': {
      return {
        ...state,
        overflowOnHover: true
      };
    }

    case 'SET_TREE_VIEW_TYPE': {
      return {
        ...state,
        type: action.data
      };
    }
    case 'SET_DRAGGABLE': {
      return {
        ...state,
        draggable: action.data
      };
    }
    case 'SET_RENAME_NODE_ID': {
      return {
        ...state,
        renameNodeId: action.data
      };
    }
    default:
      throw new Error('Unexpected action');
  }
};
