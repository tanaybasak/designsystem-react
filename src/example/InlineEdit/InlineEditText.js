/* eslint-disable no-console */
import React, { Component } from 'react';
import InlineEdit from '../../atoms/InlineEdit';
// import Icon from '../../atoms/Icon';

class InlineEditExample extends Component {
  state = {
    value: 'content'
  }
  render() {
    return (
      <div className="hcl-col-12 mt-5" id="inline-section">
      <InlineEdit
      value={this.state.value}
      onTextUpdate={e => {
        console.log("changed text: ", e)
      }}
      formStatus={formStatus}
      errorMessage={errorMessage}
      onClose={() => {
        console.log("close event called.... ")
      }}
    />
      </div>
    );
  }
}

export default InlineEditExample;
