import React, { Component } from "react";
import PropTypes from 'prop-types';
import './Input.scss';

class Input extends Component {
    state = {
        value: ''
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        });
    }

    _handleOnChange = event => {
        event.preventDefault();
        this.setState({ value: event.currentTarget.value });
        this.props.onChange(event);
    }

    render() {
        const {
            title,
            name,
            placeholder,
            readOnly,
            autoComplete,
            autoCorrect,
            autoCapitalize,
            spellCheck,
            inputType,
            attr
        } = this.props;
        return (
            <div className="patron-input">
                <label>{title}</label>
                <input
                    name={name}
                    value={this.state.value}
                    placeholder={placeholder}
                    onChange={this._handleOnChange}
                    readOnly={readOnly}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    autoCapitalize={autoCapitalize}
                    spellCheck={spellCheck}
                    type={inputType}
                    {...attr}
                />
            </div>
        );
    }

}

Input.defaultProps = {
    title: 'Input',
    placeholder: '...',
    readOnly: false,
    onChange: event => { event.preventDefault(); },
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: true,
    inputType: 'text',
    value: '',
    attr: {},
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    autoComplete: PropTypes.string,
    autoCorrect: PropTypes.string,
    autoCapitalize: PropTypes.string,
    spellcheck: PropTypes.bool,
    inputType: PropTypes.string.isRequired,
    attr: PropTypes.object,
};

export default Input;
