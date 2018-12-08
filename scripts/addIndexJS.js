'use strict';

const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const fse = require('fs-extra');
const paths = require('../config/paths');

const DIST_DIR = paths.appBuild;

const copyCoreFolder = (fromDir, toDir) => {
    fse.copySync(path.resolve(fromDir), path.resolve(toDir), {
        dereference: true,
    });
};

const deleteFolder = dir => {
    rimraf(dir, () => {
        console.log('Deleted');
    });
};

fs.readdir(DIST_DIR, (err, dirs) => {
    if (err) {
        return console.log(err);
    }
    dirs.forEach(dir => {
        if (/\d/g.test(dir)) {
            deleteFolder(`${DIST_DIR}/${dir}/`);
        }
        const writeDataInFileSync = (cssPath, dir) => {
            if (fs.existsSync(cssPath)) {
                return `require ('./${dir}.css');\nconst ${dir} = require('./${dir}.js');\n\nmodule.exports = ${dir};`;
            } else {
                return `const ${dir} = require('./${dir}.js');\n\nmodule.exports = ${dir}`;
            }
        };
        fs.writeFile(
            `${DIST_DIR}/${dir}/index.js`,
            writeDataInFileSync(`${DIST_DIR}/${dir}/${dir}.css`, dir),
            ierr => {
                if (ierr) {
                    return console.log(ierr);
                }

                console.log('File created successfully!');
            }
        );
    });
    copyCoreFolder(`${DIST_DIR}/core/`, `${DIST_DIR}/UIGenerator/core/`);
    deleteFolder(`${DIST_DIR}/core/`);
});
