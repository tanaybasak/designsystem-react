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
    dateObj = new Date(strArray[2], strArray[0] - 1, strArray[1]);
  } else if (format === 'dd/mm/yyyy') {
    dateObj = new Date(strArray[2], strArray[1] - 1, strArray[0]);
  }
  return dateObj;
};

export const createDateObj = (date, month, year) => {
  return new Date(year, month - 1, date);
};

export const convertToDateString = (dateObj, format, saperator = '/') => {
  let dateStr;
  // console.log('dateObj', dateObj);
  if (dateObj) {
    let date = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    if (format === 'mm/dd/yyyy') {
      dateStr = `${month < 10 ? `0${month}` : month}${saperator}${
        date < 10 ? `0${date}` : date
      }${saperator}${dateObj.getFullYear()}`;
    } else if (format === 'dd/mm/yyyy') {
      dateStr = `${date < 10 ? `0${date}` : date}${saperator}${
        month < 10 ? `0${month}` : month
      }${saperator}${dateObj.getFullYear()}`;
    }
  } else {
    dateStr = '';
  }
  return dateStr;
};

export const monthDiff = (d1, d2) => {
  // d1 is start and d2 is end. d1 should always less than d2 otherwise it will return 0.
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

export const dayDiff = (d1, d2) => {
  // console.log('d1', d1);
  // console.log('d2', d2);
  let diffDays;
  if (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  ) {
    diffDays = 0;
  } else {
    let diffTime;
    if (d1 < d2) {
      diffTime = Math.abs(d2 - d1);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else {
      diffTime = Math.abs(d1 - d2);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) * -1;
    }
    // console.log(diffDays);
  }
  return diffDays;
};

export const isDateEqual = (d1, d2) => {
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return d1.getTime() === d2.getTime();
};

export const lastday = (y, m) => {
  return new Date(y, m + 1, 0).getDate();
};
