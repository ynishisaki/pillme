import React from "react";
import ScreenLayout from "~/template/ScreenLayout";
import EditWeellyRecordCheckBoxes from "~/components/weekly/EditWeellyRecordCheckBoxes";
import { StyleSheet, Text, View } from "react-native";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import ContentLayout from "~/components/ContentLayout";
import { useIsFocused } from "@react-navigation/native";
import { BackButton } from "../components/weekly/BackButton";
import { useRecoilValue } from "recoil";
import { recordState } from "~/states/recordState";
import { hasNoRecordDays } from "~/functions/countRecord";
import { pillColor } from "~/styles/color";

export const EditWeeklyRecord = ({ navigation }: { navigation: any }) => {
	const isFocused = useIsFocused();
	console.log("EditWeeklyRecord isFocused", isFocused);
	const record = useRecoilValue(recordState);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	return (
		//  <ScreenLayout>
		<ScrollableScreenLayout>
			{isFocused && (
				<View style={styles.contentsLayout}>
					<ContentLayout title='記録の編集'>
						<Text style={styles.overviewText}>過去一週間の記録を編集することができます</Text>
						{hasNoRecordWithoutToday && (
							<Text style={styles.overviewAlertText}>記録忘れの日があります</Text>
						)}
						<EditWeellyRecordCheckBoxes />
						<BackButton onPress={() => navigation.navigate("Home")} />
					</ContentLayout>
				</View>
			)}
		</ScrollableScreenLayout>
		// </ScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginTop: 10,
	},
	overviewText: {
		fontSize: 12,
		color: "#000000A8",
	},
	overviewAlertText: {
		fontSize: 12,
		color: pillColor,
	},
});
