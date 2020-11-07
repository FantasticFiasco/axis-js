// @ts-check

const { readFileSync } = require('fs');
const { Octokit } = require('@octokit/rest');
const { GITHUB_TOKEN, GIT_TAG, REPO } = require('./travis');
const { fatal, print, printInColor, YELLOW } = require('./print');
const { pack } = require('./npm');

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

/**
 * @param {string} owner
 * @param {string} repo
 * @param {string} packageFileName
 * @param {string} version
 */
const createRelease = async (owner, repo, packageFileName, version) => {
    const octokit = new Octokit({
        auth: GITHUB_TOKEN,
    });

    const release = await octokit.repos.createRelease({
        owner,
        repo,
        tag_name: GIT_TAG,
        name: `Release v${version}`,
        body: 'TODO',
        draft: true,
    });

    print('packageFileName: ' + packageFileName);
    print('release_id: ' + release.data.id);
    print('upload_url: ' + release.data.upload_url);

    const uploadReleaseAssetResponse = await octokit.repos.uploadReleaseAsset({
        owner,
        repo,
        release_id: release.data.id,
        // name: 'some name',
        // label: 'some label',
        data: readFileSync(packageFileName),
        // origin: release.data.upload_url,
    });

    print('uploadReleaseAssetResponse: ' + JSON.stringify(uploadReleaseAssetResponse));
};

const main = async () => {
    const tag = parseGitTag();
    if (!tag) {
        return;
    }

    const { packageName, version } = tag;
    const { owner, repo } = parseRepo();

    const { packageFileName } = await pack(packageName);
    await createRelease(owner, repo, packageFileName, version);
};

main().catch((err) => {
    fatal(err);
});
