import React from 'react';
const TreeFunctionContext = React.createContext({
  onChange: null,
  onToggle: null,
  onDeleteNode: null,
  onCopyNode: null,
  onMoveNode: null,
  onActionCompletes: null,
  onOverflowAction: null,
  onRenamingNode: null,
  isCopyAllowed: null,
  isMoveNodeAllowed: null,
  isDropAllowed: null,
  getOverFlowItems: null,
  customTemplate: null,
  customActionTemplate: null,
  customNodeTemplate: null,
  getIcons: null,

  onDragStart: null,
  onDragOver: null,
  onDragEnter: null,
  onDragLeave: null,
  onDrop: null,
  onDragEnd: null,
  onDoubleClick: null,
  onKeyDown: null,
  onClick: null,
  isDraggable: null
});
export default TreeFunctionContext;
