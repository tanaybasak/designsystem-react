import React from 'react';

const TreeStateContext = React.createContext({
  treeInfo: [],
  expandedNodes: {},
  configuration: {},

  selectedNode: null,

  draggedNode: null,
  draggedNodeLevel: null,

  cutNode: null,
  cutNodeLevel: null,

  copiedNode: null,

  expandedIcon: null,
  collapsedIcon: null,
  iconClass: null,
  dragRules: null,

  overflowOnHover: false
});

export default TreeStateContext;
