import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import LogicStateContext from './LogicStateContext';
import LogicDispatchContext from './logicDispatchContext';
import { logicReducer } from './logicReducer';
const initialState = {
  expandedQueries: {}
};
const LogicBuilder = ({ children, rounderCorner, className }) => {
  const [state, dispatch] = useReducer(logicReducer, initialState);

  const classNames = [`logic-builder`];
  if (rounderCorner) {
    classNames.push('logic-builder-round');
  }
  if (className) {
    classNames.push(className);
  }
  return (
    <LogicDispatchContext.Provider value={dispatch}>
      <LogicStateContext.Provider value={state}>
        <div className={classNames.join(' ')}>
          <ul className="logic-builder-group main-parent">{children}</ul>
        </div>
      </LogicStateContext.Provider>
    </LogicDispatchContext.Provider>
  );
};

LogicBuilder.propTypes = { rounderCorner: PropTypes.bool };

LogicBuilder.defaultProps = { rounderCorner: false };

export default LogicBuilder;
