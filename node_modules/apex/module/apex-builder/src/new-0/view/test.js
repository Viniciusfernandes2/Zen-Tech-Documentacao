/* global window */
import { h, Redux } from 'inferno';
import { createStore } from 'redux';
import { Type } from '../type';
import { Render, createState, destroyState, loadState } from './render';

const InitialState = {
	data: [
		{ type: 'schema' }
	]
};
Object.keys(Type).forEach(type => {
	if (!Type[type].schema) {
		return;
	}
	Type[type].xSchema = loadState(InitialState, 0, Type[type].schema);
});

var TestSchemaId = loadState(InitialState, 0, {
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


var TestStateId = loadState(InitialState, TestSchemaId, [{
	test: 'world'
}, {
	test: 'second'
}]);

function updateIndex (arr, targetIndex, fn) {
	return arr.map((el, index) => index !== targetIndex ? el : fn(el));
}


function reducer (db, action) {
	var schema, state;
	switch (action.type) {
		case 'addElement':
			schema = db.data[action.props.schemaId];
			state = db.data[action.props.stateId];
			console.log('addElement', action, schema, state);
			var newEl = createState(db, schema.element);
			return {
				...db,
				data: updateIndex(db.data, action.props.stateId, el => el.concat(newEl))
			};
		case 'removeElement':
			schema = db.data[action.props.schemaId];
			state = db.data[action.props.stateId];
			console.log('removeElement', action, schema, state);
			destroyState(db, schema.element, action.value);
			return {
				...db,
				data: updateIndex(db.data, action.props.stateId, target => target.filter(el => el !== action.value))
			};
		case 'setValue':
			return {
				...db,
				data: updateIndex(db.data, action.props.stateId, el => action.value)
			};
		default:
			return db;
	}
}

const store = createStore(reducer, InitialState);
window.STORE = store;

export function TestRender () {
	return h('div', [
		h(Redux.Provider, { store }, h('div', [
			h(Render, {
				schemaId: 0,
				stateId: TestSchemaId,
				tpl: 'edit'
			}),
			h('hr'),
			h('hr'),
			h(Render, {
				schemaId: TestSchemaId,
				stateId: TestStateId,
				tpl: 'edit'
			}),
			h('hr'),
			h('hr'),
			h(Render, {
				schemaId: TestSchemaId,
				stateId: TestStateId,
				tpl: 'view'
			})
		]))
	]);
}
