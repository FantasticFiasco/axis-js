// @ts-check

const { exec } = require('child_process');
const { writeFile, rm } = require('fs').promises;
const { info, error } = require('./log');

const CONFIG_FILENAME = '.npmrc';

/**
 * @param {string} accessToken
 */
const login = async (accessToken) => {
    info('login to npm');

    const data = `//registry.npmjs.org/:_authToken=${accessToken}`;
    await writeFile(CONFIG_FILENAME, data);
};

const logout = async () => {
    info('logout from npm');

    await rm(CONFIG_FILENAME);
};

/**
 * @param {string} packageName
 * @returns {Promise<{packageFileName: string}>}
 */
const pack = (packageName) => {
    return new Promise((resolve, reject) => {
        info(`pack ${packageName}`);

        exec(`yarn workspace ${packageName} pack`, (err, stdout, stderr) => {
            if (err) {
                error(stderr);
                reject(err);
                return;
            }

            const match = /"(\/.*\.tgz)"/.exec(stdout);
            if (match === null || match.length !== 2) {
                reject(`stdout from pack does not contain the artifact filename: ${stdout}`);
                return;
            }

            resolve({
                packageFileName: match[1],
            });
        });
    });
};

/**
 * @param {string} tarball
 */
const publish = (tarball) => {
    return new Promise((resolve, reject) => {
        info(`publish ${tarball}`);

        exec(`npm publish ${tarball} --access public`, (err, stdout, stderr) => {
            if (err) {
                error(stderr);
                reject(err);
                return;
            }

            info(stdout);
            resolve();
        });
    });
};

module.exports = {
    login,
    logout,
    pack,
    publish,
};
