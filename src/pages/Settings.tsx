import React from "react";
import SettingsMedicationMethod from "~/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "~/components/settings/SettingsSheetManagement";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import SettingsDataInit from "~/components/settings/SettingsDataInit";
import { View, StyleSheet } from "react-native";

export const Settings = () => {
	return (
		<ScrollableScreenLayout>
			<View style={styles.contentsLayout}>
				<SettingsMedicationMethod />
				<SettingsSheetManagement />
				<SettingsDataInit />
			</View>
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginTop: 10,
		rowGap: 40,
	},
});
