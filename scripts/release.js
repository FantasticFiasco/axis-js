// @ts-check

const { exec } = require('child_process');
const { readdirSync, statSync, existsSync } = require('fs');
const { join, basename } = require('path');
const { prompt } = require('inquirer');
const { info, error, fatal } = require('./log');

const packagePrompt = async () => {
    // A package is defined by the following criteria:
    //
    // - Is located in a sub-directory (non-recursive) of ./packages
    // - Directory contains a npm package file
    const rootPath = './packages';
    const packageFileName = 'package.json';
    const packages = readdirSync(rootPath)
        .map((path) => join(rootPath, path))
        .filter((path) => existsSync(join(path, packageFileName)))
        .reduce((result, path) => {
            const packageName = basename(path);

            return {
                ...result,
                [packageName]: {
                    packagePath: path,
                    packageFileName: join(path, packageFileName),
                },
            };
        }, {});

    const { packageName } = await prompt({
        type: 'list',
        name: 'packageName',
        message: 'Which package should we release?',
        choices: Object.keys(packages),
    });

    return packages[packageName];
};

/**
 * @param {{packagePath: string, packageFileName: string}} package
 */
const versionPrompt = async (package) => {
    const currentVersion = require(join(__dirname, '..', package.packageFileName)).version;
    const { newVersion } = await prompt({
        type: 'input',
        name: 'newVersion',
        message: `New version (current is ${currentVersion})`,
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
    const package = await packagePrompt();
    const newVersion = await versionPrompt(package);
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
