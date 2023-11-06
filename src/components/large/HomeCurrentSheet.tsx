import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";
import { CurrentSheetStatus } from "~/components/medium/CurrentSheetStatus";
import EstimatedEndDate from "~/components/small/CurrentSheetEstimatedEndDate";
import { RightIcon } from "~/components/small/Icons";
import SubTitle from "~/components/small/SubTitle";
import { recordState } from "~/states/recordState";
import { getDateStringsForDisplay } from "~/functions/getDateStrings";
import getCurrentSheetStatus from "~/functions/countRecord";

export const HomeCurrentSheet = () => {
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
			<SubTitle
				title='現在のシート'
				// Icon={RightIcon}
			/>
			{/* </TouchableOpacity> */}
			<View style={styles.container}>
				<EstimatedEndDate estimatedEndDate={estimatedEndDate} />
				<CurrentSheetStatus tookDays={tookDays} remainingDays={remainingDays} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		columnGap: 10,
	},
});
