import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import { ThemedText } from "~/components/common/ThemedText";
import SettingPicker from "~/components/settings/SettingPicker";
import { recordState } from "~/states/recordState";

interface Props {
	isFirstSettings?: boolean;
}
export default function SettingsSheetManagement(props: Props) {
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
		<ContentLayout title='シート設定'>
			<View style={styles.container}>
				<ThemedText type='overview'>記録開始時のシートの錠数と開始位置を設定します。</ThemedText>
				{props.isFirstSettings && (
					<ThemedText type='overview'>※この設定はアプリ開始後にも変更可能です。</ThemedText>
				)}

				<SettingPicker
					description={"１シートの錠数(プラセボ除く)"}
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
		</ContentLayout>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 20,
	},
});
