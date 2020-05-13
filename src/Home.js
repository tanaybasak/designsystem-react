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

class Home extends Component {
  state = {
    sidebarExpanded: false
  };
  navigationData = [
    {
      title: 'Home',
      href: '/',
      icon: <i className="pi pi-home" />
    },
    {
      title: 'Components',
      icon: <i className="pi pi-new-relases" />,
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
              icon: <span className={`hcl-icon-1 bg-white`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <span className={`hcl-icon-1 bg-white`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <span className={`hcl-icon-1 bg-white`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <span className={`hcl-icon-1 bg-white`} />
            },
            {
              onClick: event => console.log(event.currentTarget),
              icon: <span className={`hcl-icon-1 bg-white`} />
            }
          ]}
          data-withsidenav
        />
        <Sidebar
          title="Patronus"
          items={this.navigationData}
          expanded={this.state.sidebarExpanded}
          activeLink="/Tag"
          icon={<i className="pi pi-users_active" />}
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
