/**
 * @param {string} cmd
 */
const run = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(stdout);
        });
    });
};

module.exports = {
    run,
};
