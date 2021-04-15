import React, { Component } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import CodeSnippet from '../src/molecules/CodeSnippet';
import Notification from '../src/atoms/Notification';
import PageSubTitle from './PageSubTitle.js';
import 'prismjs/components/prism-javascript';
const prettier = require('prettier');
const parser = require('prettier/parser-babel');
const componentPathMapper = require('./folderComponentMapNew.json');
import '@patron/patron-css/patron/index.css';
import '@patron/patron-icon/dist/patron-font.css';
import '../src/story.css';
import './prism.css';
//import Document from './Document'
export default class Container extends Component {
  state = {
    importedCode: ''
  };

  componentDidMount = () => {
    const { config } = this.props;
    let importedComponent = config.parameters.info.document
      ? config.parameters.info.document
      : [];
    let subImportedComponent = config.parameters.info.internal
      ? config.parameters.info.internal
      : [];
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
        subImportStatementPathObject[componentPathMapper[imports]] = [imports];
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

    if (config.parameters.info.external) {
      importStatementArray.push(config.parameters.info.external);
    }

    this.setState({
      importedCode: importStatementArray.join('\n')
    });
  };

  render() {
    const { story, config } = this.props;
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

    let pageTitle = config.kind.substr(config.kind.lastIndexOf('/') + 1);

    let storyPushClass = ['hcl-row', 'mb-10'];

    if (pageTitle.toLowerCase() === 'slideout') {
      storyPushClass.push('slideout-story');
    }
    return (
      <div className="hcl-container hcl-storybook-container">
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

        {config.parameters.info && config.parameters.info.install ? (
          <div className="hcl-row mb-10">
            <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8">
              <PageSubTitle title="Install" />
            </div>
            <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8">
              <CodeSnippet
                height="50px"
                language="javascript"
                type="read"
                value={config.parameters.info.install}
                width="100%"
              />
            </div>
          </div>
        ) : null}

        <div className={storyPushClass.join(' ')}>
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

        {/* <div className="hcl-row">
          <div className="hcl-col-12 hcl-col-md-10 hcl-col-xl-8">
            <PageSubTitle title="Documentation" />
          </div>
          <div className="hcl-col-12">
            <Document main={config} status={true} />
          </div>
        </div> */}
      </div>
    );
  }
}
