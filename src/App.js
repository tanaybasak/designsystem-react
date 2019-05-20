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
import Slider from './atoms/Slider';
import Overflowmenu from './molecules/Overflowmenu';
import overflowlist from './molecules/Overflowmenu/sample-overflow-list.json';
import { ContentSwitcher, Switch } from './molecules/ContentSwitcher';
class App extends Component {
  state = {
    radio: {
      temperature: 45,
      city: "Chennai"
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
    }
  };

  switchAll = [{
    "name": "Cybernetics",
    "value": "ll-1",
    "child": [
        {
            "name": "Artifical Intelligence",
            "value": "ll-1-1"
        },
        {
            "name": "Bionics",
            "value": "ll-1-2"
        }
    ]
},{
    "name": "Information & Communication technology",
    "value": "ll-1",
    "child": [
        {
            "name": "Cyber Infrastructure",
            "value": "ll-1-1"
        },
        {
            "name": "Digital Technology",
            "value": "ll-1-2"
        }
    ]
}];

  modalActions1 = [
    { label: "Save" },
    {
      label: "Close",
      handler: () => {
        this.onModalClose();
      },
      danger: true
    }
  ];

  modalActions3 = [
    {
      label: "Close",
      danger: true,
      handler: () => {
        this.onModalClose();
      }
    }
  ];

  modalActions4 = [
    {
      label: "Save",
      primary: true,
      handler: () => {
        this.onModalClose();
      }
    }
  ];

  modalActions5 = [{ label: "Delete", danger: true }];

  modalActions7 = [{ label: "Save", primary: true }];

