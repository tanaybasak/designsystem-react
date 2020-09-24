export const findNextSiblingAncestor = nodeElement => {
  const parentNodeElement = nodeElement.parentElement;
  if (parentNodeElement) {
    if (parentNodeElement.nextElementSibling) {
      return parentNodeElement.nextElementSibling;
    } else {
      return findNextSiblingAncestor(parentNodeElement);
    }
  } else {
    return null;
  }
};
export const findLastVisibleChildren = nodeElement => {
  if (
    nodeElement.getAttribute('aria-expanded') === 'true' &&
    nodeElement.children &&
    nodeElement.children.length > 1
  ) {
    const childrenListElements = nodeElement.children[1].children;
    const lastChildElement =
      childrenListElements[childrenListElements.length - 1];
    return findLastVisibleChildren(lastChildElement);
  } else {
    return nodeElement;
  }
};

export const updateTreeNode = (tree, node, level, configuration) => {
  let treeData = [...tree];
  let levelArray = level.split('-');

  if (levelArray.length === 1) {
    treeData[parseInt(levelArray.splice(0, 1))] = node;
  } else {
    let model = treeData[parseInt(levelArray.splice(0, 1))];
    levelArray.map((arrayNumber, index) => {
      if (levelArray.length === index + 1) {
        model[configuration['children']][parseInt(arrayNumber)] = node;
      } else {
        model = model[configuration['children']][parseInt(arrayNumber)];
      }
    });
  }

  return treeData;
};

export const getConditionStatus = (conditions, node) => {
  let conditionStatus = true;
  conditions.map(condition => {
    if (conditionStatus) {
      if (condition.operand === '=') {
        if (node[condition.operator] === condition.value) {
          conditionStatus = true;
        } else {
          conditionStatus = false;
        }
      }
    }
  });
  return conditionStatus;
};

const moveElementInArray = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
};
export const updateNodePosition = (
  tree,
  dragLevel,
  dropLevel,
  dropModelIndex,
  configuration
) => {
  let treeData = [...tree];
  let draggedNodeArray = dragLevel.split('-');
  let dropNodeArry = [];
  let dropModel = treeData;

  if (dropLevel) {
    dropNodeArry = dropLevel.split('-');

    dropModel = treeData[parseInt(dropNodeArry.splice(0, 1))];
    dropNodeArry.map(arrayNumber => {
      dropModel = dropModel[configuration['children']][parseInt(arrayNumber)];
    });
  }

  if (dropModelIndex === undefined) {
    if (Array.isArray(dropModel)) {
      dropModelIndex = dropModel.length;
    } else {
      dropModelIndex = dropModel[configuration['children']].length;
    }
  }

  let dragModelIndex = parseInt(draggedNodeArray.splice(-1, 1));
  let dragModel = treeData;
  if (draggedNodeArray.length > 0) {
    dragModel = treeData[parseInt(draggedNodeArray.splice(0, 1))];
    draggedNodeArray.map(arrayNumber => {
      dragModel = dragModel[configuration['children']][parseInt(arrayNumber)];
    });
  }

  if (dragModel === dropModel) {
    if (Array.isArray(dragModel)) {
      moveElementInArray(dragModel, dragModelIndex, dropModelIndex);
    } else {
      moveElementInArray(
        dragModel[configuration['children']],
        dragModelIndex,
        dropModelIndex
      );
    }
  } else {
    if (Array.isArray(dropModel)) {
      dropModel.splice(
        dropModelIndex,
        0,
        dragModel[configuration['children']][dragModelIndex]
      );
      dragModel[configuration['children']].splice(dragModelIndex, 1);
    } else {
      if (Array.isArray(dragModel)) {
        dropModel[configuration['children']].splice(
          dropModelIndex,
          0,
          dragModel[dragModelIndex]
        );
        dragModel.splice(dragModelIndex, 1);
      } else {
        if (!dropModel[configuration['children']]) {
          dropModel[configuration['children']] = [];
        }
        dropModel[configuration['children']].splice(
          dropModelIndex,
          0,
          dragModel[configuration['children']][dragModelIndex]
        );
        dragModel[configuration['children']].splice(dragModelIndex, 1);
      }
    }
  }
  return treeData;
};

export const isInSameLevel = (level1, level2) => {
  return (
    level1.substr(0, level1.lastIndexOf('-')) ===
    level2.substr(0, level2.lastIndexOf('-'))
  );
};

export const deleteNode = (tree, level, configuration) => {
  let deleteLevel = level.split('-');
  let tempTreeInfo = [...tree];
  if (deleteLevel.length === 1) {
    tempTreeInfo.splice(parseInt(deleteLevel[0]), 1);
  } else {
    let model = tempTreeInfo[parseInt(deleteLevel.splice(0, 1))];
    deleteLevel.map((arrayNumber, index) => {
      if (deleteLevel.length === index + 1) {
        model[configuration['children']].splice(parseInt(arrayNumber), 1);
      } else {
        model = model[configuration['children']][parseInt(arrayNumber)];
      }
    });
  }
  return tempTreeInfo;
};

export const copyNode = (tree, level, node, configuration) => {
  let pasteNodeLevel = level.split('-');
  let tempTreeInfo = [...tree];

  if (pasteNodeLevel.length === 1) {
    tempTreeInfo[parseInt(pasteNodeLevel[0])][configuration['children']].push(
      node
    );
  } else {
    let model = tempTreeInfo[parseInt(pasteNodeLevel.splice(0, 1))];
    pasteNodeLevel.map(arrayNumber => {
      model = model[configuration['children']][parseInt(arrayNumber)];
    });

    model[configuration['children']].push(node);
  }
  return tempTreeInfo;
};

export const getDropRegionPlaceholderFromNode = ev => {
  const element = ev.currentTarget.getBoundingClientRect();
  const height = element.height;
  if (
    ev.clientY >= element.y - 2 &&
    ev.clientY < element.y + (height * 3) / 10
  ) {
    return 'top';
  } else if (
    ev.clientY >= element.y + (height * 3) / 10 &&
    ev.clientY <= element.y + (height * 7) / 10
  ) {
    return 'middle';
  } else if (
    ev.clientY > element.y + (height * 7) / 10 &&
    ev.clientY <= element.y + height
  ) {
    return 'bottom';
  }
};

export const getDropRegionPlaceholderOutsideNode = ev => {
  const element = ev.currentTarget.getBoundingClientRect();
  const height = element.height;
  if (ev.clientY >= element.y - 1 && ev.clientY <= element.y + height / 2) {
    return 'top';
  } else if (
    ev.clientY > element.y + height / 2 &&
    ev.clientY <= element.y + height
  ) {
    return 'bottom';
  }
};
