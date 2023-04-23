import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

import { recordState } from "~/../App";
import Title from "~/atoms/Title";

export default () => {
	const [record, setRecord] = useRecoilState(recordState);

	const minConteniousTakingDays =
		record.initialSheetSettings.minConteniousTakingDays;
	const maxConteniousTakingDays =
		record.initialSheetSettings.maxConteniousTakingDays;
	const conteniousBleeingDaysForRest =
		record.initialSheetSettings.conteniousBleeingDaysForRest;
	const stopTakingDays = record.initialSheetSettings.stopTakingDays;

	return (
		<View style={styles.currentSettingsContainer}>
			<Text style={styles.subtitle}>現在の設定内容</Text>

			<Text style={styles.textline}>
				{`服用1日目～${minConteniousTakingDays}日目までは出血がみられても連続して服用します。`}
			</Text>
			<Text>
				{`服用${
					minConteniousTakingDays + 1
				}日目〜${maxConteniousTakingDays}日目の間に${conteniousBleeingDaysForRest}日連続で出血が見られた場合、服用を中止し、休薬期間を翌日から${stopTakingDays}日間とします。`}
			</Text>
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
	},
	contentLayout: {
		flex: 1,
		padding: 20,
	},
	layout: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		paddingVertical: 10,
	},
});
