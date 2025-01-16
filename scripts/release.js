// @ts-check

import { existsSync, readdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import inquirer from 'inquirer'; // Currently no ESM support
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { add, commit, createAnnotatedTag, pushCommitsAndTags } from './git.js';
import { fatal } from './log.js';

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

    const { packageName } = await inquirer.prompt({
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
    const currentFileDirName = dirname(fileURLToPath(import.meta.url));
    packageFilePath = join(currentFileDirName, '..', packageFilePath);
    let packageData = (await readFile(packageFilePath)).toString();

    const versionRegExp = /("version": ")(.*)(")/;
    const currentVersion = packageData.match(versionRegExp)[2];

    const { newVersion } = await inquirer.prompt({
        type: 'input',
        name: 'newVersion',
        message: `New version (current is '${currentVersion}')`,
        validate: (input) => {
            // The following RegExp is the official one, copied from their website https://semver.org/
            const semVer =
                /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
            return semVer.test(input) || 'Please enter a valid semantic version';
        },
    });

    packageData = packageData.replace(versionRegExp, `$1${newVersion}$3`);
    await writeFile(packageFilePath, packageData);

    return newVersion;
};

const main = async () => {
    const p = await packagePrompt();

    const packageFilePath = join(p.dir, 'package.json');
    const newVersion = await updatePackageVersion(packageFilePath);
    await add(packageFilePath);

    const changelogFilePath = join(p.dir, 'CHANGELOG.md');
    await add(changelogFilePath);

    await commit(`release ${p.name}@${newVersion}`);
    await createAnnotatedTag(`${p.name}@${newVersion}`);
    await pushCommitsAndTags();
};

main().catch((err) => {
    fatal(err);
});
