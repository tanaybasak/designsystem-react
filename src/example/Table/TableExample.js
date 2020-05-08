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
        width: '40px'
        //pinned:'left'
      },
      {
        label: 'ID',
        field: 'id',
        width: '160px'
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
        width: '60px'
      },
      {
        label: 'Full Name',
        field: 'name',
        sortable: true,
        // renderHtml: model => {
        //     return (
        //       <span>{model.name} {model.name} {model.name} {model.name}{model.name} {model.name} {model.name} {model.name} {model.name} {model.name}</span>
        //     );
        //   },
        width: '200px'
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
        width: '120px'
      },
      {
        label: 'Language',
        field: 'owner.login',

        width: '120px'
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
        width: '150px'
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
        width: '120px'
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

        response[1].name =
          'Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer stringTesting longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string Testing longer string';
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
      </main>
    );
  }
}

export default TableExample;
