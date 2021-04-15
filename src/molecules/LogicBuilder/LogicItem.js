import React, { Children, cloneElement, useContext } from 'react';
import Tile from '../../atoms/Tile';
import Button from '../../atoms/Button';
import LogicDispatchContext from './LogicDispatchContext';
import LogicStateContext from './LogicStateContext';
import PropTypes from 'prop-types';
import { addMoreIcon, chevronIcon } from '../../util/icons';
import prefix from '../../settings';
const LogicItem = ({
  id,
  tileHeader,
  logicType,
  actionTemplate,
  content,
  children,
  isLastElement,
  showAddMore,
  addItem,
  query,
  onToggle,
  ...restProps
}) => {
  const dispatch = useContext(LogicDispatchContext);
  const state = useContext(LogicStateContext);
  let childrenCount = 0;
  if (children) {
    childrenCount = React.Children.count(children);
  }

  return (
    <li
      className={`${prefix}-logic-builder-list${
        isLastElement ? ` ${prefix}-logic-builder-last-list-item` : ''
      }`}
    >
      <div
        className={`${prefix}-tile-wrapper${
          childrenCount > 0 && !state.expandedQueries[id + '']
            ? ` ${prefix}-tile-wrapper-expanded`
            : ` ${prefix}-tile-wrapper-collapsed`
        }${childrenCount > 0 ? ` ${prefix}-children-exist` : ''}${
          !tileHeader ? ` ${prefix}-no-tile-header` : ''
        }`}
      >
        {tileHeader ? (
          <p className={`${prefix}-tile-header`}>{tileHeader}</p>
        ) : null}
        <Tile {...restProps}>
          <div className={`${prefix}-logic-builder-item-wrapper`}>
            <div className={`${prefix}-logic-builder-item`}>
              <div className={`${prefix}-logic-builder-item-header`}>
                <div className={`${prefix}-logic-builder-item-header-left`}>
                  {logicType}
                  <div className={`${prefix}-logic-builder-query`}>{query}</div>
                </div>
                <div className={`${prefix}-logic-builder-item-header-right`}>
                  {actionTemplate}
                  <Button
                    title="Toggle icon"
                    type="ghost"
                    className={`${prefix}-logic-builder-toggle-icon${
                      state.expandedQueries[id + '']
                        ? ` ${prefix}-logic-builder-toggle-icon-collapsed`
                        : ''
                    }`}
                    onClick={() => {
                      dispatch({
                        type: 'TOGGLE_LOGIC_ITEM',
                        data: id
                      });

                      if (onToggle) {
                        onToggle(id);
                      }
                    }}
                  >
                    {chevronIcon}
                  </Button>
                </div>
              </div>
              {state.expandedQueries[id + ''] ? null : (
                <>{content ? content : null}</>
              )}
            </div>
            {state.expandedQueries[id + ''] ? null : (
              <ul
                className={`${prefix}-logic-builder-group ${prefix}-logic-builder-sub-list`}
              >
                {children
                  ? Children.toArray(children).map((child, index) =>
                      cloneElement(child, {
                        isLastElement:
                          Children.toArray(children).length === index + 1
                      })
                    )
                  : null}

                {showAddMore ? (
                  <li
                    className={`${prefix}-logic-builder-list ${prefix}-add-more-element`}
                  >
                    <Button title="Add more" type="ghost" onClick={addItem}>
                      {addMoreIcon}
                    </Button>
                  </li>
                ) : null}
              </ul>
            )}
          </div>
        </Tile>
      </div>
    </li>
  );
};

LogicItem.propTypes = {
  /** Unique id */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** to specify the tile header */
  tileHeader: PropTypes.string,
  /** used for passing the component for choosing the logic type */
  logicType: PropTypes.node,
  /** Used for passing the component for actions. eg : overflow menu, button etc  */
  actionTemplate: PropTypes.node,
  /** Used to passing the propery, operator and value template */
  content: PropTypes.node,
  /**
   * Used for passing sublogic items. Expecting **LogicItem** component
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  isLastElement: PropTypes.bool,
  /**
   * Is used to show add more button
   */
  showAddMore: PropTypes.bool,
  /**
   * Callback function onclick of add more button
   *
   * @signature
   * ```event``` : click event
   */
  addItem: PropTypes.func,
  /**
   * Used for passing the query rule.
   */
  query: PropTypes.node,
  /**
   *  Callback function on tile toggle
   *
   *
   * @signature
   * ```id``` : tile id
   *
   */
  onToggle: PropTypes.func
};

LogicItem.defaultProps = {
  id: null,
  tileHeader: null,
  logicType: null,
  actionTemplate: null,
  content: null,
  children: null,
  isLastElement: false,
  showAddMore: false,
  addItem: null,
  query: null,
  onToggle: null
};

export default LogicItem;
