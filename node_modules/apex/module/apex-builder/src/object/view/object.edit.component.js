import { h, linkEvent } from 'inferno';
import { EdgeEditComponent } from '../../edge/view/edge.edit.component';

function setValue (update, event) {
	return update(event.target.value);
}


export function ObjectEditComponent ({ schema, state, update }) {
	console.log('ObjectEditComponent', schema, state);
	return h('div', [
		h('label', [schema.label]),
		h('table', (schema.props || []).map(edgeId => h(EdgeEditComponent, { edgeId, state, update })))
	]);
}
