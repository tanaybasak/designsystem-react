export const LogicBuilderReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIC_ITEM': {
      const currentState = { ...state.expandedQueries };
      if (currentState[action.data + '']) {
        currentState[action.data + ''] = !currentState[action.data];
      } else {
        currentState[action.data + ''] = true;
      }
      return {
        ...state,
        expandedQueries: currentState
      };
    }
    case 'SET_EXPANDED_TILES': {
      return {
        ...state,
        expandedQueries: action.data ? action.data : {}
      };
    }

    default:
      throw new Error('Unexpected action');
  }
};
