import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, object, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import DataTable from './DataTable';
//@update-path-build-end

const tableData = [
  {
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active'
  },
  {
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'InActive'
  },
  {
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active'
  }
];
const overflowList = [
  {
    name: 'option 1'
  },
  {
    name: 'option 2',
    danger: true
  },
  {
    name: 'option 3',
    separator: true
  },
  {
    name: 'option 4',
    disabled: true
  },
  {
    name: 'option 5',
    link: 'https://google.com'
  }
];

const tableConfig = [
  {
    label: 'Name',
    field: 'name',
    sortable: true
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
];

const classOptions = {
  Compact: ' compact',
  Tall: ' tall',
  Default: ''
};
storiesOf('DataTable', module)
  .add(
    'default',
    () => (
      <DataTable
        id="sample_table_1"
        type={`${boolean('Border', true) ? '' : 'borderless'}${
          boolean('Zebra', false) ? ' zebra' : ''
        }${select('Class Name', classOptions, '')}`}
        tableData={tableData}
        tableConfig={tableConfig}
        onSort={action('Sort Action')}
        totalItems={tableData.length}
      />
    ),
    {
      info: {
        text: `Description About DataTable Component

      import { DataTable } from '@patron/patron-react/datatable'
      
      `
      }
    }
  )
  
