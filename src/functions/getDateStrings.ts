export function getDateStrings(selectedDate: Date) {
	const offset = selectedDate.getTimezoneOffset();
	selectedDate = new Date(selectedDate.getTime() - offset * 60 * 1000);

	return selectedDate.toISOString().split("T")[0];
}

export function getDateStringsForDisplay(selectedDate: Date) {
	const month = selectedDate.getMonth() + 1;
	const day = selectedDate.getDate();

	return `${month}月${day}日`;
}

// YYYY年MM月
export function getYearMonthStrings(dateStrings: string) {
	const date = new Date(dateStrings);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;

	return `${year}年${month}月`;
}

export function getDateWeekStringsForDisplay(dateStrings: string) {
	const date = new Date(dateStrings);

	const month = date.getMonth() + 1;
	const day = date.getDate();
	const week = date.getDay();
	const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

	return `${month}月${day}日(${weekArr[week]})`;
}

export function getWeekArr() {
	const date = new Date();
	const week = date.getDay();
	const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

	const recentWeekArr = [...weekArr.slice((week + 1) % 7), ...weekArr.slice(0, (week + 1) % 7)];
	return recentWeekArr;
}
