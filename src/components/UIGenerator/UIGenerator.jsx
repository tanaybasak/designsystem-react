import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propertiesDescriptor, UIGeneratorUtils } from './core';
import './UIGenerator.scss';

class UIGenerator extends Component {
    // In-built function declarations SECTION - STARTS
    constructor(props) {
        super(props);
        this.elementsValue = {};
        this.initComponentParams(props);
        this.state = {
            whichBooleanProperty: '',
            totalRows: [1],
            elementsValue: this.elementsValue
        };
        this.totalRows = [1]; // Initial count of table rows
        this.initialData = { // Exception for connections/actions functionality; Set the initial data payload required to communicate with parent components
            visiblePropertiesData: []
        };
    }

    componentDidMount() {
        this.props.onChange(this.initialData);
        this.initialData = { // Exception for connections/actions functionality; Unset the initial data payload required to communicate with parent components
            visiblePropertiesData: []
        };
        document.addEventListener("click", this.hideContextMenu, false);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.propertiesDescriptor.hasOwnProperty('properties') && nextProps.propertiesDescriptor.properties.length) {
            this.properties = this.properties.map(property => {
                for (let i = 0; i < nextProps.propertiesDescriptor.properties.length; i++) {
                    if (property.name === nextProps.propertiesDescriptor.properties[i].name) {
                        property.values = nextProps.propertiesDescriptor.properties[i].values;
                        if (nextProps.propertiesDescriptor.properties[i].template) {
                            property.template = nextProps.propertiesDescriptor.properties[i].template;
                        }
                        break;
                    }
                }

                return property;
            });
        }
    }

    render() {
        const { propertiesDescriptor, multipleViewPrefixId: prefixId } = this.props;
        if (!propertiesDescriptor.hasOwnProperty('properties') || !propertiesDescriptor.properties.length) {
            return (
                <div className="hcl-ui-generator" id={prefixId}>
                    <div className="hcl-ui-generator-nodescriptor">
                        <i className="fa fa-warning" aria-hidden="true" />
                        <span className="hcl-ui-generator-nodescriptor-message">
                            No property found to render.
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div
                className="hcl-ui-generator"
                id={prefixId}
                style={(prefixId.includes('connections-tab') || prefixId.includes('actions-tab')) && { backgroundColor: 'inherit' } || {}}
            >
                <form name="uigeneratorform" className="form-horizontal" action="javascript:void(0);">
                    {this.createUIElements()}
                </form>
                {this.renderTableContextMenu()}
            </div>
        );
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.hideContextMenu, false);
    }
    // In-built function definitions SECTION - ENDS
    // Dynamic UI element rendering SECTION - please do not write any custom functions in this section - STARTS
    calculateInitialEnablement = propertiesValue => {
        this.utilsInstance.calculateInitialEnablement(propertiesValue, this.properties);
    };

    setInitialValues = propertiesValue => {
        this.properties.forEach(property => {
            const { path, absolute_path } = property;
            const actualPath = absolute_path && absolute_path.includes('properties') && /\d/g.test(absolute_path) // Exception for connections/actions functionality
                ? absolute_path
                : path;
            let propertyValue = this.utilsInstance.getDataValueByPath(propertiesValue, actualPath);
            propertyValue = (/^(null|undefined)$/i.test(propertyValue))
                ? this.utilsInstance.getDefaultDataSample(this.utilsInstance.propertiesDefaultValue, actualPath)
                : propertyValue;
            this.utilsInstance.setProperty(propertiesValue, property, propertyValue, this.props.multipleViewPrefixId, false);
        });
    };

    createUIElements = () => this.properties
        .filter(({ isEnabled }) => isEnabled)
        .map(property => {
            const {
                multipleViewPrefixId: prefixId,
                propertiesValue
            } = this.props;
            const {
                label, name, description, id, path, type, ui_hint,
                controls, values, columns, isEnabled,
                required, absolute_path, display_size, loadButton, template, is_disable
            } = property;
            const randomId = this.getRandomString();
            let actualPath = absolute_path && absolute_path.includes('properties') && /\d/g.test(absolute_path) // Exception for connections/actions functionality
                ? absolute_path
                : path;
            actualPath = `/${actualPath}`;
            const defaultValue = this.utilsInstance.getDefaultDataSample(this.utilsInstance.propertiesDefaultValue, actualPath);
            const updatedValue = this.utilsInstance.getDataValueByPath(propertiesValue, actualPath);
            const elementName = path ? `${prefixId}-${path.replace(/\//g, '-')}` : `${prefixId}-${name}`;
            const elementValue = !(/^(null|undefined)$/i.test(this.state.elementsValue[elementName]))
                ? this.state.elementsValue[elementName]
                : (/^(null|undefined|)$/i.test(updatedValue))
                    ? defaultValue
                    : updatedValue;
            const elementId = `${prefixId}-propid-${id}`;
            let requiredAttribute = {};
            let loadButtonProperty = {};
            if (required) {
                requiredAttribute = { required };
            }
            if ((ui_hint === "dropdown" || ui_hint === "datalist") && loadButton) {
                loadButtonProperty = { loadButton };
            }
            const elementAttributes = {
                'className': 'form-control form-control-sm rounded-0',
                'name': elementName,
                'value': elementValue || '',
                'id': elementId,
                'data-propertyname': name,
                'data-propertytype': type,
                'data-propertyuihint': ui_hint,
                'data-propertyid': id,
                'data-propertypath': path,
                'data-propertyabspath': absolute_path,
                'data-hascontrols': Boolean(controls && controls.length > 0),
                'data-isrequired': Boolean(typeof required !== 'undefined' && required),
                ...requiredAttribute,
                disabled: is_disable ? 'disabled' : ''
            };
            const helperPropertyParams = {
                key: id,
                propertyName: name,
                propertyLabel: label,
                propertyDesc: description,
                propertyPath: path,
                propertyAbsPath: absolute_path,
                propertyUIhint: ui_hint,
                tableColumns: columns,
                displaySize: display_size,
                isVisible: { display: '' },
                optionValues: null,
                whichBooleanProperty: this.state.whichBooleanProperty,
                prefixId,
                randomId,
                ...loadButtonProperty,
                setRef: elm => this[elementId] = elm,
                template
            };
            this.initialData = { // Exception for connections/actions functionality; Set the initial data payload required to communicate with parent components
                ...this.initialData,
                path,
                value: elementValue,
                absolute_path,
                visiblePropertiesData: [
                    ...this.initialData.visiblePropertiesData,
                    { [name]: elementValue || `${defaultValue}` || '', required: (typeof required === 'undefined') ? false : required }
                ]
            };
            if (isEnabled === false) {
                helperPropertyParams.isVisible = { display: 'none' };
            }
            if (ui_hint === 'radio' || ui_hint === 'dropdown' || ui_hint === 'datalist') {
                helperPropertyParams.optionValues = this.utilsInstance.computeValuesInContext(values, propertiesValue);
            }
            if (type === 'category') {
                return this.renderPropertiesSection(helperPropertyParams);
            } else if (type === 'string') {
                return this.createStringTypeUIElement(elementAttributes, helperPropertyParams);
            } else if (type === 'boolean') {
                return this.createBooleanTypeUIElement(elementAttributes, helperPropertyParams);
            } else if (type === 'integer') {
                return this.createIntegerTypeUIElement(elementAttributes, helperPropertyParams);
            } else if (type === 'table') {
                return this.renderTableElement(elementAttributes, helperPropertyParams);
            } else if (type === 'file') {
                return this.renderFileElement(elementAttributes, helperPropertyParams);
            }
        });

    renderPropertiesSection = ({ key, propertyLabel, isVisible }) => (
        <div key={key} className="form-group row m-0 hcl-ui-generator-section" style={isVisible}>
            <label className="col-form-label">
                <strong>{propertyLabel}</strong>
            </label>
        </div>
    );

    createStringTypeUIElement = (elementAttributes, helperPropertyParams) => {
        const { propertyName, propertyUIhint, optionValues } = helperPropertyParams;
        let elementAttributesAdded = elementAttributes;
        const { name, value, className } = elementAttributesAdded;
        if (propertyUIhint === 'textarea') {
            elementAttributesAdded = {
                ...elementAttributesAdded,
                className: `${className} uigen-textfield`,
                rows: '6',
                autoComplete: 'off'
            };

            return this.renderTextareaElement(elementAttributesAdded, helperPropertyParams);
        } else if (propertyUIhint === 'textbox') {
            elementAttributesAdded = {
                ...elementAttributesAdded,
                className: `${className} uigen-textfield`,
                type: propertyName.includes('password') ? 'password' : 'text',
                autoComplete: 'off'
            };

            return this.renderTextElement(elementAttributesAdded, helperPropertyParams);
        } else if (propertyUIhint === 'radio') {
            elementAttributesAdded = {
                ...elementAttributesAdded,
                className: 'form-check-input',
                type: 'radio'
            };

            return this.renderRadioElement(elementAttributesAdded, helperPropertyParams);
        } else if (propertyUIhint === 'dropdown') {
            const { whichBooleanProperty } = this.state;
            const updatedValue = (whichBooleanProperty && name === whichBooleanProperty)
                ? this.state.elementsValue[whichBooleanProperty]
                : value;
            if (optionValues && !optionValues.length && updatedValue) {
                optionValues.push({ "label": updatedValue, value: updatedValue });
            }
            elementAttributesAdded = {
                ...elementAttributesAdded,
                value: updatedValue
            };

            return this.renderDropdownElement(elementAttributesAdded, helperPropertyParams);
        } else if (propertyUIhint === 'datalist') {
            const { whichBooleanProperty } = this.state;
            let updatedValue = (whichBooleanProperty && name === whichBooleanProperty)
                ? this.state.elementsValue[whichBooleanProperty]
                : value;
            if (optionValues && !optionValues.length && updatedValue) {
                optionValues.push({ "label": updatedValue, value: updatedValue });
            } else {
                for (let i = 0; i < optionValues.length; i++) {
                    if (optionValues[i].value === updatedValue) {
                        updatedValue = optionValues[i].label;
                        break;
                    }
                }
            }
            elementAttributesAdded = {
                ...elementAttributesAdded,
                className: `${className} uigen-textfield`,
                value: updatedValue,
                autoComplete: 'off'
            };

            return this.renderDatalistElement(elementAttributesAdded, helperPropertyParams);
        } else if (propertyUIhint === 'component') {
            return this.renderComponentElement(elementAttributesAdded, helperPropertyParams);
        }
    };

    createBooleanTypeUIElement = (elementAttributes, helperPropertyParams) => {
        const { optionValues } = helperPropertyParams;
        let elementAttributesAdded = elementAttributes;
        const { name, value } = elementAttributesAdded;
        const { whichBooleanProperty } = this.state;
        const updatedValue = (whichBooleanProperty && name === whichBooleanProperty)
            ? this.state.elementsValue[whichBooleanProperty]
            : value;
        if (optionValues && !optionValues.length && updatedValue) {
            optionValues.push({ "label": updatedValue, value: updatedValue });
        }
        if (helperPropertyParams.propertyUIhint === 'dropdown') {
            elementAttributesAdded = {
                ...elementAttributesAdded,
                value: updatedValue
            };

            return this.renderDropdownElement(elementAttributesAdded, helperPropertyParams);
        } else {
            elementAttributesAdded = {
                ...elementAttributesAdded,
                'className': '',
                'type': 'checkbox',
                'value': updatedValue,
                'checked': (updatedValue === true || updatedValue === 'true')
            };

            return this.renderSwitchElement(elementAttributesAdded, helperPropertyParams);
        }
    };

    createIntegerTypeUIElement = (elementAttributes, helperPropertyParams) => {
        const { propertyUIhint, optionValues } = helperPropertyParams;
        let elementAttributesAdded = elementAttributes;
        const { name, value, className } = elementAttributesAdded;
        if (propertyUIhint === 'textbox') {
            elementAttributesAdded = {
                ...elementAttributesAdded,
                className: `${className} uigen-textfield`,
                type: 'number',
                autoComplete: 'off'
            };

            return this.renderTextElement(elementAttributesAdded, helperPropertyParams);
        } else if (propertyUIhint === 'dropdown') {
            const { whichBooleanProperty } = this.state;
            const updatedValue = (whichBooleanProperty && name === whichBooleanProperty)
                ? this.state.elementsValue[whichBooleanProperty]
                : value;
            if (optionValues && !optionValues.length && updatedValue) {
                optionValues.push({ "label": updatedValue, value: updatedValue });
            }
            elementAttributesAdded = {
                ...elementAttributesAdded,
                value: updatedValue
            };

            return this.renderDropdownElement(elementAttributesAdded, helperPropertyParams);
        }
    };

    renderFileElement = (elementAttributes, helperPropertyParams) => {
        const { key, isVisible, propertyLabel, propertyDesc } = helperPropertyParams;
        const { required, ...tempElementAttributes } = elementAttributes;
        const { id } = tempElementAttributes;

        return (
            <div key={key} className="form-group row pt-2 m-0 hcl-ui-generator-input" title={propertyDesc ? propertyDesc : ''} style={isVisible}>
                <div className="col-5 p-0">
                    <label htmlFor={id} className="col-form-label hcl-ui-generator-input-label">
                        <strong>{propertyLabel}:</strong>
                    </label>
                    {required && <sup className="hcl-ui-generator-mandatory-field-indicator">*</sup>}
                </div>
                <div className="col-7 p-0">
                    <input
                        {...tempElementAttributes}
                        type="file"
                        onChange={this.handleOnChange}
                        onBlur={this.isRequired}
                        onKeyUp={this.isRequired}
                    />
                    {this.renderErrorElement(id, required)}
                </div>
            </div>
        );
    };

    renderTextElement = (elementAttributes, helperPropertyParams) => {
        const { key, isVisible, propertyLabel, propertyDesc } = helperPropertyParams;
        const { required, ...tempElementAttributes } = elementAttributes;
        const { id } = tempElementAttributes;

        return (
            <div key={key} className="form-group row pt-2 m-0 hcl-ui-generator-input" title={propertyDesc ? propertyDesc : ''} style={isVisible}>
                <div className="col-5 p-0">
                    <label htmlFor={id} className="col-form-label hcl-ui-generator-input-label">
                        <strong>{propertyLabel}:</strong>
                    </label>
                    {required && <sup className="hcl-ui-generator-mandatory-field-indicator">*</sup>}
                </div>
                <div className="col-7 p-0">
                    <input
                        {...tempElementAttributes}
                        onChange={this.handleOnChange}
                        onBlur={this.isRequired}
                        onKeyUp={this.isRequired}
                    />
                    {this.renderErrorElement(id, required)}
                </div>
            </div>
        );
    };

    renderTextareaElement = (elementAttributes, helperPropertyParams) => {
        const { key, isVisible, propertyLabel, propertyDesc } = helperPropertyParams;
        const { required, ...tempElementAttributes } = elementAttributes;
        const { id } = tempElementAttributes;

        return (
            <div key={key} className="form-group row pt-2 m-0 hcl-ui-generator-textarea" title={propertyDesc ? propertyDesc : ''} style={isVisible}>
                <div className="col-5 p-0">
                    <label htmlFor={id} className="col-form-label hcl-ui-generator-textarea-label">
                        <strong>{propertyLabel}:</strong>
                    </label>
                    {required && <sup className="hcl-ui-generator-mandatory-field-indicator">*</sup>}
                </div>
                <div className="col-7 p-0">
                    <textarea
                        {...tempElementAttributes}
                        onChange={this.handleOnChange}
                        onBlur={this.isRequired}
                        onKeyUp={this.isRequired}
                    />
                    {this.renderErrorElement(id, required)}
                </div>
            </div>
        );
    };

    renderDropdownElement = (elementAttributes, helperPropertyParams) => {
        const { key, isVisible, propertyLabel, propertyDesc, optionValues, setRef, randomId, prefixId, loadButton, propertyName } = helperPropertyParams;
        const { required, ...tempElementAttributes } = elementAttributes;
        const { id } = tempElementAttributes;

        return (
            <div key={key} className="form-group row pt-2 m-0 hcl-ui-generator-dropdown" title={propertyDesc ? propertyDesc : ''} style={isVisible}>
                <div className="col-5 p-0">
                    <label htmlFor={id} className="col-form-label hcl-ui-generator-dropdown-label">
                        <strong>{propertyLabel}:</strong>
                    </label>
                    {required && <sup className="hcl-ui-generator-mandatory-field-indicator">*</sup>}
                </div>
                <div className={`col-${loadButton ? 5 : 7} p-0`}>
                    <select
                        {...tempElementAttributes}
                        ref={select => { setRef(select); }}
                        onChange={this.handleOnChange}
                        onBlur={this.isRequired}
                        onKeyUp={this.isRequired}
                    >
                        {(prefixId.includes('connections-tab') || prefixId.includes('actions-tab')) && <option key={`${key}_${randomId}_${propertyLabel}`} value="">{`Select ${propertyLabel.toLowerCase()}`}</option>}
                        {optionValues.map(({ value, label }) => (
                            <option
                                key={`${value}_${randomId}`}
                                value={value}
                            >
                                {label}
                            </option>
                        ))}
                    </select>
                    <i className="fa fa-chevron-down" />
                    {this.renderErrorElement(id, required)}
                </div>
                {loadButton && (
                    <div className="col-2">
                        <button
                            data-propertyid={key}
                            data-propertyname={propertyName}
                            onClick={loadButton.callback}
                        >
                            {loadButton.text}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    renderDatalistElement = (elementAttributes, helperPropertyParams) => {
        const { key, isVisible, propertyLabel, propertyDesc, optionValues, setRef, randomId, prefixId, loadButton, propertyName } = helperPropertyParams;
        const { required, ...tempElementAttributes } = elementAttributes;
        const { id } = tempElementAttributes;

        return (
            <div key={key} className="form-group row pt-2 m-0 hcl-ui-generator-datalist" title={propertyDesc ? propertyDesc : ''} style={isVisible}>
                <div className="col-5 p-0">
                    <label htmlFor={id} className="col-form-label hcl-ui-generator-datalist-label">
                        <strong>{propertyLabel}:</strong>
                    </label>
                    {required && <sup className="hcl-ui-generator-mandatory-field-indicator">*</sup>}
                </div>
                <div className={`col-${loadButton ? 5 : 7} p-0`}>
                    <input
                        {...tempElementAttributes}
                        list={`folders-${id}`}
                        placeholder=""
                        ref={select => { setRef(select); }}
                        onChange={this.handleOnChange}
                        onBlur={this.isRequired}
                        onKeyUp={this.isRequired}
                    />
                    <datalist id={`folders-${id}`}>
                        {optionValues.map(({ value, label }) => (
                            <option
                                key={`${value}_${randomId}`}
                                value={label ? label : value}
                                data-dlvalue={value}
                            >
                                {label}
                            </option>
                        ))}
                    </datalist>
                    {this.renderErrorElement(id, required)}
                </div>
                {loadButton && (
                    <div className="col-2">
                        <button
                            data-propertyid={key}
                            data-propertyname={propertyName}
                            onClick={loadButton.callback}
                        >
                            {loadButton.text}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    renderRadioElement = (elementAttributes, helperPropertyParams) => {
        const { key, isVisible, propertyLabel, propertyDesc, optionValues, setRef, randomId } = helperPropertyParams;
        const { id, value: elmAttrValue, required } = elementAttributes;

        return (
            <div key={key} className="form-group row pt-2 m-0 hcl-ui-generator-radio" title={propertyDesc ? propertyDesc : ''} style={isVisible}>
                <div className="col-5 p-0">
                    <label htmlFor={id} className="col-form-label hcl-ui-generator-radio-label">
                        <strong>{propertyLabel}:</strong>
                    </label>
                    {required && <sup className="hcl-ui-generator-mandatory-field-indicator">*</sup>}
                </div>
                <div className="col-7 p-0 hcl-ui-generator-radio-buttons">
                    {optionValues.map(({ value, label }) => {
                        const elementAttributesAdded = {
                            ...elementAttributes,
                            'value': value,
                            'id': `${id}-${value}`,
                            'data-ischecked': (elmAttrValue && elmAttrValue === value),
                            'checked': (elmAttrValue && elmAttrValue === value)
                        };

                        return (
                            <div key={`${value}_${randomId}`} className="form-check form-check-inline col">
                                <label className="form-check-label">
                                    <input
                                        {...elementAttributesAdded}
                                        ref={input => { setRef(input); }}
                                        onChange={this.handleOnChange}
                                        onBlur={this.isRequired}
                                        onKeyUp={this.isRequired}
                                    />
                                    &nbsp;<span>{label}</span>
                                </label>
                            </div>
                        );
                    })}
                    {this.renderErrorElement(id, required)}
                </div>
            </div>
        );
    };

    renderSwitchElement = (elementAttributes, helperPropertyParams) => {
        const { key, isVisible, propertyLabel, propertyDesc, setRef } = helperPropertyParams;
        const { required, ...tempElementAttributes } = elementAttributes;
        const { id } = tempElementAttributes;

        return (
            <div key={key} className="form-group row pt-2 m-0 hcl-ui-generator-switch" title={propertyDesc ? propertyDesc : ''} style={isVisible}>
                <div className="col-5 p-0">
                    <label htmlFor={elementAttributes.id} className="col-form-label hcl-ui-generator-switch-label">
                        <strong>{propertyLabel}:</strong>
                    </label>
                    {required && <sup className="hcl-ui-generator-mandatory-field-indicator">*</sup>}
                </div>
                <div className="col-7 p-0">
                    <label className="input-switch">
                        <input
                            {...tempElementAttributes}
                            ref={input => { setRef(input); }}
                            onChange={this.handleOnChange}
                            onBlur={this.isRequired}
                            onKeyUp={this.isRequired}
                        />
                        <span />
                        {this.renderErrorElement(id, required)}
                    </label>
                </div>
            </div>
        );
    };

    renderTableElement = (elementAttributes, helperPropertyParams) => {
        const { key, isVisible, tableColumns } = helperPropertyParams;

        return (
            <div key={key} className="form-group row hcl-vert-gutter m-0 hcl-ui-generator-table" style={isVisible}>
                {tableColumns && tableColumns.length && tableColumns.map((tableColumn, columnIndex) => {
                    if (columnIndex === tableColumns.length - 1) {
                        return this.renderTable(elementAttributes, helperPropertyParams, tableColumn, columnIndex, true);
                    } else {
                        return this.renderTable(elementAttributes, helperPropertyParams, tableColumn, columnIndex, false);
                    }
                })}
            </div>
        );
    };

    renderComponentElement = (elementAttributes, helperPropertyParams) => {
        const { key, isVisible, propertyLabel, propertyDesc, setRef, randomId, prefixId, template } = helperPropertyParams;
        const { required, ...tempElementAttributes } = elementAttributes;
        const { id, name } = tempElementAttributes;

        return (
            <div key={key} className="form-group row pt-2 m-0 hcl-ui-generator-extcomponent" title={propertyDesc ? propertyDesc : ''} style={isVisible}>
                <div className="col-5 p-0">
                    <label htmlFor={id} className="col-form-label hcl-ui-generator-extcomponent-label">
                        <strong>{propertyLabel}:</strong>
                    </label>
                    {required && <sup className="hcl-ui-generator-mandatory-field-indicator">*</sup>}
                </div>
                <div className="col-7 p-0">
                    {template}
                </div>
            </div>
        );
    };

    renderTable = (elementAttributes, helperPropertyParams, tableColumn, columnIndex, hasContextMenu) => {
        const { name, label } = tableColumn;

        return (
            <div className="col p-0" key={`${name}_${helperPropertyParams.randomId}`}>
                <table className="table table-sm mb-0">
                    <thead className="thead-light hcl-ui-generator-table-header">
                        <tr>
                            <th scope="col">{label}</th>
                        </tr>
                    </thead>
                    <tbody className="hcl-ui-generator-table-body">
                        {this.renderTableRow(elementAttributes, helperPropertyParams, tableColumn, columnIndex, hasContextMenu)}
                    </tbody>
                </table>
            </div>
        );
    };

    renderTableRow = (elementAttributes, helperPropertyParams, tableColumn, columnIndex, hasContextMenu) => {
        const { totalRows } = this.state;
        const { name, type, values: optionValues, path } = tableColumn;
        const { className } = elementAttributes;
        const { key: elmKey, propertyDesc, prefixId, randomId, setRef } = helperPropertyParams;
        let elementAttributesAdded = {
            ...elementAttributes,
            'data-propertyname': name,
            'data-propertytype': type
        };
        if (optionValues) {
            elementAttributesAdded = {
                ...elementAttributesAdded,
                className: `${className} ${prefixId}-table-col`
            };
        } else {
            elementAttributesAdded = {
                ...elementAttributesAdded,
                className: `p-1 ${prefixId}-table-col`
            };
        }
        const { className: classNameAdded } = elementAttributesAdded;

        return (
            totalRows.map((colData, i) => {
                const helperPropertyParamsAdded = {
                    ...helperPropertyParams,
                    key: `${randomId}-${i}`
                };
                const { key } = helperPropertyParamsAdded;
                const columnId = `${prefixId}-propid-${elmKey}-row-${i}-col-${columnIndex}-${name}`;
                const elementName = `${prefixId}-${path.replace(/\//g, '-')}`;
                elementAttributesAdded = {
                    ...elementAttributesAdded,
                    'name': elementName,
                    'value': this.state[elementName] || '',
                    'id': columnId,
                    'data-propertypath': path,
                    'data-rowindex': i
                };

                return (optionValues
                    ? (
                        <tr key={key} title={propertyDesc ? propertyDesc : ''}>
                            <td className={`p-0 ${hasContextMenu ? 'hcl-ui-generator-table-select' : ''}`}>
                                <select
                                    {...elementAttributesAdded}
                                    ref={select => { setRef(select); }}
                                    onChange={this.handleOnChange}
                                >
                                    {optionValues.map(({ value, label }) => (
                                        <option
                                            key={`${value}_${randomId}`}
                                            className={classNameAdded.replace(`${className} `, '')}
                                            value={value}
                                        >
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                <i className="fa fa-chevron-down" />
                                {hasContextMenu && this.renderTableContextMenuIcon(i)}
                            </td>
                        </tr>
                    ) : (
                        <tr key={key} title={propertyDesc ? propertyDesc : ''}>
                            <td className={`p-0 ${hasContextMenu ? 'hcl-ui-generator-table-select' : ''}`}>
                                <input
                                    {...elementAttributesAdded}
                                    ref={input => { setRef(input); }}
                                    onChange={this.handleOnChange}
                                />
                                {hasContextMenu && this.renderTableContextMenuIcon(i, 'true')}
                            </td>
                        </tr>
                    )
                );
            })
        );
    };

    renderTableContextMenuIcon = (rowIndex, isTextbox = 'false') => (
        <span
            className="float-right hcl-ui-generator-table-contextmenu"
            data-rowindex={rowIndex}
            data-istextbox={isTextbox}
            onClick={this.showContextMenu}
        >
            <img src="../../assets/icons/ellipsis.png" alt="More" height="12" width="12" />
        </span>
    );

    renderTableContextMenu = () => {
        const { multipleViewPrefixId } = this.props;

        return (
            <span
                id={`${multipleViewPrefixId}-contextmenu-tools`}
                className="hcl-z-depth-2 hcl-ui-generator-table-contextmenu-tools"
            >
                <img
                    src="../../assets/icons/deletes.png"
                    alt="delete row"
                    height="12"
                    width="12"
                    className="row-delete"
                    onClick={this.handleRowCRUD}
                    title="Delete row"
                />
                <img
                    src="../../assets/icons/insert-above.png"
                    alt="insert above"
                    height="12"
                    width="12"
                    className="row-insert-above"
                    onClick={this.handleRowCRUD}
                    title="Add row above"
                />
                <img
                    src="../../assets/icons/insert-below.png"
                    alt="insert below"
                    height="12"
                    width="12"
                    className="row-insert-below"
                    onClick={this.handleRowCRUD}
                    title="Add row below"
                />
            </span>
        );
    };

    renderErrorElement = (elementId, required) => required && <small className="form-text text-danger hide-error" id={`${elementId}-error`}>This field is required</small>;
    // Dynamic UI element rendering SECTION - please do not write any custom functions in this section - ENDS
    // Custom function declarations SECTION - STARTS
    getRandomString = () => Math.random().toString(36).substring(7);

    handleOnChange = e => {
        const { propertiesValue, multipleViewPrefixId } = this.props;
        const currentTarget = e.currentTarget;
        let {
            name, value, checked, files,
            dataset: { propertyid, propertyuihint, propertytype, propertypath, propertyabspath, propertyname }
        } = currentTarget;
        let onChangeData;
        let inputFileValue;
        let dlValue;
        let dlDisplayValue;

        if (propertytype === 'file') {
            inputFileValue = value;
            value = files ? files[0] : '';
        } else {
            if (propertyuihint === 'switch') {
                value = checked;
            } else if (propertyuihint === 'datalist') {
                Array.from(currentTarget.list.options).forEach(option => {
                    if (option.value === value) {
                        dlValue = option.dataset.dlvalue;
                        dlDisplayValue = option.value;
                    }
                });
                value = dlValue
                    ? dlValue
                    : value
                        ? value
                        : '';
            } else {
                value = (propertytype === 'integer') ? parseInt(value) : value;
            }
        }
        const property = this.utilsInstance.getProperty(parseInt(propertyid, 10));
        this.utilsInstance.setProperty(propertiesValue, property, value, multipleViewPrefixId, true);
        this.properties = this.utilsInstance.properties.filter(property => this.utilsInstance.isEnabled(property, propertiesValue));
        this.setState(
            {
                elementsValue: {
                    ...this.state.elementsValue,
                    [name]: files
                        ? inputFileValue
                        : dlDisplayValue
                            ? dlDisplayValue
                            : value
                },
                whichBooleanProperty: name
            },
            () => {
                if (propertyabspath) {
                    const visiblePropertiesData = this.properties.reduce(
                        (arr, { name, required, default: propertyDefaultValue }) => {
                            const propertiesDefaultValueStr = !/^(null|undefined|)$/i.test(propertyDefaultValue) ? `${propertyDefaultValue}` : '';
                            const isRequired = (typeof required === 'undefined') ? false : required;
                            let defaultValue;
                            const propertiesValueKeys = Object.keys(propertiesValue);
                            if (propertiesValueKeys.length && propertiesValueKeys.includes('properties') && propertiesValue.properties.length && /\d/g.test(propertyabspath)) {
                                for (let i = 0; i < propertiesValue.properties.length; i++) {
                                    if (name === propertiesValue.properties[i].name) {
                                        defaultValue = `${propertiesValue.properties[i].value}` || propertiesDefaultValueStr;
                                        break;
                                    }
                                }
                                arr.push({
                                    [name]: !/^(null|undefined|)$/i.test(defaultValue) ? `${defaultValue}` : '',
                                    required: isRequired
                                });
                            } else {
                                if (name === propertyabspath.substring(propertyabspath.lastIndexOf('/') + 1)) {
                                    arr.push({
                                        [name]: `${value}` || propertiesDefaultValueStr,
                                        required: isRequired
                                    });
                                } else {
                                    arr.push({
                                        [name]: `${propertiesValue[name]}` || propertiesDefaultValueStr,
                                        required: isRequired
                                    });
                                }
                            }

                            return arr;
                        },
                        []
                    );
                    onChangeData = { path: propertypath, value, absolute_path: propertyabspath, visiblePropertiesData };
                } else {
                    onChangeData = { path: propertypath, value };
                }
                this.props.onChange(onChangeData);
            }
        );
    };

    handleOnClose = e => {
        this.props.onClose();
    };

    // To handle component re-render on props change
    initComponentParams = props => {
        const { propertiesDescriptor, propertiesValue, multipleViewPrefixId } = props;
        this.utilsInstance = new UIGeneratorUtils(propertiesDescriptor, multipleViewPrefixId);
        this.properties = this.utilsInstance.properties;
        this.calculateInitialEnablement(propertiesValue);
        this.utilsInstance.createAllPropertiesMap(false, this.properties);
        this.setInitialValues(propertiesValue);
        this.utilsInstance.updateAllProperties(this.properties);
        this.elementsValue = this.utilsInstance.getElementsValue(propertiesValue, multipleViewPrefixId, (propertiesValue.hasOwnProperty('properties') && propertiesValue.properties.length));
    };

    // To show the table context menu
    showContextMenu = e => {
        const { multipleViewPrefixId: prefixId } = this.props;
        const currentTargetElm = e.currentTarget;
        const { dataset: { rowindex, istextbox } } = currentTargetElm;
        const targetElmBounds = currentTargetElm.getBoundingClientRect();
        const targetElmCoords = {
            x: targetElmBounds.left,
            y: targetElmBounds.top + 12
        };
        const uigenBounds = document.getElementById(prefixId).getBoundingClientRect();
        const uigenCoords = {
            x: uigenBounds.left,
            y: uigenBounds.top
        };
        const contextMenuToolsElm = document.getElementById(`${prefixId}-contextmenu-tools`);
        const contextMenuToolsElmCoords = {
            top: targetElmCoords.y - uigenCoords.y + 'px',
            left: targetElmCoords.x - uigenCoords.x - 40 + 'px',
        };

        contextMenuToolsElm.setAttribute('data-rowindex', rowindex);
        contextMenuToolsElm.setAttribute('data-istextbox', istextbox);
        if (istextbox === 'true') {
            contextMenuToolsElm.setAttribute('data-propertypath', currentTargetElm.parentElement.firstElementChild.dataset.propertypath);
        }
        contextMenuToolsElm.style.display = 'inline-flex';
        contextMenuToolsElm.style.top = contextMenuToolsElmCoords.top;
        contextMenuToolsElm.style.left = contextMenuToolsElmCoords.left;
    };

    hideContextMenu = e => {
        const { multipleViewPrefixId: prefixId } = this.props;
        const contextMenuToolsElm = document.getElementById(`${prefixId}-contextmenu-tools`);

        if (contextMenuToolsElm && (e && e.target.tagName !== 'IMG' && e.target.tagName !== 'SPAN')) {
            contextMenuToolsElm.style.display = 'none';
            contextMenuToolsElm.style.top = 0;
            contextMenuToolsElm.style.left = 0;
            contextMenuToolsElm.style.transform = 'none';
        }
    };

    handleRowCRUD = e => {
        console.log('Watch out...!!! Men at work! :)');
    };
    // Custom function declarations SECTION - ENDS
    // Form Field Level Validation - STARTS
    isRequired = e => {
        const { id: errorElmId, value, dataset: { isrequired } } = e.currentTarget;
        if (isrequired === 'true') {
            const errorElm = document.getElementById(`${errorElmId}-error`);
            if (value) {
                errorElm.classList.add('hide-error');
                errorElm.innerHTML = '';
            } else {
                errorElm.classList.remove('hide-error');
                errorElm.innerHTML = 'This field is required';
            }
        }
    };
    // Form Field Level Validation - ENDS
}
// Default props definition
UIGenerator.defaultProps = new (function () {
    this.propertiesDescriptor = propertiesDescriptor;
    this.utilsInstance = new UIGeneratorUtils(this.propertiesDescriptor);
    this.propertiesDefaultValue = this.utilsInstance.propertiesDefaultValue;
    this.propertiesValue = {};
    this.multipleViewPrefixId = 'uigen-0';
    this.onChange = function (data) { };
    this.onClose = function () { };
})();
// Props validation
UIGenerator.propTypes = {
    propertiesDescriptor: PropTypes.object.isRequired,
    utilsInstance: PropTypes.object.isRequired,
    propertiesDefaultValue: PropTypes.object.isRequired,
    propertiesValue: PropTypes.object.isRequired,
    multipleViewPrefixId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default UIGenerator;
