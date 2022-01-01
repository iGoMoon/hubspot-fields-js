# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2022-01-01
- Js Partials are now imported relative to src file, NOT from final dist file. Field JS tranformation using the src file and then updates webpack's emission functionlity to properly handle the upload.
- Plugin now accepts options
     - `src`: The starting directory to search for field.js files eg. "./src"
     - `extraDirsToWatch`: an array of relative paths to directories that will trigger a recompilation. Useful for FieldJS partials
     - `ignore`: An array of relative paths to ignore when searching for field.js files  

	```javascript
	new FieldsPlugin({
		"src": "",
		"extraDirsToWatch" : ["./src/fields"],
		"ignore": []
	})
	```

## [1.1.6] - 2021-11-11
- Allow null values in array and filter them out of the final JSON
- `applyIf` helper method
- `parseArgs` helper method

## [1.1.5] - 2021-05-11
- Hot fixes

## [1.1.4] - 2021-05-10
- Need some Defaults
 
## [1.1.3] - 2021-05-07
- Choices and Children helpers
 
## [1.1.2] - 2021-05-07
- Wrong version in ReadMe.md

## [1.1.1] - 2021-05-07 (Not published on NPM)
- Upadate this changelog

## [1.1.0] - 2021-05-07 (Not published on NPM)
- Update Readme and contributing file

## [1.0.4] - 2021-05-07
- Update Field methods so we dont override hubspot defaults

## [1.0.3] - 2021-02-25
- New Field Helper Functions: crmObject, hubdbRow, embed, video, sfCampaign

## [1.0.2] - 2021-02-16
- Package.json updates

## [1.0.1] - 2021-02-16
- Remove unnecessary dependencies

## [1.0.0] - 2021-02-16
- Initial Publish
