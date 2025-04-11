import { h, linkEvent } from 'inferno';
import { SchemaView } from '../../schema/view/schema.view';
// import { SchemaTypes } from '../../schema/var/schema.type';

function setKey (update, event) {
	update('SET_KEY', event.target.value);
}

export function PropView ({ edge, update }) {
	console.log('render prop', edge.key);
	return h('tr.prop', [
		h('td', [
			h('input.key', {
				value: edge.key,
				onInput: linkEvent(update, setKey)
			})
		]),
		h('td', [
			h(SchemaView, { _id: edge.value })
		])
	]);
}
