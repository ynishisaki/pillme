import { StyleSheet, View } from "react-native";
import React from "react";

import ScreenLayout from "~/template/ScreenLayout";
import { SheetWeeklyRecord } from "~/components/sheet/SheetWeeklyRecord";
import { SheetCurrentSheet } from "~/components/sheet/SheetCurrentSheet";
import { ScreenNavigationProp } from "~/types/navigation";
import { translucentWhite } from "~/styles/color";

export const Sheet = ({ navigation }: { navigation: ScreenNavigationProp }) => {
	return (
		<ScreenLayout>
			<View style={styles.contentsLayout}>
				<View style={styles.weeklyRecord}>
					<SheetWeeklyRecord onPress={() => navigation.navigate("EditWeeklyRecord")} />
				</View>
				<View style={styles.sheetRecord}>
					<SheetCurrentSheet />
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
		backgroundColor: translucentWhite,
		borderRadius: 8,
		overflow: "hidden",
	},
	sheetRecord: {
		height: 214,
		width: 330,
		backgroundColor: translucentWhite,
		borderRadius: 8,
		overflow: "hidden",
	},
});
