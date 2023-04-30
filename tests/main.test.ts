import { describe, it } from "mocha";
import { checkStructureOrThrow } from "..";
import checkStructure from "..";
import { expect } from "chai";

describe("checkStructuresOrThrow", () => {
	it("should throw when the structures are different", async () => {
		const a = { a: 1 };
		const b = { a: Number, b: String };
		expect(() => checkStructureOrThrow(a, b)).to.throw();
	});

	it("should not throw when the structures are the same", async () => {
		const a = { a: 1 };
		const b = { a: Number };
		expect(() => checkStructureOrThrow(a, b)).to.not.throw();
	});

	it("should compare elements in an array to check if all of them follow the schema," +
		" and throw if it doesn't fit", async () => {
			const a = [{ a: 1 }, { a: "string" }];
			const b = [{ a: Number }];
			expect(() => checkStructureOrThrow(a, b)).to.throw();
		});

	it("should compare elements in an array to check if all of them follow the schema," +
		" and not throw if it fits", async () => {
			const a = [{ a: 1 }, { a: 2 }];
			const b = [{ a: Number }];
			checkStructureOrThrow(a, b);
		});

	it("should analyse deeply an object and not throw if it fits the schema", async () => {
		const a = { a: { b: { c: 1 } } };
		const b = { a: { b: { c: Number } } };
		checkStructureOrThrow(a, b);
	});

	it("should analyse deeply an object and throw if it doesn't fit the schema", async () => {
		const a = { a: { b: { c: 1 } } };
		const b = { a: { b: { c: String } } };
		expect(() => checkStructureOrThrow(a, b)).to.throw();
	});

	it("should check each element of an array if the schema contains more than one element", async () => {
		const a = [{ a: 1 }, { a: "string" }];
		const b = [{ a: Number }, { a: String }];
		checkStructureOrThrow(a, b);
	});

	it("should check each element of an array if the schema contains more than one element and throw if it doesn't fit", async () => {
		const a = [{ a: 1 }, { a: "string" }];
		const b = [{ a: Number }, { a: Number }];
		expect(() => checkStructureOrThrow(a, b)).to.throw();
	});
});

describe("checkStructures", () => {
	it("should return false when the structures are different", async () => {
		const a = { a: 1 };
		const b = { a: Number, b: String };
		expect(checkStructure(a, b)).to.be.false;
	});

	it("should return true when the structures are the same", async () => {
		const a = { a: 1 };
		const b = { a: Number };
		expect(checkStructure(a, b)).to.be.true;
	});

	it("should compare elements in an array to check if all of them follow the schema," +
		" and return false if it doesn't fit", async () => {
			const a = [{ a: 1 }, { a: "string" }];
			const b = [{ a: Number }];
			expect(checkStructure(a, b)).to.be.false;
		}
	);

	it("should compare elements in an array to check if all of them follow the schema," +
		" and return true if it fits", async () => {
			const a = [{ a: 1 }, { a: 2 }];
			const b = [{ a: Number }];
			expect(checkStructure(a, b)).to.be.true;
		}
	);

	it("should analyse deeply an object and return true if it fits the schema", async () => {
		const a = { a: { b: { c: 1 } } };
		const b = { a: { b: { c: Number } } };
		expect(checkStructure(a, b)).to.be.true;
	}
	);

	it("should analyse deeply an object and return false if it doesn't fit the schema", async () => {
		const a = { a: { b: { c: 1 } } };
		const b = { a: { b: { c: String } } };
		expect(checkStructure(a, b)).to.be.false;
	}
	);

	it("should check each element of an array if the schema contains more than one element", async () => {
		const a = [{ a: 1 }, { a: "string" }];
		const b = [{ a: Number }, { a: String }];
		expect(checkStructure(a, b)).to.be.true;
	}
	);

	it("should check each element of an array if the schema contains more than one element and return false if it doesn't fit", async () => {
		const a = [{ a: 1 }, { a: "string" }];
		const b = [{ a: Number }, { a: Number }];
		expect(checkStructure(a, b)).to.be.false;
	}
	);
});
