import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";

import { recordState } from "~/../App";
import Title from "~/atoms/Title";
import Message from "~/molecules/TodaysMessage";
import CheckBox from "~/molecules/PressableCheckBox";

export function showDate(dateStrings: string) {
	const date = new Date(dateStrings);

	const month = date.getMonth() + 1;
	const day = date.getDate();
	const week = date.getDay();
	const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

	return `${month}月${day}日(${weekArr[week]})`;
}

export const TodaysRecord = () => {
	const [record, setRecord] = useRecoilState(recordState);

	const tookMedicine = record.dailyRecord[0].tookMedicine;
	const haveBleeding = record.dailyRecord[0].haveBleeding;
	const isRestPeriod = record.dailyRecord[0].isRestPeriod;

	function onPressTookMedicine(nextBoolean: boolean) {
		setRecord({
			...record,
			dailyRecord: [
				{
					...record.dailyRecord[0],
					tookMedicine: nextBoolean,
				},
				...record.dailyRecord.slice(1),
			],
		});
	}

	function onPressHaveBleeding(nextBoolean: boolean) {
		setRecord({
			...record,
			dailyRecord: [
				{
					...record.dailyRecord[0],
					haveBleeding: nextBoolean,
				},
				...record.dailyRecord.slice(1),
			],
		});
	}

	return (
		<View style={styles.container}>
			<Title title={showDate(record.dailyRecord[0].date)} />
			<View style={styles.contentLayout}>
				<Message takeRestPeriod={record.dailyRecord[0].isRestPeriod} />
				<View style={styles.checkBoxLayout}>
					{record.isAsyncStorageLoaded && (
						<>
							<CheckBox
								title='服薬'
								type='medicine'
								size={"lg"}
								isChecked={tookMedicine}
								isRestPeriod={isRestPeriod}
								onPress={onPressTookMedicine}
							/>
							<CheckBox
								title='出血'
								type='bleeding'
								size={"lg"}
								isChecked={haveBleeding}
								isRestPeriod={isRestPeriod}
								onPress={onPressHaveBleeding}
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
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: -10,
	},
});
