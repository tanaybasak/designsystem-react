/* eslint-disable no-console */
import React, { Component } from 'react';
import InlineEdit from '../../atoms/InlineEdit';
import { edit } from '../../util/icons';
import TextInput from '../../atoms/TextInput';
import Dropdown from '../../atoms/Dropdown';
import DateSelector from '../../molecules/DateSelector';
import './inlineEdit.css';
import Tag from '../../atoms/Tag/Tag';

import { Select, SelectItem } from '../../atoms/Select';
import Button from '../../atoms/Button';
class InlineEditExample extends Component {
  state = {
    editingFormType: null,
    disableClose: false,
    showBusyLoader: false,
    disableSave: false,
    formValue: {
      title: 'inline editor not working',
      type: { id: 'story', text: 'Story' },
      framework: [
        { id: 'angular', text: 'Angular' },
        { id: 'vanilla', text: 'Vanilla' }
      ],
      expectedDate: new Date(),
      country: { id: 'india', text: 'INDIA' }
    },
    types: [
      { id: 'epic', text: 'Epic' },
      { id: 'story', text: 'Story' },
      { id: 'task', text: 'Task' },
      { id: 'bug', text: 'Bug' }
    ],
    frameworks: [
      { id: 'angular', text: 'Angular' },
      { id: 'react', text: 'React' },
      { id: 'vuejs', text: 'Vue JS' },
      { id: 'vanilla', text: 'Vanilla' }
    ],
    countries: [
      { id: 'us', text: 'US' },
      { id: 'india', text: 'INDIA' },
      { id: 'uae', text: 'UAE' },
      { id: 'japan', text: 'JAPAN' }
    ],
    errorMessage: null,
    titleFormStatus: false,
    temporaryValue: {}
  };

  enableEditMode = type => {
    this.setState({ editingFormType: type });
  };

  enableEditModeOnEnter = (type, e) => {
    if (e.key === 'Enter') {
      this.enableEditMode(type);
    }
  };

  inlineEditButton = () => {
    return (
      <button
        type="button"
        aria-label="inline-close"
        className="inline-edit-button"
      >
        <svg
          xmlns="https://www.w3.org/2000/svg"
          id="icon"
          style={{ fill: '#474747' }}
          viewBox="0 0 16 16"
        >
          <rect width="16" height="16" fill="none" />
          <path d="M13.56,3.52,12.48,2.44a1.5,1.5,0,0,0-2.13,0l-8.2,8.21A.47.47,0,0,0,2,11v2.5a.5.5,0,0,0,.5.5H5a.47.47,0,0,0,.35-.15l8.21-8.2a1.51,1.51,0,0,0,0-2.13Zm-9.85,7,6-6,1.79,1.79-6,6ZM3,11.21,4.79,13H3Zm9.85-6.27h0l-.6.61-1.8-1.8.61-.6a.5.5,0,0,1,.71,0l1.08,1.08a.49.49,0,0,1,.15.35A.49.49,0,0,1,12.85,4.94Z" />
        </svg>
      </button>
    );
  };

  reset = () => {
    this.setState({
      editingFormType: null,
      titleFormStatus: false,
      errorMessage: null
    });
  };

  /** Title Inline Editor Section */

  updateTitleText = newTitle => {
    this.setState({ showBusyLoader: true });
    if (newTitle.length > 3) {
      setTimeout(() => {
        const tempFormValues = { ...this.state.formValue };
        tempFormValues['title'] = newTitle;
        this.setState({
          editingFormType: null,
          formValue: tempFormValues,
          titleFormStatus: false,
          errorMessage: null,
          showBusyLoader: false
        });
      }, 2000);
    } else {
      setTimeout(() => {
        this.setState({
          titleFormStatus: true,
          errorMessage: 'Please enter more than 3 character',
          showBusyLoader: false
        });
      }, 2000);
    }
  };

  /** Type Inline Editor Section */

  updateIssueType = type => {
    this.setState({ showBusyLoader: true });

    setTimeout(() => {
      const tempFormValues = { ...this.state.formValue };
      tempFormValues['type'] = type;

      this.setState({
        editingFormType: null,
        formValue: tempFormValues,
        showBusyLoader: false
      });
    }, 2000);
  };

