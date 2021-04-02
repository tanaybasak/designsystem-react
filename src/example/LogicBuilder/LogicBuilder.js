/* eslint-disable no-console */
import React, { Component } from 'react';
import { ContentSwitcher, Switch } from '../../molecules/ContentSwitcher';
import Tile from '../../atoms/Tile';
import Search from '../../atoms/Search';
import Dropdown from '../../atoms/Dropdown';
import TextInput from '../../atoms/TextInput';
import Button from '../../atoms/Button';
import { Overflowmenu, MenuItem } from '../../molecules/Overflowmenu';
import { Select, SelectItem, SelectItemGroup } from '../../atoms/Select';

import './LogicBuilder.css';
class QueryBuilder extends Component {
  state = {
    conditions: [
      { id: 'var', value: 'Var' },
      { id: 'if', value: 'IF' },
      { id: 'and', value: 'And' },
      { id: 'or', value: 'Or' }
    ],
    query: [
      {
        condition: '',
        id: 1
      }
    ],
    querytemp: [
      {
        condition: 'and',
        type: 'if',
        id: 1,
        children: [
          {
            type: 'var',
            header: 'Condition',
            id: 2
          },
          {
            type: 'and',
            header: 'Then',
            id: 5,
            children: [
              {
                type: 'var',
                id: 6
              },
              {
                type: 'var',
                header: 'And',
                id: 7
              }
            ]
          },
          {
            type: 'or',
            header: 'Else',
            id: 21,
            children: [
              {
                type: 'var',
                id: 62
              },
              {
                type: 'var',
                header: 'Or',
                id: 73
              }
            ]
          }
        ]
      }
    ]
  };

  pushItemToROOT = (data, newItem) => {
    data.children.push(newItem);
  };

