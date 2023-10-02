import { testDataTwo } from "./resources/testDataTwo";
import { getIsRestPeriod } from "../src/utils/getIsRestPeriod";

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
