import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Switch.scss';

class Switch extends Component {

    state = {
        checkbox: false
    };

    componentWillMount() {
        this.setState({ checked: this.props.checked });
    }

    _handleOnChange = event => {
        this.setState({ checked: event.currentTarget.checked });
        this.props.onChange(event);
    }

    render() {
        return (
            <label className="patron-switch">
                <input type="checkbox" onChange={this._handleOnChange} checked={this.state.checked} />
                <span className="patron-switch-slider patron-switch-slider-round"></span>
            </label>
        )
    }
}



Switch.defaultProps = {
    checkbox: false,
    onChange: event => { }
};

Switch.propTypes = {
    checkbox: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Switch;