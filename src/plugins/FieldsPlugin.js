const fs = require('fs');
const glob = require('glob');

const FieldTransformer = require('../fields/FieldTransformer');


const clearFieldsJson = async compilation => {
    return new Promise(async (resolve, reject) => {
        let distFolder = compilation.options.output.path;
        glob(distFolder + '/**/fields.json', {}, (err, files) => {
            files.forEach(file => {
                fs.unlinkSync(file);
            });

            resolve();
        });
    });
}

class FieldsPlugin {

    async apply(compiler) {

        // Clear out any old fields.json files before compiler runs.
        // This is to ensure that we dont end up with duplicate fields.
        compiler.hooks.run.tapPromise('FieldsPlugin', clearFieldsJson);
        compiler.hooks.watchRun.tapPromise('FieldsPlugin', clearFieldsJson);

        // Transform the fields.json
        compiler.hooks.afterEmit.tapPromise('FieldsPlugin', async compilation => {
            return new Promise(async (resolve, reject) => {
                // Set the distfolder to look for files
                // options.context gives root of the project.

                let distFolder = compilation.options.output.path;

                // Handle fields.js file
                await new Promise((resolve, reject) => {
                    // Find every modules fields.js file.
                    glob(distFolder + '/**/fields.js', {}, (err, files) => {
                        files.forEach(file => {
                            try {
                                let fields = require(file);

                                // Transform to Json and append to fields.json file
                                FieldTransformer.transform(file + 'on', fields);

                                if (!compilation.assets[file.replace(distFolder + '/', '') + 'on']) {
                                    compilation.assets[file.replace(distFolder + '/', '') + 'on'] = {
                                        source: function () { return Buffer.from(file) },
                                        size: function () { return Buffer.byteLength(file) },
                                        existsAt: file + 'on',
                                        emitted: true
                                    }
                                }

                                // Remove field.js file from dist directory.
                                fs.unlinkSync(file);
                                delete require.cache[require.resolve(file)];

                                // Remove fields.js from the compilation
                                delete compilation.assets[file.replace(distFolder + '/', '')];
                            } catch (e) {
                                delete require.cache[require.resolve(file)];
                                console.log("Could not transform: " + file + "\nError: " + e.message);
                            }
                        });
                        resolve(); // resolve glob promise
                    });
                });


                resolve(); // Resolve plugins apply promise
            });
        });
    }
}

module.exports = FieldsPlugin;