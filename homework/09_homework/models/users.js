const { Model } = require('objection');


class Users extends Model {
    static get tableName() {
        return 'users';
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
                lastname: { type: 'string' },
            },
        }
    }
}

module.exports = Users;
