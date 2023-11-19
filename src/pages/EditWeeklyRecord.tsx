import React from "react";
import ScreenLayout from "~/template/ScreenLayout";
import EditWeellyRecordCheckBoxes from "~/components/weekly/EditWeellyRecordCheckBoxes";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import { HeaderColor } from "~/styles/color";
import { LeftIcon } from "~/components/Icons";
import ContentLayout from "~/components/ContentLayout";

export const EditWeeklyRecord = ({ navigation }: { navigation: any }) => {
	return (
		<ScrollableScreenLayout>
			{/* <ScreenLayout> */}

			<View style={styles.contentsLayout}>
				<ContentLayout title='過去一週間分の記録'>
					<Text style={styles.description}>昨日から一週間前まで記録をさかのぼって編集することができます</Text>
					<EditWeellyRecordCheckBoxes />
				</ContentLayout>

				<TouchableOpacity onPress={() => navigation.navigate("Sheet")}>
					<View style={styles.backButtonContainer}>
						<LeftIcon />
						<Text style={styles.buttonText}>戻る</Text>
					</View>
				</TouchableOpacity>
			</View>
			{/* </ScreenLayout> */}
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		// justifyContent: "flex-end",
		// alignItems: "center",
		flexDirection: "column",
		// rowGap: 50,
		justifyContent: "space-between",
		// marginBottom: 40,
	},
	weeklyRecord: {
		// height: 170,
		// width: 330,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		borderRadius: 8,
		overflow: "hidden",
	},

	titleContainer: {
		flexDirection: "row",
		// justifyContent: "space-between",
		columnGap: 10,
		alignItems: "center",
		paddingHorizontal: 20,
		height: 46,
		backgroundColor: HeaderColor,
	},
	titleText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	container: {
		flex: 1,
		width: 330,
		textAlign: "center",
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	containerLayout: {
		flex: 1,
		padding: 20,
	},
	description: {
		fontSize: 12,
		color: "#000000A8",
	},

	backButtonContainer: {
		// paddingTop: 4,
		paddingVertical: 4,
		paddingHorizontal: 12,
		// height: 38,
		backgroundColor: HeaderColor,
		flexDirection: "row",
		columnGap: 10,
		width: 116,
		borderRadius: 8,
	},
	buttonText: {
		fontSize: 18,
		// fontWeight: "bold",
		color: "white",
	},
});
