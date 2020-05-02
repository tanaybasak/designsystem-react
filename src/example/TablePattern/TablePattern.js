/* eslint-disable no-console */
import React, { Component } from 'react';
import overflowlist from '../../molecules/Overflowmenu/sample-overflow-list.json';
import Tag from '../../atoms/Tag';
import Toggle from '../../atoms/Toggle';
import Checkbox from '../../atoms/Checkbox';
import DataTableMain from '../../atoms/DataTableMain';
import DataTable from '../../atoms/DataTable';
import Overflowmenu from '../../molecules/Overflowmenu/index.js';
import Pagination from '../../atoms/Pagination/index.js';
class TablePattern extends Component {
  state = {
    totalItems: 300,
    headerCheckbox: false,
    stepper: 10,
    stepperLimit: 100,
    dataTableData: [],
    selectedItems: [],
    pageNo: 1,
    pageItemCount: 10,
    dataTableConfig2: [
      {
        field: 'checkbox',
        renderHtml: row => {
          return (
            <Checkbox
              id={`${row.id}_checkbox_`}
              name="testcheck"
              checked={this.isCheckboxSelected.bind(this, row)}
              onChange={this.setSelection.bind(this, row)}
              //data-index={index}
            />
          );
        }
        //width:'260px'
      },
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
        field: 'name',
        sortable: true
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
        field: 'owner.login'
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
        }
      }
    ]
  };
  componentDidMount = () => {
    this.loadData1();
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
          totalItemsPage2: response.length,
          rows: this.getTableData(response, 1, 10)
        });
      })
      .catch(error => {});
  };

  isAllSelected = (tempSelected, currentData) => {
    let allSelectedStatus = true;
    currentData.map(item => {
      const itemExist = tempSelected.find(element => element.id === item.id);
      if (!itemExist) {
        allSelectedStatus = false;
      }
    });
    console.log(allSelectedStatus);
    return allSelectedStatus;
  };
  setSelection = row => {
    console.log('setSelection');
    let tempSelected = [...this.state.selectedItems];

    let selectIndex = tempSelected.findIndex(item => item.id === row.id);
    if (selectIndex === -1) {
      tempSelected.push(row);
    } else {
      tempSelected.splice(selectIndex, 1);
    }

    console.log(tempSelected, this.state.rows);

    this.setState({
      selectedItems: tempSelected,
      headerCheckbox: this.isAllSelected(tempSelected, this.state.rows)
    });
  };

  isCheckboxSelected = row => {
    let tempSelected = [...this.state.selectedItems];
    let selectIndex = tempSelected.findIndex(item => item.id === row.id);
    if (selectIndex === -1) {
      return false;
    } else {
      return true;
    }
  };

  allSelected = e => {
    console.log(e.target.checked);
    this.setState({
      selectedItems: e.target.checked ? this.state.dataTableData2 : [],
      headerCheckbox: e.target.checked
    });
  };

  onPageItemCountChange = pageCount => {
    // if (rows.length < pageNo * pageCount && rows.length != totalItems) {
    //   let newData = await onPageChange(pageNo, pageCount);
    //   if (newData) {
    //     updateTableRowData(newData);
    //   }
    // }
    // setPageNo(1);
    // setPageItemCount(pageCount);
  };

  onPageNumberChange = pageNo => {
    const currentData = this.getTableData(
      this.state.dataTableData2,
      pageNo,
      this.state.pageItemCount
    );
    this.setState({
      rows: currentData,
      pageNo: pageNo,
      headerCheckbox: this.isAllSelected(this.state.selectedItems, currentData)
    });
    // if (rows.length < pageNo * pageItemCount && rows.length != totalItems) {
    //     let newData = await onPageChange(pageNo, pageItemCount);
    //     if (newData) {
    //       updateTableRowData([...rows, ...newData]);
    //     }
    //   }
    //   setPageNo(pageNo);
  };

  getTableData = (data, pageNo, pageItemCount) => {
    return data
      ? data.slice((pageNo - 1) * pageItemCount, pageNo * pageItemCount)
      : [];
  };

  render() {
    return (
      <main className="hcl-content-main">
        <section className="hcl-container pt-5 mb-5">
          Checkbox Status {this.state.headerCheckbox + ' '}
          <div className="hcl-row m-0">
            <div className="hcl-col-12 mt-5 mb-5" id="dataTableElement">
              <DataTableMain
                id="sample_table_2"
                type="zebra borderless"
                tableData={this.state.rows}
                tableConfig={this.state.dataTableConfig2}
                onSort={(field, order, subList, fullList) => {
                  let newData = fullList.sort((a, b) => {
                    if (a[field] > b[field]) return order === 'desc' ? 1 : -1;
                    if (b[field] > a[field]) return order === 'desc' ? -1 : 1;
                    return 0;
                  });
                  return newData;
                }}
                selectionTemplate={row => {
                  return (
                    <Checkbox
                      id={`${row.id}_checkbox_`}
                      name="testcheck"
                      checked={this.isCheckboxSelected.bind(this, row)}
                      onChange={this.setSelection.bind(this, row)}
                      //data-index={index}
                    />
                  );
                }}
                overflowTemplate={row => {
                  return (
                    <Overflowmenu
                      listItems={overflowlist}
                      onClick={e => {
                        console.log(e, row);
                      }}
                    />
                  );
                }}
                // headerSelection={
                //   <Checkbox
                //     id={`header_checkbox`}
                //     checked={this.state.headerCheckbox}
                //     onChange={this.allSelected}
                //   />
                // }
                totalItems={this.state.totalItemsPage2}
              />

              <Pagination
                itemsPerPageStepper={10}
                itemsStepperLimit={100}
                onPageChange={this.onPageNumberChange}
                onItemsPerPageChange={this.onPageItemCountChange}
                totalItems={this.state.totalItemsPage2}
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default TablePattern;
