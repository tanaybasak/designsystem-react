import React, { Component } from "react";
import PropTypes from 'prop-types';
import './TextField.scss';

class TextField extends Component {
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
            rows,
            readOnly,
            autoComplete,
            autoCorrect,
            autoCapitalize,
            spellCheck,
            resize
        } = this.props;
        return (
            <div className="patron-text-field">
                <label>{title}</label>
                <textarea
                    name={name}
                    value={this.state.value}
                    placeholder={placeholder}
                    rows={rows}
                    onChange={this._handleOnChange}
                    readOnly={readOnly}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    autoCapitalize={autoCapitalize}
                    spellCheck={spellCheck}
                    resize={resize}
                />
            </div>
        );
    }

}

TextField.defaultProps = {
    rows: 4,
    title: 'Textarea',
    placeholder: '...',
    readOnly: false,
    onChange: event => { event.preventDefault(); },
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: true,
    resize: "true",
    value: ''
};

TextField.propTypes = {
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
    resize: PropTypes.string,
};

export default TextField;
