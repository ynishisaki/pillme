import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";
import { CurrentSheetStatus } from "~/medium/CurrentSheetStatus";
import EstimatedEndDate from "~/components/small/CurrentSheetEstimatedEndDate";
import { RightIcon } from "~/components/small/Icons";
import SubTitle from "~/components/small/SubTitle";
import { recordState } from "~/hooks/recordState";
import { getDateStringsForDisplay } from "~/utils/getDateStrings";

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

	const numOfPillsPerSheet = record.initialSheetSettings.numOfPillsPerSheet;
	const beginSheetIndex = record.initialSheetSettings.beginSheetIndex;

	const recordLength = record.dailyRecord.length; // 今日の分を含めてOK
	console.log("test: recordLength", recordLength);

	const currentSheetTookMedicineLength =
		(recordLength + beginSheetIndex) % numOfPillsPerSheet || 24; // 1, 2, ... 24

	const remainingDays = numOfPillsPerSheet - currentSheetTookMedicineLength;

	const today = new Date();
	const todayDate = today.getDate();
	const calculateSheetEndDate = today.setDate(todayDate + remainingDays);

	const estimatedEndDate = getDateStringsForDisplay(
		new Date(calculateSheetEndDate)
	);

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
				<View style={styles.layout}>
					<EstimatedEndDate estimatedEndDate={estimatedEndDate} />
					<CurrentSheetStatus
						record={record}
						currentSheetTookMedicineLength={
							currentSheetTookMedicineLength
						}
						remainingDays={remainingDays}
					/>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	layout: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 20,
	},
});
