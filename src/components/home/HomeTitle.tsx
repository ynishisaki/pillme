import { StyleSheet, View, Text } from "react-native";
import { useRecoilValue } from "recoil";
import { recordState } from "~/states/recordState";
import { getDateWeekStringsForDisplay } from "~/functions/getDateStrings";
import { countHaveBleedingDays, countTakeMedicineDays } from "~/functions/countRecord";
import { judgeIsTodayRestPeriod, judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";

export const HomeTitle = () => {
	const record = useRecoilValue(recordState);

	const displayDate = getDateWeekStringsForDisplay(record.dailyRecord[0].date);
	const { takeMedicineDays } = countTakeMedicineDays(record);
	const { haveBleedingDays } = countHaveBleedingDays(record);
	const isTodayRestPeriod = judgeIsTodayRestPeriod(record);
	const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(record);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{displayDate}</Text>

			<Text style={styles.text}>服薬　{takeMedicineDays}日目</Text>
			{haveBleedingDays !== 0 && <Text style={styles.text}>出血　{haveBleedingDays}日</Text>}

			{isTodayRestPeriod && <Text style={styles.text}>休薬中</Text>}
			{isTomorrowStartsRestPeriod && <Text style={styles.text}>明日から休薬です</Text>}
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