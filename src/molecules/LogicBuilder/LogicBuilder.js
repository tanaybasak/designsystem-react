import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import LogicStateContext from './LogicStateContext';
import LogicDispatchContext from './LogicDispatchContext';
import { LogicReducer } from './LogicReducer';
const initialState = {
  expandedQueries: {}
};
const LogicBuilder = ({ children, className }) => {
  const [state, dispatch] = useReducer(LogicReducer, initialState);

  const classNames = [`hcl-logic-builder`];
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

LogicBuilder.propTypes = {
  /**
   * **LogicItem** to be added as children
   */
  children: PropTypes.node,
  /**
   * Name of the custom class to apply to the LogicBuilder
   */
  className: PropTypes.string
};

LogicBuilder.defaultProps = {
  children: null,
  className: null
};

export default LogicBuilder;
