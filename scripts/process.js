// @ts-check

import { exec as internalExec } from 'child_process';
import util from 'util';
import { error, info } from './log.js';

const execAsync = util.promisify(internalExec);

/**
 * @param {string} cmd
 */
export const exec = async (cmd) => {
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
