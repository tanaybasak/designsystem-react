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
