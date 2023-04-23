import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";

import { recordState } from "~/../App";
import Title from "~/atoms/Title";
import SmallPicker from "~/atoms/SmallPicker";

export default function SheetManagementSettings() {
	const [record, setRecord] = useRecoilState(recordState);

	function setNumOfPillsPerSheet(itemValue: number) {
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

	function setBeginSheetIndex(itemValue: number) {
		setRecord({
			...record,
			initialSheetSettings: {
				...record.initialSheetSettings,
				beginSheetIndex: Number(itemValue) - 1, // 0スタート
			},
		});
	}

	return (
		<View style={styles.container}>
			<Title title={`シートの設定`} />
			<View style={styles.containerLayout}>
				<View>
					<Text style={styles.description}>
						{
							"現在お飲みのお薬とシートの状態に合わせて、編集してください。"
						}
					</Text>
				</View>
				<View style={styles.contentLayout}>
					<View style={styles.leftContent}>
						<Text>{"１シートの錠数\n（プラセボは除く）"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							selectedValue={
								record.initialSheetSettings.numOfPillsPerSheet
							}
							minValue={1}
							maxValue={28}
							onChange={setNumOfPillsPerSheet}
						/>
					</View>
				</View>
				<View style={styles.contentLayout}>
					<View style={styles.leftContent}>
						<Text>シートの開始位置</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							selectedValue={
								record.initialSheetSettings.beginSheetIndex + 1
							}
							minValue={1}
							maxValue={
								record.initialSheetSettings.numOfPillsPerSheet
							}
							onChange={setBeginSheetIndex}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 240,
		marginBottom: 20,
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	containerLayout: {
		flex: 1,
		padding: 20,
	},
	description: {
		fontSize: 12,
		color: "#000000A8",
	},
	contentLayout: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 10,
	},
	leftContent: {},
	rightContent: {},
});
