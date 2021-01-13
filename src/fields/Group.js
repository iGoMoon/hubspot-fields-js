
class Group {

    constructor(overrides = {}, children) {
        this.data = Object.assign({
            "name": "group",
            "label": "Group",
            "required": false,
            "locked": false,
            "children": children,
            "type": "group",
            "inline_help_text": "",
            "help_text": "",
            "default": {}
        }, overrides);
    }


    /**
     * Return field as JSON
     */
    toJSON() {
        this.data.children.map(child => {
            return child.toJSON();
        });

        return this.data;
    }

    /**
     * 
     * @param {string} controllingField The controlling field name. Including nesting with group.name
     * @param string} regex The comparing value
     * @param {string} type Comparison type. Eg. 'EQUAL' etc.
     */
    visibleIf(controllingField, regex, type = "EQUAL") {
        if (!this.data.visibility) {
            this.data.visibility = {};
        }

        this.data.visibility = Object.assign(this.data.visibility, {
            "controlling_field": controllingField,
            "controlling_value_regex": regex,
            "operator": type,
        });

        return this;
    }

    /**
     * Group should repeat
     * @param {Object} overrides 
     */
    repeat(overrides = {}) {
        this.data.occurrence = Object.assign({
            "min": null,
            "max": null,
            "sorting_label_field": null,
            "default": null
        }, overrides);
        this.data.default = [];

        return this;
    }

    /**
     * Set name and label
     * @param {String} name 
     * @param {String} label 
     */
    name(name, label) {
        this.data.name = name;
        this.data.label = label;
        return this;
    }

    /**
     * Set inline help text
     * @param {String} text 
     */
    inlineHelpText(text) {
        this.data.inline_help_text = text;
        return this;
    }

    /**
     * Set help text
     * @param {String} text 
     */
    helpText(text) {
        this.data.help_text = text;
        return this;
    }

}

module.exports = Group;