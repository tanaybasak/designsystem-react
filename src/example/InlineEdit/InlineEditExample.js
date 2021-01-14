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
    showBusyLoader: false,
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

  inlineEditButton = type => {
    return (
      <button
        type="button"
        aria-label="inline-close"
        className="inline-edit-button"
        onClick={() => {
          if (type === 'country') {
            this.setState({
              editingFormType: type,
              temporaryValue: this.state.formValue.country
            });
          } else {
            this.setState({ editingFormType: type });
          }
        }}
      >
        {edit}
      </button>
    );
  };

  /** Title Inline Editor Section */

  updateTitleText = newTitle => {
    this.setState({ showBusyLoader: true, errorMessage: null });
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
          errorMessage: `Please enter more than 3 character`,
          showBusyLoader: false
        });
      }, 2000);
    }
  };

  reset = () => {
    this.setState({
      editingFormType: null,
      titleFormStatus: false,
      errorMessage: null
    });
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

  render() {
    return (
      <section className="m-1 p-5 inline-edit-form">
        <form className="m-5">
          <div className="hcl-form-group">
            <div className="hcl-row">
              <div className="hcl-col-3">
                <label>Title</label>
              </div>
              <div className="hcl-col-9">
                {this.state.editingFormType === 'title' ? (
                  <InlineEdit
                    loader={this.state.showBusyLoader}
                    errorMessage={this.state.errorMessage}
                    onTextUpdate={this.updateTitleText}
                    onClose={this.reset}
                  >
                    <TextInput
                      value={this.state.formValue.title}
                      data-invalid={this.state.titleFormStatus}
                    />
                  </InlineEdit>
                ) : (
                  <div className="hcl-inline-wrapper">
                    <label>{this.state.formValue.title}</label>
                    {this.inlineEditButton('title')}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hcl-form-group">
            <div className="hcl-row">
              <div className="hcl-col-3">
                <label>Type</label>
              </div>
              <div className="hcl-col-9">
                {this.state.editingFormType === 'type' ? (
                  <InlineEdit
                    loader={this.state.showBusyLoader}
                    errorMessage={this.state.errorMessage}
                    onTextUpdate={this.updateIssueType}
                    onClose={this.reset}
                  >
                    <Dropdown
                      type="top"
                      items={this.state.types}
                      label="Top DropDown"
                      selectedItem={this.state.formValue.type.id}
                    />
                  </InlineEdit>
                ) : (
                  <div className="hcl-inline-wrapper">
                    <label>{this.state.formValue.type.text}</label>
                    {this.inlineEditButton('type')}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hcl-form-group">
            <div className="hcl-row">
              <div className="hcl-col-3">
                <label>Framework</label>
              </div>
              <div className="hcl-col-9">
                {this.state.editingFormType === 'framework' ? (
                  <InlineEdit
                    loader={this.state.showBusyLoader}
                    errorMessage={this.state.errorMessage}
                    onTextUpdate={this.updateFramework}
                    onClose={this.reset}
                  >
                    <Dropdown
                      type="top"
                      items={this.state.frameworks}
                      label="Top DropDown"
                      dropdownType="multi"
                      selectedItem={this.state.formValue.framework}
                    />
                  </InlineEdit>
                ) : (
                  <div className="hcl-inline-wrapper">
                    {this.state.formValue.framework.map((item, index) => {
                      return (
                        <Tag key={`fram${index}`} type="primary">
                          {item.text}
                        </Tag>
                      );
                    })}
                    {this.inlineEditButton('framework')}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hcl-form-group">
            <div className="hcl-row">
              <div className="hcl-col-3">
                <label>Exp Date</label>
              </div>
              <div className="hcl-col-9">
                {this.state.editingFormType === 'expectedDate' ? (
                  <InlineEdit
                    loader={this.state.showBusyLoader}
                    errorMessage={this.state.errorMessage}
                    onTextUpdate={this.updateExpectedDate}
                    onClose={this.reset}
                  >
                    <DateSelector
                      defaultDate={this.state.formValue.expectedDate}
                    />
                  </InlineEdit>
                ) : (
                  <div className="hcl-inline-wrapper">
                    <label>
                      {this.state.formValue.expectedDate.toLocaleString()}
                    </label>
                    {this.inlineEditButton('expectedDate')}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hcl-form-group">
            <div className="hcl-row">
              <div className="hcl-col-3">
                <label>Country</label>
              </div>
              <div className="hcl-col-9">
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
                  <div className="hcl-inline-wrapper">
                    <label>{this.state.formValue.country.text}</label>
                    {this.inlineEditButton('country')}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="hcl-btn hcl-primary">Submit</button>
        </form>
      </section>
    );
  }
}

export default InlineEditExample;