  /** Type Inline Editor Section */

  updateFramework = type => {
    const newFramework = [];
    this.state.frameworks.map(framework => {
      if (type.includes(framework.id)) {
        newFramework.push(framework);
      }
    });

    this.setState({ showBusyLoader: true });

    setTimeout(() => {
      const tempFormValues = { ...this.state.formValue };
      tempFormValues['framework'] = newFramework;

      this.setState({
        editingFormType: null,
        formValue: tempFormValues,
        showBusyLoader: false
      });
    }, 2000);
  };

  onTextChange = e => {
    if (e.currentTarget.value === '') {
      this.setState({
        disableSave: true
      });
    } else {
      this.setState({
        disableSave: false
      });
    }
  };

  onDropdownChange = value => {
    if (value.text === 'Bug') {
      this.setState({
        disableSave: true
      });
    } else {
      this.setState({
        disableSave: false
      });
    }
  };

  onMultiDropdownChange = (value, selected) => {
    if (selected.length < 1) {
      this.setState({
        disableSave: true
      });
    } else {
      this.setState({
        disableSave: false
      });
    }
  };

  onDateChange = date => {
    console.log(this.getDate(date));
    if (this.getDate(date) == '05/17/2021') {
      this.setState({
        disableSave: true
      });
    } else {
      this.setState({
        disableSave: false
      });
    }
  };

  updateExpectedDate = newExpectedDate => {
    this.setState({ showBusyLoader: true });

    setTimeout(() => {
      const tempFormValues = { ...this.state.formValue };
      tempFormValues['expectedDate'] = newExpectedDate;

      this.setState({
        editingFormType: null,
        formValue: tempFormValues,
        showBusyLoader: false
      });
    }, 2000);
  };

