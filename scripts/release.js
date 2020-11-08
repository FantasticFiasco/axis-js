// @ts-check

const { exec } = require('child_process');
const { readdirSync, statSync, existsSync } = require('fs');
const { join, basename } = require('path');
const { prompt } = require('inquirer');
const { info, error, fatal } = require('./log');

/**
 * A package is defined by the following criteria:
 *
 * - Is located in a sub-directory (non-recursive) of ./packages
 * - Directory contains a npm package file
 */
const getPackageNames = () => {
    const rootPath = './packages';

    const packages = readdirSync(rootPath)
        .map((path) => join(rootPath, path))
        .filter((path) => statSync(path).isDirectory())
        .filter((path) => existsSync(join(path, 'package.json')))
        .map((path) => basename(path));

    return packages;
};

/**
 * @param {string} packageName
 */
const createRelease = (packageName) => {
    return new Promise((resolve, reject) => {
        const cmd = `yarn workspace ${packageName} version`;
        info(cmd);

        exec(cmd, (err, stdout, stderr) => {
            info(stdout);

            if (err) {
                error(stderr);
                reject(err);
                return;
            }

            resolve();
        });
    });
};

const main = async () => {
    const packageNames = getPackageNames();

    const questions = [
        {
            type: 'list',
            name: 'packageName',
            message: 'Which package should we release?',
            choices: packageNames,
        },
        {
            type: 'confirm',
            name: 'changelogUpdated',
            message: 'Is package CHANGELOG.md up-to-date?',
            default: false,
        },
    ];

    const answers = await prompt(questions);

    if (!answers.changelogUpdated) {
        return;
    }

    await createRelease(answers.package);
};

main().catch((err) => {
    fatal(err);
});
