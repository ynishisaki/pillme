export function getDateStrings(selectedDate: Date) {
	const offset = selectedDate.getTimezoneOffset();
	selectedDate = new Date(selectedDate.getTime() - offset * 60 * 1000);

	return selectedDate.toISOString().split("T")[0];
}
