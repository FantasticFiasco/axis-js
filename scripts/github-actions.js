// @ts-check

// GitHub token
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// npm token
const NPM_TOKEN = process.env.NPM_TOKEN;

// git tag
const prefix = 'refs/tags/';
const ref = process.env.GITHUB_REF;
const GIT_TAG = ref.startsWith(prefix) ? ref.substring(prefix.length) : '';

// Repo slug, e.g. "owner_name/repo_name"
const REPO = process.env.GITHUB_REPOSITORY;

module.exports = {
    GITHUB_TOKEN,
    NPM_TOKEN,
    GIT_TAG,
    REPO,
};
