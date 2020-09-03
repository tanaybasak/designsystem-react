import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, boolean, text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import DataTable from './DataTable';
import Checkbox from '../Checkbox';
import Toggle from '../Toggle';
import Tag from '../Tag';
import Dropdown from '../Dropdown';
import Search from '../Search';
//@update-path-build-end

const tableData = [
  {
    id: 1,
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: 'Maureen VM Groups',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Load Balancer 2',
    protocol: 'FTP',
    port: '100',
    rule: 'Round Robin',
    attachedGroups: 'Maureen VM Groups',
    status: 'InActive'
  },
  {
    id: 3,
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: 'Maureen VM Groups',
    status: 'Active'
  }
];

const tableConfigWithCustomTemplate = [
  {
    field: 'checkbox',
    // eslint-disable-next-line react/display-name
    renderHtml: row => {
      return <Checkbox id={`${row.id}_checkbox_`} name="testcheck" />;
    },

    width: '40px',
    pinned: 'left'
  },
  {
    label: 'Name',
    field: 'name',
    sortable: true,
    columnHtml: (
      <Search
        ariaLabel="Search"
        className=""
        defaultValue=""
        disabled={false}
        iconTheme="default"
        onBlur={function noRefCheck() {}}
        onChange={function noRefCheck() {}}
        placeholder="Search..."
        size="default"
        theme="default"
        type="default"
      />
    ),
    width: '160px',
    pinned: 'right'
  },
  {
    label: 'Protocol',
    field: 'protocol',
    pinned: 'left',
    columnHtml: (
      <Dropdown
        className=""
        config={{}}
        dropdownType="multi"
        items={[
          {
            id: 'option-1',
            text: 'HTTP'
          },
          {
            id: 'option-2',
            text: 'FTP'
          },
          {
            id: 'option-3',
            text: 'SMTP'
          }
        ]}
        label="MultiSelect Label"
        onChange={function noRefCheck() {}}
        type="bottom"
      />
    ),
    width: '60px'
  },
  {
    label: 'Port',
    field: 'port',
    // eslint-disable-next-line react/display-name
    renderHtml: port => {
      let classname = 'primary';
      return (
        <Tag type={classname}>{`${port.port === '80' ? 'Yes' : 'No'}`}</Tag>
      );
    },
    width: '120px'
  },
  {
    label: 'Rule',
    field: 'rule'
  },
  {
    label: 'Attached Groups',
    field: 'attachedGroups',
    columnHtml: (
      <Search
        ariaLabel="Search"
        className=""
        defaultValue=""
        disabled={false}
        iconTheme="default"
        placeholder="Search..."
        size="default"
        theme="default"
        type="default"
      />
    )
  },
  {
    label: 'Status',
    field: 'status',
    // eslint-disable-next-line react/display-name
    renderHtml: model => {
      return (
        <Toggle
          id={`toggle-id${model.id}`}
          disabled
          labelOff=" "
          labelOn=" "
          toggled={model.status === 'Active' ? true : false}
        />
      );
    },
    columnHtml: (
      <Dropdown
        className=""
        config={{}}
        dropdownType="multi"
        items={[
          {
            id: 'option-1',
            text: 'Active'
          },
          {
            id: 'option-2',
            text: 'Inactive'
          }
        ]}
        label="MultiSelect Label"
        onChange={function noRefCheck() {}}
        type="bottom"
      />
    ),
    width: '150px'
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
        id="data_table_1"
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

      import { DataTable } from '@patron/patron-react/datatable';
      
      `
      }
    }
  )
  .add(
    'with custom template',
    () => (
      <DataTable
        id={text('Id', 'custom-datatable')}
        tableData={object('Table Data', tableData)}
        tableConfig={object('Table Config', tableConfigWithCustomTemplate)}
        stickyHeaderMain={boolean('Sticky Header', true)}
        type={text('Type', 'zebra borderless')}
        headerSelection={<Checkbox id={`header_checkbox`} />}
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
