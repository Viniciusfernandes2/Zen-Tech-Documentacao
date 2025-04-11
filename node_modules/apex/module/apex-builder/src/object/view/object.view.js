import { h, linkEvent } from 'inferno';
import { EdgeView } from '../../edge/view/edge.view';
import { SetLabelView } from '../../schema/view/set-label.view';
import { SetTypeView } from '../../schema/view/set-type.view';


function addProperty (update) {
	update('addProperty', { type: 'prop' });
}

export function ObjectView ({ schema, update }) {
	return h('table.object', [
		h(SetTypeView, { schema, update }),
		h(SetLabelView, { schema, update }),
		h('tr', [
			h('td', ['Fields']),
			h('td', [
				h('table', (schema.props || []).map(_id => h(EdgeView, { _id }))),
				h('div', {
					onClick: linkEvent(update, addProperty)
				}, ['Add Property'])
			])
		])
	]);
}


