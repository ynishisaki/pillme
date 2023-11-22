import { useRecoilState } from "recoil";
import { StyleSheet, Text } from "react-native";
import { recordState } from "~/states/recordState";
import SettingPicker from "~/components/settings/SettingPicker";
import ContentLayout from "../ContentLayout";

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
		<ContentLayout title='現在のシート'>
			<Text style={styles.overviewText}>
				{"現在のシートの錠数と開始位置を設定します。"}
				{"シートの錠数は１シートの錠数（プラセボ除く）を設定します。"}
				{"シートの開始位置は、シートの錠数の中で、初めの錠剤の位置を設定します。"}
			</Text>

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
		</ContentLayout>
	);
}

const styles = StyleSheet.create({
	overviewText: {
		fontSize: 12,
		color: "#000000A8",
	},
});
