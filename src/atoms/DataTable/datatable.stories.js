import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, boolean, text, object } from '@storybook/addon-knobs';
//@update-path-build-start
import DataTable from './DataTable';
import Checkbox from '../Checkbox';
import Toggle from '../Toggle';
import Overflowmenu from '../../molecules/Overflowmenu';
import Tag from '../Tag';
import Notification from '../Notification';
import Link from '../Link';
import customTableConfig from './sample-custom-table-data';
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
const overflowlist = [
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
    renderHtml: row => {
      return <Checkbox id={`${row.id}_checkbox_`} name="testcheck" />;
    },

    width: '40px',
    pinned: 'left'
  },
  {
    label: 'ID',
    field: 'id',
    columnHtml: () => {
      return (
        <Tag
          className=""
          closable={false}
          disabled={false}
          icon={<i className="p-hclsw p-hclsw-link" tabIndex="0" />}
          onClose={function noRefCheck() {}}
          tabIndex={0}
          text={null}
          thumbnail={<i className="p-hclsw p-hclsw-checkbox" />}
          title=""
          type="primary"
        >
          Sample Tag
        </Tag>
      );
    },
    width: '160px',
    pinned: 'right'
  },

  {
    label: 'Avatar',
    pinned: 'left',
    renderHtml: model => {
      return (
        <img
          src={model.owner.avatar_url}
          style={{ width: '44px', height: '44px', borderRadius: '50%' }}
        />
      );
    },
    columnHtml: () => {
      return (
        <Notification
          className=""
          closable
          icon={null}
          onClose={function noRefCheck() {}}
          subtitle="Notification Sub Title"
          title="Notification Title"
          type="info"
          visible
        />
      );
    },
    width: '60px'
  },
  {
    label: 'Full Name',
    field: 'name',
    sortable: true,
    width: '200px'
  },
  {
    label: 'Private',
    renderHtml: model => {
      let classname = 'primary';
      if (!model.owner.site_admin) {
        classname = 'secondary';
      }
      return (
        <Tag type={classname}>{`${model.owner.site_admin ? 'Yes' : 'No'}`}</Tag>
      );
    },
    width: '120px'
  },
  {
    label: 'Language',
    field: 'owner.login',

    width: '120px'
  },
  {
    label: 'Has Issues',
    field: 'has_issues',
    renderHtml: model => {
      return (
        <Toggle
          id={model.id + '--'}
          disabled
          labelOff=" "
          labelOn=" "
          toggled={model.has_issues}
        />
      );
    },
    columnHtml: () => {
      return (
        <Link className="" href="#" onClick={function noRefCheck() {}}>
          This is Link
        </Link>
      );
    },
    width: '150px'
  },
  {
    label: 'Forks Count',
    field: 'forks_count',
    width: '120px'
  },
  {
    label: 'Branch',
    field: 'default_branch',
    sortable: true,
    width: '120px'
  },
  {
    label: 'Issues Count',
    field: 'open_issues_count',
    width: '120px'
  },
  {
    field: 'overflow',
    renderHtml: row => {
      return (
        <Overflowmenu
          listItems={overflowlist}
          //className="overflow-onhover"
          onClick={e => {
            console.log(e, row);
          }}
        />
      );
    },
    width: '500px'
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
        tableData={object('Table Data', customTableConfig)}
        tableConfig={object('Table Config', tableConfigWithCustomTemplate)}
        stickyHeaderMain={boolean('Sticky Header', true)}
        type=  {text('Type', 'zebra borderless')}
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
