// @ts-check

const { rm, writeFile } = require('fs').promises;
const exec = require('util').promisify(require('child_process').exec);
const { error, info } = require('./log');

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
const pack = async (packageName) => {
    info(`npm: pack ${packageName}`);

    const cmd = `yarn workspace ${packageName} pack`;
    info(cmd);

    const { stdout, stderr } = await exec(cmd);
    info(stdout);
    error(stderr);

    const match = /"(\/.*\.tgz)"/.exec(stdout);
    if (match === null || match.length !== 2) {
        throw new Error(`stdout from pack does not contain the artifact filename: ${stdout}`);
    }

    return {
        packageFileName: match[1],
    };
};

/**
 * @param {string} tarball
 */
const publish = async (tarball) => {
    info(`npm: publish ${tarball}`);

    const cmd = `npm publish ${tarball} --access public`;
    info(cmd);

    const { stdout, stderr } = await exec(cmd);
    info(stdout);
    error(stderr);
};

module.exports = {
    login,
    logout,
    pack,
    publish,
};
