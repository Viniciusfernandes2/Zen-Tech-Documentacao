import { SchemaType } from '../schema/var/schema.type';
import { SchemaAction } from '../schema/action/schema.action';
import { StringView } from './view/string.view';
import { StringAction } from './action/string.action';
import { StringEditComponent } from './view/string.edit.component';

SchemaType
	.define({
		id: 'Type.Schema.String',
		value: 'string',
		label: 'String',
		Component: StringView,
		EditComponent: StringEditComponent,
		Action: {
			...SchemaAction,
			...StringAction
		}
	});

