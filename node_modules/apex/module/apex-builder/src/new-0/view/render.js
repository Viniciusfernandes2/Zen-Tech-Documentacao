import { h, linkEvent } from 'inferno';
import { connect } from '../../util/connect';
import { Resolve } from './resolve';
import { Type } from '../type';


function mapStateToProps (db, { schemaId, stateId }) {
	// console.log('RenderComponent mapping state to props', schema, state);
	return {
		schema: db.data[schemaId],
		state: db.data[stateId]
	};
}


function mapDispatchToProps (dispatch, props) {
	console.log('mapDispatchToProps', props);
	return {
		update: (type, value) => {
			console.log('update', props, type, value);
			return dispatch({ type, props, value });
		}
	};
}

export const Render = connect(mapStateToProps, mapDispatchToProps)(function Render (props) {
	console.log('Render', props);
	var sType = props.schema.type,
		sTpl = props.tpl || 'default';
	if (!Type[sType]) {
		throw new Error(`unknown type ${ sType }`);
	}
	if (!Type[sType].tpl[sTpl]) {
		throw new Error(`unknown tpl ${ sTpl } for type ${ sType }`);
	}
	return Type[sType].tpl[sTpl](props);
});

export function createState (db, schemaId) {
	var schema = db.data[schemaId];
	var id = db.data.push(null) - 1;
	var val = Type[schema.type].create(db, schema);
	db.data[id] = val;
	return id;
}
export function loadState (db, schemaId, state) {
	var schema = db.data[schemaId];
	var id = db.data.push(null) - 1;
	var val = Type[schema.type].load(db, schema, state);
	db.data[id] = val;
	return id;
}

export function loadStateAlt (db, schema, state) {
	console.log('loadStateAlt', schema, state);
	var id = db.data.push(null) - 1;
	var val = Type[schema.type].loadAlt(db, schema, state);
	db.data[id] = val;
	return id;
}


export function destroyState (db, schemaId, stateId) {
	var schema = db.data[schemaId],
		state = db.data[stateId];
	db.data[stateId] = null;
	Type[schema.type].destroy(db, schema, state);
}




function ensureArray (value) {
	return Array.isArray(value) ? value : [value];
}


function $watch (map, fn) {
	if (typeof map !== 'object') {
		return h(Resolve, { map: { value: map } }, [({ data }) => ensureArray(fn(data.value))]);
	}
	return h(Resolve, { map }, [({ data }) => ensureArray(fn(data))]);
}

function $map (ref, fn) {
	return [$watch(ref, arr => arr.map(fn))];
}

function $resolve (fn) {
	return ref => $watch(ref, fn);
}





Object.assign(Type, {
	schema: {
		tpl: {
			edit: ({ schema, state, stateId, update }) => {
				console.log('edit schema', schema, state);
				// return h('div', ['edit schema']);
				schema = Type[state.type].schema;
				return h(Render, {
					schemaId: Type[state.type].xSchema,
					stateId,
					tpl: 'edit'
				});
			}
		},
		load: (db, schema, state) => {
			schema = Type[state.type].schema;
			return {
				type: state.type,
				...Type[schema.type].loadAlt(db, schema, state)
			};
		},
		loadAlt: (db, schema, state) => {
			console.log('schema.loadAlt', schema, state);
			if (state.type === 'schema') {
				return { type: 'schema' };
			}
			schema = Type[state.type].schema;
			return {
				type: state.type,
				...Type[schema.type].loadAlt(db, schema, state)
			};
		},
		create: (db, schema) => ({
			type: 'string'
		})
	},
	array: {
		tpl: {
			view: ({ schema, state }) => {
				return h('table', (state || [])
					.map((el, index) => h('tr', [
						h('td', [index]),
						h('td', [
							h(Render, {
								schemaId: schema.element,
								stateId: el,
								tpl: 'view'
							})
						])
					])));
			},
			edit: ({ schema, state, update }) => {
				return h('table', (state || [])
					.map((el, index) => h('tr', [
						h('td', [
							index,
							h('button', {
								type: 'button',
								onClick: linkEvent(update, Type.array.action.removeElement.bind(null, el))
							}, ['-'])
						]),
						h('td', [
							h(Render, {
								schemaId: schema.element,
								stateId: el,
								tpl: 'edit'
							})
						])
					])).concat([
						h('td', { colspan: 2 }, [
							h('button', {
								onClick: linkEvent(update, Type.array.action.addElement)
							}, ['Add Element'])
						])
					]));
			}
		},
		action: {
			addElement: update => update('addElement'),
			removeElement: (target, update) => update('removeElement', target)
		},
		create: (db, schema) => [],
		destroy: (db, schema, state) => state
			.forEach(el => destroyState(db, schema.element, el)),
		schema: {
			type: 'object',
			fields: [{
				key: 'element',
				value: {
					type: 'schema'
				}
			}]
		},
		load: (db, schema, state) => state.map(el => loadState(db, schema.element, el)),
		loadAlt: (db, schema, state) => state.map(el => loadStateAlt(db, schema.element, el))

	},
	object: {
		tpl: {
			view: ({ schema, state }) => {
				console.log('rendering object view');
				return h('table', $map(schema.fields, $resolve(field => {
					return $watch(field.key, key => {
						return h('tr', [
							h('td', [key]),
							h('td', [
								h(Render, {
									schemaId: field.value,
									stateId: state[key],
									tpl: 'view'
								})
							])
						]);
					});
				})));
			},
			edit: ({ schema, state, db }) => {
				console.log('rendering object edit');
				return h('table', $map(schema.fields, $resolve(field => {
					return $watch(field.key, key => {
						return h('tr', [
							h('td', [key]),
							h('td', [
								h(Render, {
									schemaId: field.value,
									stateId: state[key],
									tpl: 'edit'
								})
							])
						]);
					});
				})));
			}
		},
		load: (db, schema, state) => db.data[schema.fields]
			.map(id => db.data[id])
			.reduce((out, { key, value }) => {
				key = db.data[key];
				out[key] = loadState(db, value, state[key]);
				return out;
			}, {}),
		loadAlt: (db, schema, state) => schema.fields
			.reduce((out, { key, value }) => {
				out[key] = loadStateAlt(db, value, state[key]);
				return out;
			}, {}),
		create: (db, schema) => db.data[schema.fields]
			.map(id => db.data[id])
			.reduce((out, { key, value }) => {
				out[db.data[key]] = createState(db, value);
				return out;
			}, {}),
		destroy: (db, schema, state) => db.data[schema.fields]
			.map(id => db.data[id])
			.forEach(({ key, value }) => {
				destroyState(db, value, state[db.data[key]]);
			}),
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
	string: {
		tpl: {
			view: ({ schema, state }) => state,
			edit: ({ schema, state, update }) => h('input', {
				type: 'text',
				value: state,
				onInput: linkEvent(update, Type.string.action.setValue)
			})
		},
		create: (db, schema) => '',
		destroy: (db, schema, state) => null,
		action: {
			setValue: (update, event) => update('setValue', event.target.value)
		},
		load: (db, schema, state) => state,
		loadAlt: (db, schema, state) => state,
		schema: {
			type: 'object',
			fields: [{
				key: 'label',
				value: {
					type: 'string'
				}
			}]
		}
	}
});
