import { h, linkEvent } from 'inferno';
import { connect } from '../../util/connect';

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

export const Each = connect(mapStateToProps, mapDispatchToProps)(function Each (props) {
	
});

