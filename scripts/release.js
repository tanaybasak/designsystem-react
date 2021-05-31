/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const path = require('path');
const replace = require('replace');
const q = require('q');
const shell = require('shelljs');
const root = require('app-root-path').path;
const git = require('simple-git')(root);
const packageFile = path.join(__dirname, '../', 'package.json');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const BRANCH_NAME = argv.BRANCH;
let DESCRIPTION = `dev description`;

let PROCESS_VER = '';
let PROCESS_DESC = '';

PROCESS_VER = process.env.version;
PROCESS_VER = PROCESS_VER.replace(/\n/gi, '');
PROCESS_DESC = process.env.desc;

const getVersion = () => {
  if (PROCESS_VER === '' || PROCESS_DESC === '' || BRANCH_NAME === '') {
    process.exit(0);
  }
  console.log(`Version To Update: ${PROCESS_VER}`);
  console.log(`Description To Update: ${PROCESS_DESC}`);
  console.log(`Branch name is : ${BRANCH_NAME}`);
  // process.exit(0);
  return q.when(PROCESS_VER);
};

const bump = version => {
  replace({
    regex: /"version": "[^"]+"/m,
    replacement: `"version": "${version}"`,
    paths: [packageFile],
    recursive: false
  });
  return q.when(version);
};

function installPackage(ver) {
  var deferred = q.defer();

  if (!ver) {
    console.log(`No valid version!`);
    return deferred.reject(new Error(`Problem in installing packages: ${ver}`));
  }

  shell.exec('npm i', function (code, stdout, stderr) {
    if (code === 0) {
      deferred.resolve(ver);
    } else {
      deferred.reject(new Error(`Reject Reason:${code}, ${stderr}`));
    }
  });
  return deferred.promise;
}

function addAndCommit(version) {
  var deferred = q.defer();
  if (!version) {
    console.log('No valid version!');
    return deferred.reject(new Error(`Problem in ${version}`));
  }

  git.pull('origin', `${BRANCH_NAME}`, err1 => {
    if (!err1) {
      console.log(`GIT:Adding...`);
      git.add('./*').commit(`chore(release): ${version}`, () => {
        return deferred.resolve(version);
      });
    } else {
      return deferred.reject(new Error(`GIT:Pull Issue`));
    }
  });
  return deferred.promise;
}

function pushToBranch(version) {
  const deferred = q.defer();

  console.log(`GIT:Push --> ${BRANCH_NAME}`);
  git.push(['origin', `HEAD`], err => {
    if (!err) {
      console.log(`GIT:Push:Tags`);
      git.pushTags(`origin`, () => {
        return deferred.resolve(version);
      });
    } else {
      return deferred.reject(
        new Error(
          `**** Issue in Pushing to ${BRANCH_NAME} / Issue in Pushing Tags ****`
        )
      );
    }
  });
  return deferred.promise;
}

// getVersion()
// dummy()
getVersion()
  .then(version => {
    return bump(version);
  })
  .then(version => {
    return installPackage(version);
  })
  .then(version => {
    return addAndCommit(version);
  })
  .then(version => {
    return pushToBranch(version);
  })
  .done(() => {
    console.log('Tasks Completed');
  });
