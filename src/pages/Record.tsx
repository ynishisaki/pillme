import { StyleSheet, View } from "react-native";
import React from "react";

import ScreenLayout from "~/template/ScreenLayout";
import { WeeklyRecord } from "~/components/record/WeeklyRecord";
import { CurrentSheet } from "~/components/record/CurrentSheet";
import { ScreenNavigationProp } from "~/types/navigation";
import { translucentWhite } from "~/styles/color";
import { useIsFocused } from "@react-navigation/native";

export const Record = ({ navigation }: { navigation: ScreenNavigationProp }) => {
	const isFocused = useIsFocused();

	return (
		<ScreenLayout>
			{isFocused && (
				<View style={styles.contentsLayout}>
					<View style={styles.sheetRecord}>
						<CurrentSheet />
					</View>
					<View style={styles.weeklyRecord}>
						<WeeklyRecord onPress={() => navigation.navigate("EditWeeklyRecord")} />
					</View>
				</View>
			)}
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
