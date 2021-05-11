const ModuleField = require('./ModuleField');

class Field extends ModuleField {

    constructor(data) {
        super();
        this.data = Object.assign({
			"required": false,
			"locked": false,
			"help_text": "",
			"inline_help_text": "",
			//"default": null (HS handles this for us)
		}, data);
    }

    /**
     * Blog field
     * @param {Object} overrides 
     */
    static blog(overrides) {
        return new Field(Object.assign({
            "name": "blog_field",
            "label": "Blog field",
            "type": "blog"
        }, overrides));
    }

    /**
     * Boolean field
     * @param {Object} overrides 
     */
    static boolean(overrides) {
        return new Field(Object.assign({
            "name": "boolean_field",
            "label": "Boolean field",
            "type": "boolean",
            //"default": false
        }, overrides));
    }

    /**
     * Choice field
     * @param {Object} overrides 
     * @param {Array} choices 
     */
    static choice(overrides, choices = []) {
        return new Field(Object.assign({
            "name": "choice_field",
            "label": "Choice field",
            //"display": "select",
            "choices": choices,
            "type": "choice"
        }, overrides));
    }

    /**
     * Color field
     * @param {Object} overrides 
     */
    static color(overrides) {
        return new Field(Object.assign({
            "name": "color_field",
            "label": "Color field",
            "type": "color"
        }, overrides));
    }

    /**
     * Cta field
     * @param {Object} overrides 
     */
    static cta(overrides) {
        return new Field(Object.assign({
            "name": "cta_field",
            "label": "CTA field",
            "type": "cta"
        }, overrides));
	} 
	
	/**
     * CRM Object field
     * @param {Object} overrides
	 * @param {String} overrides.object_type - Type of CRM Object the user can pick from.
  	 * @param {Array} overrides.properties_to_fetch - Array of property names associated with the object type in string form. {@link https://developers.hubspot.com/docs/cms/features/custom-objects#supported-crm-object-types}
  	 * @param {Object} overrides.default - Object with id of default selected object instance. Contact ID, Company ID etc
	 *
	 * @see {@link https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#crm-object} 
     */
    static crmObject(overrides) {
        return new Field(Object.assign({
            "name" : "crmobject_field",
			"label" : "CRM object",
			"object_type" : "CONTACT",
			//"properties_to_fetch" : [ ],
			"type" : "crmobject"
        }, overrides));
    }

    /**
     * Date field
     * @param {Object} overrides 
     */
    static date(overrides) {
        return new Field(Object.assign({
            "name": "date_field",
            "label": "Date field",
            "type": "date"
        }, overrides));
    }

    /**
     * DateTime field
     * @param {Object} overrides 
     */
    static dateTime(overrides) {
        return new Field(Object.assign({
            "name": "datetime_field",
			"label": "Date and time field",
			//"step" : 30,
            "type": "datetime"
        }, overrides));
    }

    /**
     * Email field
     * @param {Object} overrides 
     */
    static email(overrides) {
        return new Field(Object.assign({
            "name": "email_field",
            "label": "Email Address Field",
            "type": "email"
        }, overrides));
    }
	
	/**
     * Embed field
     * @param {Object} overrides
	 * @param {Array} overrides.supported_source_types - Supported source types for either oEmbed URLs or HTML embed code
  	 * @param {Array} overrides.supported_oembed_types - Supported oEmbed type including "photo", "video", "link", and "rich".
  	 * @param {Object} overrides.default - An array containing the "source_type" parameter. This parameter has one string based value from the options provided in the "supported_source_types" parameter.
	 *
	 * @see {@link https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#embed} 
     */
    static embed(overrides) {
        return new Field(Object.assign({
            "name" : "embed_field",
			"label" : "Embed",
			//"supported_source_types" : [ "oembed", "html" ],
			//"supported_oembed_types" : [ "photo", "video", "link", "rich" ],
			"type" : "embed",
        }, overrides));
    }

