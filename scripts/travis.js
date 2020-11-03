const GIT_TAG = process.env.TRAVIS_TAG;
const REPO = process.env.TRAVIS_REPO_SLUG;

module.exports = {
    GIT_TAG,
    REPO,
};
