import React from "react";
import ScreenLayout from "~/template/ScreenLayout";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { ScreenNavigationProp } from "~/types";
import MedicationMethodSettings from "~/organisms/MedicationMethodSettings";
import SheetManagementSettings from "~/organisms/SheetManagementSettings";
import CurrentSettings from "~/molecules/CurrentSettings";
import ShowSettings from "~/organisms/ShowSettings";
import { ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";

export const InitialSettings = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<ScrollableScreenLayout
			navigationProps={navigation}
			navigationType='InitialSettings'>
			<View style={styles.contentsLayout}>
				<SheetManagementSettings />
				<MedicationMethodSettings />
				<ShowSettings />
			</View>
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		// flex: 1,
		// marginBottom: 16,
		// gap: 24,
	},
});
