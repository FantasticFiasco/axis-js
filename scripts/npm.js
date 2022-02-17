// @ts-check

import { rm, writeFile } from 'fs/promises';
import { info } from './log.js';
import { exec } from './process.js';

const CONFIG_FILENAME = '.npmrc';

/**
 * @param {string} accessToken
 */
export const login = async (accessToken) => {
    info('npm: login');

    const data = `//registry.npmjs.org/:_authToken=${accessToken}`;
    await writeFile(CONFIG_FILENAME, data);
};

export const logout = async () => {
    info('npm: logout');

    await rm(CONFIG_FILENAME);
};

/**
 * @param {string} packageName
 * @returns {Promise<{packageFileName: string}>}
 */
export const pack = async (packageName) => {
    info(`npm: pack ${packageName}`);

    const stdout = await exec(`yarn workspace ${packageName} pack`);

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
export const publish = async (tarball) => {
    info(`npm: publish ${tarball}`);

    await exec(`npm publish ${tarball} --access public`);
};
