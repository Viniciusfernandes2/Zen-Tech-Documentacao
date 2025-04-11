import { h, linkEvent } from 'inferno';
import { SchemaEdit } from '../../schema/view/schema.edit';
// import { SchemaTypes } from '../../schema/var/schema.type';

function setKey (update, event) {
	update('SET_KEY', event.target.value);
}

export function PropEditComponent ({ schema, state, update }) {
	console.log('render prop edit', schema.key);
	return h('tr.prop', [
		h('td', [
			schema.key
		]),
		h('td', [
			h(SchemaEdit, { schemaId: schema.value, stateId: state[schema.key] })
		])
	]);
}
