import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import Message from "~/components/medium/TodaysMessage";
import CheckBox from "~/components/medium/PressableCheckBox";
import { recordState } from "~/states/recordState";

export const HomeTodaysRecord = () => {
	const [record, setRecord] = useRecoilState(recordState);

	const tookMedicine = record.dailyRecord[0].tookMedicine;
	const haveBleeding = record.dailyRecord[0].haveBleeding;
	const isRestPeriod = record.dailyRecord[0].isRestPeriod;

	function updateTodayRecord(key: string, nextBoolean: boolean) {
		setRecord({
			...record,
			dailyRecord: [
				{
					...record.dailyRecord[0],
					[key]: nextBoolean,
				},
				...record.dailyRecord.slice(1),
			],
		});
	}

	return (
		<View style={styles.container}>
			<View style={styles.contentLayout}>
				<Message takeRestPeriod={isRestPeriod} />
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentLayout: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(140, 185, 173, 0.5)",
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
});
