import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../src/atoms/DataTable';
import doc from '../content/component-description.json';
import { getEnum, getUnion, getShapeOf, getArrayOf } from './docUtil.js';
import ReactMarkdown from 'react-markdown';
import '@patron/patron-css/patron/index.css';
import './code.css';
const WebFont = require('webfontloader');
WebFont.load({
  google: {
    families: ['Roboto+Mono', 'Roboto:ital,wght@0,400;0,500;1,400;1,500']
  }
});

const Document = ({ main, status }) => {
  let componentTableInfo = [];
  let codeSnippetSupportedLanguageTable = [];
  if (status) {
    const config = main.getCurrentStoryData();
    if (config) {
      let importedComponent = config.parameters.info.document
        ? config.parameters.info.document
        : [];
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
              propType = `***${propDe[key].type.value}***`;
            } else if (propType !== 'func') {
              propType = `***${propType}***`;
            }

            if (propType === 'func') {
              let description = propDe[key].description;
              if (!description.includes('@ignore')) {
                let desriptionArray = description.split('@signature');
                let parameters = '';
                let descriptioninfo = '';
                if (desriptionArray.length !== 2) {
                  descriptioninfo = description.trim();
                } else {
                  descriptioninfo = desriptionArray[0].trim();
                  parameters = desriptionArray[1].trim();
                }
                let eventObject = {
                  property: key,
                  parameters: parameters,
                  description: descriptioninfo
                };
                eventInfo.push(eventObject);
              }
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
          componentInfo['tableInfo'] = tableInfo;
          componentInfo['eventInfo'] = eventInfo;
          componentTableInfo.push(componentInfo);
        }
      });
      if (config.kind === 'Components/Code Snippet') {
        const addditionalInfo = config.parameters.info.additionalInfo;
        addditionalInfo.map(language => {
          codeSnippetSupportedLanguageTable.push({
            language: language
          });
        });
      }
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
                    <div className="hcl-col-12">
                      <div className="m-3">
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
                                  <ReactMarkdown
                                    className="hcl-markdown-wrapper"
                                    skipHtml={true}
                                  >
                                    {model.propType}
                                  </ReactMarkdown>
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
                                return (
                                  <ReactMarkdown
                                    className="hcl-markdown-wrapper"
                                    skipHtml={true}
                                  >
                                    {model.description}
                                  </ReactMarkdown>
                                );
                              }
                            }
                          ]}
                          tableData={component.tableInfo}
                        />
                      </div>
                    </div>
                  </div>

                  {component.eventInfo && component.eventInfo.length > 0 ? (
                    <div className="hcl-row">
                      <div className="hcl-col-12">
                        <div className="m-3">
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
                                  return (
                                    <ReactMarkdown
                                      className="hcl-markdown-wrapper"
                                      skipHtml={true}
                                    >
                                      {model.parameters}
                                    </ReactMarkdown>
                                  );
                                }
                              },
                              {
                                label: 'Description',
                                field: 'description',
                                width: '400px',
                                renderHtml: model => {
                                  return (
                                    <ReactMarkdown
                                      className="hcl-markdown-wrapper"
                                      skipHtml={true}
                                    >
                                      {model.description}
                                    </ReactMarkdown>
                                  );
                                }
                              }
                            ]}
                            tableData={component.eventInfo}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {codeSnippetSupportedLanguageTable &&
                  codeSnippetSupportedLanguageTable.length > 0 ? (
                    <div className="hcl-row">
                      <div className="hcl-col-12">
                        <div className="m-3">
                          <h6 className="mb-3">
                            Following is the list of languages and their
                            respective library that needs to be imported
                          </h6>
                          <DataTable
                            id={`codeSnippetSupportedLanguageTable`}
                            className="codeSnippetSupportedLanguageTable"
                            isHeaderSticky
                            tableConfig={[
                              {
                                label: 'Language',
                                field: 'language',
                                width: '200px'
                              },
                              {
                                label: 'Library Required',
                                field: 'library',
                                width: '300px',
                                renderHtml: model => {
                                  return (
                                    <span>{`import 'prismjs/components/prism-${model.language}';`}</span>
                                  );
                                }
                              }
                            ]}
                            tableData={codeSnippetSupportedLanguageTable}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
Document.propTypes = { main: PropTypes.object, status: PropTypes.bool };

Document.defaultProps = { main: null, status: false };

export default Document;
