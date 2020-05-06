/* eslint-disable no-console */
import React, { Component } from 'react';
import overflowlist from '../../molecules/Overflowmenu/sample-overflow-list.json';
import Tag from '../../atoms/Tag';
import Toggle from '../../atoms/Toggle';
import Checkbox from '../../atoms/Checkbox';
import DataTable from '../../atoms/DataTable';
import Overflowmenu from '../../molecules/Overflowmenu';
class TableExample extends Component {
  state = {
    tableData: [],
    totalItems: 0,
    displayData: [],
    tableConfig: [
      {
        field: 'checkbox',
        renderHtml: row => {
          return <Checkbox id={`${row.id}_checkbox_`} name="testcheck" />;
        },
        width: '100px'
        //pinned:'left'
      },
      {
        label: 'ID',
        field: 'id',
        // width: '10%'
      },

      {
        label: 'Avatar',
        renderHtml: model => {
          return (
            <img
              src={model.owner.avatar_url}
              style={{ width: '44px', height: '44px', borderRadius: '50%' }}
            />
          );
        },
        // width: '10%'
      },
      {
        label: 'Full Name',
        field: 'name',
        sortable: true,
        // width: '10%'
      },
      {
        label: 'Private',
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
        // width: '10%'
      },
      {
        label: 'Language',
        field: 'owner.login',

        // width: '10%'
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
        // width: '10%'
      },
      {
        label: 'Forks Count',
        field: 'forks_count',
        // width: '10%'
      },
      {
        label: 'Branch',
        field: 'default_branch',
        sortable: true,
        // width: '10%'
      },
      {
        label: 'Issues Count',
        field: 'open_issues_count',
        // width: '10%'
      },
      {
        field: 'overflow',
        renderHtml: row => {
          return (
            <Overflowmenu
              listItems={overflowlist}
              onClick={e => {
                console.log(e, row);
              }}
            />
          );
        },
        width: '80px'
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

  render() {
    return (
      <main className="hcl-content-main">
        <section className="hcl-container pt-5 mb-5">
          <div className="hcl-row m-0">
            <div className="hcl-col-12 mt-5 mb-5" id="dataTableElement">
              <DataTable
                id="sample_table"
                tableData={this.state.displayData}
                tableConfig={this.state.tableConfig}
                type="borderless zebra"
                onSort={(field, order) => {
                  if (order === null) {
                    this.setState({
                      displayData: [...this.state.tableData]
                    });
                  } else {
                    let newData = [...this.state.displayData].sort((a, b) => {
                      if (a[field] > b[field]) return order === 'desc' ? 1 : -1;
                      if (b[field] > a[field]) return order === 'desc' ? -1 : 1;
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
      </main>
    );
  }
}

export default TableExample;
