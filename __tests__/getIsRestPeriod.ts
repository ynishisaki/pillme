import { useState } from "react";
import { recordType } from "~/types";
import {
	countHaveBleedingDays,
	countTakeMedicineDays,
} from "~/utils/countRecord";

export const getIsRestPeriod = (record: recordType): boolean => {
	const takeMedicineDays = countTakeMedicineDays(record);
	const haveBleedingDays = countHaveBleedingDays(record);

	console.log("takeMedicineDays", takeMedicineDays);
	console.log("haveBleedingDays", haveBleedingDays);

	const isRestPeriod = takeMedicineDays >= 24 && haveBleedingDays >= 3;
	return isRestPeriod;
};
