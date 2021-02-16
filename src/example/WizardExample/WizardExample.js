/* eslint-disable no-console */
import React, { Component } from 'react';
import { Wizard, Step } from '../../molecules/Wizard';
// import { User, User2 } from '../../util/icons';
import Button from '../../atoms/Button';

class WizardExample extends Component {
  constructor(props) {
    super(props);
    this.rr = React.createRef();
    this.finishRef = React.createRef();
    this.nextRef = React.createRef();
  }

  state = {
    selIndex: 0,
    wizardmodel: [
      {
        title: 'Step 1',
        description: 'Basic Info'
      },
      {
        title: 'Step 2',
        description: 'Upload File'
      },
      {
        title: 'Step 3',
        description: 'Add Social Markup'
      }
    ]
  };

  isAllStepsCompleted = () => {
    return this.state.wizardmodel.every(
      (item, idx) => item['status'] === 'completed'
    );
  };

  handleStepClick = (idx, e) => {
    console.log(idx);
  };

  handleBack = e => {
    e.preventDefault();
    this.setState({
      selIndex: this.state.selIndex - 1
    });
  };

  handleNext = e => {
    e.preventDefault();
    if (this.state.selIndex < this.state.wizardmodel.length - 1) {
      this.setState({
        selIndex: this.state.selIndex + 1,
        wizardmodel: this.state.wizardmodel.map((item, idx) => {
          if (idx === this.state.selIndex) {
            item['status'] = 'completed';
          }
          return item;
        })
      });
    }
  };

  handleFinish = e => {
    e.preventDefault();
    console.log('in finish', this.state.selIndex);
    this.setState({
      selIndex: -1,
      wizardmodel: this.state.wizardmodel.map((item, idx) => {
        if (idx <= this.state.selIndex) {
          item['status'] = 'completed';
        }
        return item;
      })
    });
  };

  handleReset = () => {
    this.setState({
      selIndex: 0,
      wizardmodel: this.state.wizardmodel.map((item, idx) => {
        delete item['status'];
        return item;
      })
    });
  };

  render() {
    return (
      // <div style={{ marginTop: '5px', padding: '5px' }}>
      <>
        <Wizard
          ref={this.rr}
          type={'style1'}
          // iconType="noicon"
          // titleBelow
          // responsive
          activeIndex={this.state.selIndex}
        >
          {this.state.wizardmodel.map((item, idx) => {
            return (
              <Step
                key={idx}
                title={item.title}
                description={item.description}
                status={item.status}
                onClick={this.handleStepClick.bind(this, idx)}
              />
            );
          })}
        </Wizard>
        <div>
          {this.isAllStepsCompleted() ? (
            <Button
              type="ghost"
              kind="button"
              onClick={this.handleReset.bind(this)}
            >
              Reset
            </Button>
          ) : (
            <Button
              type="ghost"
              kind="button"
              disabled={this.state.selIndex === 0 ? true : false}
              onClick={this.handleBack.bind(this)}
            >
              Back
            </Button>
          )}
          {this.state.selIndex === this.state.wizardmodel.length - 1 ? (
            <Button
              type="primary"
              kind="button"
              // ref={this.finishRef}
              //   disabled={this.state.selIndex === 5}
              onClick={this.handleFinish.bind(this)}
            >
              Finish
            </Button>
          ) : (
            <Button
              type="primary"
              kind="button"
              style={{ display: this.isAllStepsCompleted() ? 'none' : 'unset' }}
              // ref={this.nextRef}
              onClick={this.handleNext.bind(this)}
            >
              Next
            </Button>
          )}
        </div>
      </>
      // </div>
    );
  }
}

export default WizardExample;
