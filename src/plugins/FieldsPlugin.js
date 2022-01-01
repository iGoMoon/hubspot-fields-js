const fs = require('fs');
const glob = require('glob');
const path = require('path'); // Use path to ensure files are resolved correctly across all OS

const FieldTransformer = require('../fields/FieldTransformer');

class FieldsPlugin {

	async clearFieldsJson(compilation) {
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

	async apply(compiler) {

		// Clear out any old fields.json files before compiler runs.
		// This is to ensure that we dont end up with duplicate fields.
		compiler.hooks.run.tapPromise('FieldsPlugin', this.clearFieldsJson);
		compiler.hooks.watchRun.tapPromise('FieldsPlugin', this.clearFieldsJson);
		compiler.hooks.emit.tapPromise('FieldsPlugin', this.clearFieldsJson);

		// Transform the fields.json
		compiler.hooks.afterEmit.tapPromise('FieldsPlugin', async compilation => {

			let webpackRoot = compilation.options.context
			let srcFolder = path.resolve(webpackRoot, this.options.src);
			let distFolder = compilation.options.output.path;

			// Handle fields.js file
			return await new Promise((resolve, reject) => {
				let files = glob.sync(`${srcFolder}/**/fields.js`)

				// Find every modules fields.js file.
				files.forEach((JsSrcFullPath) => {
					try {

						// Get the module path for matching
						let fileUniqueKey = JsSrcFullPath.split("/").slice(-2).join('/');
						// Get the path from the DIST folder for the asset
						let JsDistRelativePath = Object.keys(compilation.assets).find(a => a.endsWith(fileUniqueKey))
						let JsonDistRelativePath = JsDistRelativePath.replace('fields.js', 'fields.json');
						// Get Final Paths
						let JsonDistFullPath = path.resolve(distFolder, './' + JsonDistRelativePath);

						let fields = require(JsSrcFullPath);
						// Transform to Json and append to fields.json file
						FieldTransformer.transform(JsonDistFullPath, fields);

						// If the file is not yet added to emittedAssets then handle it now so fields.js is not uploaded to HubSpot

						if (!compilation.emittedAssets[JsDistRelativePath]) {
							// remove fields.js from assets because hsAutouploadPlugin looks for this to be emitted: true in order to upload
							delete compilation.assets[JsDistRelativePath];
							// remove fields.js from emittedAssets Set
							compilation.emittedAssets.delete(JsDistRelativePath)
							// add json version to emittedAssets set. Functionally tricks AutoUplaoder into thinking that this file was updated as part of the actual webpack process
							compilation.emittedAssets.add(JsonDistRelativePath)
						}

						// Remove field.js file from dist directory.
						let JsDistFullPath = path.resolve(distFolder, './' + JsDistRelativePath);
						fs.existsSync(JsDistFullPath) ? fs.unlinkSync(JsDistFullPath) : null;
						// remove fields.js from cache so it will reupload on future watch saves
						delete require.cache[require.resolve(JsSrcFullPath)]

					} catch (e) {
						delete require.cache[require.resolve(JsSrcFullPath)];
						console.log("Could not transform: " + JsSrcFullPath + "\nError: " + e.message);
					}

				});

				resolve();
			});

		});
	}
}

module.exports = FieldsPlugin;