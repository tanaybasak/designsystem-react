import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Overflowmenu } from '../src/molecules/Overflowmenu';
import Button from '../src/atoms/Button';
import '@patron/patron-css/patron/index.css';
const versionJson = require('../package.json')
const PageTheme = () => {
  const [selectedTheme, setTheme] = useState({
    id: 'blue_active_orange_light',
    name: 'V2 light'
  });
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
        <span>v{versionJson.version}</span>
      <Overflowmenu
        attachElementToBody
        listItems={themes}
        customTemplate={
          <Button title="Default" type="ghost" small style={{ margin: '4px' }}>
            {selectedTheme.name}
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
              <path d="M15,13a2,2,0,0,1-3.42,1.41L6.94,9.77A4.71,4.71,0,0,1,5.5,10,4.51,4.51,0,0,1,1,5.5a4.43,4.43,0,0,1,.36-1.76.49.49,0,0,1,.36-.29.53.53,0,0,1,.45.13L4.29,5.71A1,1,0,0,0,5,6,1,1,0,0,0,6,5a1,1,0,0,0-.29-.71L3.61,2.2a.56.56,0,0,1-.15-.46.49.49,0,0,1,.28-.38A4.43,4.43,0,0,1,5.5,1,4.51,4.51,0,0,1,10,5.5a4.67,4.67,0,0,1-.23,1.44l4.64,4.64A2,2,0,0,1,15,13Z" />
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
