import React, { Component } from 'react';
import Label from './components/atoms/Label';
import TextInput from './components/atoms/TextInput';
import FormHelperText from './components/atoms/FormHelperText';
import Button from './components/atoms/Button';
import Heading from './components/atoms/Heading';
import Checkbox from './components/atoms/Checkbox';
import Radio from './components/atoms/Radio';
import Tag from './components/atoms/Tag';

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
                    {/* Button */}
                    <div className="hcl-form-group col-12">
                        <Button className="btn--secondary" onClick={event => { console.log('Button Clicked'); }}>Button</Button>
                    </div>
                    {/* Heading */}
                    <div className="hcl-form-group col-12">
                        <Heading type="h2">Heading h2</Heading>
                    </div>
                    {/* Checkbox */}
                    <div className="hcl-checkbox-wrapper col-12" aria-disabled="true">
                        <Checkbox id="checkbox1" checked onChange={event => { console.log('checked: ', event.currentTarget.checked); }} />
                        <Label htmlFor="checkbox1" className="hcl-checkbox-label">Burlywood</Label>
                    </div>
                    {/* Radio */}
                    <div className="hcl-radio-item col-12">
                        <Radio id="radio1" name="planets" value="Option1" onChange={event => { console.log('checked: ', event.currentTarget.checked); }} />
                        <Label htmlFor="radio1" className="hcl-radio-label">Earth</Label>
                    </div>
                    <div className="hcl-radio-item col-12">
                        <Radio id="radio2" name="planets" value="Option2" onChange={event => { console.log('checked: ', event.currentTarget.checked); }} />
                        <Label htmlFor="radio2" className="hcl-radio-label">Mars</Label>
                    </div>
                    {/* Tag */}
                    <div className="col-12">
                        <Tag isCloseable>Date</Tag>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
