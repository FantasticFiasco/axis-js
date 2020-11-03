const { Octokit } = require('@octokit/rest');
const { GIT_TAG, REPO } = require('./travis');
const { print, printInColor, YELLOW } = require('./print');

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
        printInColor(YELLOW, 'Skipping a deployment to GitHub Releases because this is not a tagged commit');
        return undefined;
    }

    const parts = GIT_TAG.split('@');
    if (parts.length !== 2 || parts.some((part) => part.length === 0)) {
        printInColor(YELLOW, 'Skipping a deployment to GitHub Releases because the tag does conform to <package name>@<version>');
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

    // const release = await octokit.repos.createRelease({
    //     owner,
    //     repo,
    //     tag_name: GIT_TAG,
    // });

    // print(release);

    const releases = await octokit.repos.listReleases({
        owner,
        repo,
    });

    print(releases);
};

(async () => {
    const tag = parseGitTag();
    if (!tag) {
        return;
    }

    const { owner, repo } = parseRepo();

    await createRelease(owner, repo);
})().catch((err) => {
    print(err);
    process.exit(1);
});
