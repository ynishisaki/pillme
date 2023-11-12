import { testDataOne } from "./resources/testData1";
import { testDataTwo } from "./resources/testData2";
import { testDataThree } from "./resources/testData3";
import { judgeIsTodayRestPeriod } from "../src/functions/judgeIsTodayRestPeriod";

describe("sholdRest", () => {
	// TEST EXAMPLE
	it("should be true", () => {
		expect(1).toBe(1);
	});

	it("test1: today's isRestPeriod should be false", () => {
		const record = testDataOne;
		const isRestPeriod = judgeIsTodayRestPeriod(record);

		expect(isRestPeriod).toBe(false);
	});

	it("test2: today's isRestPeriod should be true", () => {
		const record = testDataTwo;
		const isRestPeriod = judgeIsTodayRestPeriod(record);

		expect(isRestPeriod).toBe(true);
	});

	it("test3: today's isRestPeriod should be true", () => {
		const record = testDataThree;
		const isRestPeriod = judgeIsTodayRestPeriod(record);

		expect(isRestPeriod).toBe(true);
	});
});
