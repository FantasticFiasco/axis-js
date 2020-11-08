// @ts-check

const { readFileSync } = require('fs');
const { basename } = require('path');
const { Octokit } = require('@octokit/rest');

/**
 * @param {string} githubToken
 * @param {string} owner
 * @param {string} repo
 * @param {string} packageName
 * @param {string} tagName
 * @param {string} version
 */
const createRelease = async (githubToken, owner, repo, packageName, tagName, version) => {
    const octokit = new Octokit({
        auth: githubToken,
    });

    const release = await octokit.repos.createRelease({
        owner,
        repo,
        tag_name: tagName,
        name: `${packageName} release v${version}`,
        body: 'TODO',
        draft: true,
    });

    return {
        releaseId: release.data.id,
    };
};

/**
 *
 * @param {string} githubToken
 * @param {string} owner
 * @param {string} repo
 * @param {number} releaseId
 * @param {string} assetFileName
 */
const uploadAsset = async (githubToken, owner, repo, releaseId, assetFileName) => {
    const octokit = new Octokit({
        auth: githubToken,
    });

    await octokit.repos.uploadReleaseAsset({
        owner,
        repo,
        release_id: releaseId,
        name: basename(assetFileName),
        data: readFileSync(assetFileName),
    });
};

module.exports = {
    createRelease,
    uploadAsset,
};
