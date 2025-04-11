import { h, Redux } from 'inferno';
// import { SchemaView } from '../schema/view/schema.view';
// import { SchemaEdit } from '../schema/view/schema.edit';
import { SchemaType } from '../schema/var/schema.type';
// import { RenderEditComponent } from '../new/render/view/render.edit.component';
// import { RenderViewComponent } from '../new/render/view/render.view.component';
import { RenderComponent } from '../new/render/view/render.component';

import { createStore } from 'redux';

const InitialState = {
	nextId: 3,
	schema: {
		'0': {
			_id: '0',
			type: 'object',
			props: ['2']
		},
		'1': {
			_id: '1',
			type: 'string',
			label: 'field!'
		}
	},
	edge: {
		'2': {
			_id: '2',
			type: 'prop',
			key: 'test',
			value: '1'
		}
	},
	state: {
		'3': {
			test: '4'
		},
		'4': 'hello'
	}
};


const EdgeActions = {
	SET_KEY (state, action) {
		return {
			...state,
			key: action.data
		};
	}
};

const StateActions = {
	set: (state, action) => {
		return action.value;
	}
};


function reducer (state, action) {
	console.log('root reducer', state, action);
	if (action.targetType === 'schema') {
		var target = state.schema[action._id];
		return SchemaType.of(target).Action[action.type](state, action);
	}
	if (action.targetType === 'edge') {
		return {
			...state,
			edge: {
				...state.edge,
				[action._id]: EdgeActions[action.type](state.edge[action._id], action)
			}
		};
	}
	if (action.targetType === 'state') {
		return {
			...state,
			state: {
				...state.state,
				[action._id]: StateActions[action.type](state.state[action._id], action)
			}
		};
	}
	return state;
}

const store = createStore(reducer, InitialState);
window.STORE = store;
export function AppView (props, state) {
	return h('div', [
		h(Redux.Provider, { store }, h('div', [
			// h(SchemaView, { _id: '0' }),
			// h(SchemaEdit, { schemaId: '0', stateId: '3' })
			h(RenderComponent, {
				view: 'edit',
				schema: {
					type: 'string',
					label: 'hello'
				},
				state: 'world'
			}),
			h(RenderComponent, {
				view: 'view',
				schema: {
					type: 'string',
					label: 'hello'
				},
				state: 'world'
			})
		]))


	]);
}
