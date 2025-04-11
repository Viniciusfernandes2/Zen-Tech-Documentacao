import { Type, init } from '../../util/type';


@init({
	path: 'type',
	key: schema => schema.type
})
export class SchemaType extends Type {}
export const SchemaTypes = SchemaType.Types;

