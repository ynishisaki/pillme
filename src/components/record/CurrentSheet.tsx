import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";
import { Sheet } from "~/components/record/Sheet";
import { RightIcon } from "~/components/Icons";
import { recordState } from "~/states/recordState";
import { getDateStringsForDisplay } from "~/functions/getDateStrings";
import getCurrentSheetStatus from "~/functions/countRecord";
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
			{/* <TouchableOpacity
				onPress={() => {
					console.log("test: pressed");
				}}> */}
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>現在のシート</Text>
				{/* <RightIcon /> */}
			</View>
			{/* </TouchableOpacity> */}
			<View style={styles.container}>
				<View style={styles.textLayout}>
					<Text style={styles.subtitleText}>{`シート終了日(推定)`}</Text>
					<Text style={styles.numberOfDaysText}>{estimatedEndDate}</Text>
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
	titleText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
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
	subtitleText: {
		fontSize: 10,
	},
	numberOfDaysText: {
		fontSize: 16,
	},
});
