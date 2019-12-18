import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
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
        text: `Description About LoadingState Component \n
        
        import { LoadingState } from 'patron-react/loadingstate'
        
        `
      }
    }
  )
  .add('Breadcrumb', () => <LoadingState type="breadcrumb" />, {
    info: {
      text: `Description About Breadcrumb LoadingState Component \n
      
      import { LoadingState } from 'patron-react/loadingstate'

      `
    }
  })
  .add('Tab', () => <LoadingState type="tab" />, {
    info: {
      text: `Description About Tab LoadingState Component \n
      
      import { LoadingState } from 'patron-react/loadingstate'

        `
    }
  })
  .add('Accordion', () => <LoadingState type="accordion" />, {
    info: {
      text: `Description About Accordion LoadingState Component\n
      
      import { LoadingState } from 'patron-react/loadingstate'

        `
    }
  })
  .add('Slider', () => <LoadingState type="slider" />, {
    info: {
      text: `Description About Slider LoadingState Component\n
      
      import { LoadingState } from 'patron-react/loadingstate'

        `
    }
  })
  .add(
    'DataTable',
    () => (
      <LoadingState
        type="datatable"
        tableData={{
          columns: [
            {
              label: 'Name',
              field: 'name'
            },
            {
              label: 'Protocol',
              field: 'protocol'
            },
            {
              label: 'Port',
              field: 'port'
            },
            {
              label: 'Rule',
              field: 'rule'
            },
            {
              label: 'Attached Groups',
              field: 'attachedGroups'
            },
            {
              label: 'Status',
              field: 'status'
            }
          ],
          rows: []
        }}
      />
    ),
    {
      info: {
        text: `Description About Slider DataTable Component\n
      
      import { LoadingState } from 'patron-react/loadingstate'

      `
      }
    }
  );
