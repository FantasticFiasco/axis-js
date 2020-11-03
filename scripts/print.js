const YELLOW = '[33;1m';

const print = (message) => {
    console.log(message);
};

const printInColor = (color, message) => {
    console.log('\x1b%s%s\x1b[0m', color, message);
};

module.exports = {
    YELLOW,
    print,
    printInColor,
};
