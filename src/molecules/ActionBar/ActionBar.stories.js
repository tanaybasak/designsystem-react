import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
//@update-path-build-start
import { ActionBar, ActionSummary, ActionList } from './index';
import Button from '../../atoms/Button';
//@update-path-build-end

const totalItems = 500;

storiesOf('Components/Actionbar', module).add(
  'default',
  () => (
    <ActionBar>
      <ActionList>
        <Button type="ghost" small onClick={action('button-click')}>
          <span>Button</span>
          <svg
            className="hcl-btn-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="https://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
              fillRule="evenodd"
            />
          </svg>
        </Button>
        <Button type="ghost" small onClick={action('button-click')}>
          <span>Button</span>
          <svg
            className="hcl-btn-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="https://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
              fillRule="evenodd"
            />
          </svg>
        </Button>
        <Button type="ghost" small onClick={action('button-click')}>
          <span>Button</span>
          <svg
            className="hcl-btn-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="https://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
              fillRule="evenodd"
            />
          </svg>
        </Button>
      </ActionList>
      <ActionSummary>
        <span className={`mr-2 hcl-type-zeta`}>{totalItems}</span>
        <span className={`hcl-actionbar-text hcl-type-zeta`}>
          items selected
        </span>
        <Button type="ghost" small onClick={action('button-click')}>
          Cancel
        </Button>
      </ActionSummary>
    </ActionBar>
  ),
  {
    info: {
      text: `Description About ActionBar Component`,
      className: 'hcl-col-12 hcl-col-lg-8',
      document: ['ActionBar', 'ActionSummary', 'ActionList'],
      internal: ['Button']
    }
  }
);
