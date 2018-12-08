import React, { Component } from "react";
import PropTypes from 'prop-types';
import './Select.scss';

class Select extends Component {
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
        this.setState({
            value: event.currentTarget.value
        });
        this.props.onChange(event);
    }

    render() {
        const { title, name, options } = this.props;
        return (
            <div className="patron-select" >
                <label className="patron-select-title"> {title} </label>
                <select
                    name={name}
                    value={this.state.value}
                    onChange={this._handleOnChange}
                >
                    {
                        options && options.length ?
                            options.map((item, index) => (
                                <option key={`${item.value}-${index}`} value={item.value}>
                                    {item.name}
                                </option>
                            ))
                            : null
                    }
                </select>
            </div>
        )
    }
};

Select.defaultProps = {
    name: 'select',
    value: '',
    options: [],
    title: 'Select',
    onChange: event => { event.preventDefault(); },
};

Select.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Select;
