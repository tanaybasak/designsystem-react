import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../molecules/Sidebar';

class SidebarExample extends Component {
  state = {
    navigationData: [
      {
        title: 'Home',
        href: '/',
        icon: <i className="p-hclsw p-hclsw-home" />
      },
      {
        title: 'Components',
        icon: <i className="p-hclsw p-hclsw-release" />,
        children: [
          {
            href: '/tag',
            title: 'Tag'
          },
          {
            href: '/inlineEdit',
            title: 'InlineEdit'
          },
          {
            href: '/table',
            title: 'Table'
          },
          {
            href: '/tree',
            title: 'Tree'
          },
          {
            href: '/timepicker',
            title: 'Time Picker'
          },
          {
            href: '/overlay',
            title: 'Overlay'
          },
          {
            href: '/searchoverlay',
            title: 'Search Overlay'
          },
          {
            href: '/pagination',
            title: 'Pagination'
          },
          {
            href: '/dateselector',
            title: 'DateSelector'
          },
          {
            href: '/daterangeselector',
            title: 'DateRangeSelector'
          },
          {
            href: '/progressindicator',
            title: 'Progress Indicator'
          },
          {
            href: '/in-pageNavigation',
            title: 'InPageNavigation'
          },
          {
            href: '/checkbox',
            title: 'Checkbox + tooltip'
          },
          {
            href: '/treeWithNewFolder',
            title: 'TreeviewWithNewFolder'
          },
          {
            href: '/codesnippet',
            title: 'Code Snippet'
          }
        ]
      }
    ]
  };
  render() {
    return (
      <div className="p-5 examples">
        <Sidebar
          title="Patronus"
          items={this.state.navigationData}
          expanded={true}
          activeLink="/tag"
          icon={<i className="p-hclsw p-hclsw-user-active" />}
          headerPosition={'top'}
          sidebarLinkTemplate={link => {
            return <Link to={link.href}>{link.title}</Link>;
          }}
          toggleSidebar={status => {
            const container = document.querySelector('[data-withsidenav]');
            if (container) {
              this.setState({ sidebarExpanded: status });
            }
          }}
          onClick={item => {
            console.log(item);
          }}
        />
      </div>
    );
  }
}

export default SidebarExample;
