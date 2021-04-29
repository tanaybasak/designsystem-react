import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import LogicBuilderStateContext from './LogicBuilderStateContext';
import LogicBuilderDispatchContext from './LogicBuilderDispatchContext';
import { LogicBuilderReducer } from './LogicBuilderReducer';
import prefix from '../../settings';
const initialState = {
  expandedQueries: {}
};
const LogicBuilder = ({ children, className, collapsedTiles }) => {
  const [state, dispatch] = useReducer(LogicBuilderReducer, initialState);

  const classNames = [`${prefix}-logic-builder`];
  if (className) {
    classNames.push(className);
  }

  useEffect(() => {
    dispatch({
      type: 'SET_EXPANDED_TILES',
      data: collapsedTiles
    });
  }, [collapsedTiles]);
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
  className: PropTypes.string,
  /**
   * used for passing collapsed tiles id
   *
   * ```
   * { [tileId] : true}
   * ```
   *
   * eg:
   *
   * ```
   * { '100' : true , '101' : false}
   * ```
   */
  collapsedTiles: PropTypes.object
};

LogicBuilder.defaultProps = {
  children: null,
  className: null
};

export default LogicBuilder;
