import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import OverviewText from "~/components/common/OverviewText";
import EditWeellyRecordCheckBoxes from "~/components/weekly/EditWeellyRecordCheckBoxes";
import { hasNoRecordDays } from "~/functions/countRecord";
import { recordState } from "~/states/recordState";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import { BackButton } from "../components/weekly/BackButton";

export const EditWeeklyRecord = ({ navigation }: { navigation: any }) => {
	const isFocused = useIsFocused();
	const record = useRecoilValue(recordState);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	return (
		<ScrollableScreenLayout>
			{isFocused && (
				<View style={styles.contentsLayout}>
					<ContentLayout title='記録の編集'>
						<OverviewText>最大7日前までさかのぼって記録を編集できます</OverviewText>
						{hasNoRecordWithoutToday && <OverviewText>記録忘れの日があります</OverviewText>}
						<EditWeellyRecordCheckBoxes />
						<BackButton onPress={() => navigation.navigate("Home")} />
					</ContentLayout>
				</View>
			)}
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginTop: 10,
	},
});
