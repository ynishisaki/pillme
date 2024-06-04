import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import { LeftIcon } from "~/components/Icons";
import CustomOutlineButton from "~/components/common/CustomOutlineButton";
import OverviewText from "~/components/common/OverviewText";
import EditWeellyRecordCheckBoxes from "~/components/weekly/EditWeellyRecordCheckBoxes";
import { hasNoRecordDays } from "~/functions/countRecord";
import { recordState } from "~/states/recordState";
import { secondaryColor } from "~/styles/color";
import ScreenLayout from "~/template/ScreenLayout";

export const EditWeeklyRecord = ({ navigation }: { navigation: any }) => {
	const isFocused = useIsFocused();
	const record = useRecoilValue(recordState);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	return (
		<ScreenLayout>
			{isFocused && (
				<View style={styles.viewLayout}>
					<ContentLayout title='記録の編集'>
						<View style={styles.contentsLayout}>
							<OverviewText>過去の記録を編集できます</OverviewText>
							{hasNoRecordWithoutToday && (
								<OverviewText type='warn'>下から順番に服薬記録を記入してください</OverviewText>
							)}

							<EditWeellyRecordCheckBoxes />

							<CustomOutlineButton
								onPress={() => navigation.navigate("Home")}
								bgColor={secondaryColor}
								textColor='dimgray'
								title='ホームに戻る'
								iconComponent={<LeftIcon />}
							/>
						</View>
					</ContentLayout>
				</View>
			)}
		</ScreenLayout>
	);
};

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
	},
	contentsLayout: {
		flex: 1,
		margin: 20,
	},
});
