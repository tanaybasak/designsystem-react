/* eslint-disable no-console */
import React, { Component } from 'react';
import { Wizard, Step } from '../../molecules/Wizard';
// import { User, User2 } from '../../util/icons';
import Button from '../../atoms/Button';
import { Radio } from '../../atoms/radio';
import { TextInput } from '../../atoms/TextInput';
import { FormHelperText } from '../../atoms/FormHelperText';
import { Label } from '../../atoms/Label';

class WizardExample extends Component {
  constructor(props) {
    super(props);
    // this.rr = React.createRef();
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
      },
      {
        title: 'Step 4',
        description: 'Add Campaign details'
      },
      {
        title: 'Step 5',
        description: 'Verify Details'
      }
    ]
  };

  isAllStepsCompleted = () => {
    return this.state.wizardmodel.every(
      (item, idx) => item['status'] === 'completed'
    );
  };

  lastStepCompleted = () => {
    const idx = this.state.wizardmodel
      .slice()
      .reverse()
      .findIndex(item => (item['status'] = 'completed'));
    return idx;
  };

  handleStepClick = (idx, e) => {
    if (this.state.selIndex === idx) {
      return;
    }
    // if (this.lastStepCompleted() < idx) {
    //   return;
    // }
    if (idx > this.state.selIndex) {
      this.handleNext();
    } else {
      this.handleBack();
    }
  };

  handleBack = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      selIndex: this.state.selIndex - 1
    });
  };

  handleNext = e => {
    if (e) e.preventDefault();
    console.log(this.state.selIndex);
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
      selIndex: null,
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

  renderCurrentLabel = () => {
    if (
      this.state.selIndex &&
      this.state.selIndex <= this.state.wizardmodel.length - 1
    ) {
      return `<span>Step ${this.state.selIndex + 1} of ${
        this.state.wizardmodel.length
      }</span>`;
    }
  };

  stepComponent = () => {
    switch (this.state.selIndex) {
      case 0:
        return 'A';
      // return (
      //   <>
      //     <div className="hcl-form-group">
      //       <TextInput
      //         type="text"
      //         placeholder="Firt Name"
      //         id="firstname"
      //         value={'James'}
      //         onChange={e => {
      //           const value = e.currentTarget.value;
      //         }}
      //         required
      //       />
      //       <Label htmlFor="firstname">Username</Label>
      //       <FormHelperText className="error-msg">
      //         Enter First Name
      //       </FormHelperText>
      //     </div>
      //     <div className="hcl-form-group">
      //       <TextInput
      //         type="text"
      //         placeholder="Last Name"
      //         id="lastname"
      //         value={'Stewart'}
      //         onChange={e => {
      //           const value = e.currentTarget.value;
      //         }}
      //         required
      //       />
      //       <Label htmlFor="lastname">Last Name</Label>
      //       <FormHelperText className="error-msg">
      //         Enter Last Name
      //       </FormHelperText>
      //     </div>
      //   </>
      // );
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      case 4:
        return 'E';
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="hcl-container">
        <div className="hcl-row">
          <Wizard
            kind={'style1'}
            // iconType="noicon"
            currentStepLabel={
              this.state.selIndex != null &&
              this.state.selIndex <= this.state.wizardmodel.length
                ? `Step ${this.state.selIndex + 1} of ${
                    this.state.wizardmodel.length
                  }`
                : this.isAllStepsCompleted()
                ? 'All Steps Done !'
                : ''
            }
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
        </div>
        <div className="hcl-row">
          {this.state.selIndex > -1 ? this.stepComponent() : null}
        </div>
        <div className="hcl-row" style={{ justifyContent: 'center' }}>
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
              style={{
                marginLeft: '30px'
              }}
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
              style={{
                display: this.isAllStepsCompleted() ? 'none' : 'unset',
                marginLeft: '30px'
              }}
              // ref={this.nextRef}
              onClick={this.handleNext.bind(this)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default WizardExample;
