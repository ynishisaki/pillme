import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import Title from "~/components/small/Title";
import { recordState } from "~/states/recordState";
import SettingPicker from "~/components/medium/SettingPicker";

export default function SettingsSheetManagement() {
	const [record, setRecord] = useRecoilState(recordState);

	function setNumOfPillsPerSheet(itemValue: number) {
		setRecord({
			...record,
			initialSheetSettings: {
				...record.initialSheetSettings,
				numOfPillsPerSheet: Number(itemValue),
				beginSheetIndex:
					record.initialSheetSettings.beginSheetIndex <= Number(itemValue) - 1
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
			<Title title={`現在のシート`} />
			<View style={styles.containerLayout}>
				<SettingPicker
					description={"１シートの錠数（プラセボ除く）"}
					selectedValue={record.initialSheetSettings.numOfPillsPerSheet}
					minValue={1}
					maxValue={28}
					onChange={setNumOfPillsPerSheet}
				/>

				<SettingPicker
					description={"シートの開始位置"}
					selectedValue={record.initialSheetSettings.beginSheetIndex + 1}
					minValue={1}
					maxValue={record.initialSheetSettings.numOfPillsPerSheet}
					onChange={setBeginSheetIndex}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 250,
		marginBottom: 20,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		// backgroundColor: "white",
		borderRadius: 8,
		overflow: "hidden",
	},
	containerLayout: {
		flex: 1,
		padding: 20,
	},
	description: {
		fontSize: 12,
		color: "#000000A8",
	},
});
