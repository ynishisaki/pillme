import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

import { recordState } from "~/../App";
import Title from "~/atoms/Title";
import SmallPicker from "~/atoms/SmallPicker";

export default () => {
	const [record, setRecord] = useRecoilState(recordState);

	function setNumOfPillsPerSheet(itemValue: number, itemIndex: number) {
		setRecord({
			...record,
			initialSheetSettings: {
				...record.initialSheetSettings,
				numOfPillsPerSheet: Number(itemValue),
				beginSheetIndex:
					record.initialSheetSettings.beginSheetIndex <=
					Number(itemValue) - 1
						? record.initialSheetSettings.beginSheetIndex
						: 0, // シートの開始位置設定 -> シートの数設定という操作で、シートの開始位置がシートの数を超える場合は、シートの開始位置を0にする
			},
		});
	}

	function setBeginSheetIndex(itemValue: number, itemIndex: number) {
		setRecord({
			...record,
			initialSheetSettings: {
				...record.initialSheetSettings,
				beginSheetIndex: Number(itemValue) - 1, // 0スタート
			},
		});
	}

	const pickerItems = (maxValue: number) => {
		const items = [];
		for (let i = 1; i <= maxValue; i++) {
			items.push(<Picker.Item key={i} label={`${i}`} value={i} />);
		}
		return items;
	};

	return (
		<View style={styles.container}>
			<Title title={`シートの設定`} />
			<View style={styles.contentLayout}>
				<View>
					<Text style={styles.description}>
						{
							"現在お飲みのお薬とシートの状態に合わせて、編集してください。"
						}
					</Text>
				</View>
				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>{"１シートの錠数\n（プラセボは除く）"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							value={
								record.initialSheetSettings.numOfPillsPerSheet
							}
							onChange={(itemValue, itemIndex) =>
								setNumOfPillsPerSheet(itemValue, itemIndex)
							}
							items={pickerItems(28)}
						/>
					</View>
				</View>
				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>シートの開始位置</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							value={
								record.initialSheetSettings.beginSheetIndex + 1
							}
							onChange={(itemValue, itemIndex) =>
								setBeginSheetIndex(itemValue, itemIndex)
							}
							items={pickerItems(
								record.initialSheetSettings.numOfPillsPerSheet
							)}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		height: 240,
		// width: 330,
		marginBottom: 20,
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	currentSettingsContainer: {
		// flex: 1,
		backgroundColor: "#ddd",
		borderRadius: 16,
	},
	contentLayout: {
		flex: 1,
		padding: 20,
	},
	description: {
		fontSize: 12,
		color: "#000000A8",
	},
	layout: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 10,
	},
	leftContent: {},
	rightContent: {},
});
