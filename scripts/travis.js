// @ts-check

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GIT_TAG = process.env.TRAVIS_TAG;
const REPO = process.env.TRAVIS_REPO_SLUG;

module.exports = {
    GITHUB_TOKEN,
    GIT_TAG,
    REPO,
};
