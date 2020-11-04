// @ts-check

const { readFileSync } = require('fs');
const { exec } = require('child_process');
const { Octokit } = require('@octokit/rest');
const { GITHUB_TOKEN, GIT_TAG, REPO } = require('./travis');
const { fatal, print, printInColor, YELLOW } = require('./print');

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
 * @param {string} packageName
 */
const pack = (packageName) => {
    return new Promise((resolve, reject) => {
        exec(`yarn workspace ${packageName} pack`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }

            print('stdout: ' + stdout);

            const match = /"(\/.*\.tgz)"/.exec(stdout);
            if (match === null || match.length !== 2) {
                reject(`stdout from pack does not contain the artifact filename: ${stdout}`);
                return;
            }

            print('match: ' + JSON.stringify(match));

            resolve({
                packageFileName: match[1],
            });
        });
    });
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

    await octokit.repos.uploadReleaseAsset({
        owner,
        repo,
        release_id: release.data.id,
        data: readFileSync(packageFileName),
    });
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
