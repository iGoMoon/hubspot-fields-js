const fs = require('fs');
const glob = require('glob');
const path = require('path'); // Use path to ensure files are resolved correctly across all OS

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
    compiler.hooks.emit.tapPromise('FieldsPlugin', clearFieldsJson);

    // Transform the fields.json
    compiler.hooks.afterEmit.tapPromise('FieldsPlugin', async compilation => {
      return new Promise(async (resolve, reject) => {

        // Set the srcFolder to look for files
        // options.context gives root of the project.
        let srcFolder = path.resolve("./src");


        // Handle fields.js file
        await new Promise((resolve, reject) => {
          // Find every modules fields.js file.
          glob(srcFolder + '/**/fields.js', {}, (err, files) => {
            // console.log("files: ", files)
            files.forEach(file => {
              file = path.resolve(file);
              try {
                let fields = require(file);

                // Grab full dist Path
                let outputPath = compilation.options.output.path;
                let assets = compilation.assets;
                let tempFile = file.split("/").slice(-2).join('/');
                let distPath;

                const keys = Object.keys(assets);

                keys.forEach(key => {
                  // Ensures that the module is actually the real module 
                  // and not a subset of the original 
                  // example = ../new-card.module/fields.js
                  // key = ../card.module/fields.js
                  // tempFile = card.module/fields.js
                  // Will reslove true on both emaple and key
                  // Adding a / will ensure that the whole module name is included
                  key = "/" + key;
                  if (key.includes("/" + tempFile) && !key.includes("/" + tempFile + 'on')) {
                    distPath = key;
                  }
                })

                let fullDistPath = path.resolve(outputPath + "/" + distPath);

                // Transform to Json and append to fields.json file
                FieldTransformer.transform(path.resolve(fullDistPath) + 'on', fields);


                if (!compilation.emittedAssets[distPath]) {
                  // Clean up distpath 
                  // Working with original copilation object
                  distPath = distPath.replace("/", "");

                  // setting emitted to false because hs autoupload plugin 
                  // looks for this to be true in order to upload
                  compilation.assets[distPath].emitted = false;

                  // remove fields.js from assets.
                  delete compilation.assets[distPath];

                  // remove fields.js from emittedAssets Set
                  compilation.emittedAssets.delete(distPath)

                  // add fields.json to emittedAssets set
                  // Functionally tricks AutoUplaoder into thinking that 
                  // This file was updated as part of the actual webpack process
                  compilation.emittedAssets.add(distPath + "on")

                  // Remove field.js file from dist directory.
                  // remove fields.js from cache so it will reupload
                  // on future watch saves
                  fs.existsSync(fullDistPath) ? fs.unlinkSync(fullDistPath) : null;
                  delete require.cache[require.resolve(file)]
                }

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