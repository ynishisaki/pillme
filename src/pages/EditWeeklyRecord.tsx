import React from "react";
import ScreenLayout from "~/template/ScreenLayout";
import { ScreenNavigationProp } from "~/types";
import EditableWeellyRecordCheckBoxes from "~/organisms/EditableWeellyRecordCheckBoxes";
import { Text, View, StyleSheet } from "react-native";
import Title from "~/atoms/Title";

export const EditWeeklyRecord = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<ScreenLayout
			navigationProps={navigation}
			navigationType='EditWeeklyRecord'>
			<View style={styles.container}>
				<Title title={`過去の記録`} />
				<Text style={styles.description}>
					昨日から一週間前まで記録をさかのぼって編集することができます
				</Text>
				<EditableWeellyRecordCheckBoxes />
			</View>
		</ScreenLayout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 330,
		// width: 280,
		// marginBottom: 24,
		textAlign: "center",
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	description: {
		marginTop: 8,
		marginHorizontal: 20,
		fontSize: 12,
		color: "#000000A8",
	},
});
