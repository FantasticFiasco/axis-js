// @ts-check

import { exec } from './process.js';

/**
 * @param {string} filePath
 */
export const add = async (filePath) => {
    await exec(`git add "${filePath}"`);
};

/**
 * @param {string} msg
 */
export const commit = async (msg) => {
    await exec(`git commit -m "${msg}"`);
};

/**
 * @param {string} tag
 */
export const createAnnotatedTag = async (tag) => {
    await exec(`git tag -a "${tag}" -m "${tag}"`);
};

export const pushCommitsAndTags = async () => {
    await exec('git push --follow-tags');
};
