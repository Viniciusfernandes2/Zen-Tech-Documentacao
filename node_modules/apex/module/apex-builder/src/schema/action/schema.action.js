function withTarget (fn) {
	return (state, action) => ({
		...state,
		schema: {
			...state.schema,
			[action._id]: fn(state.schema[action._id], action.data)
		}
	});

}

export const SchemaAction = {
	setType: withTarget((state, type) => ({
		...state,
		type
	})),
	setLabel: withTarget((state, label) => ({
		...state,
		label
	}))
};
