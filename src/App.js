/* eslint-disable no-console */
import React, { Component } from 'react';
import Label from './atoms/Label';
import TextInput from './atoms/TextInput';
import FormHelperText from './atoms/FormHelperText';
import Button from './atoms/Button';
import Heading from './atoms/Heading';
import Checkbox from './atoms/Checkbox';
import Radio from './atoms/Radio';
import TextArea from './atoms/TextArea';
import Link from './atoms/Link';
import Paragraph from './atoms/Paragraph';
import Breadcrumb from './atoms/Breadcrumb';
import Spinner from './atoms/Spinner';
import Toggle from './atoms/Toggle';
import Notification from './atoms/Notification';
import Tag from './atoms/Tag';
import List from './atoms/List';
import listItems from './atoms/List/sample-list-data.json';
import Toast from './atoms/Toast';
import Modal from './molecules/Modal';
import { Tabs, Tab } from './molecules/Tab';
import Slider from './atoms/Slider';
import Overflowmenu from './molecules/Overflowmenu';
import overflowlist from './molecules/Overflowmenu/sample-overflow-list.json';
import { ContentSwitcher, Switch } from './molecules/ContentSwitcher';
import DataTable from './atoms/DataTable';
import tableData from './atoms/DataTable/sample-table-data.json';
import Search from './atoms/Search';
import FileUploader from './molecules/FileUploader';
import { Accordion, AccordionItem } from './molecules/Accordion';
import Dropdown from './atoms/Dropdown';
import Tile from './atoms/Tile';
import DatePicker from './molecules/DatePicker';
import { weekDays, months } from './content';
import Pagination from './atoms/Pagination';
import NumberInput from './molecules/NumberInput';
import Select from './atoms/Select/Select';
import TimePicker from './molecules/TimePicker/TimePicker';
import Tooltip from './atoms/Tooltip/Tooltip';
import Sidebar from './molecules/Sidebar';
import navigationData from './molecules/Sidebar/sidebar-navigation-data.json';
import Header from './molecules/Header';
import LoadingState from './atoms/LoadingState/LoadingState';

