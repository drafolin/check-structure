import { describe, it } from "mocha";
import { checkStructureOrThrow, checkStructure } from "..";
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
});
