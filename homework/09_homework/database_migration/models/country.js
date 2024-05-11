const { Model } = require('objection');


class Countries extends Model {
    static get tableName() {
        return 'country';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
            },
        }
    }
}

module.exports = Countries;