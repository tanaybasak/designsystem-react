const fs = require('fs');
const atomsFile = require('./atoms.json');
const moleculesFile = require('./molecules.json');

let newObject = {};
const createDocumentObject = list => {
  for (let key in list) {
    if (list[key].displayName !== undefined) {
      newObject[list[key].displayName] = list[key];
    }
  }
};
createDocumentObject(atomsFile);
createDocumentObject(moleculesFile);
fs.writeFileSync(
  '.storybook/component-description.json',
  JSON.stringify(newObject),
  'utf8'
);
try {
  fs.unlinkSync('.storybook/atoms.json');
  console.log('successfully deleted atoms.json');
} catch (err) {
  // handle the error
}
try {
  fs.unlinkSync('.storybook/molecules.json');
  console.log('successfully deleted molecules.json');
} catch (err) {
  // handle the error
}
