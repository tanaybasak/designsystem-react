/* eslint-disable no-console */
import React, { Component } from 'react';
import Overlay from '../../atoms/Overlay';
import Notification from '../../atoms/Notification';
import Button from '../../atoms/Button';
import List from '../../atoms/List';
import prefix from '../../settings';
const listItems = [
  {
    name: 'List Level 1',
    value: 'll-1'
  },
  {
    name: 'List 2',
    value: 'll-2'
  },
  {
    name: 'List Level 3',
    value: 'll-3'
  },
  {
    name: 'List Level 1',
    value: 'll-1'
  },
  {
    name: 'List 2',
    value: 'll-2'
  },
  {
    name: 'List Level 3',
    value: 'll-3'
  },
  {
    name: 'List Level 1',
    value: 'll-1'
  },
  {
    name: 'List 2',
    value: 'll-2'
  },
  {
    name: 'List Level 3',
    value: 'll-3'
  }
];
class OverlayExample extends Component {
  //menu = React.createRef();
  state = {
    showOverlay: false
  };

  showoverlay1 = e => {
    this.refs.child2.showOverlay(e);
  };

  showoverlay4 = e => {
    this.refs.child4.showOverlay(e);
  };

  showoverlay2 = e => {
      console.log(this.refs.child1)
    this.refs.child1.showOverlay(e);
  };

  showoverlay3 = e => {
    this.refs.child3.showOverlay(e);
  };
  render() {
    return (
      <div className='hcl-col-12 mt-5'>
        <Button onClick={this.showoverlay1}>Open Notification 1</Button>

        <Button onClick={this.showoverlay1}>Open Notification 2</Button>

        <Button onClick={this.showoverlay2}>Open Notification 3</Button>

        <Button onClick={this.showoverlay4}>Open Notification 4</Button>
        <Overlay ref='child1' direction='bottom-right'>
          <Notification
            title='Notification title'
            subtitle='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            type='warning'
            visible={true}
          />
        </Overlay>

        <Overlay ref='child2' direction='top-left'>
          <Notification
            title='Notification title'
            subtitle='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            type='info'
            visible={true}
          />
        </Overlay>

        <svg
          onClick={this.showoverlay3}
          focusable='false'
          preserveAspectRatio='xMidYMid meet'
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          aria-hidden='true'
        >
          <path d='M15 4h-2.1c-.2-1.1-1.2-2-2.4-2s-2.2.9-2.4 2H1v1h7.1c.2 1.1 1.2 2 2.4 2s2.2-.9 2.4-2H15V4zm-4.5 2C9.7 6 9 5.3 9 4.5S9.7 3 10.5 3s1.5.7 1.5 1.5S11.3 6 10.5 6zM1 12h2.1c.2 1.1 1.2 2 2.4 2s2.2-.9 2.4-2H15v-1H7.9c-.2-1.1-1.2-2-2.4-2s-2.2.9-2.4 2H1v1zm4.5-2c.8 0 1.5.7 1.5 1.5S6.3 13 5.5 13 4 12.3 4 11.5 4.7 10 5.5 10z' />
        </svg>

        <Overlay ref='child3' direction='bottom-left'>
          <List
            listItems={listItems}
            onClick={e => {
              console.log(e);
            }}
          />
        </Overlay>

        <Overlay ref='child4' direction='bottom-right'>
        <div className={`${prefix}-dropdown`}>
          <ul role='listbox' className={`${prefix}-dropdown-container`} style={{display:'block',position:'unset'}}>
            <li className={`${prefix}-dropdown-item`} role='option'>
              <a href='#' className={`${prefix}-dropdown-wrapper`}>
                Item 1
              </a>
            </li>
            <li className={`${prefix}-dropdown-item`} role='option'>
              <a href='#' className={`${prefix}-dropdown-wrapper`}>
                Item 2
              </a>
            </li>
            <li className={`${prefix}-dropdown-item`} role='option'>
              <a href='#' className={`${prefix}-dropdown-wrapper`}>
                Item 3
              </a>
            </li>
          </ul>
          </div>
        </Overlay>
      </div>
    );
  }
}

export default OverlayExample;