    /**
     * File field
     * @param {Object} overrides 
     */
    static file(overrides) {
        return new Field(Object.assign({
            "name": "file_field",
			"label": "File field",
			//"picker" : "file",
            "type": "file"
        }, overrides));
    }

    /**
     * Follow up email field
     * @param {Object} overrides 
     */
    static followUpEmail(overrides) {
        return new Field(Object.assign({
            "name": "followupemail_field",
            "label": "Followup email field",
            "type": "followupemail"
        }, overrides));
    }

    /**
     * Font field
     * @param {Object} overrides 
     */
    static font(overrides) {
        return new Field(Object.assign({
            "name": "font_field",
            "label": "font_field",
			"type": "font",
			//"load_external_fonts" : true,
			//"default" : {
			// 	"size": 12,
			// 	"size_unit": "px",
			// 	"color": "#000",
			// 	"styles": {}
			// }
        }, overrides));
    }

    /**
     * Form field
     * @param {Object} overrides 
     */
    static form(overrides) {
        return new Field(Object.assign({
            "name": "form_field",
            "label": "Form field",
            "type": "form",
            // "default": {
            //     "response_type": "inline",
            //     "message": "Thanks for submitting the form."
            // }
        }, overrides));
	}
		
	/**
     * HubDB Row field
     * @param {Object} overrides
	 * @param {string} overrides.table_name_or_id - The name or ID of the HubDB table. This field is required.
  	 * @param {Array} overrides.columns_to_fetch - An array of column names to fetch from the table. If left blank, will return all columns in the table.
  	 * @param {Array} overrides.display_columns - An array of column names to use in choice label. If left blank, will return only the first column in the table.
  	 * @param {String} overrides.display_format - The format you would like the column data to display in the HubDB row selector using the percent symbol and number to designate a column. 
  	 * @param {Object} overrides.default - Object containing “id” for setting the default hubdb row.
	 *
	 * @see {@link https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#hubdb-row} 
     */
	static hubdbRow(overrides) {
        return new Field(Object.assign({
            "name" : "hubdbrow_field",
			"label" : "HubDB row",
			"table_name_or_id" : "",
			// "columns_to_fetch" : [],
			// "display_columns" : [],
			// "display_format" : "%0 - %1",
			"type" : "hubdbrow",
        }, overrides));
    }

    /**
     * HubDB Table field
     * @param {Object} overrides 
     */
    static hubdbTable(overrides) {
        return new Field(Object.assign({
            "name": "hubdbtable_field",
            "label": "HubDB table field",
            "type": "hubdbtable"
        }, overrides));
    }

    /**
     * Icon field
     * @param {Object} overrides 
     */
    static icon(overrides) {
        return new Field(Object.assign({
            "name": "icon_field",
            "label": "Icon field",
			"type": "icon",
			"default": {}
        }, overrides));
    }

    /**
     * Image field
     * @param {Object} overrides 
     */
    static image(overrides) {
        return new Field(Object.assign({
            "name": "image_field",
            "label": "Image field",
            //"responsive": true,
            //"show_loading": false,
            //"resizable": true,
			"type": "image",
			"default" : {
				"size_type" : "auto",
				"src" : "",
				"alt" : null,
				"loading": "disabled"
			}
        }, overrides));
    }

    /**
     * Link field
     * @param {Object} overrides 
     */
    static link(overrides) {
        return new Field(Object.assign({
            "name": "link_field",
            "label": "Link field",
            "type": "link",
            //"supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"],
            "default": {
				"url" : {
					"content_id" : null,
					"type" : "EXTERNAL",
					"href" : ""
				},
				"open_in_new_tab" : false,
				"no_follow" : false
			}
        }, overrides));
    }

