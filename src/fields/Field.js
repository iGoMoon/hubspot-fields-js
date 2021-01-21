const ModuleField = require('./ModuleField');

class Field extends ModuleField {

    constructor(data) {
        super();
        this.data = data;
    }

    /**
     * Blog field
     * @param {Object} overrides 
     */
    static blog(overrides) {
        return new Field(Object.assign({
            "name": "blog_field",
            "label": "Blog field",
            "required": false,
            "locked": false,
            "type": "blog",
            "placeholder": "",
            "inline_help_text": "",
            "help_text": "",
            "default": null
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
            "required": false,
            "locked": false,
            "type": "boolean",
            "inline_help_text": "",
            "help_text": "",
            "default": false
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
            "required": false,
            "locked": false,
            "display": "select",
            "inline_help_text": "",
            "help_text": "",
            "choices": choices,
            "type": "choice",
            "placeholder": "",
            "default": null
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "type": "color",
            "default": {
                "color": "#ffffff",
                "opacity": 100
            }
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "type": "cta",
            "default": null
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
            "required": false,
            "locked": false,
            "step": 1,
            "type": "date",
            "inline_help_text": "",
            "help_text": "",
            "default": null
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
            "required": false,
            "locked": false,
            "step": 30,
            "type": "datetime",
            "inline_help_text": "",
            "help_text": "",
            "default": null
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "type": "email",
            "placeholder": "",
            "default": null
        }, overrides));
    }

    /**
     * File field
     * @param {Object} overrides 
     */
    static file(overrides) {
        return new Field(Object.assign({
            "picker": "file",
            "name": "file_field",
            "label": "File field",
            "required": false,
            "inline_help_text": "",
            "help_text": "",
            "locked": false,
            "type": "file",
            "default": null
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "type": "followupemail",
            "placeholder": "",
            "default": null
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "load_external_fonts": true,
            "type": "font",
            "default": {
                "size": 12,
                "font": "Merriweather",
                "font_set": "GOOGLE",
                "size_unit": "px",
                "color": "#000",
                "styles": {}
            }
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "type": "form",
            "default": {
                "response_type": "inline",
                "message": "Thanks for submitting the form."
            }
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "type": "hubdbtable",
            "placeholder": "",
            "default": null
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "responsive": true,
            "resizable": false,
            "type": "image",
            "default": {
                "src": "",
                "alt": null
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
            "required": false,
            "locked": false,
            "supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"],
            "type": "link",
            "inline_help_text": "",
            "help_text": "",
            "default": {
                "url": {
                    "content_id": null,
                    "type": "EXTERNAL",
                    "href": ""
                },
                "open_in_new_tab": false,
                "no_follow": false
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "resizable": true,
            "type": "logo",
            "default": {
                "override_inherited_src": false,
                "src": null,
                "alt": null
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "type": "menu",
            "placeholder": "",
            "default": null
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
            "required": false,
            "locked": false,
            "display": "text",
            "step": 1,
            "type": "number",
            "min": null,
            "max": null,
            "inline_help_text": "",
            "help_text": "",
            "default": null
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "type": "page",
            "placeholder": "",
            "default": null
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
            "required": false,
            "locked": false,
            "type": "richtext",
            "inline_help_text": "",
            "help_text": "",
            "default": null
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
            "required": false,
            "locked": false,
            "type": "simplemenu",
            "inline_help_text": "",
            "help_text": "",
            "default": []
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "tag_value": "SLUG",
            "type": "tag",
            "placeholder": "",
            "default": null
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
            "required": false,
            "locked": false,
            "validation_regex": "",
            "allow_new_line": false,
            "show_emoji_picker": false,
            "type": "text",
            "placeholder": "",
            "inline_help_text": "",
            "help_text": "",
            "default": null
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
            "required": false,
            "locked": false,
            "inline_help_text": "",
            "help_text": "",
            "supported_types": [
                "EXTERNAL",
                "CONTENT",
                "FILE",
                "EMAIL_ADDRESS",
                "BLOG"
            ],
            "type": "url",
            "default": {
                "content_id": null,
                "href": "",
                "type": "EXTERNAL"
            }
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
                this.data.default.url.href = value;
                break;
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
            default:
                this.data.default = value;
                break;
        }

        return this;
    }


}

module.exports = Field;