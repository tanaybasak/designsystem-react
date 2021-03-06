export const getEnum = enumValues => {
  let newValue = [];
  enumValues.map(val => {
    const newType = val.value.replace(/'/g, '***');
    newValue.push(newType);
  });
  return `oneOf ${newValue.join(` | `)} \n\n`;
};

export const getUnion = unionValues => {
  let newValue = [];
  unionValues.map(val => {
    newValue.push(`***${val.name}***`);
  });
  return `${newValue.join(' | ')}`;
};

export const getArrayOf = value => {
  if (value.name === 'shape') {
    return `[
    ${getShapeOf(value.value)}
]`;
  } else {
    return `[ ***${value.name}*** ] \n\n`;
  }
};

export const getShapeOf = shapeObj => {
  let propType = `{...\n
`;
  for (let key in shapeObj) {
    let typeMain = shapeObj[key]['name'];
    if (typeMain === 'enum') {
      typeMain = getEnum(shapeObj[key]['value']);
    } else if (typeMain === 'union') {
      typeMain = getUnion(shapeObj[key]['value']);
    } else if (typeMain === 'arrayOf') {
      typeMain = getArrayOf(shapeObj[key]['value']);
    } else {
      typeMain = `***${typeMain}***\n\n`;
    }

    propType += `${key}${shapeObj[key]['required'] ? '?' : ''} : ${typeMain}`;
  }
  propType = `${propType}}`;
  return propType;
};
