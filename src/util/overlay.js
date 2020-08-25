const overlayAdjustment = 2;

export const visibleY = el => {
  let rect = el.getBoundingClientRect();
  const top = rect.top;
  const height = rect.height;
  let newEl = el.parentNode;
  // Check if bottom of the element is off the page
  if (rect.bottom < 0) {
    return false;
  }
  // Check its within the document viewport
  if (top > document.documentElement.clientHeight) {
    return false;
  }
  do {
    rect = newEl.getBoundingClientRect();
    // eslint-disable-next-line no-mixed-operators
    if (top <= rect.bottom === false) {
      return false;
    }
    // Check if the element is out of view due to a container scrolling
    if (top + height <= rect.top) {
      return false;
    }
    newEl = newEl.parentNode;
  } while (newEl !== document.body);
  return true;
};
export const changeOverlayPosition = (
  overlayContainerRef,
  direction,
  targetEl
) => {
  const elementInfo = overlayContainerRef.getBoundingClientRect();

  const positions = getPositions(
    direction,
    elementInfo.width,
    elementInfo.height,
    targetEl
  );
  overlayContainerRef.style.top = positions.top;
  overlayContainerRef.style.left = positions.left;
  overlayContainerRef.classList.add('hcl-overlay-container-show');

  const focusableEls = overlayContainerRef.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]'
  );
  const firstFocusableEl = focusableEls[0];
  if (firstFocusableEl) {
    firstFocusableEl.focus();
  }
};

export const isOutofBound = (
  propsDirection,
  width,
  height,
  parentElementPosition
) => {
  let outOfBound = false;
  switch (propsDirection) {
    case 'top': {
      if (parentElementPosition.top - height < overlayAdjustment) {
        outOfBound = true;
      }
      break;
    }
    case 'bottom': {
      if (
        parentElementPosition.bottom + height >
        window.innerHeight - overlayAdjustment
      ) {
        outOfBound = true;
      }
      break;
    }
    case 'left': {
      if (
        parentElementPosition.left + width >
        window.innerWidth - overlayAdjustment
      ) {
        outOfBound = true;
      }
      break;
    }
    case 'right': {
      if (parentElementPosition.right - width < overlayAdjustment) {
        outOfBound = true;
      }
      break;
    }
  }
  return outOfBound;
};

export const getDirection = (
  propsDirection,
  width,
  height,
  parentElementPosition
) => {
  const splitDirection = propsDirection.split('-');
  const first = isOutofBound(
    splitDirection[0],
    width,
    height,
    parentElementPosition
  );
  const second = isOutofBound(
    splitDirection[1],
    width,
    height,
    parentElementPosition
  );

  const direOb = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };
  const newDirection = `${
    first ? direOb[splitDirection[0]] : splitDirection[0]
  }-${second ? direOb[splitDirection[1]] : splitDirection[1]}`;
  return newDirection;
};

export const getPositions = (
  propsDirection,
  width,
  height,
  targetEl,
  attachElementToBody
) => {
  const parentElementPosition = targetEl.getBoundingClientRect();

  const direction = getDirection(
    propsDirection,
    width,
    height,
    parentElementPosition
  );

  let left = 0;
  let top = 0;
  if (attachElementToBody) {
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
      top: top + window.pageYOffset + 'px',
      direction
    };
  } else {
    switch (direction) {
      case 'bottom-left': {
        left = '0px';
        top =
          parentElementPosition.height +
          (parentElementPosition.top -
            targetEl.parentElement.getBoundingClientRect().top) +
          'px';
        break;
      }
      case 'bottom-right': {
        left = parentElementPosition.width - width + 'px';
        top =
          parentElementPosition.height +
          (parentElementPosition.top -
            targetEl.parentElement.getBoundingClientRect().top) +
          'px';

        break;
      }
      case 'top-left': {
        left = '0px';
        top =
          -height +
          (parentElementPosition.top -
            targetEl.parentElement.getBoundingClientRect().top) +
          'px';

        break;
      }
      case 'top-right': {
        left = parentElementPosition.width - width + 'px';
        top =
          -height +
          (parentElementPosition.top -
            targetEl.parentElement.getBoundingClientRect().top) +
          'px';

        break;
      }
    }

    return {
      left: left,
      top: top,
      direction
    };
  }
};
