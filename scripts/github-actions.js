// @ts-check

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const NPM_TOKEN = process.env.NPM_TOKEN;
const GIT_TAG = process.env.GIT_TAG;
const REPO = process.env.TRAVIS_REPO_SLUG;

module.exports = {
    GITHUB_TOKEN,
    NPM_TOKEN,
    GIT_TAG,
    REPO,
};
