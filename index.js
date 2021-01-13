const Group = require('./src/fields/Group');
const Field = require('./src/fields/Field');
const FieldsPlugin = require('./src/plugins/FieldsPlugin');
const { globalField, randomId, requireField } = require('./src/Helpers');

module.exports = {
    // Field + Group helpers
    Group,
    Field,

    // Webpack plugin
    FieldsPlugin,

    // Helpers
    requireField,
    globalField,
    randomId
};