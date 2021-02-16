const { italic } = require('chalk');
const Field = require('../src/fields/Field');

describe('Field.js', () => {
    
    let field = Field.text({ name: 'name', label: 'label' });
    
    it('has the correct name', () => {
        expect(field.data.name).toBe('name');
    });
    
    it('has the correct type', () => {
        expect(field.data.type).toBe('text');
    });

    it('can repeat', () => {
        let repeater = Field.text({}).repeat();
        expect(typeof repeater.data.occurrence).toBe('object');
    });
});