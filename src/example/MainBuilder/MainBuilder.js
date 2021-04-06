/* eslint-disable no-console */
import React, { Component } from 'react';
import Search from '../../atoms/Search';
import Dropdown from '../../atoms/Dropdown';
import TextInput from '../../atoms/TextInput';
import { Overflowmenu, MenuItem } from '../../molecules/Overflowmenu';
import { LogicBuilder, LogicItem } from '../../molecules/LogicBuilder';
import { Select, SelectItem } from '../../atoms/Select';
class MainBuilder extends Component {
  state = {
    expandedQueries: {},
    conditions: [
      { id: 'var', value: 'Var' },
      { id: 'if', value: 'IF' },
      { id: 'and', value: 'And' },
      { id: 'or', value: 'Or' },
      { id: 'not', value: 'Not' }
    ],
    query2: [
      {
        type: 'type',
        id: 1
      }
    ],
    query: [
      {
        type: 'and',
        id: 1,
        children: [
          {
            type: 'and',
            header: '',
            id: 2,
            children: [
              {
                id: 5,
                type: 'var',
                property: {
                  property: 'FirstName',
                  operator: '=',
                  value: 'Vivek'
                }
              },
              {
                id: 6,
                type: 'var',
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

  updateItem = item => {
    const treeData = [...this.state.query];

    this.findTreeItem(treeData, item);
    this.setState({
      query: treeData
    });
  };

  findTreeItem = (treeData, item) => {
    treeData.map(data => {
      if (data.id === item.id) {
        data = item;
      }

      if (data.children && data.children.length > 0) {
        this.findTreeItem(data.children, item);
      }
    });
  };

  getContent = item => {
    return item.type === 'var' ? (
      <div className="hcl-row pr-2">
        <div className="hcl-col-12 hcl-col-md-4">
          <div className="hcl-form-group">
            <label aria-label="required" className="hcl-label">
              Property {item.id}
            </label>
            <Search
              ariaLabel="Search"
              className=""
              defaultValue={item.property.property}
              disabled={false}
              iconTheme="default"
              onBlur={function noRefCheck() {}}
              onChange={e => {
                // console.log(item.id, '===> CHANGED ', item);
                item.property.property = e;
                // console.log(this.state.query);
                this.updateItem(item);
              }}
              placeholder="Search..."
              size="default"
              theme="default"
              type="default"
            />
          </div>
        </div>
        <div className="hcl-col-12 hcl-col-md-4">
          <div className="hcl-form-group">
            <label aria-label="required" className="hcl-label">
              Operator
            </label>
            <Dropdown
              attachElementToBody={true}
              className=""
              config={{}}
              disabled={false}
              dropdownType=""
              selectedItem={item.property.operator}
              items={[
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
              ]}
              label="Select"
              onChange={e => {
                item.property.operator = e.id;
                this.updateItem(item);
              }}
              onVisibleChange={null}
              scrollListner={false}
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
              className=""
              disabled={false}
              value={item.property.value}
              onBlur={function noRefCheck() {}}
              onChange={e => {
                item.property.value = e.currentTarget.value;
                this.updateItem(item);
              }}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              placeholder="Placeholder Text"
            />
          </div>
        </div>
      </div>
    ) : null;
  };

  getOverflowMenu = item => {
    return (
      <Overflowmenu
        attachElementToBody
        className=""
        //customIcon={<i className="p-hclsw p-hclsw-add" />}
        customTemplate={null}
        direction="bottom-left"
        ellipsisType="vertical"
        listItems={null}
        onClick={this.onOverflowSelect.bind(this, item)}
        scrollListner
      >
        <MenuItem item={'add'}>Add</MenuItem>
        <MenuItem item={'remove'}>Remove</MenuItem>
        <MenuItem item={'wrap'}>Wrap</MenuItem>
        <MenuItem item={'cut'}>Cut</MenuItem>
        <MenuItem item={'copy'}>Copy</MenuItem>
        <MenuItem item={'paste'}>Paste</MenuItem>
      </Overflowmenu>
    );
  };

  onOverflowSelect = (item, type) => {
    if (type === 'add') {
      item.children.push({
        type: 'var',
        header: 'And',
        id: Math.random()
      });

      this.updateItem(item);
    }
  };

  getSelectiontype = item => {
    return (
      <Select
        id="selct-id"
        value={item.type}
        onChange={selectedType => {
          //   console.log(selectedType);

          const propertyObject = {
            property: '',
            operator: '',
            value: ''
          };

          if (selectedType.value === 'and') {
            item.expanded = true;
            item.children = [
              {
                type: 'var',
                id: Math.random(),
                property: { ...propertyObject }
              },
              {
                type: 'var',
                header: 'And',
                id: Math.random(),
                property: { ...propertyObject }
              }
            ];
          }
          if (selectedType.value === 'or') {
            item.expanded = false;
            item.children = [
              {
                type: 'var',
                id: Math.random(),
                property: { ...propertyObject }
              },
              {
                type: 'var',
                header: 'Or',
                id: Math.random(),
                property: { ...propertyObject }
              }
            ];
          }
          if (selectedType.value === 'if') {
            item.expanded = false;
            item.children = [
              {
                type: 'var',
                header: 'Condition',
                id: Math.random(),
                property: { ...propertyObject }
              },
              {
                type: 'var',
                header: 'Then',
                id: Math.random(),
                property: { ...propertyObject }
              },
              {
                type: 'var',
                header: 'Else',
                id: Math.random(),
                property: { ...propertyObject }
              }
            ];
          }
          if (selectedType.value === 'var') {
            item.expanded = false;
            item.children = [];
            item.property = { ...propertyObject };
          }

          if (selectedType.value === 'not') {
            item.expanded = false;
            item.children = [
              {
                type: 'var',
                id: Math.random(),
                property: { ...propertyObject }
              }
            ];
          }

          item.type = selectedType.value;

          this.updateItem(item);
        }}
      >
        <SelectItem text={'Type'} />

        {this.state.conditions.map((condition, index) => {
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

  getNewQuery = (queryMap, stringQuery) => {
    queryMap.map(id => {
      let newQuery = this.value[id];
      if (Array.isArray(newQuery)) {
        return this.getNewQuery(newQuery);
      } else {
        stringQuery += newQuery;
      }
    });

    return stringQuery;
  };

  getQuery = (item, query) => {
    if (item.type === 'var') {
      return <label>{this.value[item.id]}</label>;
    } else {
      if (this.value[item.id]) {
        let query = [];

        this.value[item.id].map(id => {
          let newQuery = this.value[id];
          if (Array.isArray(newQuery)) {
            let stringQuery = '';
            //   console.log("==>",newQuery , this.getNewQuery(newQuery , stringQuery))
            query.push(this.getNewQuery(newQuery));
          } else {
            query.push(newQuery);
          }
        });
        if (query.length > 0) {
          return (
            <label>
              {query.map(queryItem => queryItem).join(` ${item.type} `)}
            </label>
          );
        } else {
          return '';
        }
      } else {
        return '';
      }
    }

    // console.log(this.value[item.id]);
    // return <label>{this.value[item.id]}</label>;
    // if (item.type === 'var') {
    //   return (
    //     <label>
    //         {this.value[item.id]}
    //       {/* {item.property && item.property.property
    //         ? item.property.property
    //         : ''}{' '}
    //       {item.property && item.property.operator
    //         ? item.property.operator
    //         : ''}{' '}
    //       {item.property && item.property.value ? item.property.value : ''} */}
    //     </label>
    //   );
    // } else {
    //     this.createRule(this.state.query);
    // //   console.log(this.createRule(this.state.query));
    //   return '';
    // }
  };

  value = {};
  idMapper = {};

  containsArray = item => {
    let isContainsArray = false;
    for (var key in item) {
      if (Array.isArray(item[key])) {
        isContainsArray = true;
      }
    }
    return isContainsArray;
  };

  convertToString = value => {
    for (var key in value) {
      if (Array.isArray(value[key])) {
        value[key].map(subId => {
          let isContainsArray = containsArray(this.value[subId]);
          if (isContainsArray) {
          } else {
          }
        });
      }
    }
  };

  updateAllRules = () => {
    console.log(this.value, this.idMapper);

    this.convertToString(this.value);
  };
  createRule = item => {
    item.map(childItem => {
      if (childItem.children && childItem.children.length > 0) {
        this.createRule(childItem.children);
      }
      //   console.log(childItem);

      this.idMapper[childItem.id] = childItem.type;
      this.value[childItem.id] =
        childItem.type === 'var'
          ? `${
              childItem.property && childItem.property.property
                ? childItem.property.property
                : ''
            } 
              ${
                childItem.property && childItem.property.operator
                  ? childItem.property.operator
                  : ''
              } 
              ${
                childItem.property && childItem.property.value
                  ? childItem.property.value
                  : ''
              }`
          : childItem.children &&
            childItem.children.length > 0 &&
            childItem.children.map(subChildren => subChildren.id);
    });

    // console.log('item' , item);
    // item.children &&
    //   item.children.length > 0 &&
    //   item.children.map(subitem => {
    //     return this.getQugetQueryStringery(subitem, item);
    //   });
  };

  getQugetQueryStringery = (item, rootItem) => {
    if (item.type === 'var') {
      return `${
        item.property && item.property.property ? item.property.property : ''
      } ${
        item.property && item.property.operator ? item.property.operator : ''
      } ${item.property && item.property.value ? item.property.value : ''} ${
        rootItem.type
      }`;
    } else {
      return this.createRule(item, query) + `${rootItem.type}`;
    }
  };
  queryTemplate = (item, index, root, lastItem) => {
    return (
      <LogicItem
        id={item.id}
        item={item}
        root={root}
        tileHeader={item.header}
        lastItem={lastItem}
        key={index}
        logicType={this.getSelectiontype(item)}
        content={this.getContent(item)}
        actionTemplate={this.getOverflowMenu(item)}
        showAddMore={item.expanded}
        query={this.getQuery(item)}
        addItem={e => {
          const propertyObject = {
            property: '',
            operator: '',
            value: ''
          };
          item.children.push({
            type: 'var',
            header: 'And',
            id: Math.random(),
            property: { ...propertyObject }
          });

          this.updateItem(item);
        }}
      >
        {/* <LogicTile>Test</LogicTile> */}
        {item.children &&
          item.children.length > 0 &&
          item.children.map((subItem, subindex) => {
            return this.queryTemplate(
              subItem,
              index + '-' + subindex,
              false,
              item.children.length - 1 === subindex
            );
          })}
      </LogicItem>
    );
  };

  render() {
    this.createRule(this.state.query);
    //this.updateAllRules();
    return (
      <div style={{ width: '1000px' }}>
        <LogicBuilder>
          {this.state.query.map((item, index) => {
            return this.queryTemplate(item, index, true, true);
          })}
        </LogicBuilder>
      </div>
    );
  }
}

export default MainBuilder;
