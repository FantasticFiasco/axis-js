// @ts-check

const RED = '[31m';
const YELLOW = '[33;1m';

/**
 * @param {string} message
 */
const info = (message) => {
    console.log(message);
};

/**
 * @param {string} message
 */
const error = (message) => {
    log(RED, message);
};

/**
 * @param {string} message
 */
const fatal = (message) => {
    log(RED, message);
    process.exitCode = 1;
};

/**
 * @param {string} color
 * @param {string} message
 */
const log = (color, message) => {
    console.log('\x1b%s%s\x1b[0m', color, message);
};

module.exports = {
    RED,
    YELLOW,
    info,
    error,
    fatal,
    log,
};
