/* eslint-disable no-console */
import React, { Component } from 'react';
import { Wizard, Step } from '../../molecules/Wizard';
import Button from '../../atoms/Button';
import TextInput from '../../atoms/TextInput';
import FormHelperText from '../../atoms/FormHelperText';
import Label from '../../atoms/Label';
import FileUploader from '../../molecules/FileUploader';
import TextArea from '../../atoms/TextArea';
import Tile from '../../atoms/Tile';

class WizardExample extends Component {
  constructor(props) {
    super(props);
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
      .findIndex(item => item['status'] === 'completed');
    return idx;
  };

  handleStepClick = (idx, e) => {
    if (this.state.selIndex === idx) {
      return;
    }
    this.goToStep(idx);
  };

  handleBack = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      selIndex: this.state.selIndex - 1
    });
  };

  goToStep = idx => {
    this.setState({
      selIndex: idx
    });
  };

  handleNext = e => {
    if (e) e.preventDefault();
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
        return (
          <>
            <div className="hcl-col-md-3 hcl-col-sm-12 hcl-form-group">
              <TextInput
                type="text"
                placeholder="First Name"
                id="firstname"
                value={''}
                onChange={e => {
                  const value = e.currentTarget.value;
                }}
                required
              />
              <Label htmlFor="firstname">First Name</Label>
            </div>
            <div className="hcl-col-md-3 hcl-col-sm-12 hcl-form-group">
              <TextInput
                type="text"
                placeholder="Last Name"
                id="lastname"
                value={''}
                onChange={e => {
                  const value = e.currentTarget.value;
                }}
                required
              />
              <Label htmlFor="lastname">Last Name</Label>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="hcl-col-md-3 hcl-col-sm-12 hcl-form-group">
              <FileUploader
                className="hcl-btn hcl-primary hcl-sm"
                description="Supports multiple Uploads"
                fileType=""
                id="sample_file_uploader"
                hideFile
                label="Add File"
                multiple
                name=""
              >
                Upload
              </FileUploader>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="hcl-col-md-3 hcl-col-sm-12 hcl-form-group">
              <TextArea
                aria-label="comments"
                placeholder="Social Markup text"
              />
              <Label htmlFor="social">Social Markup Content</Label>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="hcl-col-md-3 hcl-col-sm-12 hcl-form-group">
              <TextInput
                type="text"
                placeholder="Campaign URL"
                id="url"
                value={''}
                data-invalid="false"
                onChange={e => {
                  const value = e.currentTarget.value;
                }}
                required
              />
              <Label htmlFor="url">Campaign URL</Label>
              <div className="hcl-error-msg">
                Campaign URL generated from Campaign URL Builder
              </div>
            </div>
            <div className="hcl-col-md-3 hcl-col-sm-12 hcl-form-group">
              <TextInput
                type="text"
                placeholder="Campaign Source"
                id="source"
                value={''}
                onChange={e => {
                  const value = e.currentTarget.value;
                }}
                required
              />
              <Label htmlFor="source">Campaign Source</Label>
              <div className="hcl-error-msg">
                Campaign URL generated from Campaign URL Builder
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="hcl-col-md-3 hcl-col-sm-12 hcl-form-group">
              <TextInput
                type="text"
                placeholder="Firt Name"
                id="firstname"
                value={'James'}
                onChange={e => {
                  const value = e.currentTarget.value;
                }}
                required
              />
              <Label htmlFor="firstname">Username</Label>
              <FormHelperText className="error-msg">
                Enter First Name
              </FormHelperText>
            </div>
            <div className="hcl-col-md-3 hcl-col-sm-12 hcl-form-group">
              <TextInput
                type="text"
                placeholder="Last Name"
                id="lastname"
                value={'Stewart'}
                onChange={e => {
                  const value = e.currentTarget.value;
                }}
                required
              />
              <Label htmlFor="lastname">Last Name</Label>
              <FormHelperText className="error-msg">
                Enter Last Name
              </FormHelperText>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  wizardInnerComponentStyle = () => ({
    padding:
      this.state.selIndex === null && this.isAllStepsCompleted()
        ? '45px'
        : '15px',
    margin: '10px',
    width: '100%'
  });

  render() {
    return (
      <div className="hcl-container">
        <div className="hcl-row">
          <Wizard
            // linear={false}
            kind={'default'}
            iconType="number"
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
        <div className="hcl-row" style={{ height: '230px' }}>
          <Tile type="readable" style={this.wizardInnerComponentStyle()}>
            {this.state.selIndex > -1 ? this.stepComponent() : null}
            {this.state.selIndex === null && this.isAllStepsCompleted() ? (
              <div style={{ textAlign: 'center', width: '100%' }}>
                All Steps completed!
              </div>
            ) : null}
          </Tile>
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
