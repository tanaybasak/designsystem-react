import { clone } from './utility';

export const getColumnStructure = (tableConfiguration, isExpandRow = false) => {
  let tableConfig = clone(tableConfiguration);
  let columnInfo = {
    left: [],
    main: [],
    right: []
  };
  let unitUsed = 'px';

  tableConfig.map(column => {
    if (column.pinned === 'left') {
      columnInfo['left'].push(column);
    } else if (column.pinned === 'right') {
      columnInfo['right'].push(column);
    } else {
      columnInfo['main'].push(column);
    }
  });

  let newTempConfig = [];
  if (isExpandRow) {
    newTempConfig.push({
      field: 'expand',
      width: '50px'
    });
  }
  newTempConfig = [...newTempConfig, ...columnInfo['left']];

  newTempConfig = [
    ...newTempConfig,
    ...columnInfo['main'],
    ...columnInfo['right']
  ];

  let allocatedWidth = 0;
  let totalItemsWithoutWidth = newTempConfig.length;

  newTempConfig.map(column => {
    if (column.width) {
      if (column.pinned !== 'left' && column.pinned !== 'right') {
        allocatedWidth += parseInt(column.width);
      }
      // unitUsed = column.width.replace(/[0-9]/g, '');
      unitUsed = column.width.replace(/[0-9calc\(\)\s\-\/\%]/g, '');
      totalItemsWithoutWidth--;
    }
  });

  if (allocatedWidth) {
    let leftPinned = false;
    newTempConfig.map((column, index) => {
      if (!column.width) {
        column.width = `calc((100% - ${
          allocatedWidth + unitUsed
        }) / ${totalItemsWithoutWidth})`;
      }

      if (column.pinned === 'left') {
        leftPinned = true;
        if (index !== 0) {
          column.marginLeft = getMarginLeft(newTempConfig, index);
        }
      } else {
        if (leftPinned) {
          leftPinned = false;
        }
      }
    });

    let rightPinned = false;
    for (let i = newTempConfig.length - 1; i >= 0; i--) {
      let column = newTempConfig[i];
      if (column.pinned === 'right') {
        rightPinned = true;
        if (i !== newTempConfig.length - 1) {
          column.marginRight = getMarginRight(newTempConfig, i);
        }
      } else {
        if (rightPinned) {
          rightPinned = false;
        }
      }
    }
  }
  return newTempConfig;
};

const getMarginLeft = (tempConfig, index) => {
  let width = tempConfig[index - 1].width.includes('calc')
    ? tempConfig[index - 1].width
        .substr(0, tempConfig[index - 1].width.length - 1)
        .replace('calc(', '')
    : tempConfig[index - 1].width;

  let marginLeft = tempConfig[index - 1].marginLeft
    ? tempConfig[index - 1].marginLeft.includes('calc')
      ? tempConfig[index - 1].marginLeft
          .substr(0, tempConfig[index - 1].marginLeft.length - 1)
          .replace('calc(', '')
      : tempConfig[index - 1].marginLeft
    : '0px';

  return `calc( ${width} + ${marginLeft})`;
};

const getMarginRight = (tempConfig, index) => {
  let width = tempConfig[index + 1].width.includes('calc')
    ? tempConfig[index + 1].width
        .substr(0, tempConfig[index + 1].width.length - 1)
        .replace('calc(', '')
    : tempConfig[index + 1].width;

  let marginRight = tempConfig[index + 1].marginRight
    ? tempConfig[index + 1].marginRight.includes('calc')
      ? tempConfig[index + 1].marginRight
          .substr(0, tempConfig[index + 1].marginRight.length - 1)
          .replace('calc(', '')
      : tempConfig[index + 1].marginRight
    : '0px';

  return `calc( ${width} + ${marginRight})`;
};
