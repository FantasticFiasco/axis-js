// @ts-check

const { existsSync, readdirSync } = require('fs');
const { readFile, writeFile } = require('fs').promises;
const { basename, join } = require('path');
const { prompt } = require('inquirer');
const git = require('./git');
const { fatal } = require('./log');
const { exec } = require('./process');

const packagePrompt = async () => {
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

    return {
        name: packageName,
        dir: packagePaths[packageName],
    };
};

/**
 * @param {string} packageFilePath
 */
const updatePackageVersion = async (packageFilePath) => {
    packageFilePath = join(__dirname, '..', packageFilePath);
    let packageData = (await readFile(packageFilePath)).toString();

    const versionRegExp = /("version": ")(.*)(")/;
    const currentVersion = packageData.match(versionRegExp)[2];

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

    packageData = packageData.replace(versionRegExp, `$1${newVersion}$3`);
    await writeFile(packageFilePath, packageData);

    return newVersion;
};

/**
 * @param {string} filePath
 */
const updateChangelog = async (filePath) => {
    const { openChangelog } = await prompt({
        type: 'confirm',
        name: 'openChangelog',
        message: 'Do we need to update CHANGELOG.md?',
    });

    if (!openChangelog) {
        return;
    }

    const editor = process.platform === 'win32' ? 'notepad' : process.env.EDITOR || 'vim';
    await exec(`${editor} ${filePath}`);
};

const main = async () => {
    const package = await packagePrompt();

    const packageFilePath = join(package.dir, 'package.json');
    const newVersion = await updatePackageVersion(packageFilePath);
    await git.add(packageFilePath);

    const changelogFilePath = join(package.dir, 'CHANGELOG.md');
    await updateChangelog(changelogFilePath);
    await git.add(changelogFilePath);

    await git.commit(`release ${package.name}@${newVersion}`);
    await git.createAnnotatedTag(`${package.name}@${newVersion}`);
    await git.pushCommitsAndTags();
};

main().catch((err) => {
    fatal(err);
});
