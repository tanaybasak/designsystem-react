/* eslint-disable no-console */
import React, { Component } from 'react';
import Pagination from '../../atoms/Pagination';

class PaginationExample extends Component {
  state = {
    totalItems: 300,
    currentPage: 4,
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
