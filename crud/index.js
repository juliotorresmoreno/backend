const {
    graphql,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
} = require('graphql');
const query = require('./query');
const create = require('./create');
const update = require('./update');
const remove = require('./remove');


module.exports = class {
    constructor(store, columns, singular, plural) {
        this.singular = singular||'el registro';
        this.plural = plural||'los registros';
        this.store = store||null;
        this.columns = columns||[];
    }
    mutation() {
        const singular = this.singular;
        const plural = this.plural;
        const store = this.store;
        const columns = this.columns;
        const fields = {
            _id: { type: GraphQLString }
        };
        for (var key in columns) {
            if (columns.hasOwnProperty(key)) {
                var element = columns[key];
                fields[key] = {
                    type: columns[key].type
                };
            }
        }
        return {
            [`${store}Create`]: {
                description: `Permite registrar ${plural}`,
                type: new GraphQLObjectType({
                    name: `${store}Create`,
                    fields: fields,
                    description: `Entidad que representa ${singular} creado.`,
                }),
                args: fields,
                resolve(root, data) {
                    return create(store, data);
                }
            },
            [`${store}Update`]: {
                description: `Permite actualizar ${plural}`,
                type: new GraphQLObjectType({
                    name: `${store}Update`,
                    fields: fields,
                    description: `Entidad que representa ${singular} actualizo.`,
                }),
                args: fields,
                resolve(root, data) {
                    if (data._id === undefined) {
                        throw new Error("_id not found");
                    }
                    return update(store, data._id, data);
                }
            },
            [`${store}Remove`]: {
                description: `Permite eliminar ${plural}`,
                type: new GraphQLObjectType({
                    description: `Respuesta que informa si la eliminacion fue exitosa o no`,
                    name: `${store}Remove`,
                    fields: { status: { type: GraphQLString } },
                }),
                args: { _id: { type: GraphQLString } },
                resolve(root, data) {
                    if (data._id === undefined) {
                        throw new Error("_id not found");
                    }
                    return remove(store, data._id);
                }
            }
        }
    }
    query() {
        const singular = this.singular;
        const plural = this.plural;
        const store = this.store;
        const columns = this.columns;
        const fields = {
            _id: { type: GraphQLString }
        };
        for (var key in columns) {
            if (columns.hasOwnProperty(key)) {
                var element = columns[key];
                fields[key] = {
                    type: columns[key].type
                };
            }
        }
        return {
            [`${store}Query`]: {
                description: `Permite consultar ${plural}`,
                type: new GraphQLList(
                    new GraphQLObjectType({
                        description: `Entidad que muestra los datos del ${singular}`,
                        name: `${store}QueryRow`,
                        fields: fields
                    })
                ),
                resolve() {
                    return query(store);
                }
            }
        }
    }
}