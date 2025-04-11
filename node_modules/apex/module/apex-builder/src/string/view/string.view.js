import { h } from 'inferno';
import { SetTypeView } from '../../schema/view/set-type.view';
import { SetLabelView } from '../../schema/view/set-label.view';


export function StringView ({ schema, update }) {
	// console.log('update!', update);
	return h('table.string', [
		h(SetTypeView, { schema, update }),
		h(SetLabelView, { schema, update })
	]);
}
