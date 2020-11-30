/* eslint-disable no-console */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './molecules/Header';
import Search from './atoms/Search';
import Sidebar from './molecules/Sidebar';
import App from './app';
import TagExample from './example/Tag';
import logo from './assets/images/logo.png';
import TableExample from './example/Table';
import TreeExample from './example/Tree';
import TimePickerExample from './example/TimePicker';
import OverlayExample from './example/OverlayExample';
import CheckboxExample from './example/CheckboxExample';
import PaginationExample from './example/PaginationExample';
import SearchOverlayExample from './example/SearchOverlay';
import DateRangeSelectorExample from './example/DateRangeSelectorExample';
import DateSelectorExample from './example/DateSelectorExample';

class Home extends Component {
  state = {
    sidebarExpanded: false
  };
  navigationData = [
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
          href: '/checkbox',
          title: 'Checkbox + tooltip'
        }
      ]
    }
  ];
  render() {
    return (
      <Router>
        <Header
          logo={<img src={logo} alt="Logo" />}
          searchComponent={
            <Search
              type="clickable"
              iconTheme="white"
              onChange={event => console.log(event)}
              onBlur={event => console.log(event)}
            />
          }
          icons={[
            {
              onClick: event => console.log(event.currentTarget),
              icon: <button className={`p-hclsw p-hclsw-setting`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <button className={`p-hclsw p-hclsw-notification`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <button className={`p-hclsw p-hclsw-logout`} />
            }
          ]}
          data-withsidenav
        />
        <Sidebar
          title="Patronus"
          items={this.navigationData}
          expanded={this.state.sidebarExpanded}
          activeLink="/tag"
          icon={<i className="p-hclsw p-hclsw-user-active" />}
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
          style={{ marginTop: '4rem' }}
          data-withsidenav
        >
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/tag" component={TagExample} />
            <Route exact path="/table" component={TableExample} />
            <Route exact path="/tree" component={TreeExample} />
            <Route exact path="/timepicker" component={TimePickerExample} />
            <Route exact path="/overlay" component={OverlayExample} />
            <Route exact path="/dateselector" component={DateSelectorExample} />
            <Route
              exact
              path="/daterangeselector"
              component={DateRangeSelectorExample}
            />
            <Route exact path="/checkbox" component={CheckboxExample} />
            <Route
              exact
              path="/searchoverlay"
              component={SearchOverlayExample}
            />
            <Route exact path="/pagination" component={PaginationExample} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
