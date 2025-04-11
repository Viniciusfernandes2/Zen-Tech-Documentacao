import { h } from 'inferno';

var Type = {
	'string': {
		edit: (schema, state) => h('div', [
			schema.label,
			':',
			h('input', { type: 'text', value: state })
		])
	}
};

export function RenderEditComponent ({ schema, state }) {
	return Type[schema.type].edit(schema, state);
}
