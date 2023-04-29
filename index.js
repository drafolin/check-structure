export const compareStructuresOrThrow = (a, struct, path) => {
	for (const key in a) {
		if (struct[key] === undefined) {
			throw Error(`Key ${path ? `${path}.${key}` : key} is not in the interface`);
		}
		if (typeof a[key] === 'object') {
			return compareStructures(a[key], struct[key], path ? `${path}.${key}` : key);
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

export const compareStructures = (a, struct, path) => {
	try {
		compareStructuresOrThrow(a, struct, path);
		return true;
	} catch (e) {
		return false;
	}
};


export default compareStructures;
