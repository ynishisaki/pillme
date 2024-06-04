import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import BaseBlackText from "~/components/common/BaseBlackText";
import SubTitleText from "~/components/common/SubTitleText";
import { Sheet } from "~/components/record/Sheet";
import getCurrentSheetStatus from "~/functions/countRecord";
import { getDateStringsForDisplay } from "~/functions/getDateStrings";
import { recordState } from "~/states/recordState";

export const CurrentSheet = () => {
	const record = useRecoilValue(recordState);

	// シートの終了日を計算
	// シート１枚目、シート開始index0の場合：
	// 今日の日付 + (numOfPillsPerSheet - recordLength)日
	// シート1枚目、シート開始index20の場合：
	// 今日の日付 + (numOfPillsPerSheet - (recordLength + index))日
	// シート2枚目、シート開始index0の場合：
	// 今日の日付 + ((numOfPillsPerSheet -(recordLength % numOfPillsPerSheet)日
	// シート2枚目、シート開始index20の場合：
	// 今日の日付 + ((numOfPillsPerSheet -(recordLength + index) % numOfPillsPerSheet)日

	const { tookDays, remainingDays } = getCurrentSheetStatus(record);

	const today = new Date();
	const todayDate = today.getDate();
	const calculateSheetEndDate = today.setDate(todayDate + remainingDays);

	const estimatedEndDate = getDateStringsForDisplay(new Date(calculateSheetEndDate));

	return (
		<ContentLayout title='現在のシート'>
			<View style={styles.contentLayout}>
				<View style={styles.textLayout}>
					<SubTitleText>{`シート終了日(推定)`}</SubTitleText>
					<BaseBlackText>{estimatedEndDate}</BaseBlackText>
				</View>
				<Sheet tookDays={tookDays} remainingDays={remainingDays} />
			</View>
		</ContentLayout>
	);
};

const styles = StyleSheet.create({
	contentLayout: {
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		columnGap: 10,
	},
	textLayout: {
		marginTop: 16,
	},
});
