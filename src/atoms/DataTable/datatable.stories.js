import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, object, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import DataTable from './DataTable';
//@update-path-build-end

const tableData = {
  columns: [
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
  ],
  rows: [
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
      status: 'Active'
    },
    {
      name: 'Load Balancer 3',
      protocol: 'HTTP',
      port: '80',
      rule: 'Round Robin',
      attachedGroups: "Maureen's VM Groups",
      status: 'Active'
    }
  ]
};

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

const classOptions = {
  Default: '',
  Zebra: 'hcl-data-table-zebra',
  Compact: 'hcl-data-table-compact',
  Tall: 'hcl-data-table-tall',
  Borderless: 'hcl-data-table-borderless'
};
storiesOf('DataTable', module)
  .add(
    'default',
    () => (
      <DataTable
        id="sample_table_1"
        tableData={object('Table Data', tableData)}
        selectable={boolean('Selectable', false)}
        onSort={action(event)}
        className={select('Type', classOptions, 'hcl-data-table')}
      />
    ),
    {
      info: {
        text: `Description About DataTable Component

      import { DataTable } from 'patron-react/datatable'
      
      `
      }
    }
  )
  .add(
    'with overflow',
    () => (
      <DataTable
        className={select('Class Name', classOptions, '')}
        id="sample_table_1"
        tableData={object('Table Data', tableData)}
        selectable={boolean('Selectable', false)}
        onSort={action(event)}
        overflowMenu
        overflowMenuItems={object('Overflow Menu Content', overflowList)}
        overflowMenuOnClick={action(event)}
      />
    ),
    {
      info: {
        text: `Description About DataTable Component \n

        import { DataTable } from 'patron-react/datatable'
        
        `
      }
    }
  );
