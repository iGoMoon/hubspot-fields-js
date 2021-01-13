const Field = require('../Field');
const Group = require('../Group');
const {randomId} = require('../../Helpers');


module.exports = (overrides = {}) => {
    
    let id = randomId();
    let options = Object.assign({ name: "button", label: "Button" }, overrides);

    return new Group(options, [
        Field.boolean({ id: id, "name": "show_button_1", "label": "Show button" })
            .default(false),

        Field.text({ name: 'text', label: 'Text' }).default('Sign up here').visibleIf(id, true),
        Field.link({ name: 'link', label: 'Link' }).default('#').visibleIf(id, true),
        
        Field.choice({ name: 'color', label: 'color' }, [
            ['primary', 'Primary'],
            ['secondary', 'Secondary']
        ]).default('primary').visibleIf(id, true),
    ]);
}