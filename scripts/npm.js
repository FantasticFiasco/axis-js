// @ts-check

const { exec } = require('child_process');

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

            const match = /"(\/.*\.tgz)"/.exec(stdout);
            if (match === null || match.length !== 2) {
                reject(`stdout from pack does not contain the artifact filename: ${stdout}`);
                return;
            }

            resolve({
                packageFileName: match[1],
            });
        });
    });
};

module.exports = {
    pack,
};
