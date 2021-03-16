import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
//@update-path-build-start
import LoadingState from './LoadingState';
//@update-path-build-end

storiesOf('Components/LoadingState', module)
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
        
        import { LoadingState } from '@patron/patron-react/loadingstate';
        
        `
      }
    }
  )
  .add('breadcrumb', () => <LoadingState type="breadcrumb" />, {
    info: {
      text: `Description About Breadcrumb LoadingState Component \n
      
      import { LoadingState } from '@patron/patron-react/loadingstate';

      `,
      className: 'hcl-col-12 hcl-col-lg-8'
    }
  })
  .add('tab', () => <LoadingState type="tab" />, {
    info: {
      text: `Description About Tab LoadingState Component \n
      
      import { LoadingState } from '@patron/patron-react/loadingstate';

        `,
      className: 'hcl-col-12 hcl-col-lg-8'
    }
  })
  .add('accordion', () => <LoadingState type="accordion" />, {
    info: {
      text: `Description About Accordion LoadingState Component\n
      
      import { LoadingState } from '@patron/patron-react/loadingstate';

        `,
      className: 'hcl-col-12 hcl-col-lg-8'
    }
  })
  .add('slider', () => <LoadingState type="slider" />, {
    info: {
      text: `Description About Slider LoadingState Component\n
      
      import { LoadingState } from '@patron/patron-react/loadingstate';

        `,
      className: 'hcl-col-12 hcl-col-lg-8'
    }
  })
  .add(
    'dataTable',
    () => (
      <LoadingState
        type="datatable"
        tableConfig={[
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
        ]}
      />
    ),
    {
      info: {
        text: `Description About Slider DataTable Component\n
      
      import { LoadingState } from '@patron/patron-react/loadingstate';

      `
      }
    }
  );
