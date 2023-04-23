import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";
import CurrentSettings from "~/molecules/CurrentSettings";
import { recordState } from "~/../App";
import Title from "~/atoms/Title";
import SmallPicker from "~/atoms/SmallPicker";

export default () => {
	const [record, setRecord] = useRecoilState(recordState);

	const minConteniousTakingDays =
		record.initialSheetSettings.minConteniousTakingDays;
	const maxConteniousTakingDays =
		record.initialSheetSettings.maxConteniousTakingDays;
	const conteniousBleeingDaysForRest =
		record.initialSheetSettings.conteniousBleeingDaysForRest;
	const stopTakingDays = record.initialSheetSettings.stopTakingDays;

	function onChangeMinConteniousTakingDays(
		itemValue: number,
		itemIndex: number
	) {
		console.log("onChangeMinConteniousTakingDays");
		console.log("itemValue: " + itemValue);
		console.log("typeof itemValue: " + typeof itemValue);

		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				minConteniousTakingDays: Number(itemValue),
			},
		}));
	}

	function onChangeMaxConteniousTakingDays(
		itemValue: number,
		itemIndex: number
	) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				maxConteniousTakingDays: Number(itemValue),
			},
		}));
	}

	function onChangeConteniousBleeingDaysForRest(
		itemValue: number,
		itemIndex: number
	) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				conteniousBleeingDaysForRest: Number(itemValue),
			},
		}));
	}

	function onChangeStopTakingDays(itemValue: number, itemIndex: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				stopTakingDays: Number(itemValue),
			},
		}));
	}

	function pickerItems(max: number) {
		const items = [];
		for (let i = 1; i <= max; i++) {
			items.push(<Picker.Item key={i} label={`${i}`} value={i} />);
		}
		return items;
	}

	return (
		<View style={styles.container}>
			<Title title={`服薬方法の設定`} />
			<View style={styles.contentLayout}>
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

				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>{"最短連続投与日数"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							value={minConteniousTakingDays}
							onChange={onChangeMinConteniousTakingDays}
							items={pickerItems(30)}
						/>
					</View>
				</View>
				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>{"最長連続投与日数"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							value={maxConteniousTakingDays}
							onChange={onChangeMaxConteniousTakingDays}
							items={pickerItems(120)}
						/>
					</View>
				</View>
				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>{"休薬に入る条件となる連続出血日数"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							value={conteniousBleeingDaysForRest}
							onChange={onChangeConteniousBleeingDaysForRest}
							items={pickerItems(7)}
						/>
					</View>
				</View>
				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>{"連続休薬日数"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							value={stopTakingDays}
							onChange={onChangeStopTakingDays}
							items={pickerItems(7)}
						/>
					</View>
				</View>

				<CurrentSettings />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 580,
		marginBottom: 20,
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	description: {
		fontSize: 12,
		color: "#000000A8",
	},
	currentSettingsContainer: {
		marginTop: 10,
		padding: 20,
		backgroundColor: "#ffffe0",
		borderRadius: 16,
		boxShadow: "0px 0px 4px #00000040",
	},
	contentLayout: {
		flex: 1,
		padding: 20,
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
