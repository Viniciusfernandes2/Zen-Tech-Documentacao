import { h } from 'inferno';
import { connect } from '../../util/connect';
import { SchemaType } from '../var/schema.type';

function mapStateToProps (state, { schemaId, stateId }) {
	return {
		schema: state.schema[schemaId],
		state: state.state[stateId]
	};
}

function mapDispatchToProps (dispatch, { stateId }) {
	return {
		update: (value) => {
			console.log('update', stateId, value);
			return dispatch({ type: 'set', _id: stateId, value, targetType: 'state' });
		}
	};
}


export const SchemaEdit = connect(mapStateToProps, mapDispatchToProps)(function SchemaEdit ({ schema, state, update }) {
	console.log('render schema', schema, update);
	return h('div', [
		h('div', [JSON.stringify(schema)]),
		schema.type && h(SchemaType.of(schema).EditComponent, { schema, state, update })
	]);
});
