export const findTreeItem = (treeData, item) => {
  treeData.map(data => {
    if (data.id === item.id) {
      data = item;
    }

    if (data.children && data.children.length > 0) {
      findTreeItem(data.children, item);
    }
  });
};

export const removeTreeItem = (treeData, item) => {
  treeData.map((data, index) => {
    console.log(data, item);
    if (data.id === item.id) {
      console.log('REMOVED');
      treeData.splice(index, 1);
    }

    if (data.children && data.children.length > 0) {
      removeTreeItem(data.children, item);
    }
  });
};

export const getUniqueId = () => {
  return Math.random();
};

const createRule = (item, idMapper, value) => {
  item.map(childItem => {
    if (childItem.children && childItem.children.length > 0) {
      createRule(childItem.children, idMapper, value);
    }

    idMapper[childItem.id] = childItem.type;
    value[childItem.id] =
      childItem.type === 'var'
        ? `${
            childItem.property && childItem.property.property
              ? childItem.property.property
              : ''
          } ${
            childItem.property && childItem.property.operator
              ? childItem.property.operator
              : ''
          } ${
            childItem.property && childItem.property.value
              ? childItem.property.value
              : ''
          }`
        : childItem.children &&
          childItem.children.length > 0 &&
          childItem.children.map(subChildren => subChildren.id);
  });
};

export const createRuleAndIdMapper = query => {
  const idMapper = {};
  const value = {};
  createRule(query, idMapper, value);
  return {
    idMapper: idMapper,
    value: value
  };
};
