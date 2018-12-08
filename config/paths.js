'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const glob = require('glob');
const componentsConfig = require('./components.config');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
    const hasSlash = inputPath.endsWith('/');
    if (hasSlash && !needsSlash) {
        return inputPath.substr(0, inputPath.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${inputPath}/`;
    } else {
        return inputPath;
    }
}

const getPublicUrl = appPackageJson =>
    envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl =
        envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
}

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

function getComponentDir(resolveFn, componentDirs) {
    const componentList = {};
    Object.keys(componentDirs)
        .filter(component => (component !== 'core' && component !== 'components'))
        .forEach(component => {
            componentList[component] = resolveModule(resolveFn, `${componentDirs[component]}/${component}`);
            if (component === 'UIGenerator') {
                if (componentList.hasOwnProperty('UIGenerator')) {
                    componentList['core'] = [
                        resolveModule(resolveFn, `${componentDirs['core']}/hclUIGeneratorElementDescriptors`),
                        resolveModule(resolveFn, `${componentDirs['core']}/hclUIGeneratorUtils`),
                    ];
                }
            }
        });

    return componentList;
}

const entryFiles = glob.sync(
    './src/components/**/**/', {
        ignore: [
            './src/components/**/*.test.js'
        ]
    })
    .reduce(
        (previousValue, currentValue) => {
            return (typeof previousValue === 'string')
                ? {
                    [path.basename(previousValue, path.extname(previousValue))]: previousValue,
                    [path.basename(currentValue, path.extname(currentValue))]: currentValue
                } : {
                    ...previousValue,
                    [path.basename(currentValue, path.extname(currentValue))]: currentValue
                }
        }
    );

// config after eject: we're in ./config/
module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    proxySetup: resolveApp('src/setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
    distPaths: getComponentDir(resolveApp, entryFiles),
};



module.exports.moduleFileExtensions = moduleFileExtensions;
