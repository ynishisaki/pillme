import { addDay, format } from "@formkit/tempo";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import ContentLayout from "~/components/common/ContentLayout";
import { CloseIcon } from "~/components/common/Icons";
import { ThemedText } from "~/components/common/ThemedText";
import { Sheet } from "~/components/record/Sheet";
import getCurrentSheetStatus from "~/functions/countRecord";
import { recordState } from "~/states/recordState";
import { locale, md } from "~/utils/tempo-options";

interface props {
	handleClose: () => void;
}

export const CurrentSheet = (props: props) => {
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
		<ContentLayout title='現在のシート' onPress={props.handleClose} titleIcon={<CloseIcon />}>
			<View style={styles.contentLayout}>
				<View style={styles.textLayout}>
					<ThemedText type='subTitle'>シート終了日(推定)</ThemedText>
					<ThemedText type='default'>{estimatedEndDate}</ThemedText>
				</View>
				<Sheet />
			</View>
		</ContentLayout>
	);
};

const styles = StyleSheet.create({
	contentLayout: {
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		columnGap: 10,
	},
	// contentLayout: {
	// 	flexDirection: "row",
	// 	justifyContent: "center",
	// 	padding: 20,
	// },
	textLayout: {
		marginTop: 16,
	},
});
