// @ts-check

const { exec } = require('child_process');
const { readdirSync, statSync, existsSync } = require('fs');
const { join, basename } = require('path');
const { prompt } = require('inquirer');
const { info, error, fatal } = require('./log');

const packagePathPrompt = async () => {
    // A package is defined by the following criteria:
    //
    // - Is located in a sub-directory (non-recursive) of ./packages
    // - Directory contains a npm package file
    const rootPath = './packages';
    const packagePaths = readdirSync(rootPath)
        .map((path) => join(rootPath, path))
        .filter((path) => existsSync(join(path, 'package.json')))
        .reduce((result, path) => {
            const packageName = basename(path);

            return {
                ...result,
                [packageName]: path,
            };
        }, {});

    const { packageName } = await prompt({
        type: 'list',
        name: 'packageName',
        message: 'Which package should we release?',
        choices: Object.keys(packagePaths),
    });

    return packagePaths[packageName];
};

/**
 * @param {string} packagePath
 */
const versionPrompt = async (packagePath) => {
    const currentVersion = require(join(__dirname, '..', packagePath, 'package.json')).version;
    const { newVersion } = await prompt({
        type: 'input',
        name: 'newVersion',
        message: `New version (current is '${currentVersion}')`,
        validate: (input) => {
            // The following RegExp is the official one, copied from their website https://semver.org/
            const semVer = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
            return semVer.test(input) || 'Please enter a valid semantic version';
        },
    });

    return newVersion;
};

// const askWhetherChangelogHasBeenUpdated = async () => {
//     const { proceed } = await prompt({
//         type: 'confirm',
//         name: 'proceed',
//         message: 'Is package CHANGELOG.md up-to-date?',
//         default: false,
//     });

//     return proceed;
// };

// const getPackageNames = () => {
//     const rootPath = './packages';

//     const packages = readdirSync(rootPath)
//         .map((path) => join(rootPath, path, 'package.json'))
//         .filter((path) => existsSync(path))
//         .reduce((result, path) => {
//             const packageName = path.split('/')[1];
//             result[packageName] = {
//                 version: require(join(__dirname, '..', path)).version,
//             };

//             return result;
//         }, {});

//     return packages;
// };

const main = async () => {
    const packagePath = await packagePathPrompt();
    const newVersion = await versionPrompt(packagePath);
    console.log(newVersion);
    // const proceed = askWhetherChangelogHasBeenUpdated();
    // if (!proceed) {
    //     return;
    // }

    // const packages = getPackageNames();

    // answers = await prompt([
    //     {
    //         type: 'list',
    //         name: 'packageName',
    //         message: 'Which package should we release?',
    //         choices: Object.keys(packages),
    //     },
    //     {
    //         type: 'input',
    //         name: 'newVersion',
    //         message: `New version (current is ${packages})`,
    //     },
    // ]);
};

main().catch((err) => {
    fatal(err);
});
