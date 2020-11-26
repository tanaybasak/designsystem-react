/* eslint-disable no-console */
import React, { Component } from 'react';
import Pagination from '../../atoms/Pagination';
import Paragraph from '../../atoms/Paragraph';

class PaginationExample extends Component {
  state = {
    totalItems: 300,
    currentPage: 2,
    stepper: 10,
    stepperLimit: 100,
    itemsPerPageToSelect: 20,
    position: {
      left: [
        'itemsPerPageSelection',
        'itemsPerPageInfo',
        'pageNumberSelection'
      ],
      right: ['pageNumberInfo']
    }
  };

  render() {
    return (
      <div className="hcl-col-12 mt-5" id="tags-section">
        <Paragraph className="p-2 m-1">
        <button
          className="hcl-btn hcl-secondary"
          onClick={() => {
            let { totalItems } = this.state;
            totalItems += 50;
            this.setState({
              ...this.state,
              totalItems: totalItems
            });
          }}
        >
          Total Items
        </button>
        <button
          className="ml-2 hcl-btn hcl-secondary"
          onClick={() => {
            let { stepper } = this.state;
            stepper += 5;
            this.setState({ ...this.state, stepper: stepper });
          }}
        >
          Change Stepper
        </button>
        <button
          className="ml-2 hcl-btn hcl-secondary"
          onClick={() => {
            let { stepperLimit } = this.state;
            stepperLimit += 50;
            this.setState({
              ...this.state,
              stepperLimit: stepperLimit
            });
          }}
        >
          Stepper Limit
        </button>
      </Paragraph>
        <Pagination
          totalItems={this.state.totalItems}
          itemsPerPageStepper={this.state.stepper}
          itemsStepperLimit={this.state.stepperLimit}
          currentPage={this.state.currentPage}
          position={this.state.position}
          itemsPerPageText={'No. of Rows:'}
          onPageChange={(e, e2) => {
            console.log(e, e2);
          }}
          onItemsPerPageChange={(e, e2) => {
            console.log(e, e2);
          }}
        />
        <br />
        <br />
        <Pagination
          totalItems={this.state.totalItems}
          itemsPerPageToSelect={this.state.itemsPerPageToSelect}
          itemsPerPageStepper={this.state.stepper}
          itemsStepperLimit={this.state.stepperLimit}
          currentPage={this.state.currentPage}
          itemsPerPageText={'No. of Rows:'}
          onPageChange={(e, e2) => {
            console.log(e, e2);
          }}
          onItemsPerPageChange={(e, e2) => {
            console.log(e, e2);
          }}
        />
      </div>
    );
  }
}

export default PaginationExample;
