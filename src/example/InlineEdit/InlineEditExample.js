/* eslint-disable no-console */
import React, { Component } from 'react';
import InlineEdit from '../../atoms/InlineEdit';

class InlineEditExample extends Component {
  state = {
    value: 'content'
  };

  render() {
    return (
      <>
        <div className="hcl-col-4 mt-5" id="inline-section">
          <InlineEdit
            value={this.state.value}
            onTextUpdate={e => {
              console.log('updated text: ', e);
            }}
            onClose={() => {
              console.log('close event called.... ');
            }}
          />
          
        </div>
      </>
    );
  }
}

export default InlineEditExample;
