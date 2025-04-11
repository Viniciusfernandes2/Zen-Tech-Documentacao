import { EdgeType } from '../edge/var/edge.type';
import { PropView } from './view/prop.view';
import { PropEditComponent } from './view/prop.edit.component';
EdgeType
	.define({
		id: 'Type.Edge.Prop',
		value: 'prop',
		label: 'Property',
		Component: PropView,
		EditComponent: PropEditComponent
	});

