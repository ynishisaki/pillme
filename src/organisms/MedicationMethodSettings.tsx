import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import CurrentSettings from "~/molecules/CurrentSettings";
import { recordState } from "~/../App";
import Title from "~/atoms/Title";
import SmallPicker from "~/atoms/SmallPicker";

export default function MedicationMethodSettings() {
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
				<View>
					<Text style={styles.description}>
						{"このアプリは、120日連続服用を対象としています。"}
					</Text>
					<Text style={styles.description}>
						{
							"お飲みのお薬の使用方法に合わせて、以下の設定を編集してください。"
						}
					</Text>
				</View>

				<View style={styles.contentLayout}>
					<View style={styles.leftContent}>
						<Text>{"最短連続投与日数"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							selectedValue={minConteniousTakingDays}
							minValue={1}
							maxValue={
								maxConteniousTakingDays - 1 > 30
									? 30
									: maxConteniousTakingDays - 1
							}
							onChange={onChangeMinConteniousTakingDays}
						/>
					</View>
				</View>
				<View style={styles.contentLayout}>
					<View style={styles.leftContent}>
						<Text>{"最長連続投与日数"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							selectedValue={maxConteniousTakingDays}
							minValue={minConteniousTakingDays + 1}
							maxValue={120}
							onChange={onChangeMaxConteniousTakingDays}
						/>
					</View>
				</View>
				<View style={styles.contentLayout}>
					<View style={styles.leftContent}>
						<Text>{"休薬に入る条件となる連続出血日数"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							selectedValue={conteniousBleeingDaysForRest}
							minValue={1}
							maxValue={7}
							onChange={onChangeConteniousBleeingDaysForRest}
						/>
					</View>
				</View>
				<View style={styles.contentLayout}>
					<View style={styles.leftContent}>
						<Text>{"連続休薬日数"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							selectedValue={stopTakingDays}
							minValue={1}
							maxValue={7}
							onChange={onChangeStopTakingDays}
						/>
					</View>
				</View>

				<CurrentSettings />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 580,
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
