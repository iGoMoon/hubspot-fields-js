const fs = require('fs');
const glob = require('glob');

const FieldTransformer = require('../fields/FieldTransformer');


const clearFieldsJson = async compilation => {
    return new Promise(async (resolve, reject) => {
        let srcFolder = compilation.options.output.path;
        glob(srcFolder + '/**/fields.json', {}, (err, files) => {
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
        compiler.hooks.beforeRun.tapPromise('FieldsPlugin', async compilation => {
            return new Promise(async (resolve, reject) => {
                // Set the distFolder to look for files
                // options.context gives root of the project.

				let srcFolder = `${compilation.options.context}/src`;
				let distFolder = compilation.options.output.path;

                // Handle fields.js file
                await new Promise((resolve, reject) => {
                    // Find every modules fields.js file.
                    glob(srcFolder + '/**/fields.js', {}, (err, files) => {
						files.forEach(file => {
							
							let srcFile = file;
							let distFile = file.replace(srcFolder, distFolder);

                            try {
                                let fields = require(srcFile);

								// Transform to Json and append to fields.json file
                                FieldTransformer.transform(distFile + 'on1', fields);

                                if (!compilation.assets[distFile.replace(distFolder + '/', '') + 'on1']) {
                                    compilation.assets[distFile.replace(distFolder + '/', '') + 'on1'] = {
                                        source: function () { return Buffer.from(file) },
                                        size: function () { return Buffer.byteLength(file) },
                                        existsAt: file + 'on1',
                                        emitted: true
                                    }
                                }

                                // Remove field.js file from dist directory.
                                //fs.unlinkSync(distFile);
                                delete require.cache[require.resolve(srcFile)];

                                // Remove fields.js from the compilation
                                delete compilation.assets[srcFile.replace(srcFolder + '/', '')];
                            } catch (e) {
                                delete require.cache[require.resolve(srcFile)];
                                console.log("Could not transform: " + srcFile + "\nError: " + e.message);
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