const ModuleField = require('./ModuleField');

class Group extends ModuleField {

    constructor(overrides = {}, children) {
        super();
        this.data = Object.assign({
            "name": "group",
            // "tab" : "STYLE" // Can Only Be Used When You Want Top create a style Field.
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
		this.data.children = this.data.children.filter(c => !!c)
		this.data.children
			.map(child => {
				return child.toJSON();
			});

        return this.data
    }


}

module.exports = Group;