import { Type, init } from '../../util/type';


@init({
	path: 'type',
	key: edge => edge.type
})
export class EdgeType extends Type {}
export const EdgeTypes = EdgeType.Types;

