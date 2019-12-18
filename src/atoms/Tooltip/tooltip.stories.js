import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
//@update-path-build-start
import Tooltip from './Tooltip';
import Paragraph from '../Paragraph/Paragraph';
import Button from '../Button/Button';
import Link from '../Link/Link';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

const directionOption = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right'
};

storiesOf('Tooltip', module)
  .add(
    'icon',
    () => (
      <Tooltip
        content={text('Content', 'Filter')}
        direction={select('Direction', directionOption, 'bottom')}
        type="icon"
      >
        <svg
          aria-hidden="true"
          data-direction="right"
          data-tooltip="Filter"
          data-type="icon"
          focusable="false"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 4h-2.1c-.2-1.1-1.2-2-2.4-2s-2.2.9-2.4 2H1v1h7.1c.2 1.1 1.2 2 2.4 2s2.2-.9 2.4-2H15V4zm-4.5 2C9.7 6 9 5.3 9 4.5S9.7 3 10.5 3s1.5.7 1.5 1.5S11.3 6 10.5 6zM1 12h2.1c.2 1.1 1.2 2 2.4 2s2.2-.9 2.4-2H15v-1H7.9c-.2-1.1-1.2-2-2.4-2s-2.2.9-2.4 2H1v1zm4.5-2c.8 0 1.5.7 1.5 1.5S6.3 13 5.5 13 4 12.3 4 11.5 4.7 10 5.5 10z" />
        </svg>
      </Tooltip>
    ),
    {
      info: {
        text: `Description About Icon Tooltip Component \n
        
        import { Tooltip } from 'patron-react/tooltip';
        
        `
      }
    }
  )
  .add(
    'definition',
    () => (
      <Tooltip
        content={text(
          'Content',
          'Breif Definition of the dotted underlined word.'
        )}
        direction={select('Direction', directionOption, 'bottom')}
        type="definition"
      >
        Definition Tooltip
      </Tooltip>
    ),
    {
      info: {
        text: `Description About Definition Tooltip Component \n
        
        import { Tooltip } from 'patron-react/tooltip';
        
        `
      }
    }
  )
  .add(
    'interactive',
    () => (
      <Tooltip
        content={
          <div>
            <Paragraph className="">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don‘t look even
              slightly believable.
            </Paragraph>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
            >
              <Link
                className="pr-5"
                href="https://www.google.com"
                onClick={function noRefCheck() {}}
                target="_blank"
              >
                Google
              </Link>
              <Button
                className="hcl-primary"
                disabled={false}
                onClick={function noRefCheck() {}}
              >
                Create
              </Button>
            </div>
          </div>
        }
        direction={select('Direction', directionOption, 'bottom')}
        type="interactive"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          height="16"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.5 11V6.5h-2v1h1V11H6v1h4v-1zM8 3.5c-.4 0-.8.3-.8.8s.4.7.8.7.8-.3.8-.8-.4-.7-.8-.7z" />
          <path d="M8 15c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
        </svg>
      </Tooltip>
    ),
    {
      info: {
        text: `Description About Icon Tooltip Component \n
        
    import { Tooltip } from 'patron-react/tooltip';
    import { Paragraph } from 'patron-react/paragraph';
    import { Button } from 'patron-react/button';
    import { Link } from 'patron-react/link';
        
        `
      }
    }
  );
