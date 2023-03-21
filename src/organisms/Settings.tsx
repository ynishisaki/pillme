import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

import { recordState } from "~/../App";
import Title from "~/molecules/TodaysTitle";

export const Settings = () => {
	const [record, setRecord] = useRecoilState(recordState);

	function setNumOfPillsPerSheet(itemValue: number, itemIndex: number) {
		setRecord({
			...record,
			initialSheetSettings: {
				...record.initialSheetSettings,
				numOfPillsPerSheet: itemValue,
			},
		});
	}

	function setBeginSheetIndex(itemValue: number, itemIndex: number) {
		setRecord({
			...record,
			initialSheetSettings: {
				...record.initialSheetSettings,
				beginSheetIndex: itemValue - 1, // 0スタート
			},
		});
	}

	const pickerItems = [];
	for (let i = 1; i <= 30; i++) {
		pickerItems.push(<Picker.Item key={i} label={`${i}`} value={i} />);
	}

	return (
		<View style={styles.container}>
			<Title title={`初期設定`} />
			<Text>お持ちのお薬の説明を読んで、記入してください</Text>

			<View style={styles.layout}>
				<Text>１シートあたりの錠数（プラシーボは除く）</Text>
				{/* <Text>プラシーボは除く</Text> */}

				<Picker
					style={styles.picker}
					selectedValue={
						record.initialSheetSettings.numOfPillsPerSheet
					}
					onValueChange={(itemValue, itemIndex) =>
						setNumOfPillsPerSheet(itemValue, itemIndex)
					}>
					{pickerItems}
				</Picker>
			</View>
			<View style={styles.layout}>
				<Text>最初のシートの位置</Text>
				<Picker
					style={styles.picker}
					selectedValue={
						record.initialSheetSettings.beginSheetIndex + 1
					}
					onValueChange={(itemValue, itemIndex) =>
						setBeginSheetIndex(itemValue, itemIndex)
					}>
					{pickerItems}
				</Picker>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 330,
		backgroundColor: "#fff",
		borderRadius: 16,
		textAlign: "center",
	},
	layout: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginTop: 20,
	},
	picker: {
		width: 100,
		height: 50,
		fontSize: 20,
	},
});
