/* eslint-disable no-console */
import React, { Component } from 'react';
import overflowlist from '../../molecules/Overflowmenu/sample-overflow-list.json';
import Tag from '../../atoms/Tag';
import Toggle from '../../atoms/Toggle';
import Checkbox from '../../atoms/Checkbox';
import DataTable from '../../atoms/DataTable';
import Overflowmenu from '../../molecules/Overflowmenu/index.js';
import Pagination from '../../atoms/Pagination/index.js';
class TableExample extends Component {
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
            },
           width:'5%',
           //pinned:'left'
          },
      {
        label: 'ID',
        field: 'id',
        width:'10%'
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
        width:'10%'
      },
      {
        label: 'Full Name',
        field: 'name',
        sortable: true,
        width:'10%',
        //pinned:'left'
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
        width:'10%'
      },
      {
        label: 'Language',
        field: 'owner.login',
        
        width:'10%'
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
        width:'10%'
      },
      {
        label: 'Forks Count',
        field: 'forks_count',
        width:'10%'
      },
      {
        label: 'Branch',
        field: 'default_branch',
        sortable: true,
        width:'10%'
      },
      {
        label: 'Issues Count',
        field: 'open_issues_count',
        width:'10%'
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
        width:'5%'
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
              <DataTable
                id="sample_table_2"
                tableData={this.state.rows}
                tableConfig={this.state.dataTableConfig2}
                type="borderless zebra"
                onSort={(field, order, fullList) => {
                    console.log(field, order, fullList)

                    if(order === null){

                        this.setState({
                            rows : this.getTableData([...this.state.dataTableData2], this.state.pageNo, this.state.pageItemCount) 
                        })
                        //return this.state.rows;
                    }else{
                        let newData = [...this.state.rows].sort((a, b) => {
                            if (a[field] > b[field]) return order === 'desc' ? 1 : -1;
                            if (b[field] > a[field]) return order === 'desc' ? -1 : 1;
                            return 0;
                          });
                          this.setState({
                            rows : newData
                        })
                          //return newData;
                    }
                  
                }}
                
                headerSelection={
                  <Checkbox
                    id={`header_checkbox`}
                    checked={this.state.headerCheckbox}
                    onChange={this.allSelected}
                  />
                }
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

export default TableExample;
