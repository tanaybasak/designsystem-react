import React, { Component } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import doc from './component-description.json';
import DataTable from '../src/atoms/DataTable';
import { Button } from '../src/atoms/Button';
import { getEnum, getArrayOf, getShapeOf, getUnion } from './docUtil.js';
import CodeSnippet from '../src/molecules/CodeSnippet';
import Notification from '../src/atoms/Notification';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
const prettier = require('prettier');
const parser = require('prettier/parser-babel');
// import '../src/index.scss';
import '../src/story.css';
import PageSubTitle from './PageSubTitle.js';
const componentPathMapper = require("./folderComponentMapNew.json");
export default class Container extends Component {
  state = {
    importedCode: '',
    componentTableInfo: [],
    codeSnppetTableConfig: [
      {
        field: 'Language',
        label: 'Language',
        sortable: true
      },
      {
        field: 'LibraryRequired',
        label: 'Library Required'
      }
    ],
    tableConfig: [
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
            <span style={{ whiteSpace: 'pre-wrap' }}>{model.propType}</span>
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
                    line.substring(index + text.length).trim() +
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
              dangerouslySetInnerHTML={{ __html: description }}
            />
          );
        }
      }
    ]
  };

  themes = [
    {
      id: 'blue_active_orange_dark',
      text: 'V2_dark'
    },
    {
      id: 'blue_active_orange_light',
      text: 'V2_light'
    },
    {
      id: 'blue_active_blue_dark',
      text: 'V1_dark'
    },
    {
      id: 'blue_active_blue_light',
      text: 'V1_light'
    }
  ];

  fallbackCopyTextToClipboard = text => {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    //textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      console.log('success', 'copied to clipboard');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };
  copyTextToClipboard = (code, e) => {
    e.preventDefault();
    e.stopPropagation();
    let text = code;
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log('success', 'copied to clipboard');
      },
      function (err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
  };

  componentDidMount = () => {
    const { config } = this.props;

    if (config.kind !== 'Pattern/UIPattern' && config.kind !== 'Welcome') {
      const index = config.parameters.info.text.indexOf('import {');
      const info = config.parameters.info.text.substring(index);
      const importedStatementArray = [];
      const lines = info.split('\n');
      let importedComponent = config.parameters.info.document
        ? config.parameters.info.document
        : [];
      let subImportedComponent = config.parameters.info.internal
        ? config.parameters.info.internal
        : [];
      let totalImports = [...importedComponent, ...subImportedComponent];
      let importStatementArray = [];

      let importStatementPathObject = {};
      importedComponent.map(imports => {
        if (importStatementPathObject[componentPathMapper[imports]]) {
          importStatementPathObject[componentPathMapper[imports]].push(imports);
        } else {
          importStatementPathObject[componentPathMapper[imports]] = [imports];
        }
      });

      let subImportStatementPathObject = {};
      subImportedComponent.map(imports => {
        if (subImportStatementPathObject[componentPathMapper[imports]]) {
          subImportStatementPathObject[componentPathMapper[imports]].push(
            imports
          );
        } else {
          subImportStatementPathObject[componentPathMapper[imports]] = [
            imports
          ];
        }
      });
      for (let x in importStatementPathObject) {
        importStatementArray.push(
          `import {${importStatementPathObject[x].join(
            ','
          )}} from '@patron/patron-react/${x}';`
        );
      }
      for (let x in subImportStatementPathObject) {
        importStatementArray.push(
          `import {${subImportStatementPathObject[x].join(
            ','
          )}} from '@patron/patron-react/${x}';`
        );
      }

      if(config.parameters.info.external){
        importStatementArray.push(config.parameters.info.external)
      }

      //   console.log(importStatementArray)

      //   lines.map(line => {
      //     const importSingle = line.trim();
      //     importedStatementArray.push(importSingle);
      //     let modules = importSingle.match(/\{(.*?)\}/);
      //     if (modules && modules[1]) {
      //       const moduleNames = modules[1].split(",");
      //       moduleNames.map(module => {
      //         importedComponent.push(module.trim());
      //       });
      //     }
      //   });
      const componentTableInfo = [];
      importedComponent.map(componentName => {
        let tableData = doc[`${componentName}`];

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

              //     if (description.includes('@')) {
              //         let descriptionArray = description.split("\n");
              //         let newArray = [];
              //         descriptionArray.map(line => {
              //             if (line.includes("@")) {
              //     const keyword = line.substring(
              //       line.indexOf("@") + 1,
              //       line.indexOf(":")
              //     );

              //     if (line.includes("@signature")) {
              //       var index = line.indexOf(text);
              //       line =
              //         line.substring(0, index) +
              //         "<span class='hcl-type-epsilon'>" +
              //         line
              //           .substring(index, index + text.length)
              //           .replace("@", "")
              //           .replace(":", "") +
              //         "</span><br/><span class='hcl-font-oblique'>" +
              //         line.substring(index + text.length).trim() +
              //         "</span>";
              //     } else {
              //       line = line.replace(
              //         `@${keyword}`,
              //         `<span class="hcl-font-italic">${keyword}</span>`
              //       );
              //     }

              //   }
              //   newArray.push(line);
              // });
              // description = newArray.join("\n");

              let eventObject = {
                property: key,
                parameters: parameters,
                description: description
              };
              eventInfo.push(eventObject);
            } else {
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
          });
          console.log(eventInfo);
          componentInfo['tableInfo'] = tableInfo;
          componentInfo['eventInfo'] = eventInfo;
          componentTableInfo.push(componentInfo);
        }
      });

      this.setState({
        importedCode: importStatementArray.join('\n'),
        componentTableInfo: componentTableInfo
      });
    }
    //document.body.classList.add("blue_active_blue_light");
  };

  getAppliedTheme = () => {
    let appliedTheme = 'blue_active_orange_light';
    this.themes.map(theme => {
      if (document.body.classList.contains(theme.id)) {
        appliedTheme = theme.id;
      }
    });

    return appliedTheme;
  };

  onThemeChange = event => {
    let appliedTheme = this.getAppliedTheme();
    document.body.classList.remove(appliedTheme);
    document.body.classList.add(event.id);
  };

  render() {
    const { story, config } = this.props;

    // console.log(config);
    let code = '';
    if (config.parameters.info && config.parameters.info.snippet) {
      code = prettier.format(config.parameters.info.snippet.trim(), {
        semi: true,
        parser: 'babel',
        trailingComma: 'none',
        plugins: [parser]
      });
    } else {
      code = reactElementToJSXString(story(), { showDefaultProps: false });
    }

    let pageTitle = '';
    if (config.kind === 'Pattern/UIPattern') {
      pageTitle = config.name;
    } else {
      pageTitle = config.kind.substr(config.kind.lastIndexOf('/') + 1);
    }

    return (
      <div className="hcl-container">
        <div className="hcl-row mb-10">
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8  mb-10">
            <h3 style={{ fontWeight: 900 }}>{pageTitle}</h3>
          </div>
        </div>
        {config.parameters.info && config.parameters.info.warning ? (
          <div className="hcl-row mb-10">
            <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8  mb-10">
              <Notification
                subtitle={config.parameters.info.warning}
                title="Alert"
                type="warning"
                visible
              />
            </div>
          </div>
        ) : null}
        <div className="hcl-row mb-10" id="component-demo">
          <div
            className={
              config.parameters.info && config.parameters.info.className
                ? config.parameters.info.className
                : 'hcl-col-12'
            }
          >
            {story()}
          </div>
        </div>

        <div className="hcl-row mb-10">
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8">
            <PageSubTitle title="Story Source" />
          </div>
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8  mb-5">
            {this.state.importedCode ? (
              <CodeSnippet
                height="100%"
                language="javascript"
                type="read"
                value={prettier.format(this.state.importedCode, {
                  semi: true,
                  parser: 'babel',
                  trailingComma: 'none',
                  plugins: [parser]
                })}
                width="100%"
              />
            ) : null}
          </div>
          <div
            className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8"
            style={{ maxHeight: '400px' }}
          >
            {code ? (
              <CodeSnippet
                language="javascript"
                type="read"
                value={code}
                width="100%"
                height="100%"
              />
            ) : null}
          </div>
        </div>

        <div className="hcl-document hcl-row mb-10">
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8">
            {/* <PageSubTitle title='Documentation' /> */}
          </div>
          <div className="hcl-col-12">
            {false &&
              this.state.componentTableInfo.map((component, index) => {
                return (
                  <div key={`${component.name}-${index}`} className="mb-10">
                    <h5 className="component-title mb-5">{component.name}</h5>

                    <h6 className="mb-3">Properties</h6>
                    <DataTable
                      className="mb-3"
                      id={`sample_table_${index}`}
                      isHeaderSticky
                      tableConfig={this.state.tableConfig}
                      tableData={component.tableInfo}
                    />
                    <h6 className="mb-3">Events</h6>
                    <DataTable
                      id={`sample_table_event${index}`}
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
                              let descriptionArray = description.split('\n');
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
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
