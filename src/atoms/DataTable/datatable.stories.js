import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, boolean } from '@storybook/addon-knobs';
//@update-path-build-start
import DataTable from './DataTable';
import Checkbox from '../Checkbox';
import Toggle from '../Toggle';
import Overflowmenu from '../../molecules/Overflowmenu';
//@update-path-build-end

const tableData = [
  {
    id: 1,
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active'
  },
  {
    id: 2,
    name: 'Load Balancer 2',
    protocol: 'FTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'InActive'
  },
  {
    id: 3,
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

const tableConfigWithCustomTemplate = [
  {
    field: 'checkbox',
    // eslint-disable-next-line react/display-name
    renderHtml: (row) => {
      return <Checkbox id={`${row.id}_checkbox_`} />;
    },
    width: '40px'
  },
  {
    label: 'Name',
    field: 'name',
    sortable: true,
    width: '200px'
  },
  {
    label: 'Protocol',
    field: 'protocol',
    width: '150px'
  },
  {
    label: 'Port',
    field: 'port',
    width: '100px'
  },
  {
    label: 'Rule',
    field: 'rule',
    width: '200px'
  },
  {
    label: 'Attached Groups',
    field: 'attachedGroups',
    width: '200px'
  },
  {
    label: 'Status',
    field: 'status',
    // eslint-disable-next-line react/display-name
    renderHtml: (model) => {
      return (
        <Toggle
          id={`toggleId-${model.id}`}
          disabled
          small
          labelOff=" "
          labelOn=" "
          toggled={model.status === 'Active' ? true : false}
        />
      );
    },
    width: '200px'
  },
  {
    field: 'overflow',
    // eslint-disable-next-line react/display-name
    renderHtml: () => {
      return (
        <Overflowmenu
          listItems={overflowList}
          onClick={action('overflow action')}
        />
      );
    },
    width: '100px'
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
  .add(
    'with custom template',
    () => (
      <DataTable
        id="sample_table_2"
        type={`${boolean('Border', true) ? '' : 'borderless'}${
          boolean('Zebra', false) ? ' zebra' : ''
        }${select('Class Name', classOptions, '')}`}
        tableData={tableData}
        stickyHeaderMain
        headerSelection={<Checkbox id={`header_checkbox`} />}
        tableConfig={tableConfigWithCustomTemplate}
        onSort={action('Sort Action')}
      />
    ),
    {
      info: {
        text: `Description About DataTable Component \n
        import { DataTable } from '@patron/patron-react/datatable';
    import {Checkbox} from '@patron/patron-react/checkbox';
    import {Toggle} from '@patron/patron-react/toggle';
    import {Overflowmenu} from '@patron/patron-react/overflowmenu';
    import {Tag} from '@patron/patron-react/tag';
      `
      }
    }
  );