    /**
     * Logo field
     * @param {Object} overrides 
     */
    static logo(overrides) {
        return new Field(Object.assign({
            "name": "logo_field",
            "label": "Logo field",
            "type": "logo",
            "default": {
				"override_inherited_src" : false,
				"src" : null,
				"alt" : null
			}
        }, overrides));
    }

    /**
     * Menu field
     * @param {Object} overrides 
     */
    static menu(overrides) {
        return new Field(Object.assign({
            "name": "menu_field",
            "label": "Menu field",
            "type": "menu",
            "default": "default"
        }, overrides));
    }

    /**
     * Text field
     * @param {Object} overrides 
     */
    static number(overrides) {
        return new Field(Object.assign({
            "name": "number_field",
            "label": "Number field",
            "type": "number",
            // "display": "text",
            // "step": 1,
            // "min": null,
            // "max": null
        }, overrides));
    }

    /**
     * Page field
     * @param {Object} overrides 
     */
    static page(overrides) {
        return new Field(Object.assign({
            "name": "page_field",
            "label": "Page field",
            "type": "page"
        }, overrides));
    }

    /**
     * Rich text field
     * @param {Object} overrides 
     */
    static richText(overrides) {
        return new Field(Object.assign({
            "name": "richtext_field",
            "label": "Rich text field",
            "type": "richtext"
        }, overrides));
    }

    /**
     * Simple field
     * @param {Object} overrides 
     */
    static simpleMenu(overrides) {
        return new Field(Object.assign({
            "name": "simplemenu_field",
            "label": "Simple menu field",
            "type": "simplemenu"
        }, overrides));
    }

    /**
     * Tag field
     * @param {Object} overrides 
     */
    static tag(overrides) {
        return new Field(Object.assign({
            "name": "tag_field",
            "label": "Tag field",
            //"tag_value": "SLUG",
            "type": "tag"
        }, overrides));
    }

    /**
     * Text field
     * @param {Object} overrides 
     */
    static text(overrides) {
        return new Field(Object.assign({
            "name": "text",
            "label": "Text",
            // "validation_regex": "",
            // "allow_new_line": false,
            // "show_emoji_picker": false,
            "type": "text"
        }, overrides));
    }

    /**
     * URL field
     * @param {Object} overrides 
     */
    static url(overrides) {
        return new Field(Object.assign({
            "name": "url_field",
            "label": "URL field",
            "type": "url",
            //"supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"],
            "default": {
				"content_id" : null,
				"href" : "",
				"type" : "EXTERNAL"
			}
        }, overrides));
    }
	
	/**
     * Video field
     * @param {Object} overrides
  	 * @param {Object} overrides.default - Video object with settings for player_id, height, width, size_type, and conversion_asset object.
	 *
	 * @see {@link https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#video} 
     */
    static video(overrides) {
		return new Field(Object.assign({
			"name" : "videoplayer_field",
			"label" : "Video",
			"type" : "videoplayer"
        }, overrides));
	}
	
	/**
     * Salesforce Campaign field
     * @param {Object} overrides
     */
    static sfCampaign(overrides) {
		return new Field(Object.assign({
			"name" : "sfdc_campaign",
			"label" : "Salesforce Campaign Field",
			"type" : "salesforcecampaign",
        }, overrides));
	}
	
    /**
     * Return the fields Json representation.
     */
    toJSON() {
        return this.data;
    }

    /**
     * Set default value of field
     * @param {*} value 
     */
    default(value) {
        switch (this.data.type) {
            case "link":
			case "url":
                this.data.default.url.href = value;
                break;
            case "color":
                this.data.default.color = value;
                break;
            case "image":
                this.data.default.src = value;
                break;
            case "form":
                this.data.default.form_id = value;
                break;
            case "crmobject":
            case "hubdbrow":
				this.data.default.id = value;
                break;
            case "embed":
				this.data.default.source_type = value;
                break;
            default:
                this.data.default = value;
                break;
        }

        return this;
    }

}

module.exports = Field;