import { h, linkEvent } from 'inferno';
import { connect } from '../../../util/connect';

export const Type = {};

export function resolve (db, value) {
	if (value && typeof value._id === 'number') {
		return value;
	}
	return typeof value === 'number' ? db.data[value] : { value };
}

// function resolveValue (db, value) {
// 	return typeof value === 'number' ? db.data[value].value : value;
// }



function mapStateToProps (db, { schema, state }) {
	console.log('RenderComponent mapping state to props', schema, state);
	return {
		schema: resolve(db, schema),
		state: resolve(db, state)
	};
}

function mapDispatchToProps (dispatch, { schema, state }) {
	return {
		update: (type, value) => {
			console.log('update', schema, state, value);
			return dispatch({ type, schema, state, value });
		}
	};
}

export const RenderComponent = connect(mapStateToProps, mapDispatchToProps)(function RenderComponent (props) {
	console.log('RenderComponent', props.schema, props.state);
	return Type[props.schema.value.type].view[props.view](props);
});


export function compile (db, schema) {
	var _id = db.nextId++;
	db.data[_id] = {
		_id,
		value: Type[schema.type].compile(db, schema)
	};
	return _id;
}
export function compileState (db, schemaId, state) {
	var _id = db.nextId++;
	var schema;
	console.log('schemaId', schemaId);
	if (typeof schemaId !== 'number') {
		schema = schemaId;
	} else {
		schema = db.data[schemaId].value;
	}
	db.data[_id] = {
		_id,
		value: Type[schema.type].compileState(db, schema, state)
	};
	return _id;
}

export function createState (db, schemaId) {
	var schema = resolve(db, schemaId);
	console.log('create state', schema);
	var nextId = db.nextId++;
	db.data[nextId] = {
		_id: nextId,
		value: Type[schema.value.type].create(db, schema.value)
	};
	return nextId;
}



Object.assign(Type, {
	value: {
		compileState: (db, schema, state) => {
			console.log('compile value state', schema, state);
			return schema.value;
		},
		schema: {
			type: 'object',
			fields: []
		}
	},
	schema: {
		view: {
			view: ({ schema, state }) => h('ul', [

			]),
			edit: ({ schema, state }) => {
				console.log('render schema edit', schema, state);
				return h(RenderComponent, {
					view: 'edit',
					schema: Type[state.value.type].schema,
					state
				});
			}
		},
		compile: (db, schema) => schema,
		// compileState: (db, schema, state) => compileState(db, Type[state.type].schema, state),
		compileState: (db, schema, state) => {
			if (typeof schema === 'number') {
				schema = db.data[schema].value;
			}
			return Type[resolve(db, schema.type).value].compileState(db, Type[state.type].schema, state);
			// compileState(db, Type[state.type].schema, state)
		},
		create: () => ({
			type: 'string'
		}),
		schema: null
	},
	string: {
		view: {
			view: ({ schema, state }) => h('div', [state.value]),
			edit: ({ schema, state, update }) => h('tr', [
				h('td', [schema.value.label]),
				h('td', [
					h('input', {
						type: 'text',
						value: state.value,
						onInput: linkEvent(update, Type.string.action.setValue)
					})
				])
			])
		},
		action: {
			setValue: (update, event) => update('setValue', event.target.value)
		},
		schema: {
			type: 'object',
			fields: [{
				key: 'label',
				value: {
					type: 'string',
					label: 'string label'
				}
			}]
		},
		compile: (db, schema) => schema,
		compileState: (db, schema, state) => state,
		create: () => ''
	},
	object: {
		view: {
			view: ({ schema, state }) => h('div', schema.value.fields.map(({ key, value }) => h('div', [
				key,
				h(RenderComponent, {
					view: 'view',
					schema: value,
					state: state.value[key]
				})
			]))),
			edit: ({ schema, state }) => {
				console.log('render object edit', schema, state);
				return h('tr', [
					h('td', [schema.value.label]),
					h('td', [h('table', schema.value.fields.map(({ key, value }) => h('tr', [
						h('td', [key]),
						h('td', [
							h(RenderComponent, {
								view: 'edit',
								schema: value,
								state: state.value[key]
							})
						])
					])))])
				]);
			}
		},
		schema: {
			type: 'object',
			fields: [{
				key: 'type',
				value: {
					type: 'value',
					value: 'object'
				}
			}, {
				key: 'fields',
				value: {
					type: 'array',
					element: {
						type: 'object',
						fields: [{
							key: 'key',
							value: {
								type: 'string',
								label: 'Key'
							}
						}, {
							key: 'value',
							value: {
								_id: 'value schema',
								type: 'schema'
							}
						}]
					}
				}
			}]
		},
		compile: (db, schema) => ({
			...schema,
			fields: schema.fields.map(({ key, value }) => ({
				key,
				value: compile(db, value)
			}))
		}),
		compileState: (db, schema, state) => schema.fields.reduce((out, { key, value }) => {
			out[key] = compileState(db, value, state[key]);
			return out;
		}, {}),
		create: (db, schema) => {
			console.log('creating object');
			return schema.fields.reduce((out, { key, value }) => {
				out[key] = createState(db, value);
				return out;
			}, {});
		}

	},
	array: {
		view: {
			view: ({ schema, state }) => h('div', (state.value || []).map(elState => h(RenderComponent, {
				view: 'view',
				schema: schema.value.element,
				state: elState
			}))),
			edit: ({ schema, state, update }) => {
				console.log('Array Edit', state);
				return h('tr', [
					h('td', [schema.value.label]),
					h('td', [
						h('table', (state.value || []).map((elState, index) => h('tr', [
							h('td', [index]),
							h('td', [
								h(RenderComponent, {
									view: 'edit',
									schema: schema.value.element,
									state: elState
								})
							])
						]))),
						h('button', {
							type: 'button',
							onClick: linkEvent(update, Type.array.action.addElement)
						}, ['Add Element'])
					])
				]);
			}
		},
		action: {
			addElement: update => update('addElement')
		},
		schema: {
			type: 'object',
			fields: [{
				key: 'element',
				value: {
					_id: 'element schema',
					type: 'schema'
				}
			}]
		},
		compile: (db, schema) => ({
			...schema,
			element: compile(db, schema.element)
		}),
		compileState: (db, schema, state) => state.map(el => compileState(db, schema.element, el)),
		create: () => []
	}
});
