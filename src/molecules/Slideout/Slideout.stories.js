import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, select, boolean, object } from '@storybook/addon-knobs';
import TextInput from '../../atoms/TextInput';
import Button from '../../atoms/Button';
//@update-path-build-start
import Slideout from './Slideout';
//@update-path-build-end

const typeOptions = {
  default: 'default',
  danger: 'danger',
  warning: 'warning',
  ghost: 'ghost'
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
        varient={'default'}
        type={select('type', typeOptions, 'default')}
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
        varient={'large'}
        type={select('type', typeOptions, 'default')}
        onClose={action('close button clicked')}
        onOutsideClick={action('clicked outside')}
        actions={object('Actions', actions)}
        onEscClose={boolean('isopen', true)}
      >
        <div className={`hcl-container custom-slideout-table`}>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Repeat</div>
            <div className="hcl-col-6">Monthly</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Day</div>
            <div className="hcl-col-6">1 days after 2nd Tue</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Time</div>
            <div className="hcl-col-6">16:00 IST (2days)</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Patching Duration</div>
            <div className="hcl-col-6">2 Days</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Timeout</div>
            <div className="hcl-col-6">300ms</div>
          </div>
          <div className={'hcl-row mt-8 mb-4 h-line'}>
            <div className="hcl-col-12">Configuration</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Pre-Cache Downloads</div>
            <div className="hcl-col-6">Not Required</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Stagger start time</div>
            <div className="hcl-col-6">1 hour 0 minutes</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Bypass errors</div>
            <div className="hcl-col-6">Yes</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Retry on failure</div>
            <div className="hcl-col-6">No</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">Force restart</div>
            <div className="hcl-col-6">No</div>
          </div>
          <div className={'hcl-row mt-8 mb-4 h-line'}>
            {/* <div className="hcl-col-12"> */}
            <div
              className="hcl-col-6"
              style={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              Target (devices)
            </div>
            <div
              className="hcl-col-6"
              style={{
                display: 'flex',
                flexDirection: 'row-reverse'
              }}
            >
              {' '}
              <Button
                type="ghost"
                onClick={() => {
                  this.setState({
                    currentPage: 10
                  });
                }}
              >
                Add Target
                <i className="hcl-btn-icon p-hclsw p-hclsw-user" />
              </Button>
            </div>
            {/* </div> */}
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">3 devices</div>
            <div className="hcl-col-6">&lt;target by&gt;</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">&lt;group name&gt; (5)</div>
            <div className="hcl-col-6">&lt;target by&gt;</div>
          </div>
          <div className={'hcl-row mb-3'}>
            <div className="hcl-col-6">&lt;dynamic&gt; (7)</div>
            <div className="hcl-col-6">&lt;target by&gt;</div>
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
    'direction - left',
    () => (
      <Slideout
        isOpen={boolean('isopen', true)}
        header={text('Title', 'Default')}
        varient={'default'}
        type={select('type', typeOptions, 'default')}
        direction={'left'}
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
    'direction - right',
    () => (
      <Slideout
        isOpen={boolean('isopen', true)}
        header={text('Title', 'Default')}
        varient={'default'}
        type={select('type', typeOptions, 'default')}
        direction={'right'}
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
  );