  updateItemStatus = item => {
    item.collapse = !item.collapse;
    this.updateItem(item);
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

  addNewItemToTheChildren = (treeData, item, newItem) => {
    treeData.map(data => {
      if (data.id === item.id) {
        if (data.children && Array.isArray(data.children)) {
          //data.children.push(newItem);
          this.pushItemToROOT(data, newItem);
        } else {
          data.children = [];
          //data.children.push(newItem);
          this.pushItemToROOT(data, newItem);
        }
      }
      if (data.children && data.children.length > 0) {
        this.addNewItemToTheChildren(data.children, item, newItem);
      }
    });
  };

  deleteItemFromTheChildren = (treeData, item) => {
    treeData.map((data, index) => {
      if (data.id === item.id) {
        treeData.splice(index, 1);
      }
      if (data.children && data.children.length > 0) {
        this.deleteItemFromTheChildren(data.children, item);
      }
    });
  };

  deleteCondition = item => {
    const treeData = [...this.state.query];
    this.deleteItemFromTheChildren(treeData, item);
    this.setState({
      query: treeData
    });
  };
  getContent = item => {
    return (
      <div className="hcl-row">
        <div className="hcl-col-12 hcl-col-md-4">
          <Search
            ariaLabel="Search"
            className=""
            defaultValue=""
            disabled={false}
            iconTheme="default"
            onBlur={function noRefCheck() {}}
            onChange={function noRefCheck() {}}
            placeholder="Search..."
            size="default"
            theme="default"
            type="default"
          />
        </div>
        <div className="hcl-col-12 hcl-col-md-4">
          <Dropdown
            attachElementToBody={true}
            className=""
            config={{}}
            disabled={false}
            dropdownType=""
            items={[
              {
                id: 'equal',
                text: 'Equals ='
              },
              {
                id: 'greater',
                text: 'Greater Than >'
              },
              {
                id: 'lesser',
                text: 'Less Than <'
              },
              {
                id: 'noteqaul',
                text: 'Not Equal !='
              }
            ]}
            label="Select"
            onChange={function noRefCheck() {}}
            onVisibleChange={null}
            scrollListner={false}
            type="bottom"
          />
        </div>
        <div className="hcl-col-12 hcl-col-md-4">
          <TextInput
            aria-label="text input"
            className=""
            disabled={false}
            onBlur={function noRefCheck() {}}
            onChange={function noRefCheck() {}}
            onClick={function noRefCheck() {}}
            onFocus={function noRefCheck() {}}
            placeholder="Placeholder Text"
          />
        </div>
        {/* <div className="hcl-col-2 hcl-col-md-1">
          <Button
            kind="button"
            type="ghost"
            small
            onClick={this.deleteCondition.bind(this, item)}
          >
            <i className="p-hclsw p-hclsw-close selected"></i>
          </Button>
        </div> */}
      </div>
    );
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
    const newItem = {
      type: type,
      id: Math.floor(Math.random() * 1000)
    };
    if (type === 'group') {
      newItem.children = [
        {
          type: 'condition',
          id: Math.floor(Math.random() * 1000)
        }
      ];
    }
    const treeData = [...this.state.query];
    this.addNewItemToTheChildren(treeData, item, newItem);
    this.setState({
      query: treeData
    });
  };

  getGateWrapper = item => {
    return (
      <div className="gate-wrapper-panel">
        <div className="condition-wrapper">
          <div className="left-section">
            <Select
              id="selct-id"
              value={item.type}
              onChange={selectedType => {
                console.log(selectedType);

                if (selectedType.value === 'and') {
                  item.children = [
                    {
                      type: 'var',
                      id: Math.random()
                    },
                    {
                      type: 'var',
                      header: 'And',
                      id: Math.random()
                    }
                  ];
                }
                if (selectedType.value === 'or') {
                  item.children = [
                    {
                      type: 'var',
                      id: Math.random()
                    },
                    {
                      type: 'var',
                      header: 'Or',
                      id: Math.random()
                    }
                  ];
                }
                if (selectedType.value === 'if') {
                  item.children = [
                    {
                      type: 'var',
                      header: 'Condition',
                      id: Math.random()
                    },
                    {
                      type: 'var',
                      header: 'Then',
                      id: Math.random()
                    },
                    {
                      type: 'var',
                      header: 'Else',
                      id: Math.random()
                    }
                  ];
                }

                item.type = selectedType.value;

                this.updateItem(item);
              }}
            >
              <SelectItem text={'Select Type'} />

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
            {item.edit ? (
              // <InlineEdit
              //   loader={this.state.showBusyLoader}
              //   errorMessage={this.state.errorMessage}
              //   onTextUpdate={this.updateTitleText}
              //   onClose={this.reset}
              // >
              //   <TextInput
              //     value={this.state.formValue.title}
              //     data-invalid={this.state.titleFormStatus}
              //   />
              // </InlineEdit>

              <p>inlineEdit</p>
            ) : (
              <div
                className="hcl-inline-wrapper"
                //onClick={this.enableEditMode.bind(this, "title")}
                tabIndex="0"
                //onKeyDown={this.enableEditModeOnEnter.bind(this, "title")}
              >
                <label>Patronus === true</label>
                {/* {this.inlineEditButton()} */}
              </div>
            )}
          </div>
          <div className="right-section">
            {this.getOverflowMenu()}
            <Button
              title="Default"
              type="ghost"
              onClick={() => {
                this.updateItemStatus(item);
              }}
            >
              <i
                className={`p-hclsw p-hclsw-chevron-${
                  item.collapse ? 'up' : 'down'
                }`}
              />
            </Button>
          </div>
        </div>
        {item.collapse ? null : (
          <>{item.type === 'var' ? this.getContent() : null}</>
        )}

        {/* <ContentSwitcher
          activeIndex={0}
          className=""
          onChange={function noRefCheck() {}}
        >
          <Switch active={false} icon={null} isDisabled={false} label="AND" />
          <Switch active={false} icon={null} isDisabled={false} label="OR" />
        </ContentSwitcher>{' '} */}
        {/* {this.getOverflowMenu(item)} */}
      </div>
    );
  };

  queryTemplate = (item, key, root) => {
    return (
      <li className="query-group-list container" key={key}>
        {item.header ? <p>{item.header}</p> : <p>&nbsp;</p>}
        <Tile className={root ? 'rootTile' : ''}>
          <div className="gate-wrapper-container">
            <div className="gate-wrapper">{this.getGateWrapper(item)}</div>
            {item.collapse ? null : (
              <ul className="query-group subItem">
                {item.children &&
                  item.children.map((subItem, index) => {
                    return this.queryTemplate(subItem, index);
                  })}
              </ul>
            )}
          </div>
        </Tile>
      </li>
    );
  };
  render() {
    return (
      <div style={{ width: '1000px' }}>
        <div className="logic-builder">
          <ul className="query-group">
            {this.state.query.map((item, index) => {
              return this.queryTemplate(item, index, true);
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default QueryBuilder;
