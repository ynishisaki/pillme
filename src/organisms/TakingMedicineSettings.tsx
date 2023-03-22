import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

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
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				minConteniousTakingDays: itemValue,
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
				maxConteniousTakingDays: itemValue,
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
				conteniousBleeingDaysForRest: itemValue,
			},
		}));
	}

	function onChangeStopTakingDays(itemValue: number, itemIndex: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				stopTakingDays: itemValue,
			},
		}));
	}

	const pickerItems = [];
	for (let i = 1; i <= 30; i++) {
		pickerItems.push(<Picker.Item key={i} label={`${i}`} value={i} />);
	}

	return (
		<View style={styles.container}>
			<Title title={`服薬方法の設定`} />
			<View style={styles.contentLayout}>
				<Text>{"このアプリは、120日連続服用を対象としています。"}</Text>
				<Text>
					{
						"お飲みのお薬の使用方法に合わせて、以下の設定を編集してください。"
					}
				</Text>
				<View style={styles.currentSettingsContainer}>
					<Text>現在の設定内容</Text>
					{/* 服用1日目～24日目までは、出血がみられても連続して服用します。 */}
					{/* 25日目以降120日目の間に3日以上の出血が見られた場合、服用を中止し、休薬期間を4日とります。 */}
					<Text>
						服用1日目～
						{/* <Text style={{ fontWeight: "bold" }}>
							{minConteniousTakingDays}
						</Text> */}
						<SmallPicker
							value={minConteniousTakingDays}
							onChange={onChangeMinConteniousTakingDays}
							items={pickerItems}
						/>
						日目までは出血がみられても連続して服用します。
					</Text>
					<Text>
						服用
						<Text>{minConteniousTakingDays + 1}</Text>
						日目〜
						{/* <Text style={{ fontWeight: "bold" }}>
							{maxConteniousTakingDays}
						</Text> */}
						<SmallPicker
							value={maxConteniousTakingDays}
							onChange={onChangeMaxConteniousTakingDays}
							items={pickerItems}
						/>
						日目の間に
						{/* <Text style={{ fontWeight: "bold" }}>
							{conteniousBleeingDaysForRest}
						</Text> */}
						<SmallPicker
							value={conteniousBleeingDaysForRest}
							onChange={onChangeConteniousBleeingDaysForRest}
							items={pickerItems}
						/>
						日連続で出血が見られた場合、服用を中止し、休薬期間を翌日から
						{/* <Text style={{ fontWeight: "bold" }}>
							{stopTakingDays}
						</Text> */}
						<SmallPicker
							value={stopTakingDays}
							onChange={onChangeStopTakingDays}
							items={pickerItems}
						/>
						日間とります。
					</Text>
				</View>
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
	currentSettingsContainer: {
		// flex: 1,
		backgroundColor: "#ddd",
		borderRadius: 16,
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
		// height: 50,
		// fontSize: 20,
	},
});
