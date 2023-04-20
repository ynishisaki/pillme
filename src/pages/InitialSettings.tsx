import React from "react";
import Layout from "~/templates/Layout";
import { StyleSheet } from "react-native";
import { ScreenNavigationProp } from "~/types";
import MedicationMethodSettings from "~/organisms/MedicationMethodSettings";
import SheetManagementSettings from "~/organisms/SheetManagementSettings";
import CurrentSettings from "~/molecules/CurrentSettings";
import ShowSettings from "~/organisms/ShowSettings";
import { ScrollView } from "react-native";

export const InitialSettings = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<Layout navigationProps={navigation} navigationType='InitialSettings'>
			<ScrollView style={styles.scrollView}>
				<MedicationMethodSettings />
				<SheetManagementSettings />
				<ShowSettings />
			</ScrollView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	paddingTop: StatusBar.currentHeight,
	// },
	scrollView: {
		flex: 1,
		// backgroundColor: "pink",
		// marginHorizontal: 20,
		// marginBottom: 16,
		// marginHorizontal: 16,
		// alignItems: "center",
		// flexDirection: "column",
		gap: 30,
		// justifyContent: "space-between",
	},
});
