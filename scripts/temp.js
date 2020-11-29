const { REPO, GITHUB_TOKEN, NPM_TOKEN } = require('./github-actions');

console.log('temp repo', REPO.length);
console.log('temp gh token', GITHUB_TOKEN.length);
console.log('temp npm', NPM_TOKEN.length);
