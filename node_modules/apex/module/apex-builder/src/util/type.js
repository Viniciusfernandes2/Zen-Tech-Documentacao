var writable = false;


function def (obj, data) {
	Object
		.defineProperties(obj, Object
			.keys(data)
			.reduce((out, key) => {
				out[key] = { value: data[key], writable };
				return out;
			}, {}));
}

export function init ({ key, path, requireFields = [], nullable }) {
	var config = { key, path, requireFields, nullable };
	var keyGetter = typeof key === 'function' ? key : target => target[key];
	return TypeClass => {
		def(TypeClass, {
			config,
			key,
			keyGetter,
			ById: Object.create(null),
			ByValue: Object.create(null),
			Values: [],
			Types: []
		});
	};
}


export class Type {
	constructor (data) {
		def(this, data);
	}
	toString () {
		return `< ${this.constructor.name} ${this.id} >`;
	}
	extend (props) {
		def(this, props);
		return this;
	}
	toJSON () {
		return this.value;
	}
	static path () {
		return this.config.path;
	}
	static from (value) {
		if (value instanceof this) {
			return value;
		}
		if (!value && this.config.nullable) {
			return null;
		}
		return this.assert(this.ByValue[value], value);

	}
	static is (type) {
		return type instanceof this;
	}

	static id (typeId) {
		return this.assert(this.ById[typeId], typeId);
	}

	static of (target) {
		return this.from(this.keyGetter(target));
	}
	static values () {
		return this.Values.slice();
	}

	static assert (type, msg) {
		if (!(type instanceof this)) {
			throw new Error(`Invalid ${ this.name } ${ msg || type }`);
		}
		return type;
	}

	static define (config) {
		if (Array.isArray(config)) {
			config.forEach(item => {
				this.define(item);
			});
			return;
		}
		this.config.requireFields.forEach(key => {
			if (!config[key]) {
				throw new Error(`${ this.name } ${ config.id } has no ${ key }`);
			}
		});
		var type = new this(config);
		this.Types.push(type);
		this.ById[type.id] = this.ByValue[type.value] = type;
		this.Values.push(type.value);
		return type;
	}
}

