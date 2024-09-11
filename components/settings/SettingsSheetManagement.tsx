import ContentLayout from "@/components/common/ContentLayout";
import { ThemedText } from "@/components/common/ThemedText";
import CurrentSettingsSheet from "@/components/settings/CurrentSettingsSheet";
import SettingPicker from "@/components/settings/SettingPicker";
import { getBeginSheetIndex, getTodaySheetIndex } from "@/functions/getSheetIndex";
import { recordState } from "@/states/recordState";
import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";

interface Props {
	isFirstSettings?: boolean;
}
export default function SettingsSheetManagement(props: Props) {
	const [record, setRecord] = useRecoilState(recordState);

	// 今日服薬するピルの位置インデックス
	const todaySheetIndex = getTodaySheetIndex(record);

	// 服薬開始日のピルの位置インデックス
	const beginSheetIndex = getBeginSheetIndex(record, todaySheetIndex);

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

	function setTodayPillIndex(itemValue: number) {
		setRecord({
			...record,
			initialSheetSettings: {
				...record.initialSheetSettings,
				beginSheetIndex: getBeginSheetIndex(record, itemValue - 1),
			},
		});
	}

	return (
		<ContentLayout title='シート設定'>
			<View style={styles.container}>
				<ThemedText type='description'>記録開始時のシートの錠数と開始位置を設定します。</ThemedText>
				{props.isFirstSettings && (
					<ThemedText type='description'>※この設定はアプリ開始後にも変更可能です。</ThemedText>
				)}

				<CurrentSettingsSheet />

				<SettingPicker
					description={"１シートの錠数(プラセボ除く)"}
					selectedValue={record.initialSheetSettings.numOfPillsPerSheet}
					minValue={1}
					maxValue={28}
					onChange={setNumOfPillsPerSheet}
				/>

				<SettingPicker
					description={"本日服薬するピルの位置"}
					selectedValue={todaySheetIndex + 1}
					minValue={1}
					maxValue={record.initialSheetSettings.numOfPillsPerSheet}
					onChange={setTodayPillIndex}
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
