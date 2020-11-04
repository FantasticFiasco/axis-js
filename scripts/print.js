// @ts-check

const YELLOW = '[33;1m';
const RED = '[31m';

/**
 * @param {string} message
 */
const print = (message) => {
    console.log(message);
};

/**
 * @param {string} color
 * @param {string} message
 */
const printInColor = (color, message) => {
    console.log('\x1b%s%s\x1b[0m', color, message);
};

/**
 * @param {string} message
 */
const fatal = (message) => {
    printInColor(RED, message);
    process.exitCode = 1;
};

module.exports = {
    YELLOW,
    fatal,
    print,
    printInColor,
};
