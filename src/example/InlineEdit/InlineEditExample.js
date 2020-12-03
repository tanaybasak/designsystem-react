/* eslint-disable no-console */
import React, { Component } from 'react';
import InlineEdit from '../../atoms/InlineEdit';
import Button from '../../atoms/Button';
// import Icon from '../../atoms/Icon';

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
            // formStatus=""
            // errorMessage=""
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