  onTemperatureRadioChange = e => {
    this.setState({
      radio: {
        ...this.state.radio,
        temperature: e.currentTarget.value
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
    const states = Object.assign({}, { 
        contentSwitch: {
            ...this.state.contentSwitch,
            [example] : e.switchIndex
        }
    });
    this.setState({
        ...states
    })
}

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
    
    return (
      <main className='hcl-container'>
        <div className='hcl-row m-0'>
          {/* Input Field */}
          <div className='hcl-form-group hcl-col-12'>
            <Label htmlFor='firstname'>First Name </Label>
            <FormHelperText className='helper-text'>
              Enter first name
            </FormHelperText>
            <TextInput
              type='text'
              placeholder='name'
              id='firstname'
              data-invalid='true'
              onChange={event => {
                console.log(event.currentTarget.value);
              }}
            />
            <FormHelperText className='error-msg'>
              Enter first name
            </FormHelperText>
          </div>
          <div className='hcl-form-group hcl-col-12'>
            <Label htmlFor='feedback'>Feedback </Label>
            <FormHelperText className='helper-text'>
              Feedback helper
            </FormHelperText>
            <TextArea
              aria-disabled='false'
              id='feedback'
              data-invalid='true'
              onChange={event => {
                console.log(event.currentTarget.value);
              }}
            />
            <FormHelperText className='error-msg'>
              Validation message
            </FormHelperText>
          </div>

          <hr />
          {/* Button */}
          <div className='hcl-form-group hcl-col-12'>
            <Button
              title='Default'
              onClick={() => {
                console.log("Button Clicked");
              }}
            >
              Default
            </Button>
            <Button
              className='hcl-btn-primary'
              onClick={() => {
                console.log("Button Clicked");
              }}
            >
              Primary
            </Button>
            <Button
              className='hcl-btn-secondary'
              onClick={() => {
                console.log("Button Clicked");
              }}
            >
              Secondary
            </Button>
            <Button
              className='hcl-btn-primary ghost'
              onClick={() => {
                console.log("Button Clicked");
              }}
            >
              Primary ghost
            </Button>
            <Button
              className='hcl-btn-primary outline'
              onClick={() => {
                console.log("Button Clicked");
              }}
            >
              Primary outline
            </Button>
            <Button
              className='hcl-btn-primary sm'
              onClick={() => {
                console.log("Button Clicked");
              }}
            >
              Primary small
            </Button>
          </div>
          {/* Heading */}
          <div className='hcl-form-group hcl-col-12'>
            <Heading type='h2'>Heading h2</Heading>
          </div>
          {/* Checkbox */}
          <div className='hcl-col-12 mt-5'>
            <legend className='hcl-legend'>
              Checkbox - Horizontally arranged (default)
            </legend>
            <Checkbox
              id='checkbox1'
              labelText='1 (default)'
              onChange={() => {
                console.log("Default Checkbox.");
              }}
            />
            <Checkbox
              id='checkbox2'
              labelText='2'
              checked
              onChange={() => {
                console.log("Checked state is changed.");
              }}
            />
            <Checkbox id='checkbox3' labelText='3 (disabled)' disabled />
          </div>
          <div className='hcl-col-12 mt-5'>
            <legend className='hcl-legend'>
              Checkbox - Vertically arranged
            </legend>
            <div className='hcl-checkbox-group hcl-stack-vertical'>
              <Checkbox
                id='checkbox4'
                labelText='4 (default)'
                onChange={() => {
                  console.log("Default Checkbox.");
                }}
              />
              <Checkbox
                id='checkbox5'
                labelText='5'
                checked
                onChange={() => {
                  console.log("Checked state is changed.");
                }}
              />
              <Checkbox id='checkbox6' labelText='6 (disabled)' disabled />
            </div>
          </div>
          {/* Radio */}
          <div className='hcl-col-12 mt-5'>
            <legend className='hcl-legend'>
              Radio - Horizontally arranged (default)
            </legend>
            <Radio
              id='Radio1'
              labelText='1 (default)'
              value='37'
              name='temperature'
              onChange={this.onTemperatureRadioChange}
              checked={this.state.radio.temperature === 37}
            />
            <Radio
              id='Radio2'
              labelText='2'
              name='temperature'
              value='45'
              onChange={this.onTemperatureRadioChange}
              checked={this.state.radio.temperature === 45}
            />
            <Radio
              id='Radio3'
              labelText='3 (disabled)'
              value='30'
              name='temperature'
              disabled
              onChange={this.onTemperatureRadioChange}
              checked={this.state.radio.temperature === 30}
            />
          </div>
          <div className='hcl-col-12 mt-5'>
            <legend className='hcl-legend'>Radio - Vertically arranged</legend>
            <div className='hcl-radio-group hcl-stack-vertical'>
              <Radio
                id='Radio4'
                labelText='4 (default)'
                value='Bangalore'
                name='city'
                onChange={this.onCityRadioChange}
                checked={this.state.radio.city === "Bangalore"}
              />
              <Radio
                id='Radio5'
                labelText='5'
                value='Chennai'
                name='city'
                onChange={this.onCityRadioChange}
                checked={this.state.radio.city === "Chennai"}
              />
              <Radio
                id='Radio6'
                labelText='6 (disabled)'
                value='Mumbai'
                name='city'
                disabled
                onChange={this.onCityRadioChange}
                checked={this.state.radio.city === "Mumbai"}
              />
            </div>
          </div>
          {/* Link */}
          <div className='hcl-col-12 mt-5'>
            <Link href='https://www.google.com' target='_blank'>
              Google
            </Link>
          </div>
          {/* Paragraphs */}
          <div className='hcl-col-12 mt-5'>
            <Paragraph>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&lsquo;t look even
              slightly believable.
            </Paragraph>
          </div>
          {/* Breadcrumb */}
          <div className='hcl-col-12 mt-5'>
            <Breadcrumb 
              id='breadcrumb' 
              className='custom-breadcrumb' 
              model={[
                    { label: "Breadcrumb 1", url: "" },
                    { label: "Breadcrumb 2", url: "https://google.co.in" },
                    { label: "Breadcrumb 3" }
                ]} 
            />
          </div>
          {/* Spinner */}
          <div className='hcl-col-12 mt-5'>
            <Spinner />
          </div>
          {/* Small Spinner */}
          <div className='hcl-col-12 mt-5'>
            <Spinner small />
          </div>
          {/* Toggle */}
          <div className='hcl-col-12 mt-5'>
            <Toggle
              id='simple-toggle'
              className='ml-3'
              onChange={() => {
                console.log("Toggled");
              }}
            />
            <Toggle
              id='disabled-checked-toggle'
              className='ml-3'
              disabled
              toggled
            />
            <Toggle
              id='disabled-toggle'
              className='ml-3'
              disabled
              labelOff='off'
              labelOn='on'
            />
          </div>
          {/* Small Toggle */}
          <div className='hcl-col-12 mt-5'>
            <Toggle
              small
              id='simple-small-toggle'
              className='ml-3'
              onChange={() => {
                console.log("Toggled");
              }}
            />
            <Toggle
              small
              id='disabled-checked-small-toggle'
              className='ml-3'
              disabled
              toggled
            />
            <Toggle
              small
              id='disabled-small-toggle'
              className='ml-3'
              disabled
              labelOff='off'
              labelOn='on'
            />
          </div>
          <div className='hcl-col-12 mt-5'>
            <Notification
              title='Notification title'
              subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s."
              className='hcl-info'
              closable
              onClose={() => { console.log('Notification Closed'); }}
            />
            <Overflowmenu listItems={overflowlist} />
            <Overflowmenu listItems={overflowlist} direction='right' />
          </div>
          {/* Tag */}
          <div className='hcl-col-12 mt-5'>
            <Tag className='ml-3' title='Primary Tag'>Primary Tag</Tag>
            <Tag className='ml-3' title='Primary Disabled' disabled>Primary Disabled</Tag>
            <Tag className='ml-3' title='Primary Closable' closable onClose={() => { alert('Closing Tag') }}>Primary Closable</Tag>
            <Tag className='ml-3' title='Primary Tag With Thumbnail' thumbnailSrc='https://image.flaticon.com/icons/png/512/862/862358.png'>Primary Tag With Thumbnail</Tag>
            <Tag className='ml-3' title='Secondary Tag' type='secondary'>Secondary Tag</Tag>
            <Tag className='ml-3' title='Secondary Disabled Tag' disabled type='secondary'>Secondary Disabled Tag</Tag>
            <Tag className='ml-3' title='Secondary Closable' type='secondary' closable onClose={() => { alert('Closing Tag') }}>Secondary Closable</Tag>
            <Tag className='ml-3' title='Secondary Tag With Thumbnail' type='secondary' thumbnailSrc='https://image.flaticon.com/icons/png/512/862/862358.png'>Secondary Tag With Thumbnail</Tag>
          </div>
          {/* List */}
          <div className='hcl-col-12 mt-5'>
            {/* Ordered */}
            <Label>Ordered List</Label>
            <List listItems={listItems} type='ol' onClick={() => {}} />
            <br />
            <br />
            {/* Unordered */}
            <Label>Unordered List</Label>
            <List listItems={listItems} type='ul' onClick={() => {}} />
          </div>
          {/* Tag */}
          <div className='col-12 mt-5'>
            <Toast
              type='success'
              subtitle='Subtitle text goes here.'
              caption='Time stamp [00:00:00]'
              closable
              onClose={this.hideToast}
              visible={this.state.toast.visible}
            />
            <Button title='Default' onClick={this.showToast}>Show Toast Notification</Button>
          </div>
          <div className='col-12 mt-5'>
            {/* Danger type Modals */}
            {this.state.modal === 1 && 
            <Modal type='danger' label='optional label' heading='Heading comes here.' onClose={this.onModalClose} actions={this.modalActions1}>
              <Paragraph>Danger Modal with save and close buttons</Paragraph>
            </Modal>}
            {this.state.modal === 2 && 
            <Modal type='danger' label='optional label' heading='Heading comes here.' onClose={this.onModalClose}>
              <Paragraph> Danger Modal with no buttons</Paragraph>
            </Modal>}
            {this.state.modal === 3 && 
            <Modal type='danger' heading='Heading comes here.' onClose={this.onModalClose} actions={this.modalActions3}>
              <Paragraph> Danger Modal with close button</Paragraph>
            </Modal>}
            {this.state.modal === 4 && 
            <Modal type='danger' onClose={this.onModalClose}>
              <Paragraph> Danger Modal with no footer and heading</Paragraph>
            </Modal>}
            {/* Default type Modals */}
            {this.state.modal === 5 && 
            <Modal label='optional label' heading='Heading comes here.' onClose={this.onModalClose} actions={this.modalActions5}>
              <Paragraph> Modal with Delete (Danger) button</Paragraph>
            </Modal>}
            {this.state.modal === 6 && 
            <Modal label='optional label' heading='Heading comes here.' onClose={this.onModalClose}>
              <Paragraph> Modal with no buttons</Paragraph>
            </Modal>}
            {this.state.modal === 7 && 
            <Modal heading='Heading comes here.' onClose={this.onModalClose} actions={this.modalActions7}>
              <Paragraph>Modal with save button</Paragraph>
            </Modal>}
                        Show modal layout : 
            <Button title='Default' onClick={()=>{ this.setState({ modal : 1 }) }}>1</Button>
            <Button title='Default' onClick={()=>{ this.setState({ modal : 2 }) }}>2</Button>
            <Button title='Default' onClick={()=>{ this.setState({ modal : 3 }) }}>3</Button>
            <Button title='Default' onClick={()=>{ this.setState({ modal : 4 }) }}>4</Button>
            <Button title='Default' onClick={()=>{ this.setState({ modal : 5 }) }}>5</Button>
            <Button title='Default' onClick={()=>{ this.setState({ modal : 6 }) }}>6</Button>
            <Button title='Default' onClick={()=>{ this.setState({ modal : 7 }) }}>7</Button>
          </div>
          <section className="hcl-col-12 mt-5 colBorder p-5">
                        {/* Content Switcher Component */}
                        <h5 className="p-2">Content Switcher - (default)</h5>
                        <ContentSwitcher activeIndex={contentSwitch.example1} onChange={(e) => this.onSwitchChange(e, 'example1')}>
                            <Switch label="All"></Switch>
                            <Switch label="Cybernetics"></Switch>
                            <Switch label="Information & Communication"></Switch>
                        </ContentSwitcher>
                        <section className="mt-1 p-2">
                            {contentSwitch.example1 === 0 && 
                                <div className="colBorder p-2">
                                    <List listItems={this.switchAll} type="ol" onClick={(e) => console.log(e)} />
                                </div>
                            }
                            {contentSwitch.example1 === 1 && 
                                <div className="colBorder p-2">
                                    <List listItems={[this.switchAll[0]]} type="ol" />
                                </div>
                            }
                            {contentSwitch.example1 === 2 && 
                                <div className="colBorder p-2">
                                    <List listItems={[this.switchAll[1]]} type="ol" />
                                </div>
                            }
                        </section>
                    </section>
                    <section className="hcl-col-12 mt-5 colBorder p-5">
                        <h5 className="p-2">Content Switcher - (disabled)</h5>
                        <ContentSwitcher activeIndex={contentSwitch.example2} onChange={(e) => this.onSwitchChange(e, 'example2')}>
                            <Switch label="All"></Switch>
                            <Switch label="Cybernetics" isDisabled></Switch>
                            <Switch label="Information & Communication"></Switch>
                        </ContentSwitcher>
                        <section className="mt-1 p-2">
                            {contentSwitch.example2 === 0 && 
                                <div className="colBorder p-2">
                                    <List listItems={this.switchAll} type="ol" />
                                </div>
                            }
                            {contentSwitch.example2 === 1 && 
                                <div className="colBorder p-2">
                                    <List listItems={[this.switchAll[0]]} type="ol" />
                                </div>
                            }
                            {contentSwitch.example2 === 2 && 
                                <div className="colBorder p-2">
                                    <List listItems={[this.switchAll[1]]} type="ol" />
                                </div>
                            }
                        </section>
                    </section>
                    <section className="hcl-col-12 mt-5 colBorder p-5">
                        <h5 className="p-2">Content Switcher - (with icons)</h5>
                        <ContentSwitcher activeIndex={contentSwitch.example3} onChange={(e) => this.onSwitchChange(e, 'example3')}>
                                <Switch label="All" iconClass="fa fa-center"></Switch>
                                <Switch label="Cybernetics" iconClass="fa fa-center"></Switch>
                                <Switch label="Information & Communication" iconClass="fa fa-right"></Switch>
                        </ContentSwitcher>
                        <section className="mt-1 p-2">
                            {contentSwitch.example3 === 0 && 
                                <div className="colBorder p-2">
                                    <List listItems={this.switchAll} type="ol" />
                                </div>
                            }
                            {contentSwitch.example3 === 1 && 
                                <div className="colBorder p-2">
                                    <List listItems={[this.switchAll[0]]} type="ol" />
                                </div>
                            }
                            {contentSwitch.example3 === 2 && 
                                <div className="colBorder p-2">
                                    <List listItems={[this.switchAll[1]]} type="ol" />
                                </div>
                            }
                        </section>
                    </section>
                    <section className="hcl-col-12 mt-5 colBorder p-5">                        
                        <h5 className="p-2">Content Switcher - with icons (disabled)</h5>
                        <ContentSwitcher activeIndex={contentSwitch.example4} onChange={(e) => this.onSwitchChange(e, 'example4')}>
                                <Switch label="All" iconClass="fa fa-left" isDisabled></Switch>
                                <Switch label="Cybernetics" iconClass="fa fa-center" isDisabled></Switch>
                                <Switch label="Information & Communication" iconClass="fa fa-right" isDisabled></Switch>
                        </ContentSwitcher>
                        <section className="mt-1 p-2">
                            {contentSwitch.example4 === 0 && 
                                <div className="colBorder p-2">
                                    <List listItems={this.switchAll} type="ol" />
                                </div>
                            }
                            {contentSwitch.example4 === 1 && 
                                <div className="colBorder p-2">
                                    <List listItems={[this.switchAll[0]]} type="ol" />
                                </div>
                            }
                            {contentSwitch.example4 === 2 && 
                                <div className="colBorder p-2">
                                    <List listItems={[this.switchAll[1]]} type="ol" />
                                </div>
                            }
                        </section>
                    </section>
          {/* Slider Component */}
          <div className='hcl-col-12'>
            <Slider 
              min={0} 
              max={100} 
              step={2} 
              value={44}
              title='Slider' 
              onChange={event => {console.log(event.currentTarget.value)}}
            />
          </div>
          {/* Overflow */ }
          <div />
        </div>
      </main>
        );
    }
}

export default App;
