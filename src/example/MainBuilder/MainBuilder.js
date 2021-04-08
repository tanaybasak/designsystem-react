/* eslint-disable no-console */
import React, { useReducer } from 'react';
import { LogicBuilder, LogicItem } from '../../molecules/LogicBuilder';
import { findTreeItem, createRuleAndIdMapper } from './utils';
import QueryParameter from './QueryParameter';
import QueryAction from './QueryAction';
import QuerySelection from './QuerySelection';
import QueryRule from './QueryRule';
import { reducer } from './reducer';
const initialState = {
  query: [{ id: 1 }],
  query1: [
    {
      type: 'and',
      id: 1,
      expanded: true,
      children: [
        {
          type: 'and',
          header: '',
          id: 2,
          children: [
            {
              id: 5,
              type: 'or',
              children: [
                {
                  id: 232,
                  type: 'var',
                  property: {
                    property: 'FirstName',
                    operator: '=',
                    value: 'Vivek'
                  }
                },
                {
                  id: 212,
                  type: 'var',
                  header: 'Or',
                  property: {
                    property: 'MiddleName',
                    operator: '=',
                    value: 'V'
                  }
                }
              ]
            },
            {
              id: 6,
              type: 'var',
              header: 'And',
              property: {
                property: 'Age',
                operator: '>',
                value: '30'
              }
            }
          ]
        },
        {
          type: 'or',
          header: 'And',
          id: 3,
          children: [
            {
              id: 7,
              type: 'var',
              property: {
                property: 'LastName',
                operator: '=',
                value: 'Vijayan'
              }
            },
            {
              id: 8,
              type: 'var',
              header: 'Or',
              property: {
                property: 'Age',
                operator: '<',
                value: '60'
              }
            }
          ]
        },
        {
          type: 'var',
          header: 'And',
          id: 4,
          property: {
            property: 'Country',
            operator: '=',
            value: 'India'
          }
        }
      ]
    }
  ]
};
const MainBuilder = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addMoreItem = item => {
    dispatch({
      type: 'ADD_CHILDREN',
      data: { node: item, header: 'And' }
    });
  };

  const queryTemplate = (item, index, ruleSet) => {
    return (
      <LogicItem
        id={item.id}
        tileHeader={item.header}
        key={index}
        logicType={<QuerySelection item={item} dispatch={dispatch} />}
        content={<QueryParameter item={item} dispatch={dispatch} />}
        actionTemplate={<QueryAction item={item} dispatch={dispatch} />}
        showAddMore={item.expanded}
        query={
          <QueryRule
            item={item}
            rulesMapper={ruleSet.value}
            ruleIdMapper={ruleSet.idMapper}
          />
        }
        addItem={addMoreItem.bind(this, item)}
      >
        {item.children &&
          item.children.length > 0 &&
          item.children.map((subItem, subindex) => {
            return queryTemplate(subItem, index + '-' + subindex, ruleSet);
          })}
      </LogicItem>
    );
  };
  const ruleSet = createRuleAndIdMapper(state.query);
  return (
    <div style={{ width: '1000px', padding: '1rem' }}>
      <LogicBuilder>
        {state.query.map((item, index) => {
          return queryTemplate(item, index, ruleSet);
        })}
      </LogicBuilder>
    </div>
  );
};

MainBuilder.propTypes = {};

MainBuilder.defaultProps = {};

export default MainBuilder;
