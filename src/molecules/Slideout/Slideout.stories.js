import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select, boolean, object } from '@storybook/addon-knobs';
import TextInput from '../../atoms/TextInput';
//@update-path-build-start
import Slideout from './Slideout';
//@update-path-build-end

const typeOptions = {
  default: 'default',
  danger: 'danger',
  warning: 'warning',
  ghost: 'ghost'
};

const varientOptions = {
  default: 'default',
  large: 'large'
};

const directionOptions = {
  right: 'right',
  left: 'left'
};

const actions = [
  { label: 'Save', disabled: true, type: 'primary' },
  {
    label: 'Close',
    type: 'secondary'
  }
];

storiesOf('Components/Slideout', module)
  .add(
    'default',
    () => (
      <Slideout
        isOpen={boolean('isopen', true)}
        header={text('Title', 'Default')}
        type={select('type', typeOptions, 'default')}
        varient={select('varient', varientOptions, 'default')}
        direction={select('direction', directionOptions, 'right')}
        onClose={action('close button clicked')}
        onOutsideClick={action('clicked outside')}
        actions={object('Actions', actions)}
        onEscClose={boolean('isopen', true)}
      >
        <div className="hcl-row">
          <div className="hcl-col-12">
            {`Transactional modals are used to validate decisions or to gain
              secondary confirmation from the user. Typically, the modal request
              either a 'yes' or 'no' response.`}
          </div>
          <div className={`hcl-col-12 mt-10`}>
            {
              <div className="hcl-form-group">
                <TextInput
                  aria-label="text input"
                  placeholder="Placeholder Text"
                />
                <label className="hcl-label" htmlFor="labeltext">
                  Address
                </label>
                <div className="hcl-helper-text">Your current address</div>
              </div>
            }
          </div>
          <div className={`hcl-col-12`}>
            {
              <div className="hcl-form-group">
                <TextInput
                  aria-label="text input"
                  placeholder="Placeholder Text"
                />
                <label className="hcl-label" htmlFor="labeltext">
                  FGT number
                </label>
                <div className="hcl-helper-text">
                  Device config including area code
                </div>
              </div>
            }
          </div>
        </div>
      </Slideout>
    ),
    {
      info: {
        text: `Description About Slideout Component`,
        document: ['Slideout']
      }
    }
  )
  .add(
    'large',
    () => (
      <Slideout
        isOpen={boolean('isopen', true)}
        header={text('Title', 'Default')}
        type={select('type', typeOptions, 'default')}
        varient={select('varient', varientOptions, 'large')}
        direction={select('direction', directionOptions, 'right')}
        onClose={action('close button clicked')}
        onOutsideClick={action('clicked outside')}
        actions={object('Actions', actions)}
        onEscClose={boolean('isopen', true)}
      >
        <div className="hcl-row">
          <div className="hcl-col-12">
            {`Transactional modals are used to validate decisions or to gain
              secondary confirmation from the user. Typically, the modal request
              either a 'yes' or 'no' response.`}
          </div>
          <div className={`hcl-col-12 mt-10`}>
            {
              <TextInput
                aria-label="text input"
                onBlur={function noRefCheck() {}}
                onChange={function noRefCheck() {}}
                onClick={function noRefCheck() {}}
                onFocus={function noRefCheck() {}}
                placeholder="Placeholder Text"
              />
            }
          </div>
        </div>
      </Slideout>
    ),
    {
      info: {
        text: `Description About Slideout Component`,
        document: ['Slideout']
      }
    }
  );
