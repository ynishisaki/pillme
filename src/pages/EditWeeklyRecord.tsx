import React from "react";
import ScreenLayout from "~/template/ScreenLayout";
import EditWeellyRecordCheckBoxes from "~/components/weekly/EditWeellyRecordCheckBoxes";
import { StyleSheet, Text, View } from "react-native";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import ContentLayout from "~/components/ContentLayout";
import { useIsFocused } from "@react-navigation/native";
import { BackButton } from "../components/weekly/BackButton";

export const EditWeeklyRecord = ({ navigation }: { navigation: any }) => {
	const isFocused = useIsFocused();

	return (
		//  <ScreenLayout>
		<ScrollableScreenLayout>
			{isFocused && (
				<View style={styles.contentsLayout}>
					<ContentLayout title='記録の編集'>
						<Text style={styles.overviewText}>過去一週間の記録を編集することができます</Text>
						<EditWeellyRecordCheckBoxes />
						<BackButton onPress={() => navigation.navigate("Record")} />
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
});
