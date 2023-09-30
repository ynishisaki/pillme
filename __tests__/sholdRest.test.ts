import { recordType } from "~/types";
import { testDataTwo } from "./testData";
import { countHaveBleedingDays, countTakeMedicineDays } from "~/utils/countRecord";

describe("sholdRest", () => {
	it("should be true", () => {
		expect(1).toBe(1);
	});

  it ("should be isRestPeriod=true", () => {
    const record = testDataTwo;
    	const takeMedicineDays = countTakeMedicineDays(record);
	const haveBleedingDays = countHaveBleedingDays(record);
  
});