  getDate = date => {
    return `${('0' + (date.getMonth() + 1)).slice(-2)}/${(
      '0' + date.getDate()
    ).slice(-2)}/${date.getFullYear()}`;
  };
  render() {
    return (
      <section className="m-1 p-5 inline-edit-form">
        <form className="m-5">
          <div className="form-group">
            <div className="left-section">
              <label>Title:</label>
            </div>
            <div className="right-section">
              {this.state.editingFormType === 'title' ? (
                <InlineEdit
                  loader={this.state.showBusyLoader}
                  errorMessage={this.state.errorMessage}
                  onTextUpdate={this.updateTitleText}
                  disableSave={this.state.disableSave}
                  disableClose={this.state.disableClose}
                  onClose={this.reset}
                >
                  <TextInput
                    value={this.state.formValue.title}
                    onChange={this.onTextChange}
                    data-invalid={this.state.titleFormStatus}
                  />
                </InlineEdit>
              ) : (
                <div
                  className="hcl-inline-wrapper"
                  onClick={this.enableEditMode.bind(this, 'title')}
                  tabIndex="0"
                  onKeyDown={this.enableEditModeOnEnter.bind(this, 'title')}
                >
                  <label>{this.state.formValue.title}</label>
                  {this.inlineEditButton()}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="left-section">
              <label>Type:</label>
            </div>
            <div className="right-section">
              {this.state.editingFormType === 'type' ? (
                <InlineEdit
                  loader={this.state.showBusyLoader}
                  errorMessage={this.state.errorMessage}
                  onTextUpdate={this.updateIssueType}
                  disableSave={this.state.disableSave}
                  disableClose={this.state.disableClose}
                  onClose={this.reset}
                >
                  <Dropdown
                    type="top"
                    items={this.state.types}
                    label="Top DropDown"
                    onChange={this.onDropdownChange}
                    selectedItem={this.state.formValue.type.id}
                    attachElementToBody
                  />
                </InlineEdit>
              ) : (
                <div
                  className="hcl-inline-wrapper"
                  onClick={this.enableEditMode.bind(this, 'type')}
                  tabIndex="0"
                  onKeyDown={this.enableEditModeOnEnter.bind(this, 'type')}
                >
                  <label>{this.state.formValue.type.text}</label>
                  {this.inlineEditButton()}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="left-section">
              <label>Framework:</label>
            </div>
            <div className="right-section">
              {this.state.editingFormType === 'framework' ? (
                <InlineEdit
                  loader={this.state.showBusyLoader}
                  errorMessage={this.state.errorMessage}
                  onTextUpdate={this.updateFramework}
                  disableSave={this.state.disableSave}
                  disableClose={this.state.disableClose}
                  onClose={this.reset}
                >
                  <Dropdown
                    type="top"
                    items={this.state.frameworks}
                    label="Top DropDown"
                    dropdownType="multi"
                    onChange={this.onMultiDropdownChange}
                    selectedItem={this.state.formValue.framework}
                    attachElementToBody
                  />
                </InlineEdit>
              ) : (
                <div
                  className="hcl-inline-wrapper"
                  onClick={this.enableEditMode.bind(this, 'framework')}
                  tabIndex="0"
                  onKeyDown={this.enableEditModeOnEnter.bind(this, 'framework')}
                >
                  {this.state.formValue.framework.map((item, index) => {
                    return (
                      <Tag key={`fram${index}`} type="primary">
                        {item.text}
                      </Tag>
                    );
                  })}
                  {this.inlineEditButton()}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="left-section">
              <label>Exp Date:</label>
            </div>
            <div className="right-section">
              {this.state.editingFormType === 'expectedDate' ? (
                <InlineEdit
                  loader={this.state.showBusyLoader}
                  errorMessage={this.state.errorMessage}
                  onTextUpdate={this.updateExpectedDate}
                  disableSave={this.state.disableSave}
                  disableClose={this.state.disableClose}
                  onClose={this.reset}
                >
                  <DateSelector
                    defaultDate={this.state.formValue.expectedDate}
                    onChange={this.onDateChange}
                    attachElementToBody
                  />
                </InlineEdit>
              ) : (
                <div
                  className="hcl-inline-wrapper"
                  onClick={this.enableEditMode.bind(this, 'expectedDate')}
                  tabIndex="0"
                  onKeyDown={this.enableEditModeOnEnter.bind(
                    this,
                    'expectedDate'
                  )}
                >
                  <label>
                    {this.getDate(this.state.formValue.expectedDate)}
                  </label>
                  {this.inlineEditButton()}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <div className="left-section">
              <label>Country:</label>
            </div>
            <div className="right-section">
              {this.state.editingFormType === 'country' ? (
                <InlineEdit
                  loader={this.state.showBusyLoader}
                  errorMessage={this.state.errorMessage}
                  onTextUpdate={() => {
                    console.log('UPDAZTE');
                  }}
                  customIcon={
                    <>
                      <Button type="neutral" onClick={this.reset}>
                        N
                      </Button>
                      <Button
                        type="neutral"
                        onClick={() => {
                          this.setState({ showBusyLoader: true });
                          setTimeout(() => {
                            const tempFormValues = {
                              ...this.state.formValue
                            };
                            tempFormValues[
                              'country'
                            ] = this.state.temporaryValue;
                            this.setState({
                              editingFormType: null,
                              formValue: tempFormValues,
                              titleFormStatus: false,
                              errorMessage: null,
                              showBusyLoader: false
                            });
                          }, 2000);
                        }}
                      >
                        Y
                      </Button>
                    </>
                  }
                  onClose={this.reset}
                >
                  <Select
                    onChange={val => {
                      this.setState({
                        temporaryValue: { id: val.value, text: val.text }
                      });
                    }}
                    value={this.state.temporaryValue.id}
                  >
                    {this.state.countries.map((country, index) => {
                      return (
                        <SelectItem
                          text={country.text}
                          value={country.id}
                          key={`country-${index}`}
                        />
                      );
                    })}
                  </Select>
                </InlineEdit>
              ) : (
                <div
                  className="hcl-inline-wrapper"
                  tabIndex="0"
                  onClick={this.enableEditMode.bind(this, 'country')}
                  onKeyDown={this.enableEditModeOnEnter.bind(this, 'country')}
                >
                  <label>{this.state.formValue.country.text}</label>
                  {this.inlineEditButton()}
                </div>
              )}
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default InlineEditExample;
