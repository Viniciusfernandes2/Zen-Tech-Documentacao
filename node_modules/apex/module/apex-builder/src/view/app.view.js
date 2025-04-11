/* global window */
import { h, Redux } from 'inferno';
import { TestRender } from '../new-0/view/test';
/*
import { RenderComponent, resolve, compile, compileState, createState, Type } from '../new/render/view/render.component';

import { createStore } from 'redux';

const InitialState = {
	nextId: 6,
	data: {
		'0': {
			_id: 0,
			value: {
				type: 'schema'
			}
		}
	}
};



function reducer (db, action) {
	var schema = resolve(db, action.schema);
	var state = resolve(db, action.state);
	switch (action.type) {
		case 'setValue':
			return {
				...db,
				data: {
					...db.data,
					[state._id]: {
						...state,
						value: action.value
					}
				}
			};
		case 'addElement':
			console.log('addElement', schema, state);
			var nextId = createState(db, schema.value.element);
			return {
				...db,
				data: {
					...db.data,
					[state._id]: {
						...state,
						value: state.value.concat(nextId)
					}
				}
			};
		default:
			return db;
	}
}

Object.keys(Type).forEach(type => {
	if (!Type[type].schema) {
		return;
	}
	Type[type].schema = compileState(InitialState, 0, Type[type].schema);
});

const store = createStore(reducer, InitialState);
window.STORE = store;

var TestSchema = compile(InitialState, {
	type: 'array',
	element: {
		type: 'object',
		fields: [{
			key: 'test',
			value: {
				type: 'string',
				label: 'hello'
			}
		}]
	}
});

var TestState = compileState(InitialState, TestSchema, [{
	test: 'world'
}]);

console.log('schema compile', compileState(InitialState, 0, {
	type: 'object',
	fields: [{
		key: 'xxx',
		value: {
			type: 'string',
			label: 'new schema string'
		}
	}]
}));
*/

export function AppView (props, state) {
	return h('div', [
		// h(Redux.Provider, { store }, h('div', [
			// h(RenderComponent, {
			// 	view: 'edit',
			// 	schema: TestSchema,
			// 	state: TestState
			// }),
			// h(RenderComponent, {
			// 	view: 'view',
			// 	schema: TestSchema,
			// 	state: TestState
			// }),
			// h('hr'),
			// h('hr'),
			// h(RenderComponent, {
			// 	view: 'edit',
			// 	schema: {
			// 		_id: 'root schema',
			// 		type: 'schema'
			// 	},
			// 	state: TestSchema
			// })
		// ]))
		h(TestRender)

	]);
}
