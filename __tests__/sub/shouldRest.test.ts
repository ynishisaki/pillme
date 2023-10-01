import { recordType } from "~/types";
import { testDataTwo } from "../resources/testData";
import { getIsRestPeriod } from "../getIsRestPeriod";
import { useState } from "react";

describe("sholdRest", () => {
	// TEST
	// it("should be true", () => {
	// 	expect(1).toBe(1);
	// });

	it("should be isRestPeriod=true", () => {
		const record = testDataTwo;

		const isRestPeriod = getIsRestPeriod(record);

		expect(isRestPeriod).toBe(true);
	});
});
