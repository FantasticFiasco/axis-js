// @ts-check

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { info, error } = require('./log');

/**
 * @param {string} filePath
 */
const add = async (filePath) => {
    const cmd = `git add "${filePath}"`;
    info(cmd);

    const { stdout, stderr } = await exec(cmd);
    info(stdout);
    error(stderr);
};

/**
 * @param {string} msg
 */
const commit = async (msg) => {
    const cmd = `git commit -m "${msg}"`;
    info(cmd);

    const { stdout, stderr } = await exec(cmd);
    info(stdout);
    error(stderr);
};

/**
 * @param {string} tag
 */
const createAnnotatedTag = async (tag) => {
    const cmd = `git tag -a "${tag}" -m "${tag}"`;
    info(cmd);

    const { stdout, stderr } = await exec(cmd);
    info(stdout);
    error(stderr);
};

const pushCommitsAndTags = async () => {
    const cmd = 'git push --follow-tags';
    info(cmd);

    const { stdout, stderr } = await exec(cmd);
    info(stdout);
    error(stderr);
};

module.exports = {
    add,
    commit,
    createAnnotatedTag,
    pushCommitsAndTags,
};
