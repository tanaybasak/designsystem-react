import React, { Component } from 'react';
import Tooltip from './components/Tooltip/Tooltip';

class App extends Component {
    _handleOnChange = event => {
    }

    render() {
        return (
            <Tooltip
                title="Test tooltip"
                placement="bottom"
            >
            <button>Hello World</button>
            </Tooltip>
        )
    }
}

export default App;
