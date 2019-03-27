import React, { Component } from 'react';
import Label from './components/atoms/Label';
import TextInput from './components/atoms/TextInput';
import FormHelperText from './components/atoms/FormHelperText';
import Button from './components/atoms/Button';
import Heading from './components/atoms/Heading';
import Checkbox from './components/atoms/Checkbox';

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
                        <Button className="btn--secondary">Button</Button>
                    </div>
                    {/* Heading */}
                    <div className="hcl-form-group col-12">
                        <Heading type="h2">Heading h2</Heading>
                    </div>
                    {/* Checkbox */}
                    <div className="hcl-checkbox-wrapper" aria-disabled="true">
                        <Checkbox id="checkbox1" checked onChange={event => { console.log('checked: ', event.currentTarget.checked); }} />
                        <Label htmlFor="checkbox1" className="hcl-checkbox-label">Burlywood</Label>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
