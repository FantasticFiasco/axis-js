// @ts-check

const { info, error } = require('./log');
const util = require('util');
const execAsync = util.promisify(require('child_process').exec);

/**
 * @param {string} cmd
 */
const exec = async (cmd) => {
    info(`exec: ${cmd}`);

    const { stdout, stderr } = await execAsync(cmd);
    if (stdout) {
        info(stdout);
    }
    if (stderr) {
        error(stderr);
    }

    return stdout;
};

module.exports = {
    exec,
};
