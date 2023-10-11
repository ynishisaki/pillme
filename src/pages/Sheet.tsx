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
		marginBottom: 16,
		paddingHorizontal: 16,
		// marginBottom: 16,
		// paddingHorizontal: 16,
		// marginHorizontal: 16,

		// marginBottom: 100,
		// justifyContent: "flex-end",
		alignItems: "center",
		flexDirection: "column",
		rowGap: 20,
	},
	weeklyRecord: {
		// flex: 1,
		height: 200,
		// width: 330,
		marginHorizontal: 0,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		borderRadius: 8,
		overflow: "hidden",
	},
	sheetRecord: {
		flex: 1,
		height: 180,
		marginHorizontal: 0,
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		borderRadius: 8,
		overflow: "hidden",
	},
});
