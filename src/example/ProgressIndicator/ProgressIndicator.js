/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  LinearProgressIndicator,
  CircleProgressIndicator
} from '../../atoms/ProgressIndicator';

class ProgressIndicatorExample extends Component {
  render() {
    return (
      <div className="hcl-row p-5">
        <div className="hcl-col-12 mt-5 mb-5">
          <LinearProgressIndicator
            label="Downloading.."
            progress={0.3}
            subText="subtext"
            type="determinate"
          />
        </div>
        <div className="hcl-col-12 mt-5 mb-5">
          <LinearProgressIndicator type="indeterminate" />
        </div>
        <div className="hcl-col-12 mt-5 mb-5">
          <CircleProgressIndicator
            progress={0.7}
            label="Downloading.."
            labelPosition="left"
            type="determinate"
          />
        </div>
        <div className="hcl-col-12 mt-5 mb-5">
          <CircleProgressIndicator type="indeterminate" />
        </div>
      </div>
    );
  }
}

export default ProgressIndicatorExample;
