import { h, linkEvent } from 'inferno';

function setLabel (update, event) {
	update('setLabel', event.target.value);
}


export function SetLabelView ({ schema, update }) {
	return h('tr', [
		h('td', ['Label']),
		h('td', [
			h('input', {
				value: schema.label,
				onInput: linkEvent(update, setLabel)
			})
		])
	]);
}
