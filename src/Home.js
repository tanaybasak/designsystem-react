/* eslint-disable no-console */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './molecules/Header';
import Icon from './atoms/Icon';
import Search from './atoms/Search';
import Sidebar from './molecules/Sidebar';
import App from './app';
import TagExample from './example/Tag';
import logo from './assets/images/logo.png';

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
          href: '/Tag',
          title: 'Tag'
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
