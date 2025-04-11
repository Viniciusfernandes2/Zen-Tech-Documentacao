import { h } from 'inferno';
import { connect } from '../../util/connect';
import { SchemaType } from '../var/schema.type';

function mapStateToProps (state, { _id }) {
	return {
		schema: state.schema[_id]
	};
}

function mapDispatchToProps (dispatch, { _id }) {
	return {
		update: (type, data) => dispatch({ type, _id, data, targetType: 'schema' })
	};
}


export const SchemaView = connect(mapStateToProps, mapDispatchToProps)(function SchemaView ({ schema, update }) {
	console.log('render schema', schema, update);
	return h('div', [
		schema.type && h(SchemaType.of(schema).Component, { schema, update })
	]);
});
