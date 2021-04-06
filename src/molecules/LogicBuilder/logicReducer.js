export const logicReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIC_ITEM': {
      const currentState = { ...state.expandedQueries };
      if (currentState[action.data + '']) {
        currentState[action.data + ''] = !currentState[action.data];
      } else {
        currentState[action.data + ''] = true;
      }

      //   console.log(currentState);
      return {
        ...state,
        expandedQueries: currentState
      };
    }

    default:
      throw new Error('Unexpected action');
  }
};
