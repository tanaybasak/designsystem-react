import jsonpatch from "fast-json-patch";
import kvp from "key-value-pointer";
import _ from 'lodash';

export default class UIGeneratorUtils {
    constructor(propertiesDescriptor = {}, multipleViewPrefixId = 'uigen-0') {
        this.propertiesDescriptor = _.cloneDeep(propertiesDescriptor);
        this.propertiesDefaultValue = {};
        this.properties = [];
        this.propertiesMap = {};
        this.elementsValue = {};
        this.multipleViewPrefixId = multipleViewPrefixId;
        this.getEachPropertyDescriptor();
    }
    // Evaluate whether the property is enabled
    isEnabled = (property, propertiesValue) => {
        // Property is enabled by default
        let isEnabled = this.areParentsEnabled(property.parent, propertiesValue);
        if (isEnabled) {
            if (property.hasOwnProperty('enable_when')) {
                isEnabled = this.isExpressionTrue(property.enable_when, propertiesValue);
            } else if (property.hasOwnProperty('disable_when')) {
                isEnabled = !this.isExpressionTrue(property.disable_when, propertiesValue);
            }
        }

        return isEnabled;
    };
    // Set parent/child relationship
    setParentRelationships = (parent, properties) => {
        properties
            .filter(property => !/^(null|undefined|)$/i.test(property) && Object.keys(property).length)
            .forEach(property => {
                property.parent = parent;
                // Handle children
                if (property.children && property.children.length) {
                    this.setParentRelationships(property, property.children);
                }
            });
    };
    // Returns true if all parent props
    areParentsEnabled = (parent, propertiesValue) => {
        if (!parent) {
            return true;
        }
        if (!parent.isEnabled) {
            return false;
        }

        // Check older ancestors
        return this.areParentsEnabled(parent.parent, propertiesValue);
    };
    // Determine if expression/condition is true
    isExpressionTrue = (enablement, propertiesValue) => {
        let result = false;
        const results = [];
        // Evaluate any conditions
        if (enablement.hasOwnProperty('conditions') && enablement.conditions.length) {
            enablement.conditions.forEach(condition => {
                results.push(this.evaluateCondition(condition, propertiesValue));
            });
        }
        // Evaluate any expressions
        if (enablement.hasOwnProperty('expressions') && enablement.expressions.length) {
            enablement.expressions.forEach(expression => {
                results.push(this.evaluateExpression(expression, propertiesValue));
            });
        }
        // Now apply the logical operation if there is one
        if (!enablement.hasOwnProperty('logic')) {
            // There is just one condition, so the result is the result of the single condition
            result = results[0];
        } else {
            if (enablement.logic === "or") {
                // If any condition returned true, then the result is true
                for (let conditionResult in results) {
                    if (results[conditionResult]) {
                        result = true;
                        break;
                    }
                }
            } else {
                // All conditions must be true for the result to be true
                result = true;
                for (let conditionResult in results) {
                    if (!results[conditionResult]) {
                        result = false;
                        break;
                    }
                }
            }
        }

        return result;
    };
    // Evaluate expression to enable/disable a property
    evaluateExpression = (expression, propertiesValue) => {
        let result = false;
        const results = [];
        // Evaluate any conditions
        expression.conditions.forEach(condition => {
            results.push(this.evaluateCondition(condition, propertiesValue));
        });
        // Now apply the logical operation if there is one
        if (!expression.hasOwnProperty('logic')) {
            // There is just one condition, so the result is the result of the single condition
            result = results[0];
        } else {
            if (expression.logic === "or") {
                // If any condition returned true, then the result is true
                for (let conditionResult in results) {
                    if (results[conditionResult]) {
                        result = true;
                        break;
                    }
                }
            } else {
                // All conditions must be true for the result to be true
                result = true;
                for (let conditionResult in results) {
                    if (!results[conditionResult]) {
                        result = false;
                        break;
                    }
                }
            }
        }

        return result;
    };
    // Evaluate condition to enable/disable a property
    evaluateCondition = (condition, propertiesValue) => {
        let result = false;
        let strValue = !propertiesValue
            ? '' + this.getDefaultValue(this.getProperty(condition.id), propertiesValue)
            : '' + this.getPropertyValue(condition.id, propertiesValue);
        strValue = (strValue === '' && condition.value === '<<EMPTY>>') ? condition.value : strValue;
        if (strValue) {
            // Test the value against the condition
            const op = condition.op;
            if (op === "==") {
                result = (strValue === condition.value);
            } else if (op === "!=") {
                result = !(strValue === condition.value);
            } else if (op === "in") {
                result = this.isIn(strValue, condition.values);
            } else if (op === "!in") {
                result = !this.isIn(strValue, condition.values);
            } else {
                // A numeric comparison. Get the referenced value and this value as integers
                let thisNumber;
                let refNumber;
                if (propertiesValue) {
                    thisNumber = Number(propertiesValue);
                }
                if (strValue && strValue.trim() !== "") {
                    refNumber = Number(strValue);
                }
                // Only evaluate the expression if both are not null
                if (thisNumber !== undefined && refNumber !== undefined) {
                    if (op === "<") {
                        result = refNumber < thisNumber;
                    } else if (op === "<=") {
                        result = refNumber <= thisNumber;
                    } else if (op === ">") {
                        result = refNumber > thisNumber;
                    } else if (op === "<=") {
                        result = refNumber <= thisNumber;
                    }
                } else {
                    result = true;
                }
            }
        }

        return result;
    };
    // See if the value is in the list of values
    isIn = (value, values) => (values.indexOf(value) > -1);
    // Get property using its id
    getProperty = id => this.propertiesMap[id];
    // Get value/defaultValue of a property
    getPropertyValue = (id, propertiesValue) => {
        const property = this.getProperty(id);
        let result;
        // Get the result from root level object right away
        Object.keys(propertiesValue).forEach(propertyName => {
            if (property && propertyName === property.name) {
                result = propertiesValue[propertyName];
            }
        });
        if (property && result === undefined) {
            const { path, absolute_path } = property;
            const propertyPath = absolute_path && absolute_path.includes('properties') && /\d/g.test(absolute_path) // Exception for connections/actions functionality
                ? `${absolute_path.substring(0, absolute_path.lastIndexOf('/') + 1)}value`
                : path;
            const propertyPathStr = propertyPath.replace(/\[\]/g, '');
            // Get the result using given path
            result = kvp(propertiesValue).select(propertyPathStr);
            // Iterate and find the result; Exception for connections/actions functionality
            if (absolute_path && absolute_path.includes('properties') && /\d/g.test(absolute_path) && result === undefined) {
                if (propertiesValue.properties && propertiesValue.properties.length) {
                    for (let i = 0; i < propertiesValue.properties.length; i++) {
                        if (propertiesValue.properties[i].name === absolute_path.substring(absolute_path.lastIndexOf('/') + 1)) {
                            result = propertiesValue.properties[i].value;
                            break;
                        }
                    }
                }
            }
        }
        // Atlast if not found yet, get it from the default values store
        if (property && result === undefined) {
            result = this.getDefaultValue(property, propertiesValue);
        }

        return result;
    };
    // Calculate the default value
    getDefaultValue = (property, propertiesValue) => {
        let defaultValue = '';
        if (property.hasOwnProperty('default') && (!property.hasOwnProperty('defaults') || !property.defaults.length)) {
            defaultValue = property.default;
        } else if (property.hasOwnProperty('defaults')) {
            // Handle defaults list, which has when expression. Pick the first default (should be the only one)
            // for which the when condition evaluates to true. If there is no when condition (which must be the
            // last entry in the list, then use that value.
            for (let defaultDef in property.defaults) {
                const when = property.defaults[defaultDef].when;
                if (!when) {
                    defaultValue = property.defaults[defaultDef].value;
                    break;
                }
                if (this.isExpressionTrue(when, propertiesValue)) {
                    defaultValue = property.defaults[defaultDef].value;
                    break;
                }
            }
        }

        return defaultValue;
    };
    // Calculate visibility of enums values
    computeValuesInContext = (values, propertiesValue) => {
        const validValues = [];
        if (values && values.length) {
            values.forEach(value => {
                const enableWhen = value.enable_when;
                const disableWhen = value.disable_when;
                if (!enableWhen && !disableWhen) {
                    validValues.push(value);
                } else if (enableWhen && this.isExpressionTrue(enableWhen, propertiesValue)) {
                    validValues.push(value);
                } else if (disableWhen && !this.isExpressionTrue(disableWhen, propertiesValue)) {
                    validValues.push(value);
                }
            });
        }

        return validValues;
    };
    // Get data value of a particular property from schema using path object property
    getDataValueByPath = (propertiesData, path) => {
        let reqValue;
        if (path && path.includes('[]')) {
            path = path.replace(/[\[\]]/g, '');
        }
        if (path.includes('properties') && /\d/g.test(path)) { // Exception for connections/actions functionality
            // iterate and find the reqValue;
            kvp(propertiesData.properties).query(({ value }) => {
                if (value.name === path.substring(path.lastIndexOf('/') + 1)) {
                    reqValue = value.value;
                    return;
                }
            });
        } else {
            reqValue = kvp(propertiesData).select(`/${path}`);
        }

        return reqValue;
    };
    // Set data value for a particular property in schema using path object property
    setDataValueByPath = (propertiesData, property, path, newValue, multipleViewPrefixId, isModifying) => {
        if (isModifying) {
            return this.rebuildResultObj(property, propertiesData, newValue, this.elementsValue, multipleViewPrefixId, null, isModifying);
        }
        if (path.includes('properties') && /\d/g.test(path)) { // Exception for connections/actions functionality
            kvp(propertiesData.properties).query(({ value }) => {
                if (value.name === path.substring(path.lastIndexOf('/') + 1)) {
                    return kvp(propertiesData).replace(`/${path}`, newValue);
                }
            });
        } else {
            return kvp(propertiesData).replace(`/${path}`, newValue);
        }
    };
    // Build a single level object from property descriptor
    getEachPropertyDescriptor = () => {
        this.setParentRelationships(null, this.propertiesDescriptor.properties); // set parent relationships
        this.propertiesDescriptor.properties.forEach(property => {
            this.getEachTabProperties(property);
        });
        // Create an object that maps a property to its id
        this.createAllPropertiesMap();
        // Calculate default value JSON for type_properties2 descriptor
        this.buildDefaultTypeProperties(this.propertiesDescriptor.properties, this.propertiesDefaultValue, this.elementsValue, this.multipleViewPrefixId);
    };
    // Update all properties object
    updateAllProperties = properties => {
        this.properties = properties;
    };
    // Separate properties of each tab, e.g. Tab=['category', 'group', 'item', 'syntax', ...]
    getEachTabProperties = property => {
        this.properties.push(property);
        if (property.children && property.children.length > 0) {
            property.children.forEach(child => {
                this.getEachTabProperties(child);
            });
        }
    };
    // Get enums values of language property
    getEnumsValue = whichEnum => {
        let enumValues = null;
        if (whichEnum) {
            for (let i = 0; i < this.properties.enums.length; i++) {
                if (this.properties.enums[i].name === whichEnum) {
                    enumValues = this.properties.enums[i].values;
                    break;
                }
            }
        }

        return enumValues;
    };
    // Set property enablement
    setProperty = (schema, property, value, multipleViewPrefixId, isModifying) => {
        const { validation, absolute_path, path, controls, controls_values } = property;
        if (!property) {
            return;
        }
        // Validate the property
        if (!validation) {
            this.validateProperty(property, value);
        }
        // Set value in the schema directly
        if (!/^(null|undefined)$/i.test(value)) {
            const propertyPath = absolute_path && absolute_path.includes('properties') && /\d/g.test(absolute_path) // Exception for connections/actions functionality
                ? `${absolute_path.substring(0, absolute_path.lastIndexOf('/') + 1)}value`
                : path;
            this.setDataValueByPath(schema, property, propertyPath, value, multipleViewPrefixId, isModifying);
        }
        // Enable disable other properties
        if (controls) {
            controls.forEach(control => {
                const controlsProperty = this.getProperty(control);
                if (controlsProperty) {
                    this.setPropertyEnablement(schema, controlsProperty, undefined);
                }
            });
        }
        // If this changes the value list of other properties it may require changing the value
        // of those properties too if the current value is not within the permitted list
        if (controls_values) {
            controls_values.forEach(control_value => {
                const controlsValuesProperty = this.getProperty(control_value);
                if (controlsValuesProperty) {
                    this.ensureValueInValues(schema, controlsValuesProperty, multipleViewPrefixId, isModifying);
                }
            });
        }
    };
    // Validate property enablement condition
    validateProperty = (property, value) => {
        const validation = property.validation;
        if (validation) {
            if (!validation.regex) {
                //TODO : Find out pattern logic for javascript
                // Pattern pattern = Pattern.compile(validation.getRegex());
                // Matcher matcher = pattern.matcher(value);
                // if (!matcher.matches()) {
                // 	throw new Exception(validation.getMessage());
                // }
            }
            if (validation.condition) {
                const condition = validation.condition;
                if (!this.isExpressionTrue(condition, value)) {
                    console.log('Error: Validation error!!');
                }
            }
        }
    };
    // Ensure that the current value for a property is in the list of permitted values.
    ensureValueInValues = (schema, property, multipleViewPrefixId, isModifying) => {
        const values = this.computeValuesInContext(this.getValueList(property), schema);
        const { path, absolute_path } = property;
        if (path) {
            const actualPath = absolute_path && /\d/g.test(absolute_path)
                ? absolute_path
                : path;
            const propVal = this.getDataValueByPath(schema, actualPath);
            const isIncludedInValues = this.validateValue(values, propVal);
            if (!isIncludedInValues) {
                this.setProperty(schema, property, this.getDefaultDataSample(this.propertiesDefaultValue, property.path), multipleViewPrefixId, isModifying);
            }
        }
    };
    // Get values of values object property
    getValueList = property => {
        let enumValues = property.values;
        if (!enumValues && property.values_ref) {
            enumValues = this.getEnumsValue(property.values_ref);
        }

        return enumValues;
    };
    // Calculate onload property enable: true/false
    calculateInitialEnablement = (schema, properties) => {
        properties.forEach(property => {
            this.setPropertyEnablement(schema, property, undefined);
        });
    };
    // Set all children and descendants to the enablement state
    setPropertyTreeEnablement = (schema, properties, isEnabled) => {
        properties.forEach(property => {
            this.setPropertyEnablement(schema, property, isEnabled);
            if (property.children) {
                this.setPropertyTreeEnablement(schema, property.children, isEnabled);
            }
        });
    };
    // Set enable: true/false of a property
    setPropertyEnablement = (schema, property, isEnabled) => {
        if (isEnabled === undefined) {
            isEnabled = this.isEnabled(property, schema);
        }
        if (!property.isEnabled) { // For initial enablement and for re-enablement on update
            property.isEnabled = isEnabled;
        }
        if (property.children) {
            if (isEnabled) {
                // Calculate the enablement of the children
                this.calculateInitialEnablement(schema, property.children);
            } else if (isEnabled === false) {
                // Mark all children as disabled.
                this.setPropertyTreeEnablement(schema, property.children, isEnabled);
            }
        }
    };
    // Get default schema data sample
    getDefaultDataSample = (defaultSchemaSample, propertyPathSubStr) => {
        const path = (propertyPathSubStr.charAt(0) !== '/')
            ? `/${propertyPathSubStr}`
            : propertyPathSubStr
        let reqValue;
        if (path.includes('properties') && /\d/g.test(path)) { // Exception for connections/actions functionality
            // iterate and find the reqValue;
            kvp(defaultSchemaSample.properties).query(({ value }) => {
                if (value.name === path.substring(path.lastIndexOf('/') + 1)) {
                    reqValue = value.value;
                    return;
                }
            });
        } else {
            reqValue = kvp(defaultSchemaSample).select(`/${path}`);
        }

        return reqValue;
    };
    // Build default type properties values
    buildDefaultTypeProperties = (properties, resultObj, elementsValue, multipleViewPrefixId) => {
        properties.forEach(property => {
            if (property.hasOwnProperty('children')) {
                if (property.hasOwnProperty('type') && property.type && (property.type !== 'category')) {
                    let defaultValue = this.getDefaultValue(property);
                    defaultValue = Number.isInteger(parseInt(defaultValue, 10))
                        ? parseInt(defaultValue, 10)
                        : defaultValue;
                    if (defaultValue === 'true' || defaultValue === 'false') {
                        defaultValue = (defaultValue === 'true');
                    }
                    this.rebuildResultObj(property, resultObj, defaultValue, elementsValue, multipleViewPrefixId);
                }
                this.buildDefaultTypeProperties(property.children, resultObj, elementsValue, multipleViewPrefixId);
            } else {
                this.setDefaultPropertyValueByPath(property, resultObj, elementsValue, multipleViewPrefixId);
            }
        });
    };
    // Set default property value
    setDefaultPropertyValueByPath = (property, resultObj, elementsValue, multipleViewPrefixId) => {
        if (property.hasOwnProperty('default') || property.hasOwnProperty('defaults')) {
            let defaultValue = this.getDefaultValue(property);
            defaultValue = Number.isInteger(parseInt(defaultValue, 10))
                ? parseInt(defaultValue, 10)
                : defaultValue;
            if (defaultValue === 'true' || defaultValue === 'false') {
                defaultValue = (defaultValue === 'true');
            }
            this.rebuildResultObj(property, resultObj, defaultValue, elementsValue, multipleViewPrefixId);
        } else {
            if (property.path.includes('[]')) {
                this.rebuildResultObj(property, resultObj, [], elementsValue, multipleViewPrefixId);
            } else {
                this.rebuildResultObj(property, resultObj, '', elementsValue, multipleViewPrefixId);
            }
        }
    };
    // Create nested objects from path string
    rebuildResultObj = (property, resultObj, newValue, elementsValue, multipleViewPrefixId, propertyPath, isModifying = false) => {
        const { path, absolute_path } = property;
        const propertiesDefaultValueKeys = Object.keys(this.propertiesDefaultValue);
        const possiblePathArr = [];
        const mainPropertiesPathArr = [];
        let tempNewValue = newValue;
        if (isModifying && propertiesDefaultValueKeys.length && propertiesDefaultValueKeys.includes('properties')) { // Exception for connections/actions functionality
            // Update properties attribute's value with the already calculated default values
            const resultObjKeys = Object.keys(resultObj);
            if (resultObjKeys.length && resultObjKeys.includes('properties') && resultObj.properties.length) {
                const propertiesArr = [];
                this.propertiesDefaultValue.properties.forEach(value => {
                    const obj = resultObj.properties.find(iValue => iValue.name === value.name);
                    if (obj) {
                        propertiesArr.push(obj);
                    } else {
                        propertiesArr.push(value);
                    }
                });
                resultObj.properties = propertiesArr.filter(Boolean);
            } else {
                resultObj.properties = this.propertiesDefaultValue.properties;
            }
        }
        tempNewValue = !(/[a-z\W]+/i.test(tempNewValue))
            ? Number.isInteger(parseInt(tempNewValue, 10))
                ? parseInt(tempNewValue, 10)
                : tempNewValue
            : tempNewValue;
        if (tempNewValue === 'true' || tempNewValue === 'false') {
            tempNewValue = tempNewValue === 'true';
        }
        let patches;
        this.properties.forEach(mainProperty => {
            if (mainProperty.hasOwnProperty('path') && mainProperty.hasOwnProperty('absolute_path') && /\d/g.test(mainProperty)) {
                mainPropertiesPathArr.push(`/${mainProperty.absolute_path}`);
            } else if (mainProperty.hasOwnProperty('path')) {
                mainPropertiesPathArr.push(`/${mainProperty.path}`);
            }
        });
        kvp(resultObj).query(({ pointer }) => {
            possiblePathArr.push(pointer);
        });
        if (!propertyPath) {
            const pathStr = !propertyPath
                ? absolute_path && absolute_path.includes('properties') && /\d/g.test(absolute_path) // Exception for connections/actions functionality
                    ? absolute_path.replace(/\[\]/g, '')
                    : path.replace(/\[\]/g, '')
                : propertyPath.replace(/\[\]/g, '');
            const typeOfValue = /\d/g.test(pathStr)
                ? []
                : !absolute_path && pathStr.includes('/')
                    ? {}
                    : '';
            const pathArr = pathStr.split('/');
            let possiblePathsInCurrentPathArr = [];
            let found = true;
            let notFoundPathIndex;
            let notFoundPath;
            let notFoundPathObj;

            if (pathArr.length === 1) {
                possiblePathsInCurrentPathArr.push(`/${pathStr}`);
            } else {
                let tempNewPath = '';
                possiblePathsInCurrentPathArr = pathArr.map(subPath => {
                    tempNewPath += `/${subPath}`;

                    return tempNewPath;
                });
            }
            if (absolute_path && absolute_path.includes('properties') && /\d/g.test(pathStr)) { // Exception for connections/actions functionality
                for (let k = 0; k < possiblePathsInCurrentPathArr.length; k++) {
                    if (!possiblePathArr.includes(possiblePathsInCurrentPathArr[k]) && !possiblePathArr.includes(`/${pathStr.slice(0, pathStr.lastIndexOf('/') + 1)}value`)) {
                        notFoundPath = possiblePathsInCurrentPathArr[k];
                        notFoundPathIndex = k;
                        found = false;
                        break;
                    }
                }
            } else {
                for (let k = 0; k < possiblePathsInCurrentPathArr.length; k++) {
                    if (!possiblePathArr.includes(possiblePathsInCurrentPathArr[k])) {
                        notFoundPath = possiblePathsInCurrentPathArr[k];
                        notFoundPathIndex = k;
                        found = false;
                        break;
                    }
                }
            }
            if (!found) {
                let typeOfNotFoundValue = (notFoundPath.slice(1).length === pathStr.length)
                    ? typeOfValue
                    : (notFoundPath.slice(1).includes('/') && /\d/g.test(notFoundPath) || Object.prototype.toString.call(typeOfValue).slice(8, -1) === 'Object')
                        ? {}
                        : Object.prototype.toString.call(typeOfValue).slice(8, -1) === 'Array'
                            ? []
                            : '';
                notFoundPathObj = this.getDefaultDataSample(isModifying ? this.propertiesDefaultValue : resultObj, notFoundPath);
                if (notFoundPathObj) {
                    if (/\d/g.test(pathStr)) {
                        notFoundPathObj = Object.keys(notFoundPathObj).map(i => notFoundPathObj[i]).filter(Boolean);
                        if (absolute_path && absolute_path.includes('properties')) {
                            const tempArr = [];
                            notFoundPathObj.forEach(obj => {
                                const tempObj = Object.keys(obj).reduce(
                                    (innerObj, key) => {
                                        innerObj.name = obj.name || key;
                                        innerObj.value = obj.value || obj[key];

                                        return innerObj;
                                    },
                                    {}
                                );
                                tempArr.push(tempObj);
                            });
                            notFoundPathObj = tempArr.filter(Boolean);
                        }
                    }
                    patches = [{ op: "replace", path: notFoundPath, value: notFoundPathObj }];
                    jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                    elementsValue[`${multipleViewPrefixId}-${notFoundPath.slice(notFoundPath.lastIndexOf('/') + 1)}`] = notFoundPathObj;
                } else {
                    patches = [{ op: "add", path: notFoundPath, value: notFoundPath.slice(1).includes('/') ? typeOfNotFoundValue : typeOfValue }];
                    jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                    elementsValue[`${multipleViewPrefixId}-${notFoundPath.slice(notFoundPath.lastIndexOf('/') + 1)}`] = typeOfNotFoundValue;
                }
                try {
                    if (isModifying && absolute_path && absolute_path.includes('properties') && /\d/g.test(pathStr)) { // Exception for connections/actions functionality
                        patches = [{ op: "replace", path: `/${pathStr.slice(0, pathStr.lastIndexOf('/') + 1)}value`, value: tempNewValue }];
                        jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                    } else if (!isModifying && absolute_path && absolute_path.includes('properties') && /\d/g.test(pathStr)) { // Exception for connections/actions functionality
                        patches = [{ op: "replace", path: `/${pathStr.slice(0, pathStr.lastIndexOf('/') + 1)}name`, value: pathStr.slice(pathStr.lastIndexOf('/') + 1) }];
                        jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                        patches = [{ op: "replace", path: `/${pathStr.slice(0, pathStr.lastIndexOf('/') + 1)}value`, value: tempNewValue }];
                        jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                    } else {
                        patches = [{ op: "replace", path: `/${pathStr}`, value: tempNewValue }];
                        jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                    }
                    elementsValue[`${multipleViewPrefixId}-${pathStr.slice(pathStr.lastIndexOf('/') + 1)}`] = tempNewValue;
                } catch (err) {
                    notFoundPathIndex += 1;
                    notFoundPath = possiblePathsInCurrentPathArr[notFoundPathIndex];
                    typeOfNotFoundValue = (notFoundPath.slice(1).length === pathStr.length)
                        ? typeOfValue
                        : (notFoundPath.slice(1).includes('/') && /\d/g.test(notFoundPath) || Object.prototype.toString.call(typeOfValue).slice(8, -1) === 'Object')
                            ? {}
                            : Object.prototype.toString.call(typeOfValue).slice(8, -1) === 'Array'
                                ? []
                                : '';
                    patches = [{ op: "add", path: notFoundPath, value: typeOfNotFoundValue }];
                    jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                    if (!isModifying && absolute_path && absolute_path.includes('properties') && /\d/g.test(pathStr)) { // Exception for connections/actions functionality
                        patches = [{ op: "replace", path: `/${pathStr.slice(0, pathStr.lastIndexOf('/') + 1)}name`, value: pathStr.slice(pathStr.lastIndexOf('/') + 1) }];
                        jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                        patches = [{ op: "replace", path: `/${pathStr.slice(0, pathStr.lastIndexOf('/') + 1)}value`, value: tempNewValue }];
                        jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                    } else {
                        patches = [{ op: "replace", path: `/${pathStr}`, value: tempNewValue }];
                        jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                    }
                    elementsValue[`${multipleViewPrefixId}-${notFoundPath.slice(notFoundPath.lastIndexOf('/') + 1)}`] = typeOfNotFoundValue;
                    elementsValue[`${multipleViewPrefixId}-${pathStr.slice(pathStr.lastIndexOf('/') + 1)}`] = tempNewValue;
                }
            } else {
                if (absolute_path && absolute_path.includes('properties') && /\d/g.test(pathStr)) { // Exception for connections/actions functionality
                    patches = [{ op: "replace", path: `/${pathStr.slice(0, pathStr.lastIndexOf('/') + 1)}value`, value: tempNewValue }];
                    jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                } else {
                    patches = [{ op: "replace", path: `/${pathStr}`, value: tempNewValue }];
                    jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
                }
                elementsValue[`${multipleViewPrefixId}-${pathStr.slice(pathStr.lastIndexOf('/') + 1)}`] = tempNewValue;
            }
        } else if (mainPropertiesPathArr.includes(`/${propertyPath}`)) { // to check modifications happening via view for property without 'tab' attribute
            patches = [{ op: "replace", path: `/${propertyPath}`, value: tempNewValue }];
            jsonpatch.applyPatch(resultObj, patches).newDocument; // eslint-disable-line no-unused-expressions
            elementsValue[`${multipleViewPrefixId}-${propertyPath.replace(/\//g, '-')}`] = tempNewValue;
        }
    };
    // Method to create an object that maps a property to its id
    createAllPropertiesMap = (isInitial = true, properties) => {
        const tempProperties = isInitial ? this.properties : properties;
        tempProperties.forEach(property => {
            this.propertiesMap[property.id] = property;
        });
    };
    // Validate schema data if is in required format
    validateValue = (validValues, givenValue) => {
        // Format to boolean type
        let tempGivenValue = (givenValue === true || givenValue === false)
            ? '' + givenValue
            : givenValue;
        let isArrayOfObjects = false;
        for (let value of validValues) {
            if (Object.prototype.toString.call(value).slice(8, -1) === 'Object') {
                isArrayOfObjects = true;
                break;
            }
            break; // Exit the loop soon after 1st iteration itself
        }
        if (isArrayOfObjects) { // Handle object type
            for (let value of validValues) {
                if (value.value === tempGivenValue) {
                    tempGivenValue = true;
                    break;
                }
            }

            return tempGivenValue === true;
        } else { // Handle other types
            return validValues.includes(tempGivenValue);
        }
    };
    // Flatten dynamic properties value to consume as element value
    getElementsValue = (propertiesValue, multipleViewPrefixId, isConn = false) => {
        const pvKeys = Object.keys(propertiesValue);
        const elementsValue = {};
        let value;
        if (pvKeys.length === 0) { // Return immediately when no initial value is provided
            return { ...this.elementsValue };
        }
        pvKeys.forEach(pvKey => { // Build the value object
            if (isConn && Object.prototype.toString.call(propertiesValue[pvKey]).slice(8, -1) === 'Array') { // Exception for connections/actions functionality
                if (pvKey === 'properties') { // Remove falsy values from connections/actions properties
                    propertiesValue[pvKey] = propertiesValue[pvKey].filter(Boolean);
                }
                propertiesValue[pvKey].forEach(({ name }, i) => {
                    value = (propertiesValue[pvKey][i]['value'] === 'true')
                        ? true
                        : (propertiesValue[pvKey][i]['value'] === 'false')
                            ? false
                            : propertiesValue[pvKey][i]['value'];
                    elementsValue[`${multipleViewPrefixId}-${name}`] = value;
                });
            } else if (!isConn && Object.prototype.toString.call(propertiesValue[pvKey]).slice(8, -1) === 'Object') {
                Object.keys(propertiesValue[pvKey]).forEach(ipvKey => {
                    value = (propertiesValue[pvKey][ipvKey] === 'true')
                        ? true
                        : (propertiesValue[pvKey][ipvKey] === 'false')
                            ? false
                            : propertiesValue[pvKey][ipvKey];
                    elementsValue[`${multipleViewPrefixId}-${pvKey}-${ipvKey}`] = value;
                });
            } else {
                value = (propertiesValue[pvKey] === 'true')
                    ? true
                    : (propertiesValue[pvKey] === 'false')
                        ? false
                        : propertiesValue[pvKey];
                elementsValue[`${multipleViewPrefixId}-${pvKey}`] = value;
            }
        });

        return elementsValue;
    };
};
