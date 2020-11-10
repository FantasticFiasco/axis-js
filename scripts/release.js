// @ts-check

const { readdirSync, existsSync } = require('fs');
const { join, basename } = require('path');
const spawn = require('util').promisify(require('child_process').spawn);
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

/**
 * @param {string} filePath
 */
const changelogPrompt = async (filePath) => {
    const { openChangelog } = await prompt({
        type: 'confirm',
        name: 'openChangelog',
        message: 'Do we need to update CHANGELOG.md?',
    });

    if (!openChangelog) {
        return;
    }

    const editor = process.env.EDITOR || 'vim';
    await spawn(editor, [filePath], {
        stdio: 'inherit',
    });
};

const main = async () => {
    const packagePath = await packagePathPrompt();
    const newVersion = await versionPrompt(packagePath);
    await changelogPrompt(join(packagePath, 'CHANGELOG.md'));
};

main().catch((err) => {
    fatal(err);
});
