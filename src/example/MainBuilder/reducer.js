import { getUniqueId, findTreeItem, removeTreeItem } from './utils';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CHILDREN': {
      const currentQuery = [...state.query];
      const item = action.data.node;
      item.children.push({
        type: 'var',
        header: action.data.header,
        id: getUniqueId(),
        property: {
          property: '',
          operator: '',
          value: ''
        }
      });

      findTreeItem(currentQuery, item);

      return {
        ...state,
        query: currentQuery
      };
    }
    case 'UPDATE_QUERY_TYPE': {
      const currentQuery = [...state.query];
      let item = action.data.node;
      item.type = action.data.type.value;
      item.expanded = false;
      switch (item.type) {
        case 'and': {
          item.expanded = true;
          item.children = [
            {
              type: 'var',
              id: getUniqueId(),
              property: { property: '', operator: '', value: '' }
            },
            {
              type: 'var',
              header: 'And',
              id: getUniqueId(),
              property: { property: '', operator: '', value: '' }
            }
          ];
          break;
        }
        case 'or': {
          item.children = [
            {
              type: 'var',
              id: getUniqueId(),
              property: { property: '', operator: '', value: '' }
            },
            {
              type: 'var',
              header: 'Or',
              id: getUniqueId(),
              property: { property: '', operator: '', value: '' }
            }
          ];
          break;
        }
        case 'if': {
          item.children = [
            {
              type: 'var',
              header: 'Condition',
              id: getUniqueId(),
              property: { property: '', operator: '', value: '' }
            },
            {
              type: 'var',
              header: 'Then',
              id: getUniqueId(),
              property: { property: '', operator: '', value: '' }
            },
            {
              type: 'var',
              header: 'Else',
              id: getUniqueId(),
              property: { property: '', operator: '', value: '' }
            }
          ];
          break;
        }
        case 'var': {
          item.children = [];
          item.property = { property: '', operator: '', value: '' };
          break;
        }
        case 'not': {
          item.children = [
            {
              type: 'var',
              id: getUniqueId(),
              property: { property: '', operator: '', value: '' }
            }
          ];
          break;
        }
      }
      console.log(item);
      findTreeItem(currentQuery, item);
      return {
        ...state,
        query: currentQuery
      };
    }
    case 'UPDATE_ITEM_PROPERTY': {
      const currentQuery = [...state.query];
      const item = action.data;
      findTreeItem(currentQuery, item);

      return {
        ...state,
        query: currentQuery
      };
    }
    case 'REMOVE_CHILDREN': {
      const currentQuery = [...state.query];
      const item = action.data;
      removeTreeItem(currentQuery, item);
      return {
        ...state,
        query: currentQuery
      };
    }

    default:
      throw new Error('Unexpected action');
  }
};
