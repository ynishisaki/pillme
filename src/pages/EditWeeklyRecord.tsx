import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import { LeftIcon } from "~/components/Icons";
import CustomButton from "~/components/common/CustomButton";
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
				<ContentLayout title='記録の編集'>
					<View style={styles.contentsLayout}>
						<OverviewText>過去の記録を編集できます</OverviewText>
						{hasNoRecordWithoutToday && <OverviewText>下から順番に服薬記録を記入してください</OverviewText>}

						<EditWeellyRecordCheckBoxes />

						<CustomButton
							onPress={() => navigation.navigate("Home")}
							bgColor={secondaryColor}
							textColor='dimgray'
							title='ホームに戻る'
							iconComponent={<LeftIcon />}
						/>
					</View>
				</ContentLayout>
			)}
		</ScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		margin: 20,
	},
});
