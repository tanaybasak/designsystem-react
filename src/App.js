/* eslint-disable no-console */
import React, { Component } from 'react';
import Label from './atoms/Label';
import TextInput from './atoms/TextInput';
import FormHelperText from './atoms/FormHelperText';
import Button from './atoms/Button';
import Heading from './atoms/Heading';
import Checkbox from './atoms/Checkbox';
import { Radio, RadioGroup } from './atoms/Radio';
import TextArea from './atoms/TextArea';
import Link from './atoms/Link';
import Paragraph from './atoms/Paragraph';
import { Breadcrumb, BreadcrumbItem } from './atoms/Breadcrumb';
import Spinner from './atoms/Spinner';
import Toggle from './atoms/Toggle';
import Notification from './atoms/Notification';
import List from './atoms/List';
import listItems from './atoms/List/sample-list-data.json';
import Toast from './atoms/Toast';
import Modal from './molecules/Modal';
import { Tabs, Tab } from './molecules/Tab';
import Slider from './atoms/Slider';
import { Overflowmenu } from './molecules/Overflowmenu';
import { MenuList, Item } from './atoms/MenuList';

import overflowlist from './molecules/Overflowmenu/sample-overflow-list.json';
import { ContentSwitcher, Switch } from './molecules/ContentSwitcher';
import Search from './atoms/Search';
import FileUploader from './molecules/FileUploader';
import { Accordion, AccordionItem } from './molecules/Accordion';
import Dropdown from './atoms/Dropdown';
import Tile from './atoms/Tile';
import DatePicker from './molecules/DatePicker';
import { weekDays, months } from './content';
import Pagination from './atoms/Pagination';
import NumberInput from './molecules/NumberInput';
import { Select, SelectItem, SelectItemGroup } from './atoms/Select';
import Tooltip from './atoms/Tooltip/Tooltip';
import LoadingState from './atoms/LoadingState/LoadingState';
import Footer from './molecules/Footer';
import { ActionBar, ActionSummary, ActionList } from './molecules/ActionBar';
import { ToolBar, ToolBarActions } from './molecules/ToolBar';
import Password from './atoms/Password';
//import Overlay from './atoms/Overlay';

class App extends Component {
  state = {
    showOverlay: false,
    totalItems: 300,
    currentPage: 3,
    stepper: 10,
    stepperLimit: 100,
    radio: {
      temperature: 45,
      city: 'Chennai'
    },
    notification: {
      visible: false
    },
    toast: {
      visible: false
    },
    modal: null,
    contentSwitch: {
      example1: 0,
      example2: 1,
      example3: 2,
      example4: 0
    },
    sidebarExpanded: false,
    password: {
      disabled: false
    }
  };

  itemList = [
    {
      id: 'option-1'
    },
    {
      id: 'option-2'
    }
  ];

  items = [
    {
      id: 'option-1',
      text: 'Option 1'
    },
    {
      id: 'option-2',
      text: 'Option 2'
    },
    {
      id: 'option-3',
      text: 'Option 3'
    },
    {
      id: 'option-4',
      text: 'Option 4'
    },
    {
      id: 'option-5',
      text: 'Option 5'
    },
    {
      id: 'option-6',
      text: 'Option 6'
    }
  ];

  switchAll = [
    {
      name: 'Cybernetics',
      value: 'll-1',
      child: [
        {
          name: 'Artifical Intelligence',
          value: 'll-1-1'
        },
        {
          name: 'Bionics',
          value: 'll-1-2'
        }
      ]
    },
    {
      name: 'Information & Communication technology',
      value: 'll-1',
      child: [
        {
          name: 'Cyber Infrastructure',
          value: 'll-1-1'
        },
        {
          name: 'Digital Technology',
          value: 'll-1-2'
        }
      ]
    }
  ];

  modalActions1 = [
    { label: 'Save' },
    {
      label: 'Close',
      handler: () => {
        this.onModalClose();
      },
      danger: true
    }
  ];

  modalActions3 = [
    {
      label: 'Close',
      danger: true,
      handler: () => {
        this.onModalClose();
      }
    }
  ];

  modalActions4 = [
    {
      label: 'Save',
      primary: true,
      handler: () => {
        this.onModalClose();
      }
    }
  ];

  modalActions5 = [{ label: 'Delete', danger: true }];

  modalActions7 = [{ label: 'Save', primary: true }];
  //   showoverlay = e => {
  //     this.refs.child.showOverlay(e);
  //   };
  _onTemperatureRadioChange = e => {
    this.setState({
      radio: {
        ...this.state.radio,
        temperature: Number(e.currentTarget.value)
      }
    });
  };

  _onCityRadioChange = e => {
    this.setState({
      radio: {
        ...this.state.radio,
        city: e.currentTarget.value
      }
    });
  };

  showToast = e => {
    if (!this.state.toast.visible) {
      this.setState(
        {
          toast: {
            visible: true
          }
        },
        () => {
          setTimeout(() => {
            this.hideToast(e);
          }, 5000);
        }
      );
    }
  };

  onSwitchChange = (e, example) => {
    const states = Object.assign(
      {},
      {
        contentSwitch: {
          ...this.state.contentSwitch,
          [example]: e.switchIndex
        }
      }
    );
    this.setState({
      ...states
    });
  };

  hideToast = () => {
    if (this.state.toast.visible) {
      this.setState({
        toast: {
          visible: false
        }
      });
    }
  };

  onModalClose = () => {
    this.setState({ modal: null });
  };

  _showNotification = () => {
    this.setState({
      notification: {
        visible: true
      }
    });
  };

  _hideNotification = () => {
    this.setState({
      notification: {
        visible: false
      }
    });
  };

