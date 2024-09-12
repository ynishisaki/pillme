import ContentLayout from "@/components/common/ContentLayout";
import { ThemedText } from "@/components/common/ThemedText";
import { Sheet } from "@/components/records/Sheet";
import { locale, md } from "@/constants/tempo-options";
import getCurrentSheetStatus from "@/functions/countRecord";
import { recordState } from "@/states/recordState";
import { addDay, format } from "@formkit/tempo";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";

export const CurrentSheet = () => {
	const record = useRecoilValue(recordState);

	// シートの終了日を計算
	// シート１枚目、シート開始index0の場合：
	// 今日の日付 + (numOfPillsPerSheet - recordLength)日
	// シート1枚目、シート開始index20の場合：
	// 今日の日付 + (numOfPillsPerSheet - (recordLength + index))日
	// シート2枚目、シート開始index0の場合：
	// 今日の日付 + ((numOfPillsPerSheet -(recordLength % numOfPillsPerSheet)日
	// シート2枚目、シート開始index20の場合：
	// 今日の日付 + ((numOfPillsPerSheet -(recordLength + index) % numOfPillsPerSheet)日

	const { remainingDays } = getCurrentSheetStatus(record);

	const calculateSheetEndDate = addDay(new Date(), remainingDays);
	const estimatedEndDate = format(calculateSheetEndDate, md, locale);

	return (
		<ContentLayout title='現在のシート'>
			<View style={styles.contentLayout}>
				<ThemedText>シート終了日(推定)　{estimatedEndDate}</ThemedText>
				<Sheet />
			</View>
		</ContentLayout>
	);
};

const styles = StyleSheet.create({
	contentLayout: {
		padding: 20,
		flexDirection: "column",
		gap: 10,
	},
});
