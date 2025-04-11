import { h, linkEvent } from 'inferno';
import { connect } from '../../util/connect';

function mapStateToProps (db, { map }) {
	// console.log('RenderComponent mapping state to props', schema, state);
	return Object
		.keys(map)
		.reduce((out, key) => {
			out['pref' + key] = db.data[map[key]];
			return out;
		}, {});
}

// function mapDispatchToProps (dispatch, props) {
// 	console.log('mapDispatchToProps', props);
// 	return {
// 		update: (type, value) => {
// 			console.log('update', props, type, value);
// 			return dispatch({ type, props, value });
// 		}
// 	};
// }

export const Resolve = connect(mapStateToProps)(function Resolve (props) {
	var data = Object
		.keys(props.map)
		.reduce((out, key) => {
			out[key] = props['pref' + key];
			return out;
		}, {});
	return h('div', props.children[0]({ data }));
});

