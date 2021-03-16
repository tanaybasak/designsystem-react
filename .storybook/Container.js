import React, { Component } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import doc from './component-description.json';
import './code.css';
import DataTable from '../src/atoms/DataTable/DataTable';
import Dropdown from '../src/atoms/Dropdown/Dropdown';
import { getEnum, getArrayOf, getShapeOf, getUnion } from './docUtil.js';
import CodeSnippet from '../src/molecules/CodeSnippet/CodeSnippet';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const prettier = require('prettier');
const parser = require('prettier/parser-babel');

export default class Container extends Component {
  state = {
    importedCode: '',
    componentTableInfo: [],
    tableConfig: [
      {
        label: 'Property',
        field: 'property',
        width: '200px'
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
        label: 'Required',
        field: 'required',
        width: '100px'
      },
      {
        label: 'Default',
        field: 'default',
        width: '200px'
      },
      {
        label: 'Description',
        field: 'description',
        width: '400px'
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
    console.log(this.props);
    if (config.kind !== 'UI Pattern') {
      const index = config.parameters.info.text.indexOf('import {');
      const info = config.parameters.info.text.substring(index);
      const importedStatementArray = [];
      const lines = info.split('\n');
      let importedComponent = [];
      lines.map(line => {
        const importSingle = line.trim();
        importedStatementArray.push(importSingle);
        let modules = importSingle.match(/\{(.*?)\}/);
        if (modules && modules[1]) {
          const moduleNames = modules[1].split(',');
          moduleNames.map(module => {
            importedComponent.push(module.trim());
          });
        }
      });
      const componentTableInfo = [];
      importedComponent.map(componentName => {
        const tableData = doc[`${componentName}`];
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

            let tableObject = {
              property: key,
              propType: propType,
              required: propDe[key].required ? 'yes' : '-',
              default: propDe[key].defaultValue
                ? propDe[key].defaultValue.value
                : '',
              description: propDe[key].description
            };
            tableInfo.push(tableObject);
          });
          componentInfo['tableInfo'] = tableInfo;
          componentTableInfo.push(componentInfo);
        }
      });
      this.setState({
        importedCode: importedStatementArray.join('\n'),
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
    console.log(this.state.importedCode);
    const { story, config } = this.props;
    let code = '';
    if (config.parameters.info.snippet) {
      code = prettier.format(config.parameters.info.snippet, {
        semi: false,
        parser: 'babel',
        trailingComma: 'none',
        plugins: [parser]
      });
    } else {
      code = reactElementToJSXString(story(), { showDefaultProps: false });
    }

    return (
      <div className="hcl-container">
        {/* <div className="hcl-row mb-10">
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8  mb-10">
            <h1>{config.kind}</h1>
          </div>
        </div> */}
        <div className="hcl-row mb-10">
          <div className="hcl-col-12 hcl-col-sm-3 hcl-offset-sm-9">
            <Dropdown
              className=""
              config={{}}
              dropdownType=""
              items={this.themes}
              label="Themes Options"
              onChange={this.onThemeChange}
              type="bottom"
              selectedItem={this.getAppliedTheme()}
            />
          </div>
        </div>
        <div className="hcl-row mb-10">
          <div className={config.parameters.info && config.parameters.info.className ? config.parameters.info.className : 'hcl-col-12'}>{story()}</div>
        </div>

        <div className="hcl-row mb-10">
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8  mb-10">
            <h5>Story Source</h5>
          </div>
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8  mb-10">
            {this.state.importedCode ? (
              <CodeSnippet
                height="100%"
                language="javascript"
                type="read"
                value={prettier.format(this.state.importedCode, {
                    semi: false,
                    parser: 'babel',
                    trailingComma: 'none',
                    plugins: [parser]
                  })}
                width="100%"
              />
            ) : null}
          </div>
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8  mb-10">
            {code ? (
              <CodeSnippet
                height="100%"
                language="javascript"
                type="read"
                value={code}
                width="100%"
              />
            ) : null}
          </div>
        </div>

        <div className="hcl-document hcl-row mb-10">
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8  mb-10">
            <h5>Documentation</h5>
          </div>
          <div className="hcl-col-12 mb-10">
            {this.state.componentTableInfo.map((component, index) => {
              return (
                <div key={`${component.name}-${index}`} className="mb-5">
                  <h5 className="component-title">{component.name}</h5>
                  <DataTable
                    id={`sample_table_${index}`}
                    isHeaderSticky
                    tableConfig={this.state.tableConfig}
                    tableData={component.tableInfo}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      //   <div>
      //     <div className="theme-options-container mb-10">
      //       <div className="theme-options">
      //         <p className="mr-5">Theme Selected</p>
      //         <Dropdown
      //           className=""
      //           config={{}}
      //           dropdownType=""
      //           items={this.themes}
      //           label="Themes Options"
      //           onChange={this.onThemeChange}
      //           type="bottom"
      //           selectedItem={this.getAppliedTheme()}
      //         />
      //       </div>
      //     </div>
      //     <div id="story-root">{story()}</div>
      //     {config.kind !== 'UI Pattern' ? (
      //       <>
      //         <div className="code-snippet-container">
      //           <h5>Story Source</h5>

      //           <div className="hcl-snippet-code">
      //             <button
      //               className="hcl-snippet-copy-to-clipboard"
      //               title="Copy to clipboard"
      //               onClick={this.copyTextToClipboard.bind(
      //                 this,
      //                 this.state.importedCode
      //               )}
      //             >
      //               <svg
      //                 focusable="false"
      //                 preserveAspectRatio="xMidYMid meet"
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 width="20"
      //                 height="20"
      //                 viewBox="0 0 32 32"
      //                 aria-hidden="true"
      //               >
      //                 <path d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z" />
      //                 <path d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4z" />
      //               </svg>
      //             </button>

      //             <pre className="line-numbers">
      //               <code
      //                 className="language-javascript"
      //                 dangerouslySetInnerHTML={{
      //                   __html: Prism.highlight(
      //                     this.state.importedCode,
      //                     Prism.languages.javascript
      //                   )
      //                 }}
      //               ></code>
      //             </pre>
      //           </div>

      //           <div className="hcl-snippet-code">
      //             <button
      //               className="hcl-snippet-copy-to-clipboard"
      //               title="Copy to clipboard"
      //               onClick={this.copyTextToClipboard.bind(this, code)}
      //             >
      //               <svg
      //                 focusable="false"
      //                 preserveAspectRatio="xMidYMid meet"
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 width="20"
      //                 height="20"
      //                 viewBox="0 0 32 32"
      //                 aria-hidden="true"
      //               >
      //                 <path d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z" />
      //                 <path d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4z" />
      //               </svg>
      //             </button>

      //             <pre className="line-numbers">
      //               <code
      //                 className="language-javascript"
      //                 dangerouslySetInnerHTML={{
      //                   __html: Prism.highlight(code, Prism.languages.javascript)
      //                 }}
      //               ></code>
      //             </pre>
      //           </div>
      //         </div>
      //         <div className="hcl-document">
      // {this.state.componentTableInfo.map((component, index) => {
      //   return (
      //     <div key={`${component.name}-${index}`}>
      //       <h5 className="component-title">{component.name}</h5>
      //       <DataTable
      //         id={`sample_table_${index}`}
      //         tableConfig={this.state.tableConfig}
      //         tableData={component.tableInfo}
      //       />
      //     </div>
      //   );
      // })}
      //         </div>
      //       </>
      //     ) : null}
      //   </div>
    );
  }
}
