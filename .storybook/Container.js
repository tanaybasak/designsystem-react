import React, { Component } from 'react';

export default class Container extends Component {
  componentDidMount() {
    document.body.classList.add("theme-blue_active_blue_light")
  }
  render() {
    const { story } = this.props;
    return <div>{story()}</div>;
  }
}
