import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";

import { recordState } from "../../App";
import { CurrentSheetStatus } from "../molecules/CurrentSheetStatus";
import EstimatedEndDate from "../atoms/CurrentSheetEstimatedEndDate";
import { RightIcon } from "../atoms/Icons";

export const Settings = () => {
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

	const numOfPillsPerSheet = record.initialSheetSettings.numOfPillsPerSheet;
	const beginSheetIndex = record.initialSheetSettings.beginSheetIndex;

	const recordLength = record.dailyRecord.length; // 今日の分を含めてOK

	const currentSheetTookMedicineLength =
		(recordLength + beginSheetIndex) % numOfPillsPerSheet || 24; // 1, 2, ... 24

	const remainingDays = numOfPillsPerSheet - currentSheetTookMedicineLength;

	const today = new Date();
	const todayDate = today.getDate();
	const calculateSheetEndDate = today.setDate(todayDate + remainingDays);

	const estimatedEndDate = getDateStrings(new Date(calculateSheetEndDate));

	function getDateStrings(selectedDate: Date) {
		const month = selectedDate.getMonth() + 1;
		const day = selectedDate.getDate();

		return `${month}月${day}日`;
	}

	return (
		<View style={styles.container}>
			{/* <View style={styles.titleContainer}> */}
			<Text
			// style={styles.titleText}
			>
				現在のシート
			</Text>
			<RightIcon />
			{/* </View> */}

			{/* <View style={styles.bodyContainer}>
				<EstimatedEndDate estimatedEndDate={estimatedEndDate} />
				<CurrentSheetStatus
					record={record}
					currentSheetTookMedicineLength={
						currentSheetTookMedicineLength
					}
					remainingDays={remainingDays}
				/>
			</View> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// width: 330,
		// marginBottom: 24,
		backgroundColor: "#fff",
		borderRadius: 16,
	},
});
