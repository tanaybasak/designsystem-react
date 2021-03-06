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
import Overflowmenu from '../../molecules/Overflowmenu/Overflowmenu';
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

const listItems = [
  {
    name: 'Add',
    icon: 'p-hclsw p-hclsw-add-component'
  },
  {
    danger: true,
    name: 'Delete',
    icon: 'p-hclsw p-hclsw-delete'
  },
  {
    name: 'Copy',
    separator: true,
    icon: 'p-hclsw p-hclsw-copy'
  },
  {
    disabled: true,
    name: 'Paste',
    icon: 'p-hclsw p-hclsw-paste'
  },
  {
    link: 'https://google.com',
    name: 'link',
    icon: 'p-hclsw p-hclsw-link'
  }
];
const tableConfigWithCustomTemplate = [
  {
    field: 'checkbox',
    // eslint-disable-next-line react/display-name
    renderHtml: row => {
      return (
        <Checkbox
          id={`${row.id}_checkbox_`}
          aria-label="checkbox"
          name="testcheck"
        />
      );
    },

    width: '40px'
  },
  {
    label: 'Name',
    field: 'name',
    sortable: true,
    width: '60px'
  },
  {
    label: 'Protocol',
    field: 'protocol',
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
    width: '60px'
  },
  {
    label: 'Rule',
    field: 'rule',
    width: '60px'
  },
  {
    label: 'Attached Groups',
    field: 'attachedGroups',
    width: '60px'
  },
  {
    label: 'Status',
    field: 'status',
    // eslint-disable-next-line react/display-name
    renderHtml: model => {
      return (
        <Toggle
          id={`toggle-id${model.id}`}
          labelOff=" "
          labelOn=" "
          aria-label="Toggle"
          toggled={model.status === 'Active' ? true : false}
        />
      );
    },
    width: '60px'
  },
  {
    field: 'overflow',
    // eslint-disable-next-line react/display-name
    renderHtml: () => {
      return (
        <Overflowmenu
          listItems={listItems}
          attachElementToBody
          ellipsisType="vertical"
          onClick={action('Overflow Select')}
        />
      );
    },
    width: '50px'
  }
];

const tableConfigWithCustomColumn = [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Protocol',
    field: 'protocol',
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
    )
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
        ariaLabel="Search1"
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
  }
];

