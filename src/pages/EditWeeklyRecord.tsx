import React from "react";
import ScreenLayout from "~/template/ScreenLayout";
import EditWeellyRecordCheckBoxes from "~/components/weekly/EditWeellyRecordCheckBoxes";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import { HeaderColor } from "~/styles/color";
import { LeftIcon } from "~/components/Icons";
import ContentLayout from "~/components/ContentLayout";
import { useIsFocused } from "@react-navigation/native";

export const EditWeeklyRecord = ({ navigation }: { navigation: any }) => {
	const isFocused = useIsFocused();

	return (
		<ScrollableScreenLayout>
			{isFocused && (
				<View style={styles.contentsLayout}>
					<ContentLayout title='過去の記録の編集'>
						<Text style={styles.overviewText}>一週間前までさかのぼって記録を編集することができます</Text>
						<EditWeellyRecordCheckBoxes />
					</ContentLayout>

					<TouchableOpacity onPress={() => navigation.navigate("Record")}>
						<View style={styles.backButtonContainer}>
							<LeftIcon />
							<Text style={styles.buttonLabelText}>戻る</Text>
						</View>
					</TouchableOpacity>
				</View>
			)}
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		// flexDirection: "column",
		// rowGap: 1,
		justifyContent: "space-between",
	},
	overviewText: {
		fontSize: 12,
		color: "#000000A8",
	},
	backButtonContainer: {
		paddingVertical: 4,
		paddingHorizontal: 12,
		backgroundColor: HeaderColor,
		flexDirection: "row",
		columnGap: 10,
		width: 116,
		borderRadius: 8,
	},
	buttonLabelText: {
		fontSize: 18,
		color: "white",
	},
});
