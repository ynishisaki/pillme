import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import CurrentSettings from "~/components/medium/CurrentSettings";
import Title from "~/components/small/Title";
import SettingPicker from "~/components/medium/SettingPicker";
import { recordState } from "~/hooks/recordState";

export default function SettingsMedicationMethod() {
	const [record, setRecord] = useRecoilState(recordState);

	const minConteniousTakingDays =
		record.initialSheetSettings.minConteniousTakingDays;
	const maxConteniousTakingDays =
		record.initialSheetSettings.maxConteniousTakingDays;
	const conteniousBleeingDaysForRest =
		record.initialSheetSettings.conteniousBleeingDaysForRest;
	const stopTakingDays = record.initialSheetSettings.stopTakingDays;

	function onChangeMinConteniousTakingDays(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				minConteniousTakingDays: Number(itemValue),
			},
		}));
	}

	function onChangeMaxConteniousTakingDays(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				maxConteniousTakingDays: Number(itemValue),
			},
		}));
	}

	function onChangeConteniousBleeingDaysForRest(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				conteniousBleeingDaysForRest: Number(itemValue),
			},
		}));
	}

	function onChangeStopTakingDays(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				stopTakingDays: Number(itemValue),
			},
		}));
	}

	return (
		<View style={styles.container}>
			<Title title={`服薬方法の設定`} />
			<View style={styles.containerLayout}>
				<Text style={styles.description}>
					{"このアプリは、120日連続服用を対象としています。"}
				</Text>
				<Text style={styles.description}>
					{
						"お飲みのお薬の使用方法に合わせて、以下の設定を編集してください。"
					}
				</Text>

				<SettingPicker
					description={"最短連続投与日数"}
					selectedValue={minConteniousTakingDays}
					minValue={1}
					maxValue={
						maxConteniousTakingDays - 1 > 30
							? 30
							: maxConteniousTakingDays - 1
					}
					onChange={onChangeMinConteniousTakingDays}
				/>

				<SettingPicker
					description={"最長連続投与日数"}
					selectedValue={maxConteniousTakingDays}
					minValue={minConteniousTakingDays + 1}
					maxValue={120}
					onChange={onChangeMaxConteniousTakingDays}
				/>

				<SettingPicker
					description={"休薬に必要な連続出血日数"}
					selectedValue={conteniousBleeingDaysForRest}
					minValue={1}
					maxValue={7}
					onChange={onChangeConteniousBleeingDaysForRest}
				/>

				<SettingPicker
					description={"連続休薬日数"}
					selectedValue={stopTakingDays}
					minValue={1}
					maxValue={7}
					onChange={onChangeStopTakingDays}
				/>

				<CurrentSettings />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 580,
		marginTop: 40,
		marginBottom: 20,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		// backgroundColor: "white",
		borderRadius: 8,
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
