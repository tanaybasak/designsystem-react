import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, text, boolean, object } from '@storybook/addon-knobs';
//@update-path-build-start
import DataTable from './DataTable';
//@update-path-build-end
import '../../story.css';
import 'patron-css/dist/patron-style.css';

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
        "name": "option 1"
            
    },
    {
        "name": "option 2",
        "danger" : true   
    },
    {
        "name": "option 3",
        "separator" : true   
    },
    {
        "name": "option 4",
        "disabled" : true       
    },
    {
        "name": "option 5",
        "link" : "https://google.com"     
    }
]

const classOptions = {
  Default: 'hcl-data-table',
  Zebra: 'hcl-data-table hcl-data-table-zebra',
  Compact: 'hcl-data-table hcl-data-table-compact',
  Tall: 'hcl-data-table hcl-data-table-tall',
  Borderless: 'hcl-data-table hcl-data-table-borderless'
};
storiesOf('DataTable', module).add(
  'basic',
  () => (
    <DataTable
      id="sample_table_1"
      tableData={object('Data', tableData)}
      selectable
      onSort={action(event)}
      className={select('Class Name', classOptions, 'hcl-data-table')}
      // overflowMenu
      // overflowMenuItems={overflowlist}
      // overflowMenuOnClick={event =>
      //   console.log(event.currentTarget)
      // }
    />
  ),
  {
    info: {
      text: 'Description About DataTable Component'
    }
  }
).add(
    'with overflow',
    () => (
      <DataTable
        className={select('Class Name', classOptions, 'hcl-data-table')}
        id="sample_table_1"
        tableData={object('Data', tableData)}
        selectable
        onSort={action(event)}
        overflowMenu
        overflowMenuItems={object('Overflow Menu Content' , overflowList)}
        overflowMenuOnClick={action(event)
        }
      />
    ),
    {
      info: {
        text: 'Description About DataTable Component'
      }
    }
  );
