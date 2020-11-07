// @ts-check

const { exec } = require('child_process');
const { print } = require('./print');

/**
 * @param {string} packageName
 * @returns {Promise<{packageFileName: string}>}
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

module.exports = {
    pack,
};
