import React, { Children, cloneElement, useContext } from 'react';
import Tile from '../../atoms/Tile';
import Button from '../../atoms/Button';
import LogicDispatchContext from './logicDispatchContext';
import LogicStateContext from './LogicStateContext';
import PropTypes from 'prop-types';
const LogicItem = ({
  id,
  item,
  tileHeader,
  logicType,
  actionTemplate,
  content,
  children,
  isLastElement,
  showAddMore,
  addItem,
  query,
  expanded,
  onToggle
}) => {
  const dispatch = useContext(LogicDispatchContext);
  const state = useContext(LogicStateContext);
  let childrenCount = 0;
  if (children) {
    childrenCount = React.Children.count(children);
  }

  return (
    <li className={`logic-builder-list ${isLastElement ? 'last-element' : ''}`}>
      <div
        className={`child ${
          childrenCount > 0 && !state.expandedQueries[id + '']
            ? 'expanded-tile'
            : 'collapsed-tile'
        }`}
      >
        {tileHeader ? (
          <p className="tile-header">{tileHeader}</p>
        ) : (
          <p className="tile-header">&nbsp;</p>
        )}
        <Tile>
          <div className="logic-builder-item-wrapper">
            <div className="logic-builder-item">
              <div className="logic-builder-item-header">
                <div className="logic-builder-item-header-left">
                  {logicType}
                  <div className="logic-builder-query">{query}</div>
                </div>
                <div className="logic-builder-item-header-right">
                  {actionTemplate}
                  <Button
                    title="Default"
                    type="ghost"
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
                    <i
                      className={`p-hclsw p-hclsw-chevron-${
                        state.expandedQueries[id + ''] ? 'up' : 'down'
                      }`}
                    />
                  </Button>
                </div>
              </div>
              {state.expandedQueries[id + ''] ? null : (
                <>{content ? content : null}</>
              )}
            </div>
            {state.expandedQueries[id + ''] ? null : (
              <ul className="logic-builder-group subItem">
                {children
                  ? Children.toArray(children).map((child, index) =>
                      cloneElement(child, {
                        isLastElement:
                          Children.toArray(children).length === index + 1
                      })
                    )
                  : null}

                {showAddMore ? (
                  <li className="logic-builder-list add-more-element">
                    <Button title="Default" type="ghost" onClick={addItem}>
                      <i className="p-hclsw p-hclsw-add-circle" />
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

LogicItem.propTypes = { expanded: PropTypes.bool };

LogicItem.defaultProps = { expanded: false };

export default LogicItem;
