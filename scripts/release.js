// @ts-check

const { fatal, printInColor, YELLOW } = require('./print');
const { pack } = require('./npm');
const { GITHUB_TOKEN, GIT_TAG, REPO } = require('./travis');
const { createRelease, uploadAsset } = require('./github');

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
        return null;
    }

    const parts = GIT_TAG.split('@');
    if (parts.length !== 2 || parts.some((part) => part.length === 0)) {
        printInColor(YELLOW, 'Skipping a deployment to GitHub Releases because the tag does conform to <package name>@<version>');
        return null;
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

const main = async () => {
    const tag = parseGitTag();
    if (!tag) {
        return;
    }

    const { packageName, version } = tag;
    const { owner, repo } = parseRepo();

    const { packageFileName } = await pack(packageName);

    // Create GitHub release
    const { releaseId } = await createRelease(GITHUB_TOKEN, owner, repo, GIT_TAG, version);
    await uploadAsset(GITHUB_TOKEN, owner, repo, releaseId, packageFileName);
};

main().catch((err) => {
    fatal(err);
});
