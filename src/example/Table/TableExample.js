/* eslint-disable no-console */
import React, { Component } from 'react';
import overflowlist from '../../molecules/Overflowmenu/sample-overflow-list.json';
import Tag from '../../atoms/Tag';
import Toggle from '../../atoms/Toggle';
import Checkbox from '../../atoms/Checkbox';
import DataTable from '../../atoms/DataTable';
import { Overflowmenu } from '../../molecules/Overflowmenu';
import Dropdown from '../../atoms/Dropdown';

class TableExample extends Component {
  state = {
    tableData: [],
    totalItems: 0,
    handle: 'bottom',
    selectedItem: {},
    initSortedColumn: { order: 'asc', name: 'name' },
    displayData: [],
    tableConfig: [
      {
        field: 'checkbox',
        renderHtml: row => {
          return (
            <Checkbox
              id={`${row.id}_checkbox_`}
              name="testcheck"
              onChange={e => {
                const tempSelectedObj = { ...this.state.selectedItem };
                if (e.target.checked) {
                  tempSelectedObj[row.id] = e.target.checked;
                } else {
                  delete tempSelectedObj[row.id];
                }
                this.setState({
                  selectedItem: tempSelectedObj
                });
              }}
            />
          );
        },
        width: '40px',
        headerCellClass: 'custom-header-checkbox',
        bodyCellClass: 'custom-body-checkbox'
        // pinned: 'left'
      },
      {
        label: 'ID',
        field: 'id',
        allowResize: true,
        columnHtml: (
          <Tag
            className=""
            closable={false}
            disabled={false}
            icon={<i className="p-hclsw p-hclsw-link" tabIndex="0" />}
            onClose={function noRefCheck() {}}
            tabIndex={0}
            text={null}
            thumbnail={<i className="p-hclsw p-hclsw-checkbox" />}
            title=""
            type="primary"
          >
            Sample Tag
          </Tag>
        ),
        bodyCellClass: 'custom-body-id-class',
        width: '60px'
        // pinned: 'left'
      },

      {
        label: 'Avatar',
        field: 'avtar',
        // pinned: 'right',

        renderHtml: model => {
          return (
            <img
              src={model.owner.avatar_url}
              style={{ width: '44px', height: '44px', borderRadius: '50%' }}
            />
          );
        },
        // columnHtml: <h6> this is temp</h6>,
        columnHtml: (
          <Dropdown
            type="top"
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
              },
              {
                id: 'option-5',
                text: 'Option 5'
              },
              {
                id: 'option-6',
                text: 'Option 6'
              }
            ]}
            label="Top DropDown"
            selectedItem="option-3"
            attachElementToBody
            onChange={selected => {
              console.log('selected item', selected);
            }}
          />
        ),
        width: '260px',
        minResizeWidth: 40, // not less than that
        maxResizeWidth: 350 // not to restrict
      },
      {
        label: 'Full Name',
        field: 'name',
        sortable: true,
        // pinned: 'left',
        // renderHtml: model => {
        //     return (
        //       <span>{model.name} {model.name} {model.name} {model.name}{model.name} {model.name} {model.name} {model.name} {model.name} {model.name}</span>
        //     );
        //   },
        width: '200px'
      },
      {
        label: 'Private',
        field: 'private',
        renderHtml: model => {
          let classname = 'primary';
          if (!model.owner.site_admin) {
            classname = 'secondary';
          }
          return (
            <Tag type={classname}>{`${
              model.owner.site_admin ? 'Yes' : 'No'
            }`}</Tag>
          );
        },
        width: '120px'
      },
      {
        label: 'Language',
        field: 'owner.login',
        width: '420px'
      },
      {
        label: 'Has Issues',
        field: 'has_issues',
        renderHtml: model => {
          return (
            <Toggle
              id={model.id + '--'}
              disabled
              labelOff=" "
              labelOn=" "
              toggled={model.has_issues}
            />
          );
        },
        width: '550px'
      },
      {
        label: 'Forks Count',
        field: 'forks_count',
        width: '120px'
      },
      {
        label: 'Branch',
        field: 'default_branch',
        sortable: true,
        width: '120px'
      },
      {
        label: 'Issues Count',
        field: 'open_issues_count',
        width: '420px'
        // pinned: 'right'
      },
      {
        field: 'overflow',
        renderHtml: row => {
          return (
            <Overflowmenu
              listItems={overflowlist}
              attachElementToBody={true}
              scrollListner={true}
              direction="bottom-right"
              ellipsisType="vertical"
              onClick={(item, index, e) => {
                console.log('OVERFLOW SELECT');
                console.log(item, index, e);
              }}
            />
          );
        },
        width: '400px'
      }
    ]
  };
  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    let url = 'https://api.github.com/users/zellwk/repos';

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({
          tableData: response,
          totalItems: response.length,
          displayData: response
        });
      })
      .catch(error => {});
  };

  colResize = data => {
    console.log(data);
  };

  render() {
    return (
      <section className="hcl-container pt-5 mb-5">
        <div className="hcl-row m-0">
          <div className="hcl-col-12 mt-5 mb-5" id="dataTableElement">
            <DataTable
              resizable
              // showDraggableIcon ={false}
              id="sample_table"
              tableData={this.state.displayData}
              tableConfig={this.state.tableConfig}
              isHeaderSticky
              onColumnAfterResize={this.colResize}
              initSortedColumn={this.state.initSortedColumn}
              columnDraggable
              resizer
              selectedItem={this.state.selectedItem}
              onColumnReorder={dataTableConfig => {
                console.log('dataTableConfig', dataTableConfig);
              }}
              // expandRowTemplate={() => {
              //   return (<Paragraph>
              //     available, but the majority have suffered alteration
              //     in some form, by injected humour, or randomised words
              //     which don&apos;t look even slightly believable. If you
              //     are going to use a passage of Lorem Ipsum, you need to
              //     be sure there isn&apos;t anything embarrassing hidden
              //     in the middle of text. All the Lorem Ipsum generators
              //     on the Internet tend to repeat predefined chunks as
              //     necessary, making this the first true generator on the
              //     Internet. It uses a dictionary of over 200 Latin
              //     words, combined with a handful of model sentence
              //     structures, to generate Lorem Ipsum which looks
              //     reasonable. The generated Lorem Ipsum is therefore
              //     always free from repetition, injected humour, or
              //     non-characteristic words etc.
              //   </Paragraph>);
              // }}
              type="zebra borderless"
              onSort={(field, order) => {
                if (order === null) {
                  this.setState({
                    displayData: [...this.state.tableData]
                  });
                } else {
                  let newData = [...this.state.displayData].sort((a, b) => {
                    if (a[field].toLowerCase() > b[field].toLowerCase())
                      return order === 'asc' ? 1 : -1;
                    if (b[field].toLowerCase() > a[field].toLowerCase())
                      return order === 'asc' ? -1 : 1;
                    return 0;
                  });
                  this.setState({
                    displayData: newData
                  });
                }
              }}
              headerSelection={<Checkbox id={`header_checkbox`} />}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default TableExample;
