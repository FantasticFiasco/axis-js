// @ts-check

const { exec } = require('./process');

/**
 * @param {string} filePath
 */
const add = async (filePath) => {
    await exec(`git add "${filePath}"`);
};

/**
 * @param {string} msg
 */
const commit = async (msg) => {
    await exec(`git commit -m "${msg}"`);
};

/**
 * @param {string} tag
 */
const createAnnotatedTag = async (tag) => {
    await exec(`git tag -a "${tag}" -m "${tag}"`);
};

const pushCommitsAndTags = async () => {
    await exec('git push --follow-tags');
};

module.exports = {
    add,
    commit,
    createAnnotatedTag,
    pushCommitsAndTags,
};
