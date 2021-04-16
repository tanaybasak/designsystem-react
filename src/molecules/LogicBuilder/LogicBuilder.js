import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import LogicBuilderStateContext from './LogicBuilderStateContext';
import LogicBuilderDispatchContext from './LogicBuilderDispatchContext';
import { LogicBuilderReducer } from './LogicBuilderReducer';
import prefix from '../../settings';
const initialState = {
  expandedQueries: {}
};
const LogicBuilder = ({ children, className }) => {
  const [state, dispatch] = useReducer(LogicBuilderReducer, initialState);

  const classNames = [`${prefix}-logic-builder`];
  if (className) {
    classNames.push(className);
  }
  return (
    <LogicBuilderDispatchContext.Provider value={dispatch}>
      <LogicBuilderStateContext.Provider value={state}>
        <div className={classNames.join(' ')}>
          <ul className={`${prefix}-logic-builder-group ${prefix}-main-parent`}>
            {children}
          </ul>
        </div>
      </LogicBuilderStateContext.Provider>
    </LogicBuilderDispatchContext.Provider>
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
