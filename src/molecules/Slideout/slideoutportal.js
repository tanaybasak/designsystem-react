import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const SlideoutPortal = ({ el }) => {
  return ReactDOM.createPortal(el, document.body);
};

SlideoutPortal.defaultProps = {
  el: null
};

export default SlideoutPortal;
