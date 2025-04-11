import { h, linkEvent } from 'inferno';
import { SchemaTypes } from '../var/schema.type';

function setType (update, event) {
	update('setType', event.target.value);
}

export function SetTypeView ({ schema, update }) {
	return h('tr', [
		h('td', ['Type']),
		h('td', [
			h('select', {
				onChange: linkEvent(update, setType)
			}, SchemaTypes.map(type => h('option', {
				value: type.value,
				selected: type.value === schema.type
			}, [type.label])))
		])
	]);
}
