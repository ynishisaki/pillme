import { ThemedText } from "@/components/common/ThemedText";
import { recordState } from "@/states/recordState";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";

export default function CurrentSettings() {
	const record = useRecoilValue(recordState);

	const minConteniousTakingDays = record.initialSheetSettings.minConteniousTakingDays;
	const maxConteniousTakingDays = record.initialSheetSettings.maxConteniousTakingDays;
	const conteniousBleeingDaysForRest = record.initialSheetSettings.conteniousBleeingDaysForRest;
	const stopTakingDays = record.initialSheetSettings.stopTakingDays;

	return (
		<View style={styles.container}>
			<ThemedText type='default'>現在の設定内容</ThemedText>

			<>
				<ThemedText type='description'>
					{`服用1日目～${minConteniousTakingDays - 1}日目までは出血がみられても連続して服用します。`}
				</ThemedText>
				<ThemedText type='description'>
					{`服用${minConteniousTakingDays}日目〜${maxConteniousTakingDays}日目の間に${conteniousBleeingDaysForRest}日連続で出血が見られた場合、服用を中止し、休薬期間を翌日から${stopTakingDays}日間とします。`}
				</ThemedText>
			</>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginBottom: 20,
		padding: 20,
		backgroundColor: "whitesmoke",
		borderColor: "gray",
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 16,
		elevation: 1,
		gap: 8,
	},
});
