import React from "react";
import ScreenLayout from "~/template/ScreenLayout";
import EditWeellyRecordCheckBoxes from "~/components/large/EditWeellyRecordCheckBoxes";
import { Text, View, StyleSheet } from "react-native";

export const EditWeeklyRecord = () => {
	return (
		<ScreenLayout>
			<View style={styles.container}>
				{/* <Title title={`過去の記録`} /> */}
				<View style={styles.containerLayout}>
					<Text style={styles.description}>昨日から一週間前まで記録をさかのぼって編集することができます</Text>

					<EditWeellyRecordCheckBoxes />
				</View>
			</View>
		</ScreenLayout>
	);
};

const styles = StyleSheet.create({
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
