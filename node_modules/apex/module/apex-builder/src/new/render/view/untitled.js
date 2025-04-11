const Type = {};

const Db = {
	nextId: 1,
	data: {
		'0': {
			_id: 0,
			value: {
				type: 'schema'
			}
		}
	}
};



function compile (db, schemaId, state) {
	var _id = db.nextId++;
	var schema = db.data[schemaId].value;
	console.log(schema.type);
	db.data[_id] = {
		_id,
		value: Type[schema.type].compile(db, schema, state)
	};
	return _id;
}



Object.assign(Type, {
	schema: {
		compile: (db, schema, state) => compile(db, Type[state.type].schema, state)
	},
	object: {
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
	}
});


compile(Db, 0, Type.object.schema);

