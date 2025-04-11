import { h } from 'inferno';
import { EdgeType } from '../var/edge.type';
import { connect } from '../../util/connect';


function mapStateToProps (xstate, { state, edgeId }) {
	var schema = xstate.edge[edgeId];
	// var edgeState = xstate.state[state[schema.key]];
	// console.log('mappingState to props', xstate, state, edgeId, schema);
	// console.log('edgeState', edgeState);
	return {
		schema,
		state
	};
}

function mapDispatchToProps (dispatch, { _id }) {
	return {
		update: (type, data) => dispatch({ type, _id, data, targetType: 'edge' })
	};
}


export const EdgeEditComponent = connect(mapStateToProps, mapDispatchToProps)(function EdgeEditComponent ({ schema, state, update }) {
	console.log('edit edge', schema, state);
	return h(EdgeType.of(schema).EditComponent, { schema, state, update });
});
