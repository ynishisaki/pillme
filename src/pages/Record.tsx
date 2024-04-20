import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CurrentSheet } from "~/components/record/CurrentSheet";
import { WeeklyRecord } from "~/components/record/WeeklyRecord";
import ScreenLayout from "~/template/ScreenLayout";

export const Record = () => {
	const isFocused = useIsFocused();

	return (
		<ScreenLayout>
			{isFocused && (
				<View style={styles.contentsLayout}>
					<CurrentSheet />
					<WeeklyRecord />
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
});