class App extends Component {
  state = {
    radio: {
      temperature: 45,
      city: 'Chennai'
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
    sidebarExpanded: false
  };

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

  render() {
    const { contentSwitch = {} } = this.state;

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
        <Header
          logo={<img src={require('./assets/images/logo.png')} alt="Logo" />}
          searchComponent={
            <Search type="clickable" onChange={event => console.log(event)} />
          }
          icons={[
            {
              onClick: event => console.log(event.currentTarget),
              icon: <span className={`hcl-icon-1 bg-white`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <span className={`hcl-icon-1 bg-white`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <span className={`hcl-icon-1 bg-white`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <span className={`hcl-icon-1 bg-white`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <span className={`hcl-icon-1 bg-white`} />
            }
          ]}
        />
        <Sidebar
            title="Components"
            items={navigationData}
            onClick={event => {
                const { type, expanded, title } = event.currentTarget.dataset;
                console.log(type, expanded, title);
                const container = document.querySelector('[data-withsidenav]');
                if (container && type === 'toggle_sidebar') {
                    this.setState({ sidebarExpanded: expanded === 'true' });
                }
            }}
        />
        <div
            className={`hcl-content${this.state.sidebarExpanded ? ' sidebar-expanded' : ''}`}
            style={{ marginTop: '4rem' }}
            data-withsidenav
        >
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
                    className="mr-2 hcl-primary"
                    onClick={() => {
                      console.log('Button Clicked');
                    }}
                  >
                    Primary
                  </Button>
                  <Button
                    className="mr-2 hcl-secondary"
                    onClick={() => {
                      console.log('Button Clicked');
                    }}
                  >
                    Secondary
                  </Button>
                  <Button
                    className="mr-2 hcl-primary hcl-ghost"
                    onClick={() => {
                      console.log('Button Clicked');
                    }}
                  >
                    Primary ghost
                  </Button>

                  <Button
                    className="mr-2 hcl-primary hcl-sm"
                    onClick={() => {
                      console.log('Button Clicked');
                    }}
                  >
                    Primary small
                  </Button>
                  <Button
                    className="mr-2 hcl-primary hcl-danger"
                    onClick={() => {
                      console.log('Button Clicked');
                    }}
                  >
                    Danger outline
                  </Button>
                  <Button
                    className="mr-2 hcl-primary hcl-danger hcl-secondary"
                    onClick={() => {
                      console.log('Button Clicked');
                    }}
                  >
                    Danger outline
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
                      labelText="1 (default)"
                      onChange={() => {
                        console.log('Default Checkbox.');
                      }}
                    />
                    <Checkbox
                      id="checkbox2"
                      labelText="2"
                      checked
                      onChange={() => {
                        console.log('Checked state is changed.');
                      }}
                    />
                    <Checkbox
                      id="checkbox3"
                      labelText="3 (disabled)"
                      disabled
                    />
                  </div>
                </div>
                <div className="hcl-col-12 mt-5">
                  <legend className="hcl-legend">
                    Checkbox - Vertically arranged
                  </legend>
                  <div className="hcl-checkbox-group hcl-stack-vertical">
                    <Checkbox
                      id="checkbox4"
                      labelText="4 (default)"
                      onChange={() => {
                        console.log('Default Checkbox.');
                      }}
                    />
                    <Checkbox
                      id="checkbox5"
                      labelText="5"
                      checked
                      onChange={() => {
                        console.log('Checked state is changed.');
                      }}
                    />
                    <Checkbox
                      id="checkbox6"
                      labelText="6 (disabled)"
                      disabled
                    />
                  </div>
                </div>
                {/* Radio */}
                <div className="hcl-col-12 mt-5" id="radio-section">
                  <legend className="hcl-legend">
                    Radio - Horizontally arranged (default)
                  </legend>
                  <div className="hcl-radio-group">
                    <Radio
                      id="Radio1"
                      labelText="1 (default)"
                      value="37"
                      name="temperature"
                      onChange={this._onTemperatureRadioChange}
                      checked={this.state.radio.temperature === 37}
                    />
                    <Radio
                      id="Radio2"
                      labelText="2"
                      name="temperature"
                      value="45"
                      onChange={this._onTemperatureRadioChange}
                      checked={this.state.radio.temperature === 45}
                    />
                    <Radio
                      id="Radio3"
                      labelText="3 (disabled)"
                      value="30"
                      name="temperature"
                      disabled
                      onChange={this._onTemperatureRadioChange}
                      checked={this.state.radio.temperature === 30}
                    />
                  </div>
                </div>
                <div className="hcl-col-12 mt-5">
                  <legend className="hcl-legend">
                    Radio - Vertically arranged
                  </legend>
                  <div className="hcl-radio-group hcl-stack-vertical">
                    <Radio
                      id="Radio4"
                      labelText="4 (default)"
                      value="Bangalore"
                      name="city"
                      onChange={this._onCityRadioChange}
                      checked={this.state.radio.city === 'Bangalore'}
                    />
                    <Radio
                      id="Radio5"
                      labelText="5"
                      value="Chennai"
                      name="city"
                      onChange={this._onCityRadioChange}
                      checked={this.state.radio.city === 'Chennai'}
                    />
                    <Radio
                      id="Radio6"
                      labelText="6 (disabled)"
                      value="Mumbai"
                      name="city"
                      disabled
                      onChange={this._onCityRadioChange}
                      checked={this.state.radio.city === 'Mumbai'}
                    />
                  </div>
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
                    id="breadcrumb"
                    className="custom-breadcrumb"
                    model={[
                      { label: 'Breadcrumb 1', url: '' },
                      {
                        label: 'Breadcrumb 2',
                        url: 'https://google.co.in'
                      },
                      { label: 'Breadcrumb 3' }
                    ]}
                  />
                </div>
                {/* Spinner */}
                <div className="hcl-col-12 mt-5" id="spinner-section">
                  <Spinner />
                </div>
                {/* Small Spinner */}
                <div className="hcl-col-12 mt-5">
                  <Spinner small />
                </div>
                {/* Toggle */}
                <div className="hcl-col-12 mt-5" id="toggle-section">
                  <Toggle
                    id="simple-toggle"
                    className="ml-3"
                    onChange={() => {
                      console.log('Toggled');
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
                    onChange={() => {
                      console.log('Toggled');
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
                    className="hcl-info"
                    closable
                    onClose={() => {
                      console.log('Notification Closed');
                    }}
                  />
                </div>
                {/* Overflow */}
                <div className="hcl-col-12 mt-5" id="overflow-menu-section">
                  <h5>Overflow Menu</h5>
                  <div className="hcl-font-center">
                    <Overflowmenu listItems={overflowlist} />
                  </div>
                  <div className="hcl-font-center">
                    <Overflowmenu listItems={overflowlist} direction="right" />
                  </div>
                </div>
                {/* Tag */}
                <div className="hcl-col-12 mt-5" id="tags-section">
                  <Tag className="ml-3" title="Primary Tag">
                    Primary Tag
                  </Tag>
                  <Tag className="ml-3" title="Primary Disabled" disabled>
                    Primary Disabled
                  </Tag>
                  <Tag
                    className="ml-3"
                    title="Primary Closable"
                    closable
                    onClose={() => {
                      alert('Closing Tag');
                    }}
                  >
                    Primary Closable
                  </Tag>
                  <Tag
                    className="ml-3"
                    title="Primary Tag With Thumbnail"
                    thumbnailSrc="https://image.flaticon.com/icons/png/512/862/862358.png"
                  >
                    Primary Tag With Thumbnail
                  </Tag>
                  <Tag className="ml-3" title="Secondary Tag" type="secondary">
                    Secondary Tag
                  </Tag>
                  <Tag
                    className="ml-3"
                    title="Secondary Disabled Tag"
                    disabled
                    type="secondary"
                  >
                    Secondary Disabled Tag
                  </Tag>
                  <Tag
                    className="ml-3"
                    title="Secondary Closable"
                    type="secondary"
                    closable
                    onClose={() => {
                      alert('Closing Tag');
                    }}
                  >
                    Secondary Closable
                  </Tag>
                  <Tag
                    className="ml-3"
                    title="Secondary Tag With Thumbnail"
                    type="secondary"
                    thumbnailSrc="https://image.flaticon.com/icons/png/512/862/862358.png"
                  >
                    Secondary Tag With Thumbnail
                  </Tag>
                </div>
                {/* List */}
                <div className="hcl-col-12 mt-5" id="list-section">
                  {/* Ordered */}
                  <Label>Ordered List</Label>
                  <List listItems={listItems} type="ol" onClick={() => {}} />
                  <br />
                  <br />
                  {/* Unordered */}
                  <Label>Unordered List</Label>
                  <List listItems={listItems} type="ul" onClick={() => {}} />
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
                <div
                  className="hcl-col-12 mt-5 colBorder p-5"
                  id="tabs-section"
                >
                  {/* Tab Component */}
                  <Tabs
                    activeIndex={0}
                    onChange={e => {
                      console.log(`Label => ${e.label} Index => ${e.tabIndex}`);
                    }}
                  >
                    <Tab label="Tab List 1">Content 1</Tab>
                    <Tab label="Tab List 2" isDisabled>
                      Content 2
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
                    <Switch label="All" iconClass="fa fa-center" />
                    <Switch label="Cybernetics" iconClass="fa fa-center" />
                    <Switch
                      label="Information &amp; Communication"
                      iconClass="fa fa-right"
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
                    <Switch label="All" iconClass="fa fa-left" isDisabled />
                    <Switch
                      label="Cybernetics"
                      iconClass="fa fa-center"
                      isDisabled
                    />
                    <Switch
                      label="Information &amp; Communication"
                      iconClass="fa fa-right"
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
                    step={2}
                    value={44}
                    title="Slider"
                    onChange={event => {
                      console.log(event.currentTarget.value);
                    }}
                  />
                </div>
                {/* Table Component */}
                <div className="hcl-col-12 mt-5 mb-5">
                  <DataTable
                    id="sample_table_1"
                    tableData={tableData}
                    selectable
                    onSort={event => {
                      console.log(event.currentTarget);
                    }}
                    overflowMenu
                    overflowMenuItems={overflowlist}
                    overflowMenuOnClick={event => console.log(event.currentTarget)}
                  />
                </div>
                {/* Search Component */}
                <section
                  className="hcl-col-12 mt-5 colBorder p-5"
                  id="search-section"
                >
                  <h5 className="p-2">Normal Search</h5>
                  <Search />
                </section>

                <section className="hcl-col-12 mt-5 colBorder p-5">
                  <h5 className="p-2">Header Search</h5>
                  <Search type="clickable" />
                </section>

                <section className="hcl-col-12 mt-5 colBorder p-5">
                  <h5 className="p-2">Small Search</h5>
                  <Search size="small" />
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
                  <h5 className="p-2">
                    Small Header Search (White background)
                  </h5>
                  <Search size="small" type="clickable" theme="white" />
                </section>
                {/* File Uploader Component */}
                <div className="hcl-col-12 mt-5" id="file-uploader-section">
                  <FileUploader
                    id="file_uploader"
                    label="Account photo"
                    description="only .jpg and .png files. 500kb max file size."
                    fileType=".jpg"
                    className="hcl-secondary hcl-sml"
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
                      selectedIndex={1}
                      onChange={selected => {
                        console.log('selected item', selected);
                      }}
                    />
                  </div>
                  <div className="hcl-col-6">
                    <Dropdown
                      type="bottom"
                      items={this.items}
                      label="Bottom DropDown"
                      onChange={selected => {
                        console.log('selected item', selected);
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
                    {/* expandable tile */}
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
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book. It has survived
                      not only five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum.
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
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using &apos;Content here, content here&apos;,
                      making it look like readable English. Many desktop
                      publishing packages and web page editors now use Lorem
                      Ipsum as their default model text, and a search for
                      &apos;lorem ipsum&apos; will uncover many web sites still
                      in their infancy. Various versions have evolved over the
                      years, sometimes by accident, sometimes on purpose
                      (injected humour and the like).
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
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don&apos;t look even slightly believable. If you are going
                      to use a passage of Lorem Ipsum, you need to be sure there
                      isn&apos;t anything embarrassing hidden in the middle of
                      text. All the Lorem Ipsum generators on the Internet tend
                      to repeat predefined chunks as necessary, making this the
                      first true generator on the Internet. It uses a dictionary
                      of over 200 Latin words, combined with a handful of model
                      sentence structures, to generate Lorem Ipsum which looks
                      reasonable. The generated Lorem Ipsum is therefore always
                      free from repetition, injected humour, or
                      non-characteristic words etc.
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
                      open="top"
                      format="mm/dd/yyyy"
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
                  />
                  <NumberInput
                    defaultValue={0}
                    id="numberInput3"
                    helperText="Optional Helper text goes here"
                    label="Number Input validation"
                    disabled
                  />
                </div>
                {/* Select */}
                <div className="hcl-col-12 mt-5 mb-5">
                  <Select
                    items={this.items}
                    label="Select Label"
                    onChange={selected => {
                      console.log('selected item', selected);
                    }}
                    id="hcl-select-id-1"
                  />
                </div>
                {/* TimePicker */}
                <div className="hcl-col-12 mt-5 mb-5">
                  <TimePicker
                    timeZones={['Time zone 1', 'Time zone 2', 'Time zone 3']}
                    label="Select a time"
                    onChange={selected => {
                      console.log('selected item', selected);
                    }}
                  />
                </div>
                <div className="hcl-col-12">
                  <Paragraph className="p-2 m-1">
                    Pagination Example 1
                  </Paragraph>
                  <Pagination
                    totalItems={8}
                    pageSizes={[10, 20, 30, 40, 50]}
                    itemsPerPageText={'No. of Rows:'}
                    onChange={e => {
                      console.log(e);
                    }}
                  />
                  <Paragraph className="p-2 m-1">
                    Pagination Example 2
                  </Paragraph>
                  <Pagination
                    totalItems={110}
                    pageSizes={[30, 40, 50]}
                    itemsPerPageText={'Items per page:'}
                    onChange={e => {
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
                  </div>
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
                    <LoadingState type="datatable" tableData={tableData} />
                  </div>
                  <div className="hcl-col-6 mb-2">
                    <LoadingState type="slider" />
                  </div>
                  <div className="hcl-col-6 mb-2">
                    <LoadingState />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </>
    );
  }
}

export default App;
