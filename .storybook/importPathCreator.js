const fs = require('fs');

const rootFolder = 'src';
const rootFolders = ['atoms', 'molecules'];
let folderComponentMapNew = {};
rootFolders.forEach(rootFile => {
  const componentsFolders = fs.readdirSync(rootFolder + '/' + rootFile);
  try {
    componentsFolders.forEach(componentFolder => {
      let importData = fs.readFileSync(
        rootFolder + '/' + rootFile + '/' + componentFolder + '/index.js',
        'utf8'
      );
      let importDatamodules = importData.match(/(?<=export {\s+).*?(?=\s+})/gs);
      if (importDatamodules) {
        importDatamodules.map(importModule => {
          importModule.split(',').map(item => {
            folderComponentMapNew[item.trim()] = componentFolder.toLowerCase();
          });
        });
      } else {
        const keyword = 'export default';
        importDatamodules = importData
          .substr(importData.indexOf(keyword) + keyword.length)
          .replace(';', '');
        folderComponentMapNew[
          importDatamodules.trim()
        ] = componentFolder.toLowerCase();
      }
    });
  } catch (e) {
    console.log(e);
  }
});

fs.writeFileSync(
  '.storybook/folderComponentMapNew.json',
  JSON.stringify(folderComponentMapNew),
  'utf8'
);
