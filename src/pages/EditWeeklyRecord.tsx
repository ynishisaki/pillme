import React from "react";
import ScreenLayout from "~/template/ScreenLayout";
import EditWeellyRecordCheckBoxes from "~/components/weekly/EditWeellyRecordCheckBoxes";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import { HeaderColor } from "~/styles/color";
import { LeftIcon, RightIcon } from "~/components/Icons";
import ContentLayout from "~/components/ContentLayout";

export const EditWeeklyRecord = ({ navigation }: { navigation: any }) => {
	return (
		<ScrollableScreenLayout>
			<ContentLayout title='過去一週間分の記録' onPress={() => navigation.navigate("Sheet")}>
				{/* <View style={styles.contentsLayout}> */}
				{/* <View style={styles.weeklyRecord}> */}
				{/* <View style={styles.container}> */}
				{/* <TouchableOpacity onPress={() => navigation.navigate("Sheet")}>
					<View style={styles.titleContainer}>
						<LeftIcon />
						<Text style={styles.titleText}>過去一週間分の記録</Text>
					</View>
				</TouchableOpacity> */}
				{/* <View style={styles.containerLayout}> */}
				<Text style={styles.description}>昨日から一週間前まで記録をさかのぼって編集することができます</Text>
				<EditWeellyRecordCheckBoxes />
				{/* </View> */}
				{/* </View> */}
				{/* </View> */}
				{/* </View> */}
			</ContentLayout>
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		flexDirection: "column",
		rowGap: 50,
		marginBottom: 40,
	},
	weeklyRecord: {
		height: 170,
		width: 330,
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
});
