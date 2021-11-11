const crypto = require("crypto");

/**
 * Generate a random hex id
 * eg. df395847d1890bd33836227ab296a0bc11d58dfdc426d8d06c3d4e440bd951a3
 */
const randomId = () => {
    return crypto.randomBytes(32).toString("hex");
}

/**
 * Merge arguments with default 
 * 
 * @param {object} defaults 
 * @param {object} args to pass in 
 */
const parseArgs = (defaults = {}, args = {}) => {
    return Object.assign(defaults, args)
}

module.exports = {
	randomId,
	parseArgs
};