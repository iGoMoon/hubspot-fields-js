# HubSpot Fields JS <!-- omit in toc -->

<img src="https://img.shields.io/badge/Version-1.1.3-brightgreen" />

The package makes using JavaScript to generate HubSpot module `fields.json` files on local development straightforward.

## Table of Contents <!-- omit in toc -->

- [Requirements](#requirements)
- [Why is it needed?](#why-is-it-needed)
- [Installation](#installation)
	- [Install the package](#install-the-package)
	- [Configure Webpack Config](#configure-webpack-config)
- [Example fields.js file](#example-fieldsjs-file)
- [Usage : Field Types](#usage--field-types)
- [Usage: Groups](#usage-groups)
- [Usage: Helper Methods](#usage-helper-methods)
	- [Name + Label](#name--label)
	- [ID](#id)
	- [Default](#default)
	- [Set](#set)
	- [Visibility](#visibility)
	- [Repeater](#repeater)
	- [Help Text](#help-text)
	- [Inline Help Text](#inline-help-text)
	- [Label](#label)
	- [Required](#required)
	- [Hidden Sub Fields](#hidden-sub-fields)
	- [Locked](#locked)
	- [Choices](#choices)
	- [Children](#children)
- [Advanced Usage](#advanced-usage)
- [About iGoMoon](#about-igomoon)
	- [We're Hiring](#were-hiring)
- [Contributing](#contributing)
- [License](#license)

## Requirements

This is a webpack plugin designed to be a companion for (but not dependant on) the Hubspot Webpack Plugin created by our friends at HubSpot (Found here: [@hubspot/webpack-cms-plugins](https://www.npmjs.com/package/@hubspot/webpack-cms-plugins)).

## Why is it needed?

If you're here, then you probably love HubSpot almost as much as we do, and when creating and maintaining the `fields.json` files for modules, they can quickly become long, arduous to read and difficult to update over time. "Fields JS" gives you the ease of working with webpack with your HubSpot modules.

**How does it work?**

Within your modules, you create a `fields.js` file in place of `fields.json` and during compilation, the plugin will convert your `fields.js` files to `fields.json` that can be uploaded to your HubSpot Account. After copying to the dist folder, the plugin will search your "dist" folder for `fields.js` and then replace those with transformed `fields.json` files.

## Installation

### Install the package

```shell
npm install @igomoon/hubspot-fields-js --save-dev
```

### Configure Webpack Config

1. Set up a hubspot.config.yml using the HubSpot CMS local development instructions.
2. Add the **hubspot-fields-js** plugin to your webpack.config.js.

Example `webpack.config.js`

```javascript
const HubSpotAutoUploadPlugin = require("@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// STEP 1 : Include the Fields JS Plugin
const { FieldsPlugin } = require("@igomoon/hubspot-fields-js");

module.exports = ({ account, autoupload }) => ({
  entry: "./src/index.js",
  output: {
    filename: "js/main.js",
  },
  module: {
    rules: [
		//...
	]
  },
  plugins: [

    // STEP 2 : Add to the top of  your plugins
    new FieldsPlugin(),

    new HubSpotAutoUploadPlugin({
      autoupload,
      account,
      src: "dist",
      dest: "my-project",
    }),
    new CopyWebpackPlugin([
      { from: "src/images", to: "images" },
      { from: "src/modules", to: "modules" },
      { from: "src/templates", to: "templates" },
    ]),
  ],
});
```
3. Run webpack as normal to compile your project and convert `fields.js` to `fields.json`.


## Example fields.js file

Example `fields.js` within a module.
```javascript
const { Field } = require("@igomoon/hubspot-fields-js");

module.exports = [

	Field.text()
		.name("title","Title")
		.default("Text"),
	
	Field.richText()
		.name("text","Text")
		.default("<p>This is just some placeholder text in a rich text field</p>")

]; 
```

## Usage : Field Types

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields

### Blog Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#blog

```javascript
Field.blog()
	.name("blog_field","Blog Field")
```

### Boolean Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#boolean

```javascript
Field.boolean()
	.name("boolean_field","Boolean Field")
```

Setting additional options with `set` helper method

```javascript
Field.color()
	.name("color_field","color Field")
	.set("display","toggle")
	.default(false)
```

### Choice Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#choice

```javascript
Field.choice()
	.name("choice_field","Choice Field")
	.choices([])
```

Setting additional options with `set` helper method

```javascript
Field.choice()
	.name("choice_field","Choice Field")
	.choices([
		["choice-1", "Choice 1"]
	])
	.set("display","select")
	.default("choice-1")
```

### Color Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#color

```javascript
Field.color()
	.name("color_field","color Field")
	.default("#ffffff")
```

Setting additional options with `set` helper method

```javascript
Field.color()
	.name("color_field","color Field")
	.set("default",{
		"color": "#ffffff",
		"opacity": 80
	})
```

### CTA Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#cta

```javascript
Field.cta()
	.name("cta_field","CTA Field")
```

### CRM Object Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#crm-object

```javascript
Field.crmObject()
	.name("crmobject_field","CRM Object Field")
```

Setting additional options with `set` helper method

```javascript
Field.crmObject()
	.name("crmobject_field","CRM Object Field")
	.set("object_type","CONTACT")
	.set("properties_to_fetch",[])
```

### Date Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#date

```javascript
Field.date()
	.name("date_field","Date Field")
```

### Date and Time Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#date-and-time

```javascript
Field.dateTime()
	.name("datetime_field","Date and Time Field")
```

Setting additional options with `set` helper method

```javascript
Field.dateTime()
	.name("datetime_field","Date and Time Field")
	.set("step",30)
```

### Email Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#email

```javascript
Field.email()
	.name("email_field","Email Field")
```

### Embed Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#embed

```javascript
Field.embed()
	.name("embed_field","Embed Field")
```

Setting additional options with `set` helper method

```javascript
Field.embed()
	.name("embed_field","Embed Field")
	.set("supported_source_types",[ "oembed", "html" ])
	.set("supported_oembed_types",[ [ "photo", "video", "link", "rich" ] ])
```

### File Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#file

```javascript
Field.file()
	.name("file_field","File Field")
```

Setting additional options with `set` helper method

```javascript
Field.file()
	.name("file_field","File Field")
	.set("picker","document")
```

### Followup Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#followup-email

```javascript
Field.followUpEmail()
	.name("followupemail_field","Followup Field")
```

### Font Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#font

```javascript
Field.font()
	.name("font_field","Font Field")
```

Setting additional options with `set` helper method

```javascript
Field.font()
	.name("font_field","Font Field")
	.set("load_external_fonts", true)
	.set("default",{
		"size": 12,
		"font": "Merriweather",
		"font_set": "GOOGLE",
		"size_unit": "px",
		"color": "#000",
		"styles": {}
	})
```

### Form Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#form

```javascript
Field.form()
	.name("form_field","Form Field")
	.default("form_id")
```

Setting additional options with `set` helper method

```javascript
Field.form()
	.name("form_field","Form Field")
	.set("default",{
		"response_type": "inline",
		"message": "Thanks for submitting the form."
	})
```

### HubDB Row Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#hubdb-row

```javascript
Field.hubdbRow()
	.name("hubdbrow_field","HubDB Row Field")
	.set("table_name_or_id","4357464")
	.default("row_id")
```

Setting additional options with `set` helper method

```javascript
Field.hubdbRow()
	.name("hubdbrow_field","HubDB Row Field")
	.set("table_name_or_id","4357464")
	.set("columns_to_fetch",[])
	.set("display_columns",[])
	.set("display_format","%0 - %1")
```

### HubDB Table Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#hubdb-table

```javascript
Field.hubdbTable()
	.name("hubdbtable_field","HubDB Table Field")
```

### Icon Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#icon

```javascript
Field.icon()
	.name("icon_field","Icon Field")
```

Setting additional options with `set` helper method

```javascript
Field.icon()
	.name("icon_field","Icon Field")
	.set("icon_set", "fontawesome-5.14.0")
	.set("default",{
		"name" : "accessible-icon",
		"unicode" : "f368",
		"type" : "REGULAR"
	})
```

### Image Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#image

```javascript
Field.image()
	.name("image_field","Image Field")
	.default("image_field","Image Field")
```

Setting additional options with `set` helper method

```javascript
Field.icon()
	.name("image_field","Image Field")
	.set("responsive",true)
	.set("resizable",true)
	.set("show_loading",false)
	.set("default",{
		"size_type" : "auto",
		"src" : "",
		"alt" : null,
		"loading": "disabled"
	})
```

### Link Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#link

```javascript
Field.link()
	.name("link_field","Link Field")
	.default("https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields")
```

Setting additional options with `set` helper method

```javascript
Field.link()
	.name("link_field","Link Field")
	.set("supported_types",["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"])
	.set("default",{
		"url" : {
			"content_id" : null,
			"type" : "EXTERNAL",
			"href" : ""
		},
		"open_in_new_tab" : false,
		"no_follow" : false
	})
```

### Logo Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#logo

```javascript
Field.logo()
	.name("logo_field","Logo Field")
	.default("https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields")
```

Setting additional options with `set` helper method

```javascript
Field.logo()
	.name("logo_field","Logo Field")
	.set("default",{
		"override_inherited_src" : false,
		"src" : null,
		"alt" : null
	})
```

### Menu Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#menu

```javascript
Field.menu()
	.name("menu_field","Menu Field")
```

### Number Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#number

```javascript
Field.number()
	.name("number_field","Number Field")
```

Setting additional options with `set` helper method

```javascript
Field.number()
	.name("number_field","Number Field")
	.set("display","slider")
	.set("step",1)
	.set("min",0)
	.set("max",100)
	.set("prefix","$")
	.set("suffix","K")
```

### Page Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#page

```javascript
Field.page()
	.name("page_field","Page Field")
```

Setting additional options with `set` helper method

```javascript
Field.page()
	.name("page_field","Page Field")
	.set("placeholder","Page to pull from")
```

### Rich Text Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#rich-text

```javascript
Field.richText()
	.name("richtext_field","Rich Text Field")
```

Setting additional options with `set` helper method

```javascript
Field.richText()
	.name("richtext_field","Rich Text Field")
	.set("enabled_features",["bold","link","image"])
```

### Simple menu Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#simple-menu

```javascript
Field.simpleMenu()
	.name("simplemenu_field","Simple menu Field")
```

### Tag Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#tag

```javascript
Field.tag()
	.name("tag_field","Tag Field")
```

Setting additional options with `set` helper method

```javascript
Field.tag()
	.name("tag_field","Tag Field")
	.set("tag_value","SLUG")
```

### Text Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#text

```javascript
Field.text()
	.name("text_field","Text Field")
```

Setting additional options with `set` helper method

```javascript
Field.text()
	.name("text_field","Text Field")
	.set("placeholder","Enter text here")
	.set("allow_new_line",false)
	.set("show_emoji_picker",false)
	.set("validation_regex","")
```

### URL Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#url

```javascript
Field.url()
	.name("url_field","URL Field")
```

Setting additional options with `set` helper method

```javascript
Field.url()
	.name("url_field","URL Field")
	.set("supported_types",["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"])
	.set("default",{
		"content_id" : null,
		"href" : "http://example.com",
		"type" : "EXTERNAL"
	})
```


### Video Field <!-- omit in toc -->

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#video

```javascript
Field.video()
	.name("video_field","Video Field")
```

Setting additional options with `set` helper method

```javascript
Field.video()
	.name("video_field","Video Field")
	.set("default",{
		"player_id" : 32173842991,
		"height" : 1224,
		"width" : 1872,
		"conversion_asset" : {
			"type" : "CTA",
			"id" : "c3e4fa03-2c69-461d-b9af-22b2fde86bc7",
			"position" : "POST"
		}
	})
```


### Salesforce Campaign Field <!-- omit in toc -->

```javascript
Field.sfCampaign()
	.name("sfdc_campaign","Salesforce Campaign Field")
```

## Usage: Groups

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields-overview#field-groups

You can create a field group (and nested groups) like this:

```javascript
const { Group, Field } = require("@igomoon/hubspot-fields-js");

new Group()
	.name("group", "Group")
	.children([	
		Field.text(),		
		// Other Fields/Groups
		new Group()
			.name("sub_content", "SubContent")
			.children([				
				Field.text(),				
				// Other Fields/Groups
			])		
	])
```

**IMPORTANT:** Make sure to pull in the `Group` class from the package at the top of you file.
`const { Group, Field } = require("@igomoon/hubspot-fields-js");` 

Looking for [Repeating Groups](#repeater)? See the [Helper Methods](#usage-helper-methods) below.
https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields-overview#repeating-groups


## Usage: Helper Methods

### Name + Label

`name(name, label)`

```javascript
Field.text()
	.name("field_name","Field Label")
```

### ID

`id(id)`

```javascript
Field.text()
	.id("321732-3231-3213554-21")
```

### Default

`default(value)`

```javascript
Field.text()
	.default("value to set")
```

### Set

`set(key,value)`

```javascript
Field.text()
	.set("placeholder","Placeholder Text")
```

### Visibility

`visibleIf(controllingField, regex, type = "EQUAL")`

Sets controlling field options under visibility

```javascript
Field.text()
	.visibleIf("other_field_id","value to test")
```

```javascript
Field.text()
	.visibleIf("other_field_id","value to test","NOT_EQUAL")
```

### Repeater

https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields-overview#repeaters

`repeat(overrides = {})`

```javascript
Field.text()
	.repeat()
```

```javascript
new Group()
	.name("group","Group")
	.children([])
	.repeat()
```

Override the repeat options like so:

```javascript
new Group()
	.name("group","Group")
	.children([])
	.repeat({
		"min": null,
		"max": 5,
		"sorting_label_field": 'group.name',
		"default": 1
	})
```

### Help Text

`helpText(text)`

```javascript
Field.text()
	.helpText("Help text")
```

### Inline Help Text

`inlineHelpText(text)`

```javascript
Field.text()
	.inlineHelpText("Inline Help Text")
```

### Label

`label(value)`

```javascript
Field.text()
	.label("Label Value")
```

### Required

`required(required = true)`

```javascript
Field.text()
	.required()
```

```javascript
Field.text()
	.required(false)
```

### Hidden Sub Fields

`hiddenSubfields(subFields)`

Sets hidden_subfields under visibility

```javascript
Field.text()
	.hiddenSubfields({
      "font": true,
      "size": true
    })
```

### Locked

`locked(locked = true)`

```javascript
Field.text()
	.locked()
```

```javascript
Field.text()
	.locked(false)
```

### Choices

For choice Field only
`choices(choices = [])`

```javascript
Field.choice()
	.choices([])
```

### Children

For Groups Only
`children(children = [])`

```javascript
new Group()
	.children([])
```

## Advanced Usage

What's the best feature of all? Hubspot Fields JS allows you to abstract your fields into partials. Giving you the ability to create common fields once and then pull them into any Fields-JS enabled module that you like. Removing the pain of constant duplication and allowing you to make global changes by just changing a sinle partial file.

The example below creates a text field partial with a validation regex for an id attribut, then in 2 different module fields.js file, that partial is pulled in and inserted. 

`src/fields/cssID.js`

```javascript
const { Field } = require('@igomoon/hubspot-fields-js');
module.exports = function () {
	return Field
		.text()
		.name('css_id', 'CSS ID');
		.set("validation_regex","-?[a-zA-Z]+[a-zA-Z0-9-]+")
}
```

`src/modules/example.module/fields.js`

```javascript
const { Field } = require("@igomoon/hubspot-fields-js");

// Pull in the Partial (IMPROTANT: Relative to the modules final destination in the dist folder) 
let cssID = require('../../../src/fields/cssID');

module.exports = [
	Field.text()
		.name("title","Title")
		.default("Text"),
	// This will insert the CSS ID field for this module
	cssID()
]; 
```


`src/modules/second-example.module/fields.js`

```javascript
const { Group, Field } = require("@igomoon/hubspot-fields-js");

// Pull in the Partial (IMPROTANT: Relative to the modules final destination in the dist folder) 
let cssID = require('../../../src/fields/cssID');

module.exports = [
	new Group()
		.name("group","Group")
		.children([
			Field.text()
				.name("title","Title")
				.default("Text"),			
			Field.richText()
				.name("text","Text")
				.default("<p>This is just some placeholder text in a rich text field</p>")
		])
	// This will insert the CSS ID field for this module
	cssID()
]; 
```

## About iGoMoon

[iGoMoon](https://www.igomoon.com/)’s mission is to help companies grow through data-driven communication, smart technology and relevant content. We live and breathe HubSpot and being Certified in Advanced CMS Implementation we are constantly improving our development process to better serve our customers. 

Get to know us more on our [Vlog Månresan (The moonshot journey)](https://www.igomoon.com/manresan)

### We're Hiring

We are always looking for skilled developers at iGoMoon, if you have HubSpot experience then there may be a spot for you here. Think you have what it takes? Then try our [HubSpot Developer Coding Task](https://github.com/iGoMoon/developer-coding-task) and connect with us on our career page here: [https://careers.igomoon.com/connect](https://careers.igomoon.com/connect)

## Contributing

For more information on developing, see the [Contributing Guide](CONTRIBUTING.md).

## License

Apache 2.0
