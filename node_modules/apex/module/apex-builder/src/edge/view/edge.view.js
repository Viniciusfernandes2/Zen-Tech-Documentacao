import { h } from 'inferno';
import { EdgeType } from '../var/edge.type';
import { connect } from '../../util/connect';


function mapStateToProps (state, { _id }) {
	return {
		edge: state.edge[_id]
	};
}

function mapDispatchToProps (dispatch, { _id }) {
	return {
		update: (type, data) => dispatch({ type, _id, data, targetType: 'edge' })
	};
}


export const EdgeView = connect(mapStateToProps, mapDispatchToProps)(function EdgeView ({ edge, update }) {
	console.log('render edge', edge, update);
	return h(EdgeType.of(edge).Component, { edge, update });
});
