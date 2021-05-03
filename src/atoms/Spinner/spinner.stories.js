/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';
//@update-path-build-start
import Spinner from './Spinner';
//@update-path-build-end

storiesOf('Components/Spinner', module)
  .add('default', () => <Spinner title={text('Title', 'Loading')} />, {
    info: {
      text: `Description About Spinner Component`,
      warning: (
        <>
          This component will soon be deprecated. Please use{' '}
          <a
            onClick={linkTo(
              'Components/Progress Indicator',
              'circle-indeterminate'
            )}
          >
            Circle Indeterminate Progress Indicator
          </a>{' '}
          in the place of Spinner
        </>
      ),
      document: ['Spinner']
    }
  })
  .add('small', () => <Spinner small label={text('Label', 'Loading..')} />, {
    info: {
      text: `Description About Spinner Component`,
      warning: (
        <>
          This component will soon be deprecated. Please use{' '}
          <a
            onClick={linkTo(
              'Components/Progress Indicator',
              'circle-indeterminate'
            )}
          >
            Circle Indeterminate Progress Indicator
          </a>{' '}
          in the place of Spinner
        </>
      ),
      document: ['Spinner']
    }
  });
