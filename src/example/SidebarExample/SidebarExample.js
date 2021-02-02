import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Sidebar from '../../molecules/Sidebar';

class SidebarExample extends Component {
  state = {
    navigationData: [
      {
        title: 'Home',
        href: '/home',
        icon: <i className="p-hclsw p-hclsw-home" />,
        statusIcon: <i className="p-hclsw p-hclsw-release" />
      },
      {
        title: 'Components',
        href: '/comp',
        icon: <i className="p-hclsw p-hclsw-release" />,
        statusIcon: <i className="p-hclsw p-hclsw-release" />
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
            // icon={<i className="p-hclsw p-hclsw-user-active" />}
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
              <Route exact path="/home">
                <p className={`p-2`}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </Route>
              <Route exact path="/comp">
                <p className={`p-2`}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </p>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default SidebarExample;
