import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

import { recordState } from "~/../App";
import Title from "~/atoms/Title";

export const Settings = () => {
	const [record, setRecord] = useRecoilState(recordState);

	function setNumOfPillsPerSheet(itemValue: number, itemIndex: number) {
		setRecord({
			...record,
			initialSheetSettings: {
				...record.initialSheetSettings,
				numOfPillsPerSheet: itemValue,
			},
		});
	}

	function setBeginSheetIndex(itemValue: number, itemIndex: number) {
		setRecord({
			...record,
			initialSheetSettings: {
				...record.initialSheetSettings,
				beginSheetIndex: itemValue - 1, // 0スタート
			},
		});
	}

	const pickerItems = [];
	for (let i = 1; i <= 30; i++) {
		pickerItems.push(<Picker.Item key={i} label={`${i}`} value={i} />);
	}

	const minConteniousTakingDays = 24;
	const maxConteniousTakingDays = 120;
	const conteniousBleeingDaysForRest = 3;
	const stopTakingDays = 4;

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
						<Text style={{ fontWeight: "bold" }}>
							{minConteniousTakingDays}
						</Text>
						日目までは出血がみられても連続して服用します。
					</Text>
					<Text>
						服用
						<Text>{minConteniousTakingDays + 1}</Text>
						日目〜
						<Text style={{ fontWeight: "bold" }}>
							{maxConteniousTakingDays}
						</Text>
						日目の間に
						<Text style={{ fontWeight: "bold" }}>
							{conteniousBleeingDaysForRest}
						</Text>
						日連続で出血が見られた場合、服用を中止し、休薬期間を翌日から
						<Text style={{ fontWeight: "bold" }}>
							{stopTakingDays}
						</Text>
						日間とります。
					</Text>
				</View>

				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>
							{"１シートあたりの錠数\n（プラセボは除く）"}
						</Text>
					</View>
					<View style={styles.rightContent}>
						<Picker
							style={styles.picker}
							selectedValue={
								record.initialSheetSettings.numOfPillsPerSheet
							}
							onValueChange={(itemValue, itemIndex) =>
								setNumOfPillsPerSheet(itemValue, itemIndex)
							}>
							{pickerItems}
						</Picker>
					</View>
				</View>
				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>アプリ使い始めの最初のシートの位置</Text>
					</View>
					<View style={styles.rightContent}>
						<Picker
							style={styles.picker}
							selectedValue={
								record.initialSheetSettings.beginSheetIndex + 1
							}
							onValueChange={(itemValue, itemIndex) =>
								setBeginSheetIndex(itemValue, itemIndex)
							}>
							{pickerItems}
						</Picker>
					</View>
				</View>
			</View>
			<Title title={`シートの設定`} />
			<View style={styles.contentLayout}>
				<Text>{"利用開始時に設定"}</Text>
				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>
							{"１シートあたりの錠数\n（プラセボは除く）"}
						</Text>
					</View>
					<View style={styles.rightContent}>
						<Picker
							style={styles.picker}
							selectedValue={
								record.initialSheetSettings.numOfPillsPerSheet
							}
							onValueChange={(itemValue, itemIndex) =>
								setNumOfPillsPerSheet(itemValue, itemIndex)
							}>
							{pickerItems}
						</Picker>
					</View>
				</View>
				<View style={styles.layout}>
					<View style={styles.leftContent}>
						<Text>アプリ使い始めの最初のシートの位置</Text>
					</View>
					<View style={styles.rightContent}>
						<Picker
							style={styles.picker}
							selectedValue={
								record.initialSheetSettings.beginSheetIndex + 1
							}
							onValueChange={(itemValue, itemIndex) =>
								setBeginSheetIndex(itemValue, itemIndex)
							}>
							{pickerItems}
						</Picker>
					</View>
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
		height: 50,
		fontSize: 20,
	},
});
