const fs = require('fs');

class FieldTransformer {

    /**
     * Check if is valid
     * @param {mixed} field
     */
	 static validateField(field) {
		return !!field && typeof field == 'object'
	}

    /**
     * Transform single field into JSON.
     * @param {object} field
     */
	static fieldToJson(field) {
		if (typeof field['toJSON'] === "function") {
			return field.toJSON()
		}
		return field;
	}
    
    /**
     * Transform fields into JSON file.
     * @param {array} fields 
     */
	static transform(file, fields) {
        // Default to an empty array
		let fieldsJson = [];
        // Transform all fields in array toJSON()
        let transformed = fields
			.filter(c => this.validateField(c))
			.map(field => this.fieldToJson(field));

        try {
            // Try to load the fields.json file
            fieldsJson = JSON.parse(fs.readFileSync(file));
            
            // Append the transformed fields to the end of the fields.json file
            fieldsJson = fieldsJson.concat(transformed);
        
        } catch(e) {
            // If it didn't exist, we'll just write it
            fieldsJson = transformed;
        }

        // Write the file with indention.
        fs.writeFileSync(file, JSON.stringify(fieldsJson, null , 4));

        return true;
    }

}

module.exports = FieldTransformer;