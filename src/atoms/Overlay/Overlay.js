// import React, { useRef } from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import prefix from '../../settings';
// let overlayElementRef = 1;
// const Overlay = ({ children, showOverlay ,...restProps },ref) => {
//   //const overlayContainerRef = useRef(null);

//   const overlayContainer = () => {
//     return ReactDOM.createPortal(
//       <div className={`${prefix}-overlay-container`}>
//         {children}
//       </div>,
//       document.body
//     );
//   };

//   return showOverlay ? overlayContainer() : null;
// };

// Overlay.propTypes = {
//   children: PropTypes.element.isRequired,
//   showOverlay:PropTypes.bool.isRequired
// };

// Overlay.defaultProps = {
//   children: null,
//   showOverlay:false
// };

// export default Overlay;

// import React, { useState } from 'react';
// import prefix from '../../settings';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import './overlay.css';
// const Overlay = React.forwardRef(({ ...props }, ref) => {
//   const [showOverlay, toggleOverlay] = useState(false);

//   const overlayContainer = () => {
//     return ReactDOM.createPortal(
//       <div className={`${prefix}-overlay-container`} ref={ref}>
//         {props.children}
//       </div>,
//       document.body
//     );
//   };

//   ref.showAlert = () => {
//     console.log('Toggle Component');
//   };

// //props.toggleComponent();
//   return overlayContainer();
// });

// Overlay.displayName = 'Overlay';
// Overlay.propTypes = {
//   children: PropTypes.element.isRequired,
//   showOverlay: PropTypes.bool.isRequired,
//   toggleComponent:PropTypes.func
// };

// Overlay.defaultProps = {
//   children: null,
//   showOverlay: false,
//   toggleComponent:()=>{}
// };
// export default Overlay;

import React from 'react';
import prefix from '../../settings';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { addListener, removeListeners } from '../../util/eventManager';
let tooltipElementRef = 1;
const tooltipAdjustment = 2;
import './overlay.css';
class Overlay extends React.Component {
  state = {
    showOverlay: false,
    tooltipId: tooltipElementRef++,
    position: 'top',
    currentElementPosition: null
  };

  menu = React.createRef();

  handleClick = e => {
    console.log('Handle Click');
    if (this.menu.current) {
      if (e && this.menu.current.contains(e.target)) {
        return;
      }
      removeListeners('tooltipId-' + this.state.tooltipId, 'click');
      if (this.props.scrollListner) {
        removeListeners('tooltipId-' + this.state.tooltipId, 'scroll');
      }
      this.setState({
        showOverlay: false
      });
    }
  };

  handleScroll = () => {
    console.log('Handle Scroll');
    if (this.state.currentElement) {
      const elementInfo = this.menu.current.getBoundingClientRect();

      const positions = this.getPositions(
        this.props.direction,
        elementInfo.width,
        elementInfo.height
      );
      this.menu.current.style.top = positions.top;
      this.menu.current.style.left = positions.left;
    }
  };

  showOverlay(e) {
    console.log(this.state.tooltipId);
    const position = e.currentTarget.getBoundingClientRect();
    //console.log(e.currentTarget.getBoundingClientRect());

    addListener(
      'tooltipId-' + this.state.tooltipId,
      'click',
      e => {
        this.handleClick(e);
      },
      true
    );

    if (this.props.scrollListner) {
      addListener(
        'tooltipId-' + this.state.tooltipId,
        'scroll',
        e => {
          this.handleScroll(e);
        },
        true
      );
    }

    this.setState(
      {
        showOverlay: true,
        currentElement: e.currentTarget
        //   ,
        //   top: window.pageYOffset+position.bottom+'px',
        //   left:window.pageXOffset+position.left+'px'
      },
      this.changeOverlayPosition
    );

    //console.log("==>",console.log(this.menu.current))
  }

  changeOverlayPosition = () => {
    const elementInfo = this.menu.current.getBoundingClientRect();

    const positions = this.getPositions(
      this.props.direction ? this.props.direction : 'bottom-left',
      elementInfo.width,
      elementInfo.height
    );
    this.menu.current.style.top = positions.top;
    this.menu.current.style.left = positions.left;
    this.menu.current.classList.add('hcl-overlay-container-show');
  };

  isOutofBound = (propsDirection, width, height, parentElementPosition) => {
    let outOfBound = false;
    switch (propsDirection) {
      case 'top': {
        if (parentElementPosition.top - height < tooltipAdjustment) {
          outOfBound = true;
        }
        break;
      }
      case 'bottom': {
        if (
          parentElementPosition.bottom + height >
          window.innerHeight - tooltipAdjustment
        ) {
          outOfBound = true;
        }
        break;
      }
      case 'left': {
        if (
          parentElementPosition.left + width >
          window.innerWidth - tooltipAdjustment
        ) {
          outOfBound = true;
        }
        break;
      }
      case 'right': {
        if (parentElementPosition.right - width < tooltipAdjustment) {
          outOfBound = true;
        }
        break;
      }
    }
    return outOfBound;
  };

  getDirection = (propsDirection, width, height, parentElementPosition) => {
      const splitDirection = propsDirection.split("-")
    const first = this.isOutofBound(splitDirection[0], width, height, parentElementPosition);
    const second = this.isOutofBound(splitDirection[1], width, height, parentElementPosition);

    const direOb = {
        'top' : 'bottom',
        'bottom' : 'top',
        'left' : 'right',
        'right' : 'left'
    }
    const newDirection = `${(first ? direOb[splitDirection[0]] : splitDirection[0])}-${(second ? direOb[splitDirection[1]] : splitDirection[1])}`
    return newDirection;
  };

  getPositions = (propsDirection, width, height) => {
    console.log(width);
    const parentElementPosition = this.state.currentElement.getBoundingClientRect();

    const direction = this.getDirection(
      propsDirection,
      width,
      height,
      parentElementPosition
    );
    console.log(propsDirection , "New Direction" , direction)
    let left = 0;
    let top = 0;
    switch (direction) {
      case 'bottom-left': {
        left = parentElementPosition.left;
        top = parentElementPosition.bottom;
        break;
      }
      case 'bottom-right': {
        left = parentElementPosition.right - width;
        top = parentElementPosition.bottom;

        break;
      }
      case 'top-left': {
        left = parentElementPosition.left;
        top = parentElementPosition.top - height;

        break;
      }
      case 'top-right': {
        left = parentElementPosition.right - width;
        top = parentElementPosition.top - height;

        break;
      }
    }

    return {
      left: left + window.pageXOffset + 'px',
      top: top + window.pageYOffset + 'px'
    };
  };
  render() {
    return this.state.showOverlay
      ? ReactDOM.createPortal(
          <div className={`${prefix}-overlay-container`} ref={this.menu}>
            {this.props.children}
          </div>,
          document.body
        )
      : null;
  }
}
Overlay.propTypes = {
  children: PropTypes.element.isRequired,
  direction: PropTypes.string,
  scrollListner: PropTypes.bool
};

Overlay.defaultProps = {
  children: null,
  direction: 'bottom-left',
  scrollListner: false
};
export default Overlay;
