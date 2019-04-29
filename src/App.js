import React, { Component } from 'react';
import Label from './components/atoms/Label';
import TextInput from './components/atoms/TextInput';
import FormHelperText from './components/atoms/FormHelperText';
import Button from './components/atoms/Button';
import Heading from './components/atoms/Heading';
import Checkbox from './components/atoms/Checkbox';
import Radio from './components/atoms/Radio';
import TextArea from './components/atoms/TextArea';
import Link from './components/atoms/Link';
import Paragraph from './components/atoms/Paragraph';
import Breadcrumb from './components/atoms/Breadcrumb';
import Spinner from './components/atoms/Spinner';
import Toggle from './components/atoms/Toggle';
import Notification from './components/atoms/Notification';
import Tag from './components/atoms/Tag/Tag';

class App extends Component {
    render() {
        return (
            <main className="container">
                <div className="row mt-5 pl-5">
                    {/* Input Field */}
                    <div className="hcl-form-group col-12">
                        <Label htmlFor="firstname">First Name </Label>
                        <FormHelperText className="helper-text">Enter first name</FormHelperText>
                        <TextInput type="text" placeholder="name" id="firstname" data-invalid="true" onChange={event => { console.log(event.currentTarget.value) }} />
                        <FormHelperText className="error-msg">Enter first name</FormHelperText>
                    </div>
                    <div className="hcl-form-group col-12">
                        <Label htmlFor="feedback">Feedback </Label>
                        <FormHelperText className="helper-text">Feedback helper</FormHelperText>
                        <TextArea aria-disabled="false" id="feedback" data-invalid="true" onChange={event => { console.log(event.currentTarget.value) }} />
                        <FormHelperText className="error-msg">Validation message</FormHelperText>
                    </div>

                    <hr />
                    {/* Button */}
                    <div className="hcl-form-group col-12">
                        <Button title="Default" onClick={event => { console.log('Button Clicked'); }}>Default</Button>
                        <Button className="hcl-btn-primary" onClick={event => { console.log('Button Clicked'); }}>Primary</Button>
                        <Button className="hcl-btn-secondary" onClick={event => { console.log('Button Clicked'); }}>Secondary</Button>
                        <Button className="hcl-btn-primary ghost" onClick={event => { console.log('Button Clicked'); }}>Primary ghost</Button>
                        <Button className="hcl-btn-primary outline" onClick={event => { console.log('Button Clicked'); }}>Primary outline</Button>
                        <Button className="hcl-btn-primary sm" onClick={event => { console.log('Button Clicked'); }}>Primary small</Button>
                    </div>
                    {/* Heading */}
                    <div className="hcl-form-group col-12">
                        <Heading type="h2">Heading h2</Heading>
                    </div>
                    {/* Checkbox */}
                    <div className="hcl-checkbox-wrapper col-12" aria-disabled="true">
                        <Checkbox id="checkbox1" checked onChange={event => { console.log('checked: ', event.currentTarget.checked); }} />
                        <Label htmlFor="checkbox1" className="hcl-checkbox-label">Sample text</Label>
                    </div>
                    {/* Radio */}
                    <div className="hcl-radio-group col-12 hcl-stack-vertical" aria-disabled="true">
                        <div className="hcl-radio-item">
                            <Radio id="radio1" name="sampleText" value="Option1" onChange={event => { console.log('checked: ', event.currentTarget.checked); }} />
                            <Label htmlFor="radio1" className="hcl-radio-label">Sample text 1</Label>
                        </div>
                        <div className="hcl-radio-item">
                            <Radio id="radio2" name="sampleText" value="Option2" onChange={event => { console.log('checked: ', event.currentTarget.checked); }} />
                            <Label htmlFor="radio2" className="hcl-radio-label">Sample text 2</Label>
                        </div>
                    </div>
                    {/* Link */}
                    <div className="col-12 mt-5">
                        <Link href="https://www.google.com" target="_blank">Google</Link>
                    </div>
                    {/* Paragraphs */}
                    <div className="col-12 mt-5">
                        <Paragraph>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                        </Paragraph>
                    </div>
                    {/* Breadcrumb */}
                    <div className="col-12 mt-5">
                        <Breadcrumb id="breadcrumb" className="custom-breadcrumb" model={[
                            { label: "Breadcrumb 1", url: "" },
                            { label: "Breadcrumb 2", url: "https://google.co.in" },
                            { label: "Breadcrumb 3" }
                        ]}>
                        </Breadcrumb>
                    </div>
                    {/* Spinner */}
                    <div className="col-12 mt-5">
                        <Spinner />
                    </div>
                    {/* Small Spinner */}
                    <div className="col-12 mt-5">
                        <Spinner small />
                    </div>
                    {/* Toggle */}
                    <div className="col-12 mt-5">
                        <Toggle id="simple-toggle" className="ml-3" onChange={event => { console.log('Toggled') }} />
                        <Toggle id="disabled-checked-toggle" className="ml-3" disabled toggled />
                        <Toggle id="disabled-toggle" className="ml-3" disabled labelOff="off" labelOn="on" />
                    </div>
                    {/* Small Toggle */}
                    <div className="col-12 mt-5">
                        <Toggle small id="simple-small-toggle" className="ml-3" onChange={event => { console.log('Toggled') }} />
                        <Toggle small id="disabled-checked-small-toggle" className="ml-3" disabled toggled />
                        <Toggle small id="disabled-small-toggle" className="ml-3" disabled labelOff="off" labelOn="on" />
                    </div>
                    <div className="col-12 mt-5">
                        <Notification
                            title="Notification title"
                            subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s."
                            className='hcl-info'
                            closable
                            onClose={event => { console.log('Notification Closed'); }}
                        />
                    </div>
                    {/* Tag */}
                    <div className="col-12 mt-5">
                        <Tag className="ml-3" title="Primary Tag">Primary Tag</Tag>
                        <Tag className="ml-3" title="Primary Disabled" disabled>Primary Disabled</Tag>
                        <Tag className="ml-3" title="Primary Closable" onClose={event => { alert('Closing Tag') }}>Primary Closable</Tag>
                        <Tag className="ml-3" title="Primary Tag With Thumbnail" thumbnailSrc="https://image.flaticon.com/icons/png/512/862/862358.png">Primary Tag With Thumbnail</Tag>
                        <Tag className="ml-3" title="Secondary Tag" type="secondary">Secondary Tag</Tag>
                        <Tag className="ml-3" title="Secondary Disabled Tag" disabled type="secondary">Secondary Disabled Tag</Tag>
                        <Tag className="ml-3" title="Secondary Closable" type="secondary" onClose={event => { alert('Closing Tag') }}>Secondary Closable</Tag>
                        <Tag className="ml-3" title="Secondary Tag With Thumbnail" thumbnailSrc="https://image.flaticon.com/icons/png/512/862/862358.png">Secondary Tag With Thumbnail</Tag>
                    </div>
                </div>
            </main >
        );
    }
}

export default App;
