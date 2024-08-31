import { format } from "@formkit/tempo";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import { ThemedText } from "~/components/common/ThemedText";
import { countHaveBleedingDays, countTakeMedicineDays, hasNoRecordDays } from "~/functions/countRecord";
import { judgeIsTodayRestPeriod, judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { recordState } from "~/states/recordState";
import { locale, mdweek } from "~/utils/tempo-options";

export const HomeTitle = () => {
	const record = useRecoilValue(recordState);

	const displayDate = format(record.dailyRecord[0].date, mdweek, locale);
	const { takeMedicineDays } = countTakeMedicineDays(record);
	const { haveBleedingDays } = countHaveBleedingDays(record);
	const isTodayRestPeriod = judgeIsTodayRestPeriod(record);
	const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(record);

	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	return (
		<View style={styles.container}>
			<View style={{ marginBottom: 30 }}>
				<ThemedText type='homeTitle'>{displayDate}</ThemedText>
			</View>

			<ThemedText style={{ color: "gainsboro" }}>服薬　{takeMedicineDays}日目</ThemedText>
			{haveBleedingDays !== 0 && (
				<ThemedText style={{ color: "gainsboro" }}>出血　{haveBleedingDays}日</ThemedText>
			)}
			{isTodayRestPeriod && <ThemedText style={{ color: "gainsboro" }}>本日は休薬します</ThemedText>}
			{isTomorrowStartsRestPeriod && <ThemedText style={{ color: "gainsboro" }}>明日から休薬日です</ThemedText>}
			{hasNoRecordWithoutToday && <ThemedText style={{ color: "gainsboro" }}>記録忘れの日があります</ThemedText>}
			{!hasNoRecordWithoutToday && hasNoRecordToday && (
				<ThemedText style={{ color: "gainsboro" }}>今日の記録をつけてください</ThemedText>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});
