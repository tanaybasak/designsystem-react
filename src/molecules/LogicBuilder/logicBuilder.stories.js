import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
//@update-path-build-start
import LogicBuilder from './LogicBuilder';
import LogicItem from './LogicItem';
import { Select, SelectItem } from '../../atoms/Select';
import Search from '../../atoms/Search';
import Dropdown from '../../atoms/Dropdown';
import TextInput from '../../atoms/TextInput';
import { Overflowmenu, MenuItem } from '../Overflowmenu';
//@update-path-build-end

const query = [
  {
    type: 'if',
    id: 1,
    children: [
      {
        type: 'var',
        id: 2,
        header: 'Condition',
        property: {
          property: 'Patronus',
          operator: '=',
          value: 'TRUE'
        }
      },
      {
        type: 'and',
        header: 'Then',
        id: 3,
        expanded: true,
        children: [
          {
            id: 4,
            type: 'var',
            property: {
              property: 'Components',
              operator: '>',
              value: '2'
            }
          },
          {
            id: 5,
            type: 'not',
            header: 'And',
            children: [
              {
                id: 6,
                type: 'var',
                property: {
                  property: 'Guidelines',
                  operator: '=',
                  value: 'Material'
                }
              }
            ]
          }
        ]
      },
      {
        type: 'or',
        header: 'Else',
        expanded: true,
        id: 7,
        children: [
          {
            id: 8,
            type: 'var',
            property: {
              property: 'Components',
              operator: '=',
              value: 'All'
            }
          },
          {
            id: 9,
            type: 'var',
            header: 'Or',
            property: {
              property: 'Guidelines',
              operator: '=',
              value: 'External'
            }
          }
        ]
      }
    ]
  }
];

const selectionTypes = [
  { id: 'var', value: 'Var' },
  { id: 'if', value: 'IF' },
  { id: 'and', value: 'And' },
  { id: 'or', value: 'Or' },
  { id: 'not', value: 'Not' }
];

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

const getQueryParameter = item => {
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
            onChange={action('Property on change')}
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
            onChange={action('Operator on change')}
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
            onChange={action('Value on change')}
            placeholder="Placeholder Text"
          />
        </div>
      </div>
    </div>
  ) : null;
};

const createRule = (item, idMapper, value) => {
  item.map(childItem => {
    if (childItem.children && childItem.children.length > 0) {
      createRule(childItem.children, idMapper, value);
    }

    idMapper[childItem.id] = childItem.type;
    value[childItem.id] =
      childItem.type === 'var'
        ? `${
            childItem.property && childItem.property.property
              ? childItem.property.property
              : ''
          } ${
            childItem.property && childItem.property.operator
              ? childItem.property.operator
              : ''
          } ${
            childItem.property && childItem.property.value
              ? childItem.property.value
              : ''
          }`
        : childItem.children &&
          childItem.children.length > 0 &&
          childItem.children.map(subChildren => subChildren.id);
  });
};

const createRuleAndIdMapper = query => {
  const idMapper = {};
  const value = {};
  createRule(query, idMapper, value);
  return {
    ruleIdMapper: idMapper,
    rulesMapper: value
  };
};
const ruleSet = createRuleAndIdMapper(query);

const getQueryInStringFormat = (rules, id) => {
  if (Array.isArray(rules)) {
    let query = [];
    rules.map(ruleId => {
      let subRule = ruleSet.rulesMapper[ruleId];
      query.push(getQueryInStringFormat(subRule, ruleId));
    });

    if (ruleSet.ruleIdMapper[id] === 'and') {
      return `( ${query.join(` && `)} )`;
    } else if (ruleSet.ruleIdMapper[id] === 'or') {
      return `( ${query.join(` || `)} )`;
    } else if (ruleSet.ruleIdMapper[id] === 'not') {
      return ` !( ${query} )`;
    } else if (ruleSet.ruleIdMapper[id] === 'if') {
      return `if(${query[0]}) { ${query[1]} } else { ${query[2]} }`;
    } else {
      return `( ${query.join(` ${ruleSet.ruleIdMapper[id]} `)} )`;
    }
  } else {
    return rules;
  }
};

const getQueryRule = item => {
  const queryRule =
    item.type === 'var'
      ? ruleSet.rulesMapper[item.id]
      : getQueryInStringFormat(ruleSet.rulesMapper[item.id], item.id);

  return queryRule;
};

const queryTemplate = (item, index) => {
  return (
    <LogicItem
      id={item.id}
      tileHeader={item.header}
      key={index}
      query={
        <div
          className="hcl-logic-builder-query-rule"
          title={getQueryRule(item)}
        >
          <span>{getQueryRule(item)}</span>
          <i className="p-hclsw p-hclsw-edit inline-edit-button" />
        </div>
      }
      logicType={
        <Select
          id={`selct-id-${item.id}`}
          value={item.type}
          onChange={action('Logic Type OnChange')}
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
      }
      content={getQueryParameter(item)}
      actionTemplate={
        <Overflowmenu
          attachElementToBody
          direction="bottom-left"
          ellipsisType="vertical"
        >
          <MenuItem item={'add'}>Add</MenuItem>
          <MenuItem item={'remove'}>Remove</MenuItem>
          <MenuItem item={'wrap'}>Wrap</MenuItem>
          <MenuItem item={'cut'}>Cut</MenuItem>
          <MenuItem item={'copy'}>Copy</MenuItem>
          <MenuItem item={'paste'}>Paste</MenuItem>
        </Overflowmenu>
      }
      showAddMore={item.expanded}
      addItem={action('ADD MORE ITEM')}
    >
      {item.children &&
        item.children.length > 0 &&
        item.children.map((subItem, subindex) => {
          return queryTemplate(subItem, index + '-' + subindex);
        })}
    </LogicItem>
  );
};
storiesOf('Components/Logic Builder', module).add(
  'default',
  () => (
    <LogicBuilder>
      {query.map((item, index) => {
        return queryTemplate(item, index);
      })}
    </LogicBuilder>
  ),
  {
    info: {
      text: `Description About NumberInput Component`,
      document: ['LogicBuilder', 'LogicItem'],
      internal: [
        'Select',
        'SelectItem',
        'Search',
        'Dropdown',
        'TextInput',
        'Overflowmenu',
        'MenuItem'
      ],
      className: 'hcl-col-12 hcl-col-lg-10'
    }
  }
);
