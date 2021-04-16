import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectItem } from '../../atoms/Select';

const QuerySelection = ({ dispatch, item }) => {
  const selectionTypes = [
    { id: 'var', value: 'Var' },
    { id: 'if', value: 'IF' },
    { id: 'and', value: 'And' },
    { id: 'or', value: 'Or' },
    { id: 'not', value: 'Not' }
  ];
  return (
    <Select
      id={`selct-id-${item.id}`}
      value={item.type}
      onChange={selectedType => {
        dispatch({
          type: 'UPDATE_QUERY_TYPE',
          data: { node: item, type: selectedType }
        });
      }}
    >
      <SelectItem text={'Type'} />

      {selectionTypes.map((condition, index) => {
        return (
          <SelectItem
            text={condition.value}
            value={condition.id}
            key={`index${index}`}
          />
        );
      })}
    </Select>
  );
};

QuerySelection.propTypes = {};

QuerySelection.defaultProps = {};

export default QuerySelection;
