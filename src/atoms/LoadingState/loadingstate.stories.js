import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import LoadingState from './LoadingState';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

storiesOf('LoadingState', module)
  .add(
    'default',
    () => (
      <LoadingState
        height={text('Height', '100px')}
        type="default"
        width={text('Width', '100px')}
      />
    ),
    {
      info: {
        text: 'Description About LoadingState Component'
      }
    }
  )
  .add('Breadcrumb', () => <LoadingState type="breadcrumb" />, {
    info: {
      text: 'Description About Breadcrumb LoadingState Component'
    }
  }).add('Tab', () => <LoadingState type="tab" />, {
    info: {
      text: 'Description About Tab LoadingState Component'
    }
  }).add('Accordion', () => <LoadingState type="accordion" />, {
    info: {
      text: 'Description About Accordion LoadingState Component'
    }
  })
  .add('Slider', () => <LoadingState type="slider" />, {
    info: {
      text: 'Description About Slider LoadingState Component'
    }
  })
//   .add('DataTable', () => <LoadingState type="dataTable" />, {
//     info: {
//       text: 'Description About Slider DataTable Component'
//     }
//   })
