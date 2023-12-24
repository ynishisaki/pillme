import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import BaseBlackText from "~/components/common/BaseBlackText";
import ContainerTitleText from "~/components/common/ContainerTitleText";
import SubTitleText from "~/components/common/SubTitleText";
import { Sheet } from "~/components/record/Sheet";
import getCurrentSheetStatus from "~/functions/countRecord";
import { getDateStringsForDisplay } from "~/functions/getDateStrings";
import { recordState } from "~/states/recordState";
import { HeaderColor } from "~/styles/color";

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
		<>
			<View style={styles.titleContainer}>
				<ContainerTitleText>現在のシート</ContainerTitleText>
			</View>
			<View style={styles.container}>
				<View style={styles.textLayout}>
					<SubTitleText>{`シート終了日(推定)`}</SubTitleText>
					<BaseBlackText>{estimatedEndDate}</BaseBlackText>
				</View>
				<Sheet tookDays={tookDays} remainingDays={remainingDays} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		height: 46,
		backgroundColor: HeaderColor,
	},
	container: {
		margin: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		columnGap: 10,
	},
	textLayout: {
		marginTop: 16,
	},
});
