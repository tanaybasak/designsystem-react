import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Sidebar from '../../molecules/Sidebar';
import TimePickerExample from '../TimePicker';
import OverlayExample from '../OverlayExample';
import CheckboxExample from '../CheckboxExample';
import PaginationExample from '../PaginationExample';

class SidebarExample extends Component {
  state = {
    navigationData: [
      {
        title: 'Home',
        href: '/',
        icon: <i className="p-hclsw p-hclsw-home" />,
        statusIcon: <i className="p-hclsw p-hclsw-release" />
      },
      {
        title: 'Components',
        icon: <i className="p-hclsw p-hclsw-release" />,
        statusIcon: <i className="p-hclsw p-hclsw-release" />,
        children: [
          {
            href: '/timepicker_new',
            title: 'Time Picker'
          },
          {
            href: '/overlay_new',
            title: 'Overlay'
          },
          {
            href: '/pagination_new',
            title: 'Pagination'
          },
          {
            href: '/checkbox_new',
            title: 'Checkbox + tooltip'
          }
        ]
      }
    ],

    sidebarExpanded: true,
    headerPosition: 'top',
    type: 'internal',
    headerbranding: 'primary'
  };
  render() {
    return (
      <div className="p-5 examples">
        <Router>
          <Sidebar
            title="Patronus"
            className={`hcl-sidebar-left`}
            items={this.state.navigationData}
            expanded={this.state.sidebarExpanded}
            activeLink="/tag"
            icon={<i className="p-hclsw p-hclsw-user-active" />}
            headerPosition={this.state.headerPosition}
            headerBranding={'primary'}
            type={this.state.type}
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
          <div
            className={`hcl-content${
              this.state.sidebarExpanded ? ' sidebar-expanded' : ''
            }`}
            data-withsidenav
          >
            <Switch>
              <Route
                exact
                path="/timepicker_new"
                component={TimePickerExample}
              />
              <Route exact path="/overlay_new" component={OverlayExample} />
              <Route exact path="/checkbox_new" component={CheckboxExample} />
              <Route
                exact
                path="/pagination_new"
                component={PaginationExample}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default SidebarExample;
