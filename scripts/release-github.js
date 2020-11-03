const { Octokit } = require('@octokit/rest');
const { GIT_TAG, REPO } = require('./travis');

/**
 * A tagged commit in this monorepo is created using the following format:
 *
 *   <package name>@<version>
 *
 * where <package name> is the name of the package (as well as the name of the folder in
 * ./packages), and <version> is the semantic version of the package.
 *
 * The following tag would satisfy the format:
 *
 *   axis-configuration@1.2.3-alpha
 */
const parseGitTag = () => {
    if (!GIT_TAG) {
        console.log('Skipping a deployment to GitHub Releases because this is not a tagged commit');
        return undefined;
    }

    const parts = GIT_TAG.split('@');
    if (parts.length !== 2 || parts.some((part) => part.length === 0)) {
        console.log('Skipping a deployment to GitHub Releases because the tag does conform to <package name>@<version>');
        return undefined;
    }

    return {
        packageName: parts[0],
        version: parts[1],
    };
};

const parseRepo = () => {
    const [owner, repo] = REPO.split('/');

    return {
        owner,
        repo,
    };
};

const createRelease = async (owner, repo) => {
    const octokit = new Octokit();

    const releases = await octokit.repos.listReleases({
        owner,
        repo,
    });

    console.log(releases);
};

console.log('\x1b[33m%s\x1b[0m', 'test 1');
console.log('\x1b[33;1mtest 2\x1b[0m');
console.log('\x1b[35m FOOBAR \x1b[0m');

(async () => {
    const tag = parseGitTag();
    if (!tag) {
        return;
    }

    const { owner, repo } = parseRepo();

    await createRelease(owner, repo);
})();
