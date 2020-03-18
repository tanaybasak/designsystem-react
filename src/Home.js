/* eslint-disable no-console */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './molecules/Header';
import Icon from "./atoms/Icon";
import Search from './atoms/Search';
import Sidebar from "./molecules/Sidebar";
import App from "./app";
import TagExample from "./example/Tag";
import logo from './assets/images/logo.png';

class Home extends Component {
  state = {
    sidebarExpanded: false
  };
  navigationData = [
    {
        title: "Home",
        href: "/",
        icon: (
          <Icon
            className={`hcl-sidebar-icon`}
            type={"svg"}
            alt={"alt"}
            title={"title"}
          >
            <rect
              rx={3}
              ry={3}
              width={"100%"}
              height={"100%"}
              style={{
                fill: "#fff",
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
              }}
            />
          </Icon>
        ),
    },
    {
      title: "Components",
      icon: (
        <Icon
          className={`hcl-sidebar-icon`}
          type={"svg"}
          alt={"alt"}
          title={"title"}
        >
          <rect
            rx={3}
            ry={3}
            width={"100%"}
            height={"100%"}
            style={{
              fill: "#fff",
              stroke: "black",
              strokeWidth: 2,
              opacity: 0.5
            }}
          />
        </Icon>
      ),
      childrens: [
        {
          href: "/Tag",
          title: "Tag"
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
          icon={
            <Icon
              className={`hcl-sidebar-title-icon`}
              type="svg"
              alt="alt"
              title="title"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                stroke="blue"
                strokeWidth="4"
                fill="white"
              />
            </Icon>
          }
          onClick={event => {
            const { type, expanded, title } = event.currentTarget.dataset;
            console.log(type, expanded, title);
            const container = document.querySelector("[data-withsidenav]");
            if (container && type === "toggle_sidebar") {
              this.setState({ sidebarExpanded: expanded === "true" });
            }
          }}
        />
        <div
          className={`hcl-content${
            this.state.sidebarExpanded ? " sidebar-expanded" : ""
          }`}
          style={{ marginTop: "4rem" }}
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
