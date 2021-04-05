import React, { Component } from 'react';
import Slideout from '../../molecules/Slideout';

class SlideoutExample extends Component {
  state = {
    isOpen: true,
    header: `Slide out Modal title`,
    footer: `sdf`,
    type: 'default',
    direction: 'left',
    varient: 'default'
  };

  openSlideout() {
    this.setState(
      {
        ...this.state,
        isOpen: true
      },
      () => {
        console.log('from example', this.state.isOpen);
      }
    );
  }

  handleClose() {
    this.setState(
      {
        ...this.state,
        isOpen: false
      },
      () => {
        console.log('from example 2', this.state.isOpen);
      }
    );
  }

  handleOutsideClick() {
    this.setState(
      {
        ...this.state,
        isOpen: false
      },
      () => {
        console.log('from example 2', this.state.isOpen);
      }
    );
  }

  render() {
    return (
      <>
        <a className={`p-10`} onClick={() => this.openSlideout()}>
          Open Slieout {JSON.stringify(this.state.isOpen)}
        </a>
        <Slideout
          isOpen={this.state.isOpen}
          header={this.state.header}
          footer={this.state.footer}
          type={this.state.type}
          varient={this.state.varient}
          direction={this.state.direction}
          onClose={this.handleClose.bind(this)}
          onOutsideClick={this.handleOutsideClick.bind(this)}
          // onEscClose={false}
        >
          hello
        </Slideout>
      </>
    );
  }
}

export default SlideoutExample;
