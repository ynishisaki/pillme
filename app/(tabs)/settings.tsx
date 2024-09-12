import ScrollableScreenLayout from "@/components/common/ScrollableScreenLayout";
import SettingsDataInit from "@/components/settings/SettingsDataInit";
import SettingsMedicationMethod from "@/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "@/components/settings/SettingsSheetManagement";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
	return (
		<ScrollableScreenLayout>
			<View style={styles.viewLayout}>
				<SettingsMedicationMethod />
				<SettingsSheetManagement />
				<SettingsDataInit />
			</View>
		</ScrollableScreenLayout>
	);
}

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
		marginVertical: 20,
		rowGap: 20,
	},
});
