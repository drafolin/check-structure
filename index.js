const checkStructureOrThrow = (a, struct, path) => {
	for (const key in struct) {
		if (a[key] === undefined) {
			throw Error(`Key ${path ? `${path}.${key}` : key} is not in the source object`);
		}
		if (typeof a[key] === 'object') {
			return checkStructuresOrThrow(a[key], struct[key], path ? `${path}.${key}` : key);
		}
		const nativeTypes = ['string', 'number', 'boolean', 'undefined', 'function'];
		if (nativeTypes.includes(struct[key].name.toLowerCase())) {
			if (typeof a[key] !== struct[key].name.toLowerCase()) {
				throw Error(`Key ${path ? `${path}.${key}` : key} is not of type ${struct[key].name.toLowerCase()}`);
			}
		}
	}
	return;
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
