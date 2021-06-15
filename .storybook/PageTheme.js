import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overflowmenu } from '../src/molecules/Overflowmenu';
import Button from '../src/atoms/Button';
import Toggle from '../src/atoms/Toggle';
import '@patron/patron-css/patron/index.css';
const versionJson = require('../package.json');
const cssVersionJson = require('../node_modules/@patron/patron-css/package.json');
const PageTheme = () => {
  const [selectedTheme, setTheme] = useState({
    id: 'blue_active_orange_light',
    name: 'V2 light'
  });

  const [isRounded , setRounded] = useState(false);
  const [isOutline , setOutline] = useState(false)

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
      <span style={{ fontSize: '14px' }}>
        <span>Patronus React Version: </span>
        <span>
          <span style={{ fontWeight: 600, fontSize: '18px' }}>
            {versionJson.version}
          </span>
        </span>
      </span>
      <span>
        {' '}
        with CSS:{' '}
        <span style={{ fontWeight: 600, fontSize: '18px' }}>
          {cssVersionJson.version}
        </span>
      </span>
      &nbsp;&nbsp;
      <Toggle
        aria-label="Toggle"
        labelOff="filled"
        labelOn="outline"
        small
        id="toggle-element1"
        toggled={isOutline}
        onChange={(e)=>{
            setOutline(e);

            let rootElement = document.getElementById('storybook-preview-iframe')
            .contentDocument.body;
          rootElement.classList.remove('outline');
          rootElement.classList.remove('filled');
          rootElement.classList.remove('rounded');
          rootElement.classList.remove('sharp');
          rootElement.classList.remove('outline-rounded');
          rootElement.classList.remove('filled-rounded');
          rootElement.classList.remove('outline-sharp');
          rootElement.classList.remove('filled-sharp');
          
          if(e){
            rootElement.classList.add('outline');
            if(isRounded){
                rootElement.classList.add('outline-rounded');
                rootElement.classList.add('rounded');
            }else{
                rootElement.classList.add('outline-sharp');
                rootElement.classList.add('sharp');    
            }
          }else{
            rootElement.classList.add('filled');
            if(isRounded){
                rootElement.classList.add('filled-rounded');
                rootElement.classList.add('rounded');
            }else{
                rootElement.classList.add('filled-sharp');
                rootElement.classList.add('sharp');    
            } 
          }
          

        }}
      />
      <Toggle
        aria-label="Toggle"
        id="toggle-element2"
        labelOff="sharp"
        labelOn="rounded"
        small
        toggled={isRounded}
        onChange={(e)=>{
            setRounded(e);

            let rootElement = document.getElementById('storybook-preview-iframe')
            .contentDocument.body;
          rootElement.classList.remove('outline');
          rootElement.classList.remove('filled');
          rootElement.classList.remove('rounded');
          rootElement.classList.remove('sharp');
          rootElement.classList.remove('outline-rounded');
          rootElement.classList.remove('filled-rounded');
          rootElement.classList.remove('outline-sharp');
          rootElement.classList.remove('filled-sharp');
          
          if(e){
            rootElement.classList.add('rounded');
            if(isOutline){
                rootElement.classList.add('outline-rounded');
                rootElement.classList.add('outline');
            }else{
                rootElement.classList.add('filled-rounded');
                rootElement.classList.add('filled');    
            }
          }else{
            rootElement.classList.add('sharp');
            if(isOutline){
                rootElement.classList.add('outline-sharp');
                rootElement.classList.add('outline');
            }else{
                rootElement.classList.add('filled-sharp');
                rootElement.classList.add('filled');    
            } 
          }
        }}
      />
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
