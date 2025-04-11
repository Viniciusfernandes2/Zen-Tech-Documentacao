export const ObjectAction = {
	addProperty: (state, action) => {
		var _id = state.nextId;
		var target = state.schema[action._id];
		var newProp = {
			_id: _id++,
			type: 'string'
		};
		return {
			...state,
			nextId: _id + 1,
			edge: {
				...state.edge,
				[_id]: {
					...action.data,
					_id,
					value: newProp._id
				}
			},
			schema: {
				...state.schema,
				[newProp._id]: newProp,
				[action ._id]: {
					...target,
					props: (target.props || []).concat(_id)
				}
			}
		};
	}
};

