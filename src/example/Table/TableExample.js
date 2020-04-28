/* eslint-disable no-console */
import React, { Component } from 'react';
import DataTable from '../../atoms/DataTable';
import overflowlist from '../../molecules/Overflowmenu/sample-overflow-list.json';
import Tag from '../../atoms/Tag';
import Toggle from '../../atoms/Toggle';
class TableExample extends Component {
  state = {
    totalItems: 300,
    stepper: 10,
    stepperLimit: 100,
    dataTableData: [],
    dataTableConfig2: [
      {
        label: 'ID',
        field: 'id'
        //width:'260px'
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
        }
        //width:'100px'
      },
      {
        label: 'Full Name',
        field: 'name'
        //width:'200px'
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
        }
        //width:'150px'
      },
      {
        label: 'Language',
        field: 'language'
        //width:'160px'
      },
      {
        label: 'Has Issues',
        field: 'has_issues',
        renderHtml: model => {
          return (
            <Toggle
              id={model.id + '--'}
              disabled
              small
              labelOff=" "
              labelOn=" "
              toggled={model.has_issues}
            />
          );
        }
        //width:'100px'
      },
      {
        label: 'Forks Count',
        field: 'forks_count'
        //width:'160px'
      },
      {
        label: 'Branch',
        field: 'default_branch'
        //width:'100px'
      },
      {
        label: 'Issues Count',
        field: 'open_issues_count'
        //width:'100px'
      }
    ],
    dataTableConfig: [
      {
        label: 'ID',
        field: 'id'
        //width:'60px'
      },
      {
        label: 'Email',
        field: 'email',
        sortable: true
        //width:'300px'
      },
      {
        label: 'First Name',
        field: 'first_name'
        //pinned:'left',
        //width:'200px'
      },
      {
        label: 'Last Name',
        field: 'last_name'
        //width:'600px'
      },
      {
        label: 'Avatar',
        //width:'600px',
        renderHtml: model => {
          return (
            <img
              src={model.avatar}
              style={{ width: '44px', height: '44px', borderRadius: '50%' }}
            />
          );
        }
      }
    ]
  };
  componentDidMount = () => {
    this.loadData();
    this.loadData1();
  };
  loadData = () => {
    let url = 'https://reqres.in/api/users';
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          dataTableData: response.data,
          totalItemsPage: response.data.length
        });
      })
      .catch(error => {});
  };

  loadData1 = () => {
    let url = 'https://api.github.com/users/zellwk/repos';

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          dataTableData2: response,
          totalItemsPage2: response.length
        });
      })
      .catch(error => {});
  };

  render() {
    return (
      <main className="hcl-content-main">
        <section className="hcl-container pt-5 mb-5">
          <div className="hcl-row m-0">
            <div className="hcl-col-12">
              <DataTable
                id="sample_table_1"
                type="borderless"
                tableData={this.state.dataTableData}
                tableConfig={this.state.dataTableConfig}
                selectable
                onSort={(field, order, subList, fullList) => {
                  let newData = fullList.sort((a, b) => {
                    if (a[field] > b[field]) return order === 'desc' ? 1 : -1;
                    if (b[field] > a[field]) return order === 'desc' ? -1 : 1;
                    return 0;
                  });
                  return newData;
                }}
                onSelection={(row, selectedRow) => {
                  console.log(row, selectedRow);
                }}
                itemsPerPageStepper={10}
                itemsStepperLimit={100}
                onPageChange={this.onPageChangeDatatable}
                totalItems={this.state.totalItemsPage}
                overflowMenuEllipsisDirection="vertical"
                overflowMenu
                overflowMenuItems={overflowlist}
                overflowMenuOnClick={(event, node) => console.log(event, node)}
              />
            </div>
          </div>
          <div className="hcl-row m-0">
            <div className="hcl-col-12 mt-5 mb-5" id="dataTableElement">
              <DataTable
                id="sample_table_2"
                type="borderless zebra"
                uniqueKey="id"
                tableData={this.state.dataTableData2}
                tableConfig={this.state.dataTableConfig2}
                selectable
                onSort={(field, order, subList, fullList) => {
                  let newData = fullList.sort((a, b) => {
                    if (a[field] > b[field]) return order === 'desc' ? 1 : -1;
                    if (b[field] > a[field]) return order === 'desc' ? -1 : 1;
                    return 0;
                  });
                  return newData;
                }}
                onSelection={(row, selectedRow) => {
                  console.log(row, selectedRow);
                }}
                pagination
                itemsPerPageStepper={10}
                itemsStepperLimit={100}
                onPageChange={this.onPageChangeDatatable}
                totalItems={this.state.totalItemsPage2}
                overflowMenuEllipsisDirection="vertical"
                overflowMenu
                overflowMenuItems={overflowlist}
                overflowMenuOnClick={(event, node) => console.log(event, node)}
                // expandRowTemplate={data => {
                //   console.log(data);

                //   return (
                //     <div style={{ display: 'flex' , width:'100%' , justifyContent:'space-between' , alignItems:'center' }}>
                //       <div>
                //         <p>
                //           Name : {data.name}
                //         </p>
                //         <p>Language : {data.language}</p>
                //         <p>Branch : {data.default_branch}</p>
                //       </div>
                //       <div>
                //         <img src={data.owner.avatar_url} />
                //       </div>
                //     </div>
                //   );
                // }}
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default TableExample;
