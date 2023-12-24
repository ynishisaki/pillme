import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import BaseBlackText from "~/components/common/BaseBlackText";
import OverviewText from "~/components/common/OverviewText";
import { recordState } from "~/states/recordState";

export default function CurrentSettings() {
	const record = useRecoilValue(recordState);

	const minConteniousTakingDays = record.initialSheetSettings.minConteniousTakingDays;
	const maxConteniousTakingDays = record.initialSheetSettings.maxConteniousTakingDays;
	const conteniousBleeingDaysForRest = record.initialSheetSettings.conteniousBleeingDaysForRest;
	const stopTakingDays = record.initialSheetSettings.stopTakingDays;

	return (
		<View style={styles.container}>
			<BaseBlackText>現在の設定内容</BaseBlackText>

			<OverviewText>
				{`服用1日目～${minConteniousTakingDays - 1}日目までは出血がみられても連続して服用します。`}
			</OverviewText>
			<OverviewText>
				{`服用${minConteniousTakingDays}日目〜${maxConteniousTakingDays}日目の間に${conteniousBleeingDaysForRest}日連続で出血が見られた場合、服用を中止し、休薬期間を翌日から${stopTakingDays}日間とします。`}
			</OverviewText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		padding: 20,
		backgroundColor: "#ddd",
		borderRadius: 8,
		boxShadow: "0px 0px 4px #00000040",
	},
});
