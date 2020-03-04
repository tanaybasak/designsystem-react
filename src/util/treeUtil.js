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

export const updateTreeNode = (tree, node, level) => {
  let treeData = JSON.parse(JSON.stringify(tree));
  let levelArray = level.split('-');

  if (levelArray.length === 1) {
    treeData[parseInt(levelArray.splice(0, 1))] = node;
  } else {
    let model = treeData[parseInt(levelArray.splice(0, 1))];
    levelArray.map((arrayNumber, index) => {
      console.log(arrayNumber, index);
      if (levelArray.length === index + 1) {
        model.children[parseInt(arrayNumber)] = node;
      } else {
        model = model.children[parseInt(arrayNumber)];
      }
    });
  }

  return treeData;
};

export const moveTreeNodeToChildren = (tree, dragLevel, dropLevel) => {
  let treeData = JSON.parse(JSON.stringify(tree));
  let draggedNodeArray = dragLevel.split('-');
  let dropNodeArry = dropLevel.split('-');

  let dropModel = treeData[parseInt(dropNodeArry.splice(0, 1))];
  dropNodeArry.map(arrayNumber => {
    dropModel = dropModel.children[parseInt(arrayNumber)];
  });

  const spliceIndex = parseInt(draggedNodeArray.splice(0, 1));
  let model = treeData[spliceIndex];
  if (draggedNodeArray.length > 0) {
    draggedNodeArray.map((arrayNumber, index) => {
      if (draggedNodeArray.length - 1 === index) {
        let requestedModel = model.children[parseInt(arrayNumber)];
        model.children.splice(parseInt(arrayNumber), 1);
        model = requestedModel;
      } else {
        model = model.children[parseInt(arrayNumber)];
      }
    });
  } else {
    treeData.splice(spliceIndex, 1);
  }

  if (!dropModel.children) {
    dropModel.children = [];
  }
  dropModel.children.push(model);

  return treeData;
};

const compareVersion = (v1, v2) => {
  if (typeof v1 !== 'string') return false;
  if (typeof v2 !== 'string') return false;
  v1 = v1.split('-');
  v2 = v2.split('-');
  const k = Math.min(v1.length, v2.length);
  for (let i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10);
    v2[i] = parseInt(v2[i], 10);
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }
  return v1.length == v2.length ? 0 : v1.length < v2.length ? -1 : 1;
};
export const moveTreeNode = (tree, dragLevel, dropLevel) => {
  const levelCompare = compareVersion(dragLevel, dropLevel);
  let treeData = JSON.parse(JSON.stringify(tree));
  let draggedNodeArray = dragLevel.split('-');
  let dropNodeArry = dropLevel.split('-');
  let dropModel = treeData;
  let dropModelIndex = parseInt(dropNodeArry.splice(-1, 1));
  if (dropNodeArry.length !== 0) {
    dropModel = treeData[parseInt(dropNodeArry.splice(0, 1))];
    dropNodeArry.map(arrayNumber => {
      dropModel = dropModel.children[parseInt(arrayNumber)];
    });
  }
  const spliceIndex = parseInt(draggedNodeArray.splice(0, 1));
  let model = treeData[spliceIndex];
  if (draggedNodeArray.length > 0) {
    draggedNodeArray.map((arrayNumber, index) => {
      if (draggedNodeArray.length - 1 === index) {
        let requestedModel = model.children[parseInt(arrayNumber)];
        model.children.splice(parseInt(arrayNumber), 1);
        model = requestedModel;
      } else {
        model = model.children[parseInt(arrayNumber)];
      }
    });
  } else {
    treeData.splice(spliceIndex, 1);
  }
  if (Array.isArray(dropModel)) {
    if (levelCompare === -1) {
      dropModelIndex = dropModelIndex - 1;
    }
    dropModel.splice(dropModelIndex, 0, model);
  } else {
    if (!dropModel.children) {
      dropModel.children = [];
    }
    if (levelCompare === -1) {
      dropModelIndex = dropModelIndex - 1;
    }
    dropModel.children.splice(dropModelIndex, 0, model);
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
