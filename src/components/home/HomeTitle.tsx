import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import BaseWhiteText from "~/components/common/BaseWhiteText";
import HomeTitleText from "~/components/common/HomeTitleText";
import { countHaveBleedingDays, countTakeMedicineDays, hasNoRecordDays } from "~/functions/countRecord";
import { getDateWeekStringsForDisplay } from "~/functions/getDateStrings";
import { judgeIsTodayRestPeriod, judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { recordState } from "~/states/recordState";

export const HomeTitle = () => {
	const record = useRecoilValue(recordState);

	const displayDate = getDateWeekStringsForDisplay(record.dailyRecord[0].date);
	const { takeMedicineDays } = countTakeMedicineDays(record);
	const { haveBleedingDays } = countHaveBleedingDays(record);
	const isTodayRestPeriod = judgeIsTodayRestPeriod(record);
	const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(record);

	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	return (
		<View style={styles.container}>
			<HomeTitleText>{displayDate}</HomeTitleText>
			<BaseWhiteText>服薬　{takeMedicineDays}日目</BaseWhiteText>

			{haveBleedingDays !== 0 && <BaseWhiteText>出血　{haveBleedingDays}日</BaseWhiteText>}
			{isTodayRestPeriod && <BaseWhiteText>休薬中</BaseWhiteText>}
			{isTomorrowStartsRestPeriod && <BaseWhiteText>明日から休薬です</BaseWhiteText>}
			{hasNoRecordWithoutToday && (
				<BaseWhiteText>{`記録忘れの日があります\n日をさかのぼって服薬の記録をつけてください`}</BaseWhiteText>
			)}
			{!hasNoRecordWithoutToday && hasNoRecordToday && <BaseWhiteText>今日の記録をつけてください</BaseWhiteText>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