const tableConfigWithPinning = [
  {
    label: 'Name',
    field: 'name',
    sortable: true,
    pinned: 'left',
    width: '300px'
  },
  {
    label: 'Protocol',
    field: 'protocol',
    pinned: 'right',
    width: '300px'
  },
  {
    label: 'Port',
    field: 'port',
    width: '300px'
  },
  {
    label: 'Rule',
    field: 'rule',
    width: '300px'
  },
  {
    label: 'Attached Groups',
    field: 'attachedGroups',
    width: '300px'
  },
  {
    label: 'Status',
    field: 'status',
    width: '300px'
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

const tableConfigColumnFocus = [
  {
    label: 'Name',
    field: 'name',
    sortable: true,
    onColumnSelect: action('column-select')
  },
  {
    label: 'Protocol',
    field: 'protocol',
    onColumnSelect: action('column-select')
  },
  {
    label: 'Port',
    field: 'port',
    onColumnSelect: action('column-select')
  },
  {
    label: 'Rule',
    field: 'rule',
    onColumnSelect: action('column-select')
  },
  {
    label: 'Attached Groups',
    field: 'attachedGroups',
    onColumnSelect: action('column-select')
  },
  {
    label: 'Status',
    field: 'status',
    onColumnSelect: action('column-select')
  }
];

const tableConfigwithResize = [
  {
    label: 'Name',
    field: 'name',
    sortable: true,
    allowResize: false
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

storiesOf('Components/Data Table', module)
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
        text: `Description About DataTable Component`,
        document: ['DataTable']
      }
    }
  )
  .add(
    'with custom template',
    () => (
      <DataTable
        id="custom-datatable-custom-temp"
        tableData={tableData}
        tableConfig={tableConfigWithCustomTemplate}
        onSort={action('Sort Action')}
        headerSelection={
          <Checkbox aria-label="header checkbox" id={`header_checkbox`} />
        }
      />
    ),
    {
      info: {
        text: `Description About DataTable Component`,
        document: ['DataTable'],
        internal: ['Checkbox', 'Toggle', 'Overflowmenu', 'Tag'],
        snippet: `
<DataTable
        id="custom-datatable-custom-temp"
        tableData={${JSON.stringify(tableData)}}
        tableConfig={[
            {
              field: 'checkbox',
              // eslint-disable-next-line react/display-name
              renderHtml: row => {
                return (
                  <Checkbox
                    id={\`\${row.id}_checkbox_\`}
                    aria-label="checkbox"
                    name="testcheck"
                  />
                );
              },
          
              width: '40px'
            },
            {
              label: 'Name',
              field: 'name',
              sortable: true,
              width: '60px'
            },
            {
              label: 'Protocol',
              field: 'protocol',
              width: '60px'
            },
            {
              label: 'Port',
              field: 'port',
              // eslint-disable-next-line react/display-name
              renderHtml: port => {
                let classname = 'primary';
                return (
                  <Tag type={classname}>{\`\${port.port === '80' ? 'Yes' : 'No'}\`}</Tag>
                );
              },
              width: '60px'
            },
            {
              label: 'Rule',
              field: 'rule',
              width: '60px'
            },
            {
              label: 'Attached Groups',
              field: 'attachedGroups',
              width: '60px'
            },
            {
              label: 'Status',
              field: 'status',
              // eslint-disable-next-line react/display-name
              renderHtml: model => {
                return (
                  <Toggle
                    id={\`toggle-id\${model.id}\`}
                    labelOff=" "
                    labelOn=" "
                    aria-label="Toggle"
                    toggled={model.status === 'Active' ? true : false}
                  />
                );
              },
              width: '60px'
            },
            {
              field: 'overflow',
              // eslint-disable-next-line react/display-name
              renderHtml: () => {
                return (
                  <Overflowmenu
                    listItems={${JSON.stringify(listItems)}}
                    attachElementToBody
                    ellipsisType="vertical"
                    onClick={action('Overflow Select')}
                  />
                );
              },
              width: '50px'
            }
          ]}
        headerSelection={
          <Checkbox aria-label="header checkbox" id="header_checkbox" />
        }
      />
      `
      }
    }
  )
  .add(
    'with custom column header',
    () => (
      <DataTable
        id="custom-datatable-column"
        tableData={object('Table Data', tableData)}
        tableConfig={tableConfigWithCustomColumn}
        type={text('Type', 'zebra borderless')}
        onSort={action('Sort Action')}
      />
    ),
    {
      info: {
        text: `Description About DataTable Component`,
        document: ['DataTable'],
        internal: ['Search', 'Dropdown']
      }
    }
  )
  .add(
    'with pinning',
    () => (
      <DataTable
        id="custom-datatable-pin"
        tableData={object('Table Data', tableData)}
        tableConfig={tableConfigWithPinning}
        type={text('Type', 'zebra borderless')}
        onSort={action('Sort Action')}
        isHeaderSticky
      />
    ),
    {
      info: {
        text: `Description About DataTable Component`,
        document: ['DataTable']
      }
    }
  )
  .add(
    'with resize',
    () => (
      <DataTable
        id="custom-datatable-pin"
        tableData={object('Table Data', tableData)}
        tableConfig={tableConfigwithResize}
        type={text('Type', 'zebra borderless')}
        resizable
        onColumnAfterResize={action('column-resized')}
      />
    ),
    {
      info: {
        text: `Description About DataTable Component`,
        document: ['DataTable']
      }
    }
  )

  .add(
    'with table resizer',
    () => (
      <DataTable
        id="custom-datatable-pin"
        tableData={object('Table Data', tableData)}
        tableConfig={tableConfigwithResize}
        type={text('Type', 'zebra borderless')}
        headerSelection={
          <Checkbox aria-label="header checkbox" id={`header_checkbox`} />
        }
        resizer
      />
    ),
    {
      info: {
        text: `Description About DataTable Component`,
        document: ['DataTable']
      }
    }
  )
  .add(
    'with column reorder',
    () => (
      <DataTable
        id="data_table_1"
        type={`${boolean('Border', true) ? '' : 'borderless'}${
          boolean('Zebra', false) ? ' zebra' : ''
        }${select('Class Name', classOptions, '')}`}
        tableData={tableData}
        tableConfig={tableConfig}
        onSort={action('Sort Action')}
        columnDraggable
        showDraggableIconOnHover={boolean('Show Draggable Icon OnHover', true)}
        onColumnReorder={action('column-reorder')}
      />
    ),
    {
      info: {
        text: `Description About DataTable Component`,
        document: ['DataTable']
      }
    }
  )
  .add(
    'with row focus',
    () => (
      <DataTable
        id="data_table_1"
        type={`${boolean('Border', true) ? '' : 'borderless'}${
          boolean('Zebra', false) ? ' zebra' : ''
        }${select('Class Name', classOptions, '')}`}
        tableData={tableData}
        tableConfig={tableConfig}
        onRowSelect={action('row-select')}
      />
    ),
    {
      info: {
        text: `Description About DataTable Component`,
        document: ['DataTable']
      }
    }
  )
  .add(
    'with column focus',
    () => (
      <DataTable
        id="data_table_1"
        type={`${boolean('Border', true) ? '' : 'borderless'}${
          boolean('Zebra', false) ? ' zebra' : ''
        }${select('Class Name', classOptions, '')}`}
        tableData={tableData}
        tableConfig={tableConfigColumnFocus}
      />
    ),
    {
      info: {
        text: `Description About DataTable Component`,
        document: ['DataTable']
      }
    }
  );
