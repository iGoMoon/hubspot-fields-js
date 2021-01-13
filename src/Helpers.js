const path = require('path');
const fs = require('fs-extra');
const crypto = require("crypto");


/**
 * 
 * @param {*} module 
 */
const globalField = (module) => {
    // is it a MoonBox standard Field
    let isMoonBoxField = (module.indexOf('@igomoon/field-transformer') == 0);
    let fileName = isMoonBoxField ? module.replace('@igomoon/field-transformer', '') : module;

    let pathToField = !isMoonBoxField ? path.resolve(`src/fields/${fileName}`) : `${__dirname}/fields/templates/${fileName}`;
    try {
        delete require.cache[require.resolve(pathToField)];
        return require(pathToField);
    } catch(e) {
        console.log("Could not find global field: " + module);
    }
}


/**
 * 
 * @param {*} ids 
 */
const randomId = () => {
    return crypto.randomBytes(32).toString("hex");
}

/**
 * 
 * @deprecated
 * @param {string} module 
 */
const requireField = (module) => {
    delete require.cache[require.resolve(module)];
    return require(module);
}

module.exports = {
    globalField,
    randomId,
    requireField
};