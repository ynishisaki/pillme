import { StyleSheet, View, Text } from "react-native";
import { useRecoilValue } from "recoil";
import Message from "~/components/medium/TodaysMessage";
import { recordState } from "~/states/recordState";
import { getDateWeekStringsForDisplay } from "~/functions/getDateStrings";
import { countHaveBleedingDays, countTakeMedicineDays } from "~/functions/countRecord";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsTodayRestPeriod";

export const HomeTitle = () => {
	const record = useRecoilValue(recordState);

	const displayDate = getDateWeekStringsForDisplay(record.dailyRecord[0].date);
	const takeMedicineDays = countTakeMedicineDays(record);
	const haveBleedingDays = countHaveBleedingDays(record);
	const isTodayRestPeriod = judgeIsTomorrowStartsRestPeriod(record);
	const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(record);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{displayDate}</Text>

			<Text style={styles.text}>服薬　{takeMedicineDays}日目</Text>
			{haveBleedingDays !== 0 && <Text style={styles.text}>出血　{haveBleedingDays}日</Text>}
			<Text style={styles.text}>休薬　{isTodayRestPeriod ? "中" : "なし"}</Text>
			<Text style={styles.text}>明日から休薬　{isTomorrowStartsRestPeriod ? "です" : "ではありません"}</Text>
			<Message takeRestPeriod={record.dailyRecord[0].isRestPeriod} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		color: "white",
		fontSize: 52,
		fontWeight: "800",
		marginBottom: 16,
	},
	text: {
		color: "white",
		fontSize: 16,
	},
});
