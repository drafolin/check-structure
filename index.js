const checkStructureOrThrow = (a, struct, path) => {
	if (Array.isArray(struct)) {
		if (!Array.isArray(a))
			throw Error(`${path ? path : "input"} is not of type array`);
		if (struct.length === 1) {
			for (i in a) {
				checkStructureOrThrow(a[i], struct[0], path ? `${path}.${key}[${i}]` : `key[${i}]`);
			}
		} else {
			if (a.length !== struct.length)
				throw Error(`Key ${path ? `${path}.${key}` : key} is not of length ${struct.length}`);
			for (i in a)
				checkStructureOrThrow(a[i], struct[i], path ? `${path}.${key}[${i}]` : `key[${i}]`);
		}
		return;
	}
	if (typeof struct === "object" && struct !== null) {
		if (typeof a !== "object" || a === null)
			throw Error(`${path ? path : "input"} is not of type object`);
		for (const key in struct) {
			if (a[key] === undefined) {
				throw Error(`Key ${path ? `${path}.${key}` : key} is not in the source object`);
			}
			checkStructureOrThrow(a[key], struct[key], path ? `${path}.${key}` : key);
		}
		return;
	};

	const nativeTypes = ['string', 'number', 'boolean', 'undefined', 'function'];
	if (nativeTypes.includes(struct.name.toLowerCase())) {
		if (typeof a !== struct.name.toLowerCase()) {
			throw Error(`${path ? `${path}` : "source"} is not of type ${struct.name.toLowerCase()}`);
		}
		return;
	}

	if (struct.name.toLowerCase() === 'date') {
		if (a instanceof Date) {
			return;
		}

		if (typeof a !== 'string') {
			throw Error('Invalid date (not a string)');
		}

		const validDate = new Date(a);
		if (isNaN(validDate.valueOf()))
			throw new Error('Invalid date (not parsable)');

		return;
	}

	throw Error(`Invalid type ${struct.name}`);
};

const checkStructure = (a, struct, path) => {
	try {
		checkStructureOrThrow(a, struct, path);
		return true;
	} catch (e) {
		return false;
	}
};

checkStructure.checkStructureOrThrow = checkStructureOrThrow;
checkStructure.checkStructure = checkStructure;
checkStructure.default = checkStructure;
module.exports = checkStructure;
