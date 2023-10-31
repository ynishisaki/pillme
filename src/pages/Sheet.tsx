import { StyleSheet, View } from "react-native";
import React from "react";

import ScreenLayout from "~/template/ScreenLayout";
import { HomeWeeklyRecord } from "~/components/large/HomeWeeklyRecord";
import { HomeCurrentSheet } from "~/components/large/HomeCurrentSheet";

export const Sheet = () => {
	return (
		<ScreenLayout>
			<View style={styles.contentsLayout}>
				<View style={styles.weeklyRecord}>
					<HomeWeeklyRecord onPress={() => console.log()} />
				</View>
				<View style={styles.sheetRecord}>
					<HomeCurrentSheet />
				</View>
			</View>
		</ScreenLayout>
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
	sheetRecord: {
		height: 230,
		width: 330,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		borderRadius: 8,
		overflow: "hidden",
	},
});
