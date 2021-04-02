/* eslint-disable no-console */
import React, { Component } from 'react';
import { ContentSwitcher, Switch } from '../../molecules/ContentSwitcher';
import Tile from '../../atoms/Tile';
import Search from '../../atoms/Search';
import Dropdown from '../../atoms/Dropdown';
import TextInput from '../../atoms/TextInput';
import Button from '../../atoms/Button';
import { Overflowmenu, MenuItem } from '../../molecules/Overflowmenu';
import './QueryBuilder.scss';
class QueryBuilder extends Component {
  state = {
    query: [
      {
        condition: 'and',
        type: 'group',
        id: 1,
        children: [
          {
            type: 'condition',
            id: 2
          },
          {
            type: 'condition',
            id: 3
          }
          //   {
          //     type: 'group',
          //     id: 4,
          //     condition: 'or',
          //     children: [
          //       {
          //         type: 'condition',
          //         id: 5
          //       }
          //     ]
          //   },
          //   {
          //     type: 'group',
          //     id: 6,
          //     condition: 'or',
          //     children: [
          //       {
          //         type: 'condition',
          //         id: 7
          //       }
          //     ]
          //   }
        ]
      }
    ]
  };

  pushItemToROOT = (data, newItem) => {
    data.children.push(newItem);
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
    treeData.map((data , index) => {
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
                id: 'option-1',
                text: 'Option 1'
              },
              {
                id: 'option-2',
                text: 'Option 2'
              },
              {
                id: 'option-3',
                text: 'Option 3'
              },
              {
                id: 'option-4',
                text: 'Option 4'
              }
            ]}
            label="Dropdown Label"
            onChange={function noRefCheck() {}}
            onVisibleChange={null}
            scrollListner={false}
            type="bottom"
          />
        </div>
        <div className="hcl-col-10 hcl-col-md-3">
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
        <div className="hcl-col-2 hcl-col-md-1">
          <Button
            kind="button"
            type="ghost"
            small
            onClick={this.deleteCondition.bind(this, item)}
          >
            <i className="p-hclsw p-hclsw-close selected"></i>
          </Button>
        </div>
      </div>
    );
  };

  getOverflowMenu = item => {
    return (
      <Overflowmenu
        attachElementToBody
        className=""
        customIcon={<i className="p-hclsw p-hclsw-add" />}
        customTemplate={null}
        direction="bottom-left"
        ellipsisType="vertical"
        listItems={null}
        onClick={this.onOverflowSelect.bind(this, item)}
        scrollListner
      >
        <MenuItem item={'group'}>New Group</MenuItem>
        <MenuItem item={'condition'}>New Condition</MenuItem>
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
        <ContentSwitcher
          activeIndex={0}
          className=""
          onChange={function noRefCheck() {}}
        >
          <Switch active={false} icon={null} isDisabled={false} label="AND" />
          <Switch active={false} icon={null} isDisabled={false} label="OR" />
        </ContentSwitcher>{' '}
        {this.getOverflowMenu(item)}
      </div>
    );
  };

  queryTemplate = (item, key) => {
    if (item.type === 'group') {
      return (
        <li className="query-group-list container" key={key}>
          <div className="gate-wrapper">{this.getGateWrapper(item)}</div>
          <ul className="query-group">
            {item.children.map((subItem, index) => {
              return this.queryTemplate(subItem, index);
            })}
          </ul>
        </li>
      );
    } else {
      return (
        <li className="query-group-list" key={key}>
          <div className="condition-wrapper">
            <Tile
              className="hcl-boxshadow-1"
              expandableType="bottom"
              foldContentAbove={null}
              foldContentBelow={null}
              href=""
              onChange={function noRefCheck() {}}
            >
              {this.getContent(item)}
            </Tile>{' '}
          </div>
        </li>
      );
    }
  };
  render() {
    return (
      <div style={{ width: '1000px' }}>
        <div className="query-builder-temp">
          <ul className="query-group">
            {this.state.query.map((item, index) => {
              return this.queryTemplate(item, index);
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default QueryBuilder;

