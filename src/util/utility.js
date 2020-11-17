// To change direction of component
const positionComponent = (top, bottom, type, element) => {
  if (element) {
    const getBound = element.getBoundingClientRect();
    // To open bottom dropdown at top
    if (window.innerHeight < getBound.bottom && type === 'bottom') {
      top();
    }
    // To open top dropdown at bottom
    if (getBound.top + window.pageYOffset < 0 && type === 'top') {
      bottom();
    }
  }
};

// To handle the document click
const trackDocumentClick = (element, callback) => {
  const handler = event => {
    if (event.target !== element) {
      window.removeEventListener('click', handler);
      if (typeof callback === 'function') {
        callback();
      }
    }
  };
  window.addEventListener('click', handler);
};

export { trackDocumentClick, positionComponent };

// to validate date
export const isValidDate = (str, format) => {
  if (str) {
    let tempDate, month, year;
    const regex = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/g;
    str = str.split('/');
    if (str.length === 3 && (str[0].length === 1 || str[1].length === 1)) {
      str[0].length === 1 ? (str[0] = str[0].padStart(2, '0')) : null;
      str[1].length === 1 ? (str[1] = str[1].padStart(2, '0')) : null;
    }
    switch (format) {
      case 'mm/dd/yyyy':
        tempDate = new Date(str[2], str[0] - 1, str[1]);
        year = str[2];
        month = str[0];
        break;
      case 'dd/mm/yyyy':
        tempDate = new Date(str[2], str[1] - 1, str[0]);
        year = str[2];
        month = str[1];
        break;
    }
    if (
      tempDate &&
      tempDate.getMonth() + 1 === Number(month) &&
      regex.test(str.join('/')) &&
      Number(year) > 999
    ) {
      return true;
    }
    return false;
  }
  if (str === '') {
    return true;
  }
  return false;
};

export const getRem = value => {
  return value / 16 + 'rem';
};

// deep clone
export const clone = items => {
  let result = [];
  items.map(item => {
    result.push({ ...item });
  });
  return result;
};

export const convertToDateObj = (format, str, saperator = '/') => {
  const strArray = str.split(saperator);
  let dateObj;
  if (format === 'mm/dd/yyyy') {
    dateObj = new Date(strArray[2], strArray[0], strArray[1]);
  } else if (format === 'dd/mm/yyyy') {
    dateObj = new Date(strArray[2], strArray[1], strArray[0]);
  }
  return dateObj;
};
