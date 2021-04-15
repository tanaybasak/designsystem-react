import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overflowmenu } from '../src/molecules/Overflowmenu';
import Button from '../src/atoms/Button';
import '@patron/patron-css/patron/index.css';
const versionJson = require('../package.json');
const PageTheme = () => {
  const [selectedTheme, setTheme] = useState({
    id: 'blue_active_orange_light',
    name: 'V2 light'
  });

  useEffect(() => {
    if (
      document.getElementById('storybook-preview-iframe') &&
      document.getElementById('storybook-preview-iframe').contentDocument &&
      document.getElementById('storybook-preview-iframe').contentDocument.body
    ) {
      let rootElement = document.getElementById('storybook-preview-iframe')
        .contentDocument.body;
      themes.map(theme => {
        if (rootElement.classList.contains(theme.id)) {
          setTheme(theme);
        }
      });
    }
  }, []);
  const themes = [
    {
      id: 'blue_active_blue_light',
      name: 'V1 light'
    },
    {
      id: 'blue_active_blue_dark',
      name: 'V1 dark'
    },
    {
      id: 'blue_active_orange_light',
      name: 'V2 light'
    },
    {
      id: 'blue_active_orange_dark',
      name: 'V2 dark'
    }
  ];
  return (
    <div style={{ position: 'absolute', right: '100px' }}>
      <span>Patronus React Version {versionJson.version}</span>
      <Overflowmenu
        attachElementToBody
        listItems={themes}
        customTemplate={
          <Button
            title="Change Theme"
            type="ghost"
            small
            style={{ margin: '4px' }}
          >
            Theme : {selectedTheme.name}
            <svg
              className="hcl-btn-icon"
              style={{ fill: 'var(--interactive_text)' }}
              viewBox="0 0 16 16"
            >
              <rect
                data-name="&lt;Transparent Rectangle&gt;"
                width="16"
                height="16"
                fill="none"
              />
              <path
                id="color-fill"
                d="M14,14v1H2V14ZM2.71,8.77a2.51,2.51,0,0,1,0-3.54l2.5-2.5A2.5,2.5,0,0,1,6.5,2.07V1h1V2.08a2.41,2.41,0,0,1,1.24.65L13,7h0v5H12V8L8.74,11.27a2.5,2.5,0,0,1-3.53,0ZM3,7a1.46,1.46,0,0,0,.44,1.06l2.5,2.5a1.53,1.53,0,0,0,2.12,0L11.6,7,8,3.44A1.41,1.41,0,0,0,7.5,3.1V5h-1V3.08a1.46,1.46,0,0,0-.58.36l-2.5,2.5A1.46,1.46,0,0,0,3,7Z"
              />
            </svg>
          </Button>
        }
        onClick={event => {
          let rootElement = document.getElementById('storybook-preview-iframe')
            .contentDocument.body;
          let appliedTheme = 'blue_active_orange_light';
          themes.map(theme => {
            if (rootElement.classList.contains(theme.id)) {
              appliedTheme = theme.id;
            }
          });
          rootElement.classList.remove(appliedTheme);
          rootElement.classList.add(event.id);
          setTheme(event);
        }}
      />
    </div>
  );
};
PageTheme.propTypes = {
  title: PropTypes.string
};

PageTheme.defaultProps = {};

export default PageTheme;