  render() {
    const { contentSwitch = {}, password } = this.state;

    const interactiveTooltipIcon = (
      <svg
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M8.5 11V6.5h-2v1h1V11H6v1h4v-1zM8 3.5c-.4 0-.8.3-.8.8s.4.7.8.7.8-.3.8-.8-.4-.7-.8-.7z" />
        <path d="M8 15c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
      </svg>
    );

    const tooltipIcon = (
      <svg
        data-tooltip="Filter"
        data-direction="right"
        data-type="icon"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M15 4h-2.1c-.2-1.1-1.2-2-2.4-2s-2.2.9-2.4 2H1v1h7.1c.2 1.1 1.2 2 2.4 2s2.2-.9 2.4-2H15V4zm-4.5 2C9.7 6 9 5.3 9 4.5S9.7 3 10.5 3s1.5.7 1.5 1.5S11.3 6 10.5 6zM1 12h2.1c.2 1.1 1.2 2 2.4 2s2.2-.9 2.4-2H15v-1H7.9c-.2-1.1-1.2-2-2.4-2s-2.2.9-2.4 2H1v1zm4.5-2c.8 0 1.5.7 1.5 1.5S6.3 13 5.5 13 4 12.3 4 11.5 4.7 10 5.5 10z" />
      </svg>
    );

    const tooltipContent = (
      <div>
        <Paragraph>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&lsquo;t look even slightly
          believable.
        </Paragraph>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <Link href="https://www.google.com" className="pr-5" target="_blank">
            Google
          </Link>
          <Button className="hcl-primary">Create</Button>
        </div>
      </div>
    );

    return (
      <>
        <main className="hcl-content-main">
          <section className="hcl-container pt-5 mb-5">
            <div className="hcl-row m-0">
              {/* Input Field */}
              <div className="hcl-form-group hcl-col-12" id="form-section">
                <Label htmlFor="firstname">First Name </Label>
                <FormHelperText className="helper-text">
                  Enter first name
                </FormHelperText>
                <TextInput
                  type="text"
                  placeholder="name"
                  id="firstname"
                  data-invalid="true"
                  onChange={event => {
                    console.log(event.currentTarget.value);
                  }}
                />
                <FormHelperText className="error-msg">
                  Enter first name
                </FormHelperText>
              </div>
              {/* Password field */}
              <Toggle
                id="random-toggle"
                className="ml-3"
                onChange={(checked, e) => {
                  console.log('Toggled', checked, e);
                  this.setState(
                    {
                      password: {
                        disabled: checked
                      }
                    },
                    () => {
                      console.log(this.state.password.disabled, 'and yes');
                    }
                  );
                }}
                aria-label="Toggle"
              />
              <div className="hcl-form-group hcl-col-12">
                <FormHelperText className="helper-text">
                  Enter Password
                </FormHelperText>
                <Password
                  placeholder="Password"
                  id="password"
                  data-invalid="false"
                  disabled={password.disabled}
                  onChange={event => {
                    console.log(event.currentTarget.value);
                  }}
                />
                <Label htmlFor="password">Password</Label>
                <FormHelperText className="error-msg">
                  Enter Password
                </FormHelperText>
              </div>
              <div className="hcl-form-group hcl-col-12">
                <Label htmlFor="feedback">Feedback </Label>
                <FormHelperText className="helper-text">
                  Feedback helper
                </FormHelperText>
                <TextArea
                  aria-disabled="false"
                  id="feedback"
                  data-invalid="true"
                  onChange={event => {
                    console.log(event.currentTarget.value);
                  }}
                />
                <FormHelperText className="error-msg">
                  Validation message
                </FormHelperText>
              </div>

              <hr />
              {/* Button */}
              <div className="hcl-col-12" id="buttons-section">
                <Button
                  title="Default"
                  className="mr-2"
                  onClick={() => {
                    console.log('Button Clicked');
                  }}
                >
                  Default
                </Button>
                <Button
                  type="primary"
                  className="mr-2"
                  onClick={() => {
                    console.log('Button Clicked');
                  }}
                >
                  Primary
                </Button>
                <Button
                  type="secondary"
                  className="mr-2"
                  onClick={() => {
                    console.log('Button Clicked');
                  }}
                >
                  Secondary
                </Button>
                <Button
                  type="ghost"
                  className="mr-2"
                  onClick={() => {
                    console.log('Button Clicked');
                  }}
                >
                  Ghost
                </Button>

                <Button
                  type="primary"
                  className="mr-2"
                  small
                  onClick={() => {
                    console.log('Button Clicked');
                  }}
                >
                  Primary small
                </Button>
                <Button
                  type="primary-danger"
                  className="mr-2"
                  onClick={() => {
                    console.log('Button Clicked');
                  }}
                >
                  Danger outline
                </Button>
                <Button
                  type="secondary-danger"
                  className="mr-2"
                  onClick={() => {
                    console.log('Button Clicked');
                  }}
                >
                  Danger outline
                </Button>
                <Button
                  type="secondary-danger"
                  className="mr-2"
                  onClick={() => {
                    console.log('Button Clicked');
                  }}
                >
                  <span>Button</span>
                  <svg
                    className="hcl-btn-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                      fillRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
              {/* Heading */}
              <div className="hcl-col-12" id="heading-section">
                <Heading type="h2">Heading h2</Heading>
              </div>
              {/* Checkbox */}
              <div className="hcl-col-12 mt-5" id="checkbox-section">
                <legend className="hcl-legend">
                  Checkbox - Horizontally arranged (default)
                </legend>
                <div className="hcl-checkbox-group">
                  <Checkbox
                    id="checkbox1"
                    label="1 (default)"
                    onChange={() => {
                      console.log('Default Checkbox.');
                    }}
                  />
                  <Checkbox
                    id="checkbox2"
                    label="2"
                    checked
                    onChange={() => {
                      console.log('Checked state is changed.');
                    }}
                  />
                  <Checkbox id="checkbox3" label="3 (disabled)" disabled />
                </div>
              </div>
              <div className="hcl-col-12 mt-5">
                <legend className="hcl-legend">
                  Checkbox - Vertically arranged
                </legend>
                <div className="hcl-checkbox-group hcl-stack-vertical">
                  <Checkbox
                    id="checkbox4"
                    label="4 (default)"
                    onChange={() => {
                      console.log('Default Checkbox.');
                    }}
                  />
                  <Checkbox
                    id="checkbox5"
                    label="5"
                    checked
                    onChange={() => {
                      console.log('Checked state is changed.');
                    }}
                  />
                  <Checkbox id="checkbox6" label="6 (disabled)" disabled />
                </div>
              </div>

              {/* Radio Button */}
              <div className="hcl-col-12 mt-5" id="radio-section">
                <Radio
                  id="Radio1"
                  labelText="1 (default)"
                  value="3"
                  name="temperature"
                />
              </div>

              {/* Radio Group Button */}
              <div className="hcl-col-12 mt-5">
                <legend className="hcl-legend">Radio - Heading</legend>
                <RadioGroup
                  orientation="vertical"
                  defaultSelected="35"
                  onChange={(checkedVal, e) => {
                    console.log('RadioGroup', checkedVal, e);
                  }}
                >
                  <Radio
                    id="RadioBtn1"
                    labelText="1 (default)"
                    value="35"
                    name="RadioBtn1"
                  />
                  <Radio
                    id="RadioBtn2"
                    name="RadioBtn2"
                    labelText="2"
                    value="45"
                  />
                  <Radio id="RadioBtn3" labelText="3 (disabled)" value="30" />
                </RadioGroup>
              </div>
              <div className="hcl-col-12 mt-5">
                <legend className="hcl-legend">Radio - Heading</legend>
                <RadioGroup
                  defaultSelected="20"
                  onChange={(checkedVal, e) => {
                    console.log('RadioGroup', checkedVal, e);
                  }}
                >
                  <Radio
                    id="RadioBtn4"
                    labelText="1 (default)"
                    value="19"
                    name="RadioBtn4"
                  />
                  <Radio id="RadioBtn5" labelText="2" value="20" />
                  <Radio
                    id="RadioBtn6"
                    labelText="3 (disabled)"
                    value="25"
                    name="RadioBtn6"
                  />
                </RadioGroup>
              </div>
              {/* Link */}
              <div className="hcl-col-12 mt-5" id="link-section">
                <Link href="https://www.google.com" target="_blank">
                  Google
                </Link>
              </div>
              {/* Paragraphs */}
              <div className="hcl-col-12 mt-5" id="paragraph-section">
                <Paragraph>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which
                  don&lsquo;t look even slightly believable.
                </Paragraph>
              </div>
              {/* Breadcrumb */}
              <div className="hcl-col-12 mt-5" id="breadcrumb-section">
                <Breadcrumb
                  id="small-navigator"
                  className="custom-breadcrumb-top"
                  activeIndex={Math.floor(Math.random() * 3)}
                  onSelection={(item, idx, e) => console.log(item, idx, e)}
                >
                  <BreadcrumbItem className="custom-item" href="#">
                    Breadcrumb 1
                  </BreadcrumbItem>
                  <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
                  <BreadcrumbItem href="#tools">Breadcrumb 3</BreadcrumbItem>
                </Breadcrumb>
              </div>
              {/* Multi-tier Breadcrumb */}
              <div className="hcl-col-12 mt-5" id="breadcrumb-section">
                <Breadcrumb
                  id="small-navigator"
                  className="custom-breadcrumb-top"
                  activeIndex={Math.floor(Math.random() * 3)}
                  onSelection={(item, e) => console.log(item, e)}
                >
                  <BreadcrumbItem className="custom-item">
                    Breadcrumb 1
                  </BreadcrumbItem>
                  <BreadcrumbItem>Breadcrumb 2</BreadcrumbItem>
                  <BreadcrumbItem>Breadcrumb 3</BreadcrumbItem>
                  <BreadcrumbItem>Breadcrumb 4</BreadcrumbItem>
                  <BreadcrumbItem href="#asdf">Breadcrumb 5</BreadcrumbItem>
                  <BreadcrumbItem
                    onClick={e => {
                      console.log('sdfsdf', e);
                    }}
                  >
                    Breadcrumb 6
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
              {/* Spinner */}
              <div className="hcl-col-12 mt-5" id="spinner-section">
                <Spinner />
              </div>
              {/* Small Spinner */}
              <div className="hcl-col-12 mt-5">
                <Spinner small label="Loading..." />
              </div>
              {/* Toggle */}
              <div className="hcl-col-12 mt-5" id="toggle-section">
                <Toggle
                  id="simple-toggle"
                  className="ml-3"
                  onChange={(checked, e) => {
                    console.log('Toggled', checked, e);
                  }}
                />
                <Toggle
                  id="disabled-checked-toggle"
                  className="ml-3"
                  disabled
                  toggled
                />
                <Toggle
                  id="disabled-toggle"
                  className="ml-3"
                  disabled
                  labelOff="off"
                  labelOn="on"
                />
              </div>
              {/* Small Toggle */}
              <div className="hcl-col-12 mt-5">
                <Toggle
                  small
                  id="simple-small-toggle"
                  className="ml-3"
                  onChange={(checked, e) => {
                    console.log('Toggled', checked, e);
                  }}
                />
                <Toggle
                  small
                  id="disabled-checked-small-toggle"
                  className="ml-3"
                  disabled
                  toggled
                />
                <Toggle
                  small
                  id="disabled-small-toggle"
                  className="ml-3"
                  disabled
                  labelOff="off"
                  labelOn="on"
                />
              </div>
              {/* Notification */}
              <div className="hcl-col-12 mt-5" id="notification-section">
                <Notification
                  title="Notification title"
                  subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                  type="warning"
                  closable
                  visible={this.state.notification.visible}
                  onClose={this._hideNotification}
                />
                <br />
                <Button onClick={this._showNotification}>
                  Show Notification
                </Button>
              </div>
              {/* Overflow */}
              <div className="hcl-col-12 mt-5" id="overflow-menu-section">
                <h5>Overflow Menu</h5>
                <div className="hcl-font-center">
                  <Overflowmenu
                    listItems={overflowlist}
                    attachElementToBody
                    scrollListner
                    direction="bottom-left"
                    customTemplate={
                      <button className="hcl-btn hcl-ghost">ghost</button>
                    }
                    ellipsisType="vertical"
                    onClick={(item, index, e) => {
                      console.log('OVERFLOW SELECT');
                      console.log(item, index, e);
                    }}
                  />
                </div>
                <div className="hcl-font-center">
                  <Overflowmenu
                    listItems={overflowlist}
                    direction="top-right"
                    customTemplate={
                      <button className="hcl-btn hcl-ghost">ghost</button>
                    }
                    ellipsisType="vertical"
                    onClick={(item, index, e) => {
                      console.log('OVERFLOW SELECT');
                      console.log(item, index, e);
                    }}
                  />
                </div>
              </div>
              {/* List */}
              <div className="hcl-col-12 mt-5" id="list-section">
                {/* Ordered */}
                <Label>Ordered List</Label>
                <List
                  listItems={listItems}
                  type="lower-alpha"
                  onClick={() => {}}
                />
                <br />
                <br />
                {/* Unordered */}
                <Label>Unordered List</Label>
                <List listItems={listItems} onClick={() => {}} />
              </div>
              {/* Tag */}
              <div className="hcl-col-12 mt-5" id="toast-section">
                <Toast
                  type="success"
                  subtitle="Subtitle text goes here."
                  caption="Time stamp [00:00:00]"
                  closable
                  onClose={this.hideToast}
                  visible={this.state.toast.visible}
                />
                <Button title="Default" onClick={this.showToast}>
                  Show Toast Notification
                </Button>
              </div>
              <div className="hcl-col-12 mt-5" id="modal-section">
                <h5>Show modal layout :</h5>
                <Button
                  title="Default"
                  className="mr-2"
                  onClick={() => {
                    this.setState({ modal: 1 });
                  }}
                >
                  1
                </Button>
                <Button
                  title="Default"
                  className="mr-2"
                  onClick={() => {
                    this.setState({ modal: 2 });
                  }}
                >
                  2
                </Button>
                <Button
                  title="Default"
                  className="mr-2"
                  onClick={() => {
                    this.setState({ modal: 3 });
                  }}
                >
                  3
                </Button>
                <Button
                  title="Default"
                  className="mr-2"
                  onClick={() => {
                    this.setState({ modal: 4 });
                  }}
                >
                  4
                </Button>
                <Button
                  title="Default"
                  className="mr-2"
                  onClick={() => {
                    this.setState({ modal: 5 });
                  }}
                >
                  5
                </Button>
                <Button
                  title="Default"
                  className="mr-2"
                  onClick={() => {
                    this.setState({ modal: 6 });
                  }}
                >
                  6
                </Button>
                <Button
                  title="Default"
                  className="mr-2"
                  onClick={() => {
                    this.setState({ modal: 7 });
                  }}
                >
                  7
                </Button>

                {/* Danger type Modals */}
                {this.state.modal === 1 && (
                  <Modal
                    type="danger"
                    label="optional label"
                    keyboard
                    heading="Heading comes here."
                    onClose={this.onModalClose}
                    actions={this.modalActions1}
                  >
                    <Paragraph>
                      Danger Modal with save and close buttons
                    </Paragraph>
                  </Modal>
                )}
                {this.state.modal === 2 && (
                  <Modal
                    type="danger"
                    label="optional label"
                    heading="Heading comes here."
                    onClose={this.onModalClose}
                  >
                    <Paragraph> Danger Modal with no buttons</Paragraph>
                  </Modal>
                )}
                {this.state.modal === 3 && (
                  <Modal
                    type="danger"
                    heading="Heading comes here."
                    keyboard
                    onClose={this.onModalClose}
                    actions={this.modalActions3}
                  >
                    <Paragraph> Danger Modal with close button</Paragraph>
                  </Modal>
                )}
                {this.state.modal === 4 && (
                  <Modal type="danger" onClose={this.onModalClose}>
                    <Paragraph>
                      {' '}
                      Danger Modal with no footer and heading
                    </Paragraph>
                  </Modal>
                )}
                {/* Default type Modals */}
                {this.state.modal === 5 && (
                  <Modal
                    label="optional label"
                    heading="Heading comes here."
                    onClose={this.onModalClose}
                    actions={this.modalActions5}
                  >
                    <Paragraph> Modal with Delete (Danger) button</Paragraph>
                  </Modal>
                )}
                {this.state.modal === 6 && (
                  <Modal
                    label="optional label"
                    heading="Heading comes here."
                    onClose={this.onModalClose}
                  >
                    <Paragraph> Modal with no buttons</Paragraph>
                  </Modal>
                )}
                {this.state.modal === 7 && (
                  <Modal
                    heading="Heading comes here."
                    onClose={this.onModalClose}
                    actions={this.modalActions7}
                  >
                    <Paragraph>Modal with save button</Paragraph>
                  </Modal>
                )}
              </div>
              <div className="hcl-col-12 mt-5 colBorder p-5" id="tabs-section">
                {/* Tab Component */}
                <Tabs
                  activeIndex={0}
                  onChange={e => {
                    console.log(`Label => ${e.label} Index => ${e.tabIndex}`);
                  }}
                >
                  <Tab label="Tab List 1">
                    Content 1
                    <Accordion>
                      <AccordionItem
                        title="What is Lorem Ipsum ?"
                        expanded
                        onChange={event => {
                          console.log(
                            `Accordian toggled ${event.currentTarget}`
                          );
                        }}
                      >
                        <Paragraph>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry&apos;s standard dummy text ever since the
                          1500s, when an unknown printer took a galley of type
                          and scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </Paragraph>
                      </AccordionItem>
                      <AccordionItem
                        title="Why do we use it ?"
                        onChange={event => {
                          console.log(
                            `Accordian toggled ${event.currentTarget}`
                          );
                        }}
                      >
                        It is a long
                        <Paragraph>
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using &apos;Content here,
                          content here&apos;, making it look like readable
                          English. Many desktop publishing packages and web page
                          editors now use Lorem Ipsum as their default model
                          text, and a search for &apos;lorem ipsum&apos; will
                          uncover many web sites still in their infancy. Various
                          versions have evolved over the years, sometimes by
                          accident, sometimes on purpose (injected humour and
                          the like).
                        </Paragraph>{' '}
                        established fact that a reader will be
                      </AccordionItem>
                      <AccordionItem
                        title="Wher we can it ?"
                        onChange={event => {
                          console.log(
                            `Accordian toggled ${event.currentTarget}`
                          );
                        }}
                      >
                        There are ma
                        <Paragraph>
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or randomised words
                          which don&apos;t look even slightly believable. If you
                          are going to use a passage of Lorem Ipsum, you need to
                          be sure there isn&apos;t anything embarrassing hidden
                          in the middle of text. All the Lorem Ipsum generators
                          on the Internet tend to repeat predefined chunks as
                          necessary, making this the first true generator on the
                          Internet. It uses a dictionary of over 200 Latin
                          words, combined with a handful of model sentence
                          structures, to generate Lorem Ipsum which looks
                          reasonable. The generated Lorem Ipsum is therefore
                          always free from repetition, injected humour, or
                          non-characteristic words etc.
                        </Paragraph>
                        ny variations of passages of Lorem Ipsum
                      </AccordionItem>
                    </Accordion>
                  </Tab>
                  <Tab label="Tab List 2">
                    Content 2
                    <Accordion>
                      <AccordionItem
                        title="What is Lorem Ipsum ?"
                        expanded
                        onChange={event => {
                          console.log(
                            `Accordian toggled ${event.currentTarget}`
                          );
                        }}
                      >
                        <Paragraph>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry&apos;s standard dummy text ever since the
                          1500s, when an unknown printer took a galley of type
                          and scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </Paragraph>
                      </AccordionItem>
                      <AccordionItem
                        title="Why do we use it ?"
                        onChange={event => {
                          console.log(
                            `Accordian toggled ${event.currentTarget}`
                          );
                        }}
                      >
                        It is a long
                        <Paragraph>
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using &apos;Content here,
                          content here&apos;, making it look like readable
                          English. Many desktop publishing packages and web page
                          editors now use Lorem Ipsum as their default model
                          text, and a search for &apos;lorem ipsum&apos; will
                          uncover many web sites still in their infancy. Various
                          versions have evolved over the years, sometimes by
                          accident, sometimes on purpose (injected humour and
                          the like).
                        </Paragraph>{' '}
                        established fact that a reader will be
                      </AccordionItem>
                      <AccordionItem
                        title="Wher we can it ?"
                        onChange={event => {
                          console.log(
                            `Accordian toggled ${event.currentTarget}`
                          );
                        }}
                      >
                        There are ma
                        <Paragraph>
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or randomised words
                          which don&apos;t look even slightly believable. If you
                          are going to use a passage of Lorem Ipsum, you need to
                          be sure there isn&apos;t anything embarrassing hidden
                          in the middle of text. All the Lorem Ipsum generators
                          on the Internet tend to repeat predefined chunks as
                          necessary, making this the first true generator on the
                          Internet. It uses a dictionary of over 200 Latin
                          words, combined with a handful of model sentence
                          structures, to generate Lorem Ipsum which looks
                          reasonable. The generated Lorem Ipsum is therefore
                          always free from repetition, injected humour, or
                          non-characteristic words etc.
                        </Paragraph>
                        ny variations of passages of Lorem Ipsum
                      </AccordionItem>
                    </Accordion>
                  </Tab>
                  <Tab label="Tab List 3">Content 3</Tab>
                </Tabs>
              </div>
              <section
                className="hcl-col-12 mt-5 colBorder p-5"
                id="content-swi-section"
              >
                {/* Content Switcher Component */}
                <h5 className="p-2">Content Switcher - (default)</h5>
                <ContentSwitcher
                  activeIndex={contentSwitch.example1}
                  onChange={e => this.onSwitchChange(e, 'example1')}
                >
                  <Switch label="All" />
                  <Switch label="Cybernetics" />
                  <Switch label="Information &amp; Communication" />
                </ContentSwitcher>
                <section className="mt-1 p-2">
                  {contentSwitch.example1 === 0 && (
                    <div className="colBorder p-2">
                      <List
                        listItems={this.switchAll}
                        type="ol"
                        onClick={e => console.log(e)}
                      />
                    </div>
                  )}
                  {contentSwitch.example1 === 1 && (
                    <div className="colBorder p-2">
                      <List listItems={[this.switchAll[0]]} type="ol" />
                    </div>
                  )}
                  {contentSwitch.example1 === 2 && (
                    <div className="colBorder p-2">
                      <List listItems={[this.switchAll[1]]} type="ol" />
                    </div>
                  )}
                </section>
              </section>
              <section className="hcl-col-12 mt-5 colBorder p-5">
                <h5 className="p-2">Content Switcher - (disabled)</h5>
                <ContentSwitcher
                  activeIndex={contentSwitch.example2}
                  onChange={e => this.onSwitchChange(e, 'example2')}
                >
                  <Switch label="All" />
                  <Switch label="Cybernetics" isDisabled />
                  <Switch label="Information &amp; Communication" />
                </ContentSwitcher>
                <section className="mt-1 p-2">
                  {contentSwitch.example2 === 0 && (
                    <div className="colBorder p-2">
                      <List listItems={this.switchAll} type="ol" />
                    </div>
                  )}
                  {contentSwitch.example2 === 1 && (
                    <div className="colBorder p-2">
                      <List listItems={[this.switchAll[0]]} type="ol" />
                    </div>
                  )}
                  {contentSwitch.example2 === 2 && (
                    <div className="colBorder p-2">
                      <List listItems={[this.switchAll[1]]} type="ol" />
                    </div>
                  )}
                </section>
              </section>
              <section className="hcl-col-12 mt-5 colBorder p-5">
                <h5 className="p-2">Content Switcher - (with icons)</h5>
                <ContentSwitcher
                  activeIndex={contentSwitch.example3}
                  onChange={e => this.onSwitchChange(e, 'example3')}
                >
                  <Switch
                    label="All"
                    icon={<i className="p-hclsw p-hclsw-active" />}
                  />
                  <Switch
                    label="Cybernetics"
                    icon={<i className="p-hclsw p-hclsw-arrow-up" />}
                  />
                  <Switch
                    label="Information &amp; Communication"
                    icon={<i className="p-hclsw p-hclsw-checkbox" />}
                  />
                </ContentSwitcher>
                <section className="mt-1 p-2">
                  {contentSwitch.example3 === 0 && (
                    <div className="colBorder p-2">
                      <List listItems={this.switchAll} type="ol" />
                    </div>
                  )}
                  {contentSwitch.example3 === 1 && (
                    <div className="colBorder p-2">
                      <List listItems={[this.switchAll[0]]} type="ol" />
                    </div>
                  )}
                  {contentSwitch.example3 === 2 && (
                    <div className="colBorder p-2">
                      <List listItems={[this.switchAll[1]]} type="ol" />
                    </div>
                  )}
                </section>
              </section>
              <section className="hcl-col-12 mt-5 colBorder p-5">
                <h5 className="p-2">
                  Content Switcher - with icons (disabled)
                </h5>
                <ContentSwitcher
                  activeIndex={contentSwitch.example4}
                  onChange={e => this.onSwitchChange(e, 'example4')}
                >
                  <Switch
                    label="All"
                    icon={<i className="p-hclsw p-hclsw-active" />}
                    isDisabled
                  />
                  <Switch
                    label="Cybernetics"
                    icon={<i className="p-hclsw p-hclsw-arrow-up" />}
                    isDisabled
                  />
                  <Switch
                    label="Information &amp; Communication"
                    icon={<i className="p-hclsw p-hclsw-checkbox" />}
                    isDisabled
                  />
                </ContentSwitcher>
                <section className="mt-1 p-2">
                  {contentSwitch.example4 === 0 && (
                    <div className="colBorder p-2">
                      <List listItems={this.switchAll} type="ol" />
                    </div>
                  )}
                  {contentSwitch.example4 === 1 && (
                    <div className="colBorder p-2">
                      <List listItems={[this.switchAll[0]]} type="ol" />
                    </div>
                  )}
                  {contentSwitch.example4 === 2 && (
                    <div className="colBorder p-2">
                      <List listItems={[this.switchAll[1]]} type="ol" />
                    </div>
                  )}
                </section>
              </section>
              {/* Slider Component */}
              <div className="hcl-col-12 mt-5 mb-5" id="slider-section">
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={45}
                  title="Slider"
                  label="Basic Slider"
                  helperText="Optional Helper text goes here (max 1000 and min 0)"
                  onChange={value => {
                    console.log(value);
                  }}
                />
              </div>

              <div className="hcl-col-12 mt-5 mb-5" id="slider-section">
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={0.2}
                  hover
                  id="basic-slider"
                  title="Slider"
                  label="Basic Slider with tooltip on hover"
                  helperText="Optional Helper text goes here (max 1 and min 0)"
                  onChange={value => {
                    console.log(value);
                  }}
                />
              </div>
              {/* Search Component */}
              <section
                className="hcl-col-12 mt-5 colBorder p-5"
                id="search-section"
              >
                <h5 className="p-2">Normal Search</h5>
                <Search
                  defaultValue="search..."
                  onBlur={event => console.log(event)}
                />
              </section>

              <section className="hcl-col-12 mt-5 colBorder p-5">
                <h5 className="p-2">Header Search</h5>
                <Search type="clickable" />
              </section>

              <section className="hcl-col-12 mt-5 colBorder p-5">
                <h5 className="p-2">Small Search</h5>
                <Search defaultValue="small search..." size="small" />
              </section>

              <section className="hcl-col-12 mt-5 colBorder p-5">
                <h5 className="p-2">Small Header Search</h5>
                <Search size="small" type="clickable" />
              </section>

              <section
                className="hcl-col-12 mt-5 colBorder p-5"
                style={{ background: '#F5F7FB' }}
              >
                <h5 className="p-2">Normal Search (White background)</h5>
                <Search theme="white" />
              </section>

              <section
                className="hcl-col-12 mt-5 colBorder p-5"
                style={{ background: '#F5F7FB' }}
              >
                <h5 className="p-2">Header Search (White background)</h5>
                <Search type="clickable" theme="white" />
              </section>

              <section
                className="hcl-col-12 mt-5 colBorder p-5"
                style={{ background: '#F5F7FB' }}
              >
                <h5 className="p-2">Small Search (White background)</h5>
                <Search size="small" theme="white" />
              </section>

              <section
                className="hcl-col-12 mt-5 colBorder p-5"
                style={{ background: '#F5F7FB' }}
              >
                <h5 className="p-2">Small Header Search (White background)</h5>
                <Search size="small" type="clickable" theme="white" />
              </section>
              {/* File Uploader Component */}
              <div className="hcl-col-12 mt-5" id="file-uploader-section">
                <FileUploader
                  id="file_uploader"
                  label="Account photo"
                  description="only .jpg and .png files. 500kb max file size."
                  fileType=".jpg,.png"
                  className="hcl-secondary hcl-sml"
                  onChange={(FileList, e) => {
                    console.log('FileList:  ', FileList, 'event', e);
                  }}
                >
                  Add file
                </FileUploader>
              </div>
              {/* Dropdown Component */}
              <div className="hcl-row m-3 hcl-col-12">
                <div className="hcl-col-6">
                  <Dropdown
                    type="top"
                    items={this.items}
                    label="Top DropDown"
                    selectedItem="option-3"
                    onChange={selected => {
                      console.log('selected item', selected);
                    }}
                  />
                </div>
                <div className="hcl-col-6">
                  <Dropdown
                    type="bottom"
                    attachElementToBody
                    scrollListner
                    items={this.items}
                    label="Bottom DropDown"
                    onChange={selected => {
                      console.log('selected item', selected);
                    }}
                  />
                </div>
                <div className="hcl-col-6">
                  <Dropdown
                    dropdownType="multi"
                    type="bottom"
                    items={this.items}
                    selectedItem={this.itemList}
                    label="MultiSelect DropDown"
                    onChange={(item, selectedList) => {
                      console.log('changed item', item);
                      console.log('selected itemList', selectedList);
                    }}
                  />
                </div>
              </div>
              {/* Tile Component */}
              <section>
                <div className="hcl-col-12 mt-5 mb-5">
                  {/* default tile */}
                  <Tile>
                    <p>This is read only tile</p>
                  </Tile>
                </div>
                <div className="hcl-col-12 mt-5 mb-5">
                  {/* clickable tile */}
                  <Tile type="clickable" href="">
                    <p>This is clickable tile</p>
                  </Tile>
                </div>
                <div className="hcl-col-12 mt-5 mb-5">
                  {/* selectable tile */}
                  <Tile type="selectable">
                    <p>This is selectable tile</p>
                  </Tile>
                </div>
                <div className="hcl-col-12 mt-5 mb-5">
                  {/* expandable bottom right arrow tile */}
                  <Tile type="expandable" id="expandable-tile-1">
                    {/* container for default content */}
                    <div>
                      <p>Content shown prior expand </p>
                    </div>
                    {/* container for content which will be added once expanded */}
                    <div>
                      <p>Content shown after expand </p>
                    </div>
                  </Tile>
                  {/* expandable top left arrow tile */}
                  <Tile
                    type="expandable"
                    expandableType="top"
                    id="expandable-tile-2"
                  >
                    {/* container for default content */}
                    <div>
                      <p>Content shown prior expand </p>
                    </div>
                    {/* container for content which will be added once expanded */}
                    <div>
                      <p>Content shown after expand </p>
                    </div>
                  </Tile>
                </div>
              </section>
            </div>

            {/* Accordion Component */}
            <div className="hcl-col-12 mt-5 mb-5">
              <Accordion>
                <AccordionItem
                  title="What is Lorem Ipsum ?"
                  expanded
                  onChange={event => {
                    console.log(`Accordian toggled ${event.currentTarget}`);
                  }}
                >
                  <Paragraph>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with
                    desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                  </Paragraph>
                </AccordionItem>
                <AccordionItem
                  title="Why do we use it ?"
                  onChange={event => {
                    console.log(`Accordian toggled ${event.currentTarget}`);
                  }}
                >
                  It is a long
                  <Paragraph>
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using &apos;Content here, content here&apos;, making it look
                    like readable English. Many desktop publishing packages and
                    web page editors now use Lorem Ipsum as their default model
                    text, and a search for &apos;lorem ipsum&apos; will uncover
                    many web sites still in their infancy. Various versions have
                    evolved over the years, sometimes by accident, sometimes on
                    purpose (injected humour and the like).
                  </Paragraph>{' '}
                  established fact that a reader will be
                </AccordionItem>
                <AccordionItem
                  title="Wher we can it ?"
                  onChange={event => {
                    console.log(`Accordian toggled ${event.currentTarget}`);
                  }}
                >
                  There are ma
                  <Paragraph>
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which
                    don&apos;t look even slightly believable. If you are going
                    to use a passage of Lorem Ipsum, you need to be sure there
                    isn&apos;t anything embarrassing hidden in the middle of
                    text. All the Lorem Ipsum generators on the Internet tend to
                    repeat predefined chunks as necessary, making this the first
                    true generator on the Internet. It uses a dictionary of over
                    200 Latin words, combined with a handful of model sentence
                    structures, to generate Lorem Ipsum which looks reasonable.
                    The generated Lorem Ipsum is therefore always free from
                    repetition, injected humour, or non-characteristic words
                    etc.
                  </Paragraph>
                  ny variations of passages of Lorem Ipsum
                </AccordionItem>
              </Accordion>
              {/* DatePicker */}
              <div className="hcl-row m-3 hcl-col-12">
                <div className="hcl-col-6">
                  <DatePicker
                    weekDays={weekDays}
                    months={months}
                    attachElementToBody
                    scrollListner
                    format="mm/dd/yyyy"
                    defaultDate="12/30/1990"
                    onDateSelect={dateSelected => {
                      console.log('Selected Date', dateSelected);
                    }}
                  />
                </div>
                <div className="hcl-col-6">
                  <DatePicker
                    weekDays={weekDays}
                    months={months}
                    open="bottom"
                    format="dd/mm/yyyy"
                    onDateSelect={dateSelected => {
                      console.log('Selected Date', dateSelected);
                    }}
                  />
                </div>
              </div>

              {/* Number Input */}
              <div className="hcl-col-12 mt-5 mb-5">
                <NumberInput
                  defaultValue={0}
                  step={2}
                  id="numberInput2"
                  label="Number Input"
                  className="hcl-form-group"
                />
                <NumberInput
                  defaultValue={10}
                  onChange={value => {
                    console.log(value);
                  }}
                  required
                  max={100}
                  min={10}
                  id="numberInput1"
                  label="Number Input validation"
                  helperText="Optional Helper text goes here (max 100 and min 10)"
                  className="hcl-form-group"
                />
                <NumberInput
                  defaultValue={0}
                  id="numberInput3"
                  helperText="Optional Helper text goes here"
                  label="Number Input validation"
                  className="hcl-form-group"
                  disabled
                />
              </div>
              {/* Select */}
              <div className="hcl-col-12 mt-5 mb-5">
                <Select
                  label="Select Label"
                  onChange={selected => {
                    console.log('selected item', selected);
                  }}
                  id="hcl-select-id-1"
                >
                  <SelectItem
                    text="Choose an option"
                    value="placeholder-item"
                  />
                  <SelectItemGroup label="Category 1">
                    <SelectItem text="Option 1" value="option-1" />
                    <SelectItem text="Option 2" value="option-2" />
                  </SelectItemGroup>
                  <SelectItemGroup label="Category 2">
                    <SelectItem text="Option 3" value="option-3" />
                    <SelectItem text="Option 4" value="option-4" />
                  </SelectItemGroup>
                </Select>
              </div>

              <div className="hcl-col-12">
                <Paragraph className="p-2 m-1">
                  Pagination Example 1
                  <button
                    className="hcl-btn hcl-secondary"
                    onClick={() => {
                      let { totalItems } = this.state;
                      totalItems += 50;
                      this.setState({
                        ...this.state,
                        totalItems: totalItems
                      });
                    }}
                  >
                    Total Items
                  </button>
                  <button
                    className="ml-2 hcl-btn hcl-secondary"
                    onClick={() => {
                      let { stepper } = this.state;
                      stepper += 5;
                      this.setState({ ...this.state, stepper: stepper });
                    }}
                  >
                    Change Stepper
                  </button>
                  <button
                    className="ml-2 hcl-btn hcl-secondary"
                    onClick={() => {
                      let { stepperLimit } = this.state;
                      stepperLimit += 50;
                      this.setState({
                        ...this.state,
                        stepperLimit: stepperLimit
                      });
                    }}
                  >
                    Stepper Limit
                  </button>
                </Paragraph>
                <Button
                  onClick={() => {
                    console.log('Button Clicked');
                    this.setState({
                      currentPage: 10
                    });
                  }}
                >
                  Hello
                </Button>
                <Pagination
                  totalItems={this.state.totalItems}
                  itemsPerPageStepper={this.state.stepper}
                  itemsStepperLimit={this.state.stepperLimit}
                  currentPage={this.state.currentPage}
                  itemsPerPageText={'No. of Rows:'}
                  onPageChange={e => {
                    console.log(e);
                  }}
                  onItemsPerPageChange={e => {
                    console.log(e);
                  }}
                />
                <Paragraph className="p-2 m-1">Pagination Example 2</Paragraph>
                <Pagination
                  totalItems={61302}
                  itemsPerPageStepper={25}
                  itemsStepperLimit={500}
                  itemsPerPageText={'Items per page:'}
                  currentPage={this.state.currentPage}
                  onPageChange={e => {
                    console.log(e);
                  }}
                  onItemsPerPageChange={e => {
                    console.log(e);
                  }}
                />
              </div>
              <div className="hcl-col-12">
                <div className="hcl-row mb-5">
                  <div className="hcl-col-3 mt-5 mb-5">
                    <Tooltip content="Filter" direction="right" type="icon">
                      {tooltipIcon}
                    </Tooltip>
                  </div>
                  <div className="hcl-col-3 mt-5 mb-5">
                    <Tooltip content="Filter" direction="top" type="icon">
                      {tooltipIcon}
                    </Tooltip>
                  </div>
                  <div className="hcl-col-3 mt-5 mb-5">
                    <Tooltip content="Filter" direction="bottom" type="icon">
                      {tooltipIcon}
                    </Tooltip>
                  </div>
                  <div className="hcl-col-3 mt-5 mb-5">
                    <Tooltip content="Filter" direction="left" type="icon">
                      {tooltipIcon}
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className="hcl-col-12">
                <div className="hcl-row mb-5">
                  <div className="hcl-col-3 mt-5 mb-5">
                    <Tooltip
                      content="Breif Definition of the dotted underlined word."
                      direction="right"
                      type="definition"
                    >
                      Definition Tooltip on Right
                    </Tooltip>
                  </div>
                  <div className="hcl-col-3 mt-5 mb-5">
                    <Tooltip
                      content="Breif Definition of the dotted underlined word."
                      direction="top"
                      type="definition"
                    >
                      Definition Tooltip on Top
                    </Tooltip>
                  </div>
                  <div className="hcl-col-3 mt-5 mb-5">
                    <Tooltip
                      content="Breif Definition of the dotted underlined word."
                      direction="bottom"
                      type="definition"
                    >
                      Definition Tooltip on Bottom
                    </Tooltip>
                  </div>
                  <div className="hcl-col-3 mt-5 mb-5">
                    <Tooltip
                      content="Breif Definition of the dotted underlined word."
                      direction="left"
                      type="definition"
                    >
                      <p>Definition Tooltip on Left</p>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className="hcl-col-12">
                <div className="hcl-row mb-5">
                  <div className="hcl-col-3 mt-5 mb-5">
                    Interactive Tooltip
                    <Tooltip
                      content={tooltipContent}
                      direction="top"
                      type="interactive"
                    >
                      {interactiveTooltipIcon}
                    </Tooltip>
                  </div>

                  <div className="hcl-col-3 mt-5 mb-5">
                    Interactive Tooltip
                    <Tooltip
                      content={tooltipContent}
                      direction="right"
                      type="interactive"
                    >
                      {interactiveTooltipIcon}
                    </Tooltip>
                  </div>

                  <div className="hcl-col-3 mt-5 mb-5">
                    Interactive Tooltip
                    <Tooltip
                      content={tooltipContent}
                      direction="left"
                      type="interactive"
                    >
                      {interactiveTooltipIcon}
                    </Tooltip>
                  </div>

                  <ActionBar>
                    <ActionList>
                      <Button
                        type="ghost"
                        small
                        onClick={() => {
                          console.log('Button Clicked');
                        }}
                      >
                        <span>Button</span>
                        <svg
                          className="hcl-btn-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                            fillRule="evenodd"
                          />
                        </svg>
                      </Button>
                      <Button
                        type="ghost"
                        small
                        onClick={() => {
                          console.log('Button Clicked');
                        }}
                      >
                        <span>Button</span>
                        <svg
                          className="hcl-btn-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                            fillRule="evenodd"
                          />
                        </svg>
                      </Button>
                      <Button
                        type="ghost"
                        small
                        onClick={() => {
                          console.log('Button Clicked');
                        }}
                      >
                        <span>Button</span>
                        <svg
                          className="hcl-btn-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                            fillRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </ActionList>
                    <ActionSummary>
                      <span className={`mr-2 hcl-type-zeta`}>
                        {this.state.totalItems}
                      </span>
                      <span className={`hcl-actionbar-text hcl-type-zeta`}>
                        items selected
                      </span>
                      <Button
                        type="ghost"
                        small
                        onClick={() => {
                          console.log('Button Clicked');
                        }}
                      >
                        Cancel
                      </Button>
                    </ActionSummary>
                  </ActionBar>

                  <ToolBar>
                    <Search
                      aria-label="Search"
                      className=""
                      defaultValue=""
                      disabled={false}
                      iconTheme="default"
                      onBlur={function noRefCheck() {}}
                      onChange={function noRefCheck() {}}
                      placeholder="Search..."
                      size="small"
                      theme="white"
                      type="default"
                    />

                    <ToolBarActions>
                      <Button
                        type="ghost"
                        small
                        onClick={() => {
                          console.log('Button Clicked');
                        }}
                        title="download"
                        aria-label="Download"
                        alt="Download"
                      >
                        <svg
                          fillRule="evenodd"
                          height="16"
                          name="download"
                          role="img"
                          viewBox="0 0 14 16"
                          width="14"
                        >
                          <path d="M7.506 11.03l4.137-4.376.727.687-5.363 5.672-5.367-5.67.726-.687 4.14 4.374V0h1v11.03z" />

                          <path d="M13 15v-2h1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2h1v2h12z" />
                        </svg>
                      </Button>
                      <Button
                        type="ghost"
                        small
                        onClick={() => {
                          console.log('Button Clicked');
                        }}
                        title="edit"
                        aria-label="Edit"
                        alt="Edit"
                      >
                        <svg
                          fillRule="evenodd"
                          height="16"
                          name="edit"
                          role="img"
                          viewBox="0 0 16 16"
                          width="16"
                        >
                          <path d="M7.926 3.38L1.002 9.72V12h2.304l6.926-6.316L7.926 3.38zm.738-.675l2.308 2.304 1.451-1.324-2.308-2.309-1.451 1.329zM.002 9.28L9.439.639a1 1 0 0 1 1.383.03l2.309 2.309a1 1 0 0 1-.034 1.446L3.694 13H.002V9.28zM0 16.013v-1h16v1z" />
                        </svg>
                      </Button>
                      <Button
                        type="ghost"
                        small
                        onClick={() => {
                          console.log('Button Clicked');
                        }}
                        title="settings"
                        aria-label="Settings"
                        alt="Settings"
                      >
                        <svg
                          fillRule="evenodd"
                          height="16"
                          name="settings"
                          role="img"
                          viewBox="0 0 15 16"
                          width="15"
                        >
                          <path d="M7.53 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
                          <path d="M6.268 2.636l-.313.093c-.662.198-1.28.52-1.822.946l-.255.2-1.427-.754-1.214 1.735 1.186 1.073-.104.31a5.493 5.493 0 0 0-.198 2.759l.05.274L1 10.33l1.214 1.734 1.06-.56.262.275a5.5 5.5 0 0 0 2.42 1.491l.312.093L6.472 15H8.59l.204-1.636.313-.093a5.494 5.494 0 0 0 2.21-1.28l.26-.248 1.09.576 1.214-1.734-1.08-.977.071-.29a5.514 5.514 0 0 0-.073-2.905l-.091-.302 1.15-1.041-1.214-1.734-1.3.687-.257-.22a5.487 5.487 0 0 0-1.98-1.074l-.313-.093L8.59 1H6.472l-.204 1.636zM5.48.876A1 1 0 0 1 6.472 0H8.59a1 1 0 0 1 .992.876l.124.997a6.486 6.486 0 0 1 1.761.954l.71-.375a1 1 0 0 1 1.286.31l1.215 1.734a1 1 0 0 1-.149 1.316l-.688.622a6.514 6.514 0 0 1 .067 2.828l.644.581a1 1 0 0 1 .148 1.316l-1.214 1.734a1 1 0 0 1-1.287.31l-.464-.245c-.6.508-1.286.905-2.029 1.169l-.124.997A1 1 0 0 1 8.59 16H6.472a1 1 0 0 1-.992-.876l-.125-.997a6.499 6.499 0 0 1-2.274-1.389l-.399.211a1 1 0 0 1-1.287-.31L.181 10.904A1 1 0 0 1 .329 9.59l.764-.69a6.553 6.553 0 0 1 .18-2.662l-.707-.64a1 1 0 0 1-.148-1.315l1.214-1.734a1 1 0 0 1 1.287-.31l.86.454a6.482 6.482 0 0 1 1.576-.819L5.48.876z" />
                        </svg>
                      </Button>
                      <Button
                        type="primary"
                        small
                        onClick={() => {
                          console.log('Button Clicked');
                        }}
                      >
                        <span> Add new</span>
                      </Button>
                    </ToolBarActions>
                  </ToolBar>
                </div>
              </div>

              {/* MenuList */}
              <div className="hcl-col-12 mt-5" id="overflow-menu-section">
                <h5>Menu List</h5>
                  <MenuList display="true">
                    <Item className="custom-item">
                      <button className="hcl-btn hcl-ghost">ghost</button>
                    </Item>
                    <Item>
                      <button className="hcl-btn hcl-ghost">ghost</button>
                    </Item>
                    <Item>
                    <button className="hcl-btn hcl-ghost">ghost</button>
                    </Item>
                  </MenuList>
                  <MenuList display="true">
                    <Item className="custom-item" >
                    <button className="hcl-btn hcl-ghost">ghost</button>

                    </Item>
                    <Item>
                    <button className="hcl-btn hcl-ghost">ghost</button>

                    </Item>
                    <Item disabled={true}>
                    <button className="hcl-btn hcl-ghost">ghost</button>

                    </Item>
                  </MenuList>
              </div>

              <div className="hcl-row">
                <div className="hcl-col-6 mb-2">
                  <LoadingState width="100%" height="40px" />
                </div>
                <div className="hcl-col-6 mb-2">
                  <LoadingState height="1rem" />
                </div>
                <div className="hcl-col-6 mb-2">
                  <LoadingState type="breadcrumb" />
                </div>
                <div className="hcl-col-6 mb-2">
                  <LoadingState type="tab" />
                </div>
                <div className="hcl-col-6 mb-2">
                  <LoadingState type="accordion" />
                </div>
                <div className="hcl-col-6 mb-2">
                  <LoadingState
                    type="datatable"
                    tableConfig={[
                      {
                        label: 'ID'
                      },
                      {
                        label: 'Name'
                      },
                      {
                        label: 'Description'
                      }
                    ]}
                  />
                </div>
                <div className="hcl-col-6 mb-2">
                  <LoadingState type="slider" />
                </div>
                <div className="hcl-col-6 mb-2">
                  <LoadingState />
                </div>

                {/* <Button onClick={this.showoverlay}>Open Notification 2</Button>
                <Overlay ref="child" scrollListner direction="top-left">
                  <Notification
                    title="Notification title"
                    subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    type="warning"
                    visible
                  />
                </Overlay> */}
              </div>
            </div>
          </section>

          <Footer
            caption="Copyright © HCL Software. All rights reserved"
            links={[
              {
                label: 'Legal'
              },
              {
                label: 'Disclaimer'
              },
              {
                label: 'Privacy'
              },
              {
                label: 'Terms of use'
              },
              {
                label: 'Contact Us'
              }
            ]}
            onClick={event =>
              console.log(`Go to ${event.currentTarget.dataset.label}`)
            }
          />
        </main>
      </>
    );
  }
}

export default App;
