import React from 'react';
import PropTypes from 'prop-types';
import prefix from '../../settings';
import Search from '../../atoms/Search';
import Dropdown from '../../atoms/Dropdown';
import TextInput from '../../atoms/TextInput';

const QueryParameter = ({ dispatch, item }) => {
  const operatorTypes = [
    {
      id: '=',
      text: 'Equals ='
    },
    {
      id: '>',
      text: 'Greater Than >'
    },
    {
      id: '<',
      text: 'Less Than <'
    },
    {
      id: '!=',
      text: 'Not Equal !='
    }
  ];
  return item.type === 'var' ? (
    <div className="hcl-row pr-2">
      <div className="hcl-col-12 hcl-col-md-4">
        <div className="hcl-form-group">
          <label aria-label="required" className="hcl-label">
            Property
          </label>
          <Search
            ariaLabel="Search"
            defaultValue={item.property.property}
            iconTheme="default"
            onChange={e => {
              item.property.property = e;
              dispatch({
                type: 'UPDATE_ITEM_PROPERTY',
                data: item
              });
            }}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="hcl-col-12 hcl-col-md-4">
        <div className="hcl-form-group">
          <label aria-label="required" className="hcl-label">
            Operator
          </label>
          <Dropdown
            attachElementToBody
            selectedItem={item.property.operator}
            items={operatorTypes}
            label="Select"
            onChange={e => {
              item.property.operator = e.id;
              dispatch({
                type: 'UPDATE_ITEM_PROPERTY',
                data: item
              });
            }}
            type="bottom"
          />
        </div>
      </div>
      <div className="hcl-col-12 hcl-col-md-4">
        <div className="hcl-form-group">
          <label aria-label="required" className="hcl-label">
            Value
          </label>
          <TextInput
            aria-label="text input"
            value={item.property.value}
            onChange={e => {
              item.property.value = e.currentTarget.value;
              dispatch({
                type: 'UPDATE_ITEM_PROPERTY',
                data: item
              });
            }}
            placeholder="Placeholder Text"
          />
        </div>
      </div>
    </div>
  ) : null;
};

QueryParameter.propTypes = {};

QueryParameter.defaultProps = {};

export default QueryParameter;
