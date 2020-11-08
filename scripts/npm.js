// @ts-check

const { exec } = require('child_process');
const { writeFile, rm } = require('fs').promises;
const { info, error } = require('./log');

const CONFIG_FILENAME = '.npmrc';

/**
 * @param {string} accessToken
 */
const login = async (accessToken) => {
    info('npm: login');

    const data = `//registry.npmjs.org/:_authToken=${accessToken}`;
    await writeFile(CONFIG_FILENAME, data);
};

const logout = async () => {
    info('npm: logout');

    await rm(CONFIG_FILENAME);
};

/**
 * @param {string} packageName
 * @returns {Promise<{packageFileName: string}>}
 */
const pack = (packageName) => {
    return new Promise((resolve, reject) => {
        info(`npm: pack ${packageName}`);

        exec(`yarn workspace ${packageName} pack`, (err, stdout, stderr) => {
            info(stdout);

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
        info(`npm: publish ${tarball}`);

        exec(`npm publish ${tarball} --access public`, (err, stdout, stderr) => {
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

module.exports = {
    login,
    logout,
    pack,
    publish,
};
