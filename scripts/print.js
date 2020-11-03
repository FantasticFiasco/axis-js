const YELLOW = '[33;1m';
const RED = '[31m';

const print = (message) => {
    console.log(message);
};

const printInColor = (color, message) => {
    console.log('\x1b%s%s\x1b[0m', color, message);
};

const fatal = (message) => {
    printInColor(RED, message);
    process.exitCode = 1;
};

module.exports = {
    YELLOW,
    print,
    printInColor,
};
