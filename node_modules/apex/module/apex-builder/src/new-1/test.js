const Type = {};



var db = [{
	_id: 0,
	schema: 0,
	value: { type: 'schema' }
}];
function load (schemaId, state) {
	var _id = db.push(null) - 1;
	db[_id] = {
		_id,
		type: schema.type,
		schema: schemaId,
		value: Type[schema.type].load(schema, state)
	};
	return _id;
}

function value (id) {
	var state = db[id];
	console.log('value', state);
	return Type[state.type].value(state.value);
}

Object.assign(Type, {
	schema: {
		schema: {
			type: 'schema'
		},
		load: (schema, state) => {
			schema = Type[state.type].schema;
			return { type: state.type, value: Type[schema.type].load(schema, state) };
		},
		value ({ type, value }) {
			return Type[type].value(value);
		}
	},
	object: {
		load: (schema, state) => {
			return schema.fields.map(({ key, value }) => load(value, state[key]));
		},
		value: (state) => {
			console.log('object value', state);
		},
		schema: {
			type: 'object',
			fields: [{
				key: 'fields',
				value: {
					type: 'array',
					element: {
						type: 'object',
						fields: [{
							key: 'key',
							value: {
								type: 'string'
							}
						}, {
							key: 'value',
							value: {
								type: 'schema'
							}
						}]
					}
				}
			}]
		}
	},
	array: {
		load: (schema, state) => state.map(el => load(schema.element, el)),
		schema: {
			type: 'object',
			fields: [{
				key: 'element',
				value: {
					type: 'schema'
				}
			}]
		}
	},
	string: {
		load: (schema, state) => state,
		schema: {
			type: 'object',
			fields: []
		}
	}
});

var TestSchema = {
	type: 'object',
	fields: [{
		key: 'test',
		value: {
			type: 'string'
		}
	}]
};






var XX = load(0, TestSchema);

console.log(db);
console.log(value(XX));






// export const SchemaFieldKey = {
// 	schema: {
// 		type: 'string'
// 	}
// };

// export const SchemaFieldValue = {
// 	schema: {
// 		type: 'schema'
// 	}
// };

// export const SchemaField = {
// 	schema: {
// 		type: 'object',
// 		fields: [SchemaFieldKey, SchemaFieldValue]
// 	}
// };

// export const SchemaFields = {
// 	schema: {
// 		type: 'array',
// 		element: SchemaField
// 	}
// };

// export const SchemaObject = {
// 	schema: {
// 		type: 'object',
// 		fields: [{
// 			key: 'fields',
// 			value: SchemaFields
// 		}]
// 	}
// };



