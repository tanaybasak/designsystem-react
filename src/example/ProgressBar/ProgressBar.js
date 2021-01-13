/* eslint-disable no-console */
import React, { Component } from 'react';
import { LinearProgressBar, CircleProgressBar } from '../../atoms/ProgressBar';

class ProgressBarExample extends Component {
  render() {
    return (
      <div className="hcl-row p-5">
        <div className="hcl-col-12 mt-5 mb-5">
          <LinearProgressBar
            label="Downloading.."
            progress={0.3}
            subText="subtext"
            type="determinate"
          />
        </div>
        <div className="hcl-col-12 mt-5 mb-5">
          <LinearProgressBar type="indeterminate" />
        </div>
        <div className="hcl-col-12 mt-5 mb-5">
          <CircleProgressBar
            progress={0.7}
            label="Downloading.."
            labelPosition="left"
            type="determinate"
          />
        </div>
        <div className="hcl-col-12 mt-5 mb-5">
          <CircleProgressBar type="indeterminate" />
        </div>
      </div>
    );
  }
}

export default ProgressBarExample;
