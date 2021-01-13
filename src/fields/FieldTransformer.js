const fs = require('fs-extra');

class FieldTransformer {
    
    /**
     * Transform fields into JSON file.
     * @param {array} fields 
     */
    static transform(file, fields) {
        // Default to an empty array
        let fieldsJson = [];
        // Transform all fields in array toJSON()
        let transformed = fields.map(child => {
            return child.toJSON()
        });

        try {
            // Try to load the fields.json file
            fieldsJson = fs.readJSONSync(file);
            
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