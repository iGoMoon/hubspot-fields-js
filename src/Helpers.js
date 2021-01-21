const crypto = require("crypto");

/**
 * 
 * @param {*} ids 
 */
const randomId = () => {
    return crypto.randomBytes(32).toString("hex");
}

module.exports = {
    randomId
};