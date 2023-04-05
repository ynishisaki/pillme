import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";
import CurrentSettings from "~/molecules/CurrentSettings";
import { recordState } from "~/../App";
import Title from "~/atoms/Title";

export const SmallPicker = ({
	value,
	onChange,
	items,
}: {
	value: number;
	onChange: (itemValue: number, itemIndex: number) => void;
	items: JSX.Element[];
}) => {
	return (
		<Picker
			style={styles.picker}
			selectedValue={value}
			onValueChange={(itemValue, itemIndex) =>
				onChange(itemValue, itemIndex)
			}>
			{items}
		</Picker>
	);
};

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
						<Text>{"最小連続投与日数"}</Text>
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
						<Text>{"最大連続投与日数"}</Text>
					</View>
					<View style={styles.rightContent}>
						<SmallPicker
							value={maxConteniousTakingDays}
							onChange={onChangeMinConteniousTakingDays}
							items={pickerItems(30)}
						/>
					</View>
				</View>
				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>{"休薬に必要な連続出血日数"}</Text>
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
						<Text>{"休薬日数"}</Text>
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
		flex: 1,
		width: 330,
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	description: {
		fontSize: 12,
		color: "#000000A8",
	},
	currentSettingsContainer: {
		// flex: 1,
		marginTop: 10,
		padding: 20,
		backgroundColor: "#ffffe0",
		borderRadius: 16,
		boxShadow: "0px 0px 4px #00000040",
	},
	subtitle: {
		fontSize: 16,
		textAlign: "center",
		paddingBottom: 6,
	},
	textline: {
		flexDirection: "row",
		height: 50,
		alignItems: "center",
		// justifyContent: "space-around",
	},
	contentLayout: {
		flex: 1,
		padding: 20,
	},
	layout: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		// marginHorizontal: 20,
		paddingVertical: 10,
	},
	leftContent: {
		width: "65%",
	},
	rightContent: {
		width: "35%",
	},
	picker: {
		// backgroundColor: "cyan",

		display: "flex",
		// height: 10,
		// width: 100,
		height: 50,
		// fontSize: 20,
	},
});
