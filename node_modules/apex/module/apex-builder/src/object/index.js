import { SchemaType } from '../schema/var/schema.type';
import { SchemaAction } from '../schema/action/schema.action';
import { ObjectView } from './view/object.view';
import { ObjectEditComponent } from './view/object.edit.component';
import { ObjectAction } from './action/object.action';


export const ObjectSchemaType = SchemaType
	.define({
		id: 'Type.Schema.Object',
		value: 'object',
		label: 'Object',
		Component: ObjectView,
		EditComponent: ObjectEditComponent,
		Action: {
			...SchemaAction,
			...ObjectAction
		}
	});


