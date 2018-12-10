import React, { Component } from 'react';
import Switch from './components/Switch/Switch';

class App extends Component {
    render() {
        return (
            <Switch checked={true} onChange={event => { console.log(event.currentTarget.checked) }} />
        )
    }
}

export default App;
