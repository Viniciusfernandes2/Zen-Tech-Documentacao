import { h, linkEvent } from 'inferno';

function setValue (update, event) {
	return update(event.target.value);
}


export function StringEditComponent ({ schema, state, update }) {
	return h('div', [
		h('label', [schema.label]),
		h('input.string', {
			value: state,
			onInput: linkEvent(update, setValue)
		}),
		'Value: ', state
	]);
}
