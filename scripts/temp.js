const { GITHUB_TOKEN, NPM_TOKEN, GIT_TAG, REPO } = require('./github-actions');

console.log('temp gh token', GITHUB_TOKEN.length);
console.log('temp npm', NPM_TOKEN.length);
console.log('temp git tag', GIT_TAG.length);
console.log('temp repo', REPO.length);
