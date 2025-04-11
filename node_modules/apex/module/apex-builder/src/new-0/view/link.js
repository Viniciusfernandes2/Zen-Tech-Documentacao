import { connect } from '../../util/connect';

export const LinkState = connect(mapStateToProps, mapDispatchToProps)(function RenderComponent (props) {
	console.log('RenderComponent', props.schema, props.state);
	return Type[props.schema.value.type].view[props.view](props);
});
