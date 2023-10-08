import { StyleSheet, View } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";

import ScreenLayout from "~/template/ScreenLayout";
import { HomeWeeklyRecord } from "~/components/large/HomeWeeklyRecord";
import { HomeCurrentSheet } from "~/components/large/HomeCurrentSheet";
import { ScreenNavigationProp } from "~/types";

export const Sheet = ({ navigation }: { navigation: ScreenNavigationProp }) => {
	return (
		<ScreenLayout navigationProps={navigation} navigationType='Home'>
			<View style={styles.contentsLayout}>
				<View style={styles.weeklyRecord}>
					<HomeWeeklyRecord
						onPress={() => navigation.navigate("EditWeeklyRecord")}
					/>
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
		// marginHorizontal: 20,
		marginBottom: 100,
		justifyContent: "flex-end",
		alignItems: "center",
		flexDirection: "column",
		rowGap: 20,
	},
	weeklyRecord: {
		height: 150,
		width: 300,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		// backgroundColor: "white",
		borderRadius: 8,
	},
	sheetRecord: {
		height: 180,
		width: 300,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		// backgroundColor: "white",
		borderRadius: 8,
	},
});
