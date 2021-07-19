import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overflowmenu } from '../src/molecules/Overflowmenu';
import Button from '../src/atoms/Button';
import Toggle from '../src/atoms/Toggle';
import Slideout from '../src/molecules/Slideout';
import '@patron/patron-css/patron/index.css';
import Dropdown from '../src/atoms/Dropdown';
const versionJson = require('../package.json');
const cssVersionJson = require('../node_modules/@patron/patron-css/package.json');
const PageTheme = () => {
  const [openSlideOut, setSlideoutStatus] = useState(false);
  const [selectedTheme, setTheme] = useState({
    id: 'blue_active_orange_light',
    name: 'V2 light'
  });

  const [selectedCorner, setCorner] = useState({
    id: 'sharp',
    text: 'Sharp'
  });

  const [selectedTypo, setTypography] = useState({
    id: 'hcl-productive',
    text: 'Productive'
  });

  const [selectedInput, setInput] = useState({
    id: 'sharp',
    text: 'Sharp'
  });

  let inputStyle = 'filled';
  let cornerStyle = 'sharp';
  let typoStyle = `hcl-productive`;

  const openTheme = () => {
    setSlideoutStatus(true);
  };

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
      text: 'V1 light'
    },
    {
      id: 'blue_active_blue_dark',
      text: 'V1 dark'
    },
    {
      id: 'blue_active_orange_light',
      text: 'V2 light'
    },
    {
      id: 'blue_active_orange_dark',
      text: 'V2 dark'
    }
  ];

  const input = [
    {
      id: 'filled',
      text: 'Filled'
    },
    {
      id: 'outline',
      text: 'Outline'
    }
  ];

  const corner = [
    {
      id: 'sharp',
      text: 'Sharp'
    },
    {
      id: 'small-rounded',
      text: 'Small Rounded'
    },
    {
      id: 'rounded',
      text: 'Rounded'
    }
  ];

  const typography = [
    {
      id: 'hcl-productive',
      text: 'Productive'
    },
    {
      id: 'hcl-expressive',
      text: 'Expressive'
    }
  ];

  const clearstyle = () => {
    let rootElement = document.getElementById('storybook-preview-iframe')
      .contentDocument.body;

    rootElement.classList.remove('outline-rounded');
    rootElement.classList.remove('outline-sharp');
    rootElement.classList.remove('rounded');
    rootElement.classList.remove('sharp');
    rootElement.classList.remove('filled-rounded');
    rootElement.classList.remove('filled-sharp');
  };

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
      <span style={{ fontSize: '14px' }}>
        <Button
          title="Themeing"
          type="ghost"
          small
          style={{ margin: '4px' }}
          onClick={openTheme}
        >
          Themeing
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
      </span>
      &nbsp;&nbsp;
      <Slideout
        isOpen={openSlideOut}
        header={'Theme'}
        varient={'default'}
        type={'default'}
        direction={'right'}
        overlayBackground={false}
        onClose={() => {
          setSlideoutStatus(false);
        }}
        onOutsideClick={() => {
          setSlideoutStatus(false);
        }}
        onEscClose={true}
      >
        <div className="hcl-row">
          <div className="hcl-col-12">
            <label className="hcl-label">Color </label>
            <div className="hcl-form-group">
              <Dropdown
                items={themes}
                label={'V1 light'}
                onChange={e => {
                  let rootElement = document.getElementById(
                    'storybook-preview-iframe'
                  ).contentDocument.body;
                  const style = `${inputStyle}-${cornerStyle}`;
                  rootElement.classList.remove(
                    'blue_active_blue_light',
                    'blue_active_orange_light',
                    'blue_active_blue_dark',
                    'blue_active_orange_dark'
                  );
                  rootElement.classList.add(e.id);
                  rootElement.classList.add(style);
                  setTheme(e);
                }}
              />

              <span className="hcl-helper-text">
                Class:
                <span className="color-class-name hcl-helper-text">
                  {selectedTheme.id}
                </span>
              </span>
            </div>
          </div>
          <div className="hcl-col-12">
            <label className="hcl-label">Typography</label>
            <div className="hcl-form-group">
              <Dropdown
                items={typography}
                label={'Productive'}
                onChange={e => {
                  let rootElement = document.getElementById(
                    'storybook-preview-iframe'
                  ).contentDocument.body;
                  if (e.text === 'Expressive') {
                    typoStyle = `hcl-expressive`;
                    rootElement.classList.remove(`hcl-productive`);
                    rootElement.classList.add(typoStyle);
                  } else {
                    typoStyle = `hcl-productive`;
                    rootElement.classList.remove(`hcl-expressive`);
                    rootElement.classList.add(typoStyle);
                  }
                  setTypography(e);
                }}
              />

              <span className="hcl-helper-text">
                Class:
                <span className="typo-class-name hcl-helper-text">
                  {selectedTypo.id}
                </span>
              </span>
            </div>
          </div>
          <div className="hcl-col-12">
            <label className="hcl-label"> Input </label>
            <div className="hcl-form-group">
              <Dropdown
                items={input}
                label={'Filled'}
                onChange={e => {
                  let rootElement = document.getElementById(
                    'storybook-preview-iframe'
                  ).contentDocument.body;
                  clearstyle();
                  const roundedcorner =
                    cornerStyle === 'small-rounded' ? 'rounded' : cornerStyle;
                  const style = `${e.id}-${roundedcorner}`;
                  if (e.text === 'Outline') {
                    inputStyle = 'outline';
                    rootElement.classList.add(inputStyle);
                    rootElement.classList.add(style);
                    rootElement.classList.add(cornerStyle);
                  } else {
                    inputStyle = 'filled';
                    rootElement.classList.remove('outline-sharp');
                    rootElement.classList.add(inputStyle);
                    rootElement.classList.add(style);
                    rootElement.classList.add(cornerStyle);
                  }
                  setInput(e);
                }}
              />
              <span className="hcl-helper-text">
                Class:
                <span className="typo-class-name hcl-helper-text">
                  {selectedInput.id}
                </span>
              </span>
            </div>
          </div>
          <div className="hcl-col-12">
            <label className="hcl-label"> Corner</label>
            <div className="hcl-form-group">
              <Dropdown
                items={corner}
                label={'Sharp'}
                onChange={e => {
                  let rootElement = document.getElementById(
                    'storybook-preview-iframe'
                  ).contentDocument.body;
                  clearstyle();
                  if (e.text === 'Rounded') {
                    cornerStyle = 'rounded';
                    const style = `${inputStyle}-${cornerStyle}`;
                    rootElement.classList.add(cornerStyle);
                    rootElement.classList.add(style);
                  } else if (e.text === 'Small Rounded') {
                    cornerStyle = 'small-rounded';
                    rootElement.classList.add(`${inputStyle}-rounded`);
                    rootElement.classList.add(cornerStyle);
                  } else {
                    cornerStyle = 'sharp';
                    const style = `${inputStyle}-${cornerStyle}`;
                    rootElement.classList.add(style);
                    rootElement.classList.add(cornerStyle);
                  }
                  setCorner(e);
                }}
              />
              <span className="hcl-helper-text">
                Class:
                <span className="corner-class-name hcl-helper-text">
                  {selectedCorner.id}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Slideout>
    </div>
  );
};
PageTheme.propTypes = {
  title: PropTypes.string
};

PageTheme.defaultProps = {};

export default PageTheme;
