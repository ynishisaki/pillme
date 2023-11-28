import { StyleSheet, View, Text, Alert } from "react-native";
import { useRecoilState } from "recoil";
import CheckBox from "~/components/CheckBox";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { recordState } from "~/states/recordState";
import { HeaderColor } from "~/styles/color";
import { recordType } from "~/types/record";

export const HomeTodaysRecord = () => {
	const [record, setRecord] = useRecoilState(recordState);

	const { tookMedicine, haveBleeding, isRestPeriod } = record.dailyRecord[0];

	function updateTodayRecord(key: string, nextBoolean: boolean) {
		const updatedRecord: recordType = {
			...record,
			dailyRecord: [
				{
					...record.dailyRecord[0],
					[key]: nextBoolean,
				},
				...record.dailyRecord.slice(1),
			],
		};

		const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(updatedRecord);
		setRecord(updatedRecord);

		// 明日から休薬日の場合はアラートを表示
		nextBoolean && isTomorrowStartsRestPeriod && createTwoButtonAlert();
	}

	const createTwoButtonAlert = () =>
		Alert.alert(
			"明日から休薬日です",
			`出血の有無に関わらず${record.initialSheetSettings.stopTakingDays}日間休薬します。`,
			[
				{
					text: "OK",
					style: "default",
				},
			]
		);

	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>今日の記録</Text>
			</View>

			<View style={styles.contentLayout}>
				<View style={styles.checkBoxLayout}>
					{record.isAsyncStorageLoaded && (
						<>
							<CheckBox
								title='服薬'
								type='medicine'
								size={"lg"}
								isChecked={tookMedicine}
								isRestPeriod={isRestPeriod}
								onPress={() => updateTodayRecord("tookMedicine", !tookMedicine)}
							/>
							<CheckBox
								title='出血'
								type='bleeding'
								size={"lg"}
								isChecked={haveBleeding}
								isRestPeriod={isRestPeriod}
								onPress={() => updateTodayRecord("haveBleeding", !haveBleeding)}
							/>
						</>
					)}
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		paddingTop: 8,
		paddingHorizontal: 20,
		height: 46,
		backgroundColor: HeaderColor,
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	contentLayout: {
		flex: 1,
		padding: 20,
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
});
