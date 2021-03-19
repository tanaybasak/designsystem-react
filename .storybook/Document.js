import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '@patron/patron-css/patron/index.css';
import DataTable from '../src/atoms/DataTable';
import doc from './component-description.json';
import { getEnum, getUnion, getShapeOf, getArrayOf } from './docUtil.js';

const Document = ({ main, status }) => {
  let componentTableInfo = [];
  if (status) {
    const config = main.getCurrentStoryData();

    if (config) {
      let importedComponent = config.parameters.info.document
        ? config.parameters.info.document
        : [];
      console.log(importedComponent);
      importedComponent.map(componentName => {
        let tableData = doc[`${componentName}`];
        if (!tableData) {
          tableData = chartDoc[`${componentName}`];
        }
        let propDefinitions = [];
        let propDe = {};
        if (tableData && tableData.props) {
          propDe = tableData.props;
          propDefinitions = Object.keys(propDe);
        }

        if (propDefinitions.length > 0) {
          const componentInfo = {};
          componentInfo['name'] = componentName;
          let tableInfo = [];
          let eventInfo = [];
          propDefinitions.map(key => {
            let propType = propDe[key].type ? propDe[key].type.name : '';
            if (propType === 'enum') {
              propType = getEnum(propDe[key].type.value);
            } else if (propType === 'union') {
              propType = getUnion(propDe[key].type.value);
            } else if (propType === 'shape') {
              propType = getShapeOf(propDe[key].type.value);
            } else if (propType === 'arrayOf') {
              propType = getArrayOf(propDe[key].type.value);
            } else if (propType === 'instanceOf') {
              propType = propDe[key].type.value;
            }

            if (propType === 'func') {
              let description = propDe[key].description;
              let parameters = '';
              if (description.includes('@')) {
                description = description.substr(0, description.indexOf('@'));
                parameters = propDe[key].description.substr(
                  propDe[key].description.indexOf('@')
                );
              }
              let eventObject = {
                property: key,
                parameters: parameters,
                description: description
              };
              eventInfo.push(eventObject);
            } else {
              if (!propDe[key].description.includes('@ignore')) {
                let tableObject = {
                  property: key,
                  propType: propType,
                  required: propDe[key].required,
                  default: propDe[key].defaultValue
                    ? propDe[key].defaultValue.value
                    : '',
                  description: propDe[key].description
                };
                tableInfo.push(tableObject);
              }
            }
          });
          console.log(eventInfo);
          componentInfo['tableInfo'] = tableInfo;
          componentInfo['eventInfo'] = eventInfo;
          componentTableInfo.push(componentInfo);
        }
      });
    }
  }

  return (
    <div className="hcl-container mt-9">
      <div className="hcl-row">
        <div className="hcl-col-12">
          {status &&
            componentTableInfo.map((component, index) => {
              return (
                <div key={`${component.name}-${index}`} className="mb-10">
                  <h5 className="component-title mb-5">{component.name}</h5>

                  <div className="hcl-row">
                    <div className="hcl-col-12 m-3">
                      <h6 className="mb-3">Properties</h6>
                      <DataTable
                        className="mb-3"
                        id={`sample_table_12${index}`}
                        isHeaderSticky
                        tableConfig={[
                          {
                            label: 'Property',
                            field: 'property',
                            width: '200px',
                            renderHtml: model => {
                              return (
                                <span>
                                  {model.property}
                                  {model.required ? (
                                    <span title="required">
                                      {' '}
                                      <i className="p-hclsw p-hclsw-star" />
                                    </span>
                                  ) : null}
                                </span>
                              );
                            }
                          },
                          {
                            label: 'PropType',
                            field: 'propType',
                            width: '200px',
                            renderHtml: model => {
                              return (
                                <span style={{ whiteSpace: 'pre-wrap' }}>
                                  {model.propType}
                                </span>
                              );
                            }
                          },
                          {
                            label: 'Default',
                            field: 'default',
                            width: '200px'
                          },
                          {
                            label: 'Description',
                            field: 'description',
                            width: '400px',
                            renderHtml: model => {
                              let description = model.description;

                              let text = '@signature :';
                              if (description.includes(text)) {
                                let descriptionArray = description.split('\n');
                                let newArray = [];
                                descriptionArray.map(line => {
                                  if (line.includes('@')) {
                                    const keyword = line.substring(
                                      line.indexOf('@') + 1,
                                      line.indexOf(':')
                                    );

                                    if (line.includes('@signature')) {
                                      var index = line.indexOf(text);
                                      line =
                                        line.substring(0, index) +
                                        "<span class='hcl-type-epsilon'>" +
                                        line
                                          .substring(index, index + text.length)
                                          .replace('@', '')
                                          .replace(':', '') +
                                        "</span><br/><span class='hcl-font-oblique'>" +
                                        line
                                          .substring(index + text.length)
                                          .trim() +
                                        '</span>';
                                    } else {
                                      line = line.replace(
                                        `@${keyword}`,
                                        `<span class="hcl-font-italic">${keyword}</span>`
                                      );
                                    }

                                    // const keyword1 = line.match(/@(.*) )/gs);
                                    // console.log(keyword1)
                                  }
                                  newArray.push(line);
                                });
                                description = newArray.join('\n');
                                // var index = description.indexOf(text);
                                // if (index >= 0) {
                                //   description =
                                //     description.substring(0, index) +
                                //     "<mark>" +
                                //     description.substring(index, index + text.length).replace('@' , '') +
                                //     "</mark><br/>" +
                                //     description.substring(index + text.length);
                                // }
                              }

                              return (
                                <span
                                  style={{ whiteSpace: 'pre-wrap' }}
                                  dangerouslySetInnerHTML={{
                                    __html: description
                                  }}
                                />
                              );
                            }
                          }
                        ]}
                        tableData={component.tableInfo}
                      />
                    </div>
                  </div>

                  {component.eventInfo && component.eventInfo.length > 0 ? (
                    <div className="hcl-row">
                      <div className="hcl-col-12 m-3">
                        <h6 className="mb-3">Events</h6>
                        <DataTable
                          id={`sample_table_eventasx${index}`}
                          isHeaderSticky
                          tableConfig={[
                            {
                              label: 'Property',
                              field: 'property',
                              width: '200px'
                            },
                            {
                              label: 'Parameters',
                              field: 'parameters',
                              width: '300px',
                              renderHtml: model => {
                                let description = model.parameters;
                                if (description.includes('@')) {
                                  let descriptionArray = description.split(
                                    '\n'
                                  );
                                  let newArray = [];
                                  descriptionArray.map(line => {
                                    if (line.includes('@')) {
                                      const keyword = line.substring(
                                        line.indexOf('@') + 1,
                                        line.indexOf(':')
                                      );
                                      line = line.replace(
                                        `@${keyword}`,
                                        `<span class="hcl-font-italic">${keyword}</span>`
                                      );
                                    }
                                    newArray.push(line);
                                  });
                                  description = newArray.join('\n');
                                }

                                return (
                                  <span
                                    style={{ whiteSpace: 'pre-wrap' }}
                                    dangerouslySetInnerHTML={{
                                      __html: description
                                    }}
                                  />
                                );
                              }
                            },
                            {
                              label: 'Description',
                              field: 'description',
                              width: '400px'
                            }
                          ]}
                          tableData={component.eventInfo}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          {/* <div>{main.getCurrentStoryData()}</div> */}
        </div>
      </div>
    </div>
  );
};
Document.propTypes = { main: PropTypes.object, status: PropTypes.bool };

Document.defaultProps = { main: null, status: false };

export default Document;
