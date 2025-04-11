import { h } from 'inferno';

var Type = {
	'string': {
		view: (schema, state) => h('div', [state])
	}
};

export function RenderViewComponent ({ schema, state }) {
	return Type[schema.type].view(schema, state);
}
