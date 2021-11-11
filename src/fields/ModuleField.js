class ModuleField {

	/**
     * 
     */
	applyIf(show, callback) {
		if (!!show) {
			return callback(this)
        }
        return this;
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
     * 
     * @param {object} subFields eg. {opacity: true}
     */
    hiddenSubfields(subFields) {
        if (!this.data.visibility) {
            this.data.visibility = {};
        }

        this.data.visibility.hidden_subfields = subFields;
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

    /**
     * Determines if the field can be left blank in the editor. If true, content will not be allowed to publish without filling out this field.
     * @param {boolean}
     */
    required(required = true) {
        this.data.required = Boolean(required);
        return this;
    }

    /**
     * Determines if the field is editable in the content editor. If "true", the field will not appear in the content editor.
     * @param {boolean} 
     */
    locked(locked = true) {
        this.data.locked = Boolean(locked);
        return this;
    }

    /**
     * Set any key.
     * @param {string} key 
     * @param {string} value 
     */
    set(key, value) {
        this.data[key] = value;
        return this;
    }

    /**
     * Set id
     * @param {String} id 
     */
    id(id) {
        this.data.id = id;
        return this;
    }

    /**
     * Set label
     * @param {String} label 
     */
    label(label) {
        this.data.label = label;
        return this;
    }

    /**
     * Set default value of field
     * @param {*} value 
     */
    default(value) {
        this.data.default = value;
        return this;
	}

    /**
     * Set chocies for choice
     * @param {Array} choices
     */
	choices(choices = []) {
		if (this.data.type == 'choice') {
			this.data.choices = choices;
		}
        return this;
    }

    /**
     * Set children for choice
     * @param {Array} children
     */
	children(children = []) {
		if (this.data.type == 'group') {
			this.data.children = children;
		}
        return this;
    }

}

module.exports = ModuleField;