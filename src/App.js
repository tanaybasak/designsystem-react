import React, { Component } from 'react';
import Button from './components/Button/Button';

class App extends Component {
    render() {
        return (
            <Button  className="patron-btn-outline-dark" onClick={event => { console.log(event.currentTarget.checked) }} />
        )
    }
}
// className={} data={}
export default App;
