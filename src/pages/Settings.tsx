import React from "react";
import { StyleSheet, View } from "react-native";
import SettingsDataInit from "~/components/settings/SettingsDataInit";
import SettingsMedicationMethod from "~/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "~/components/settings/SettingsSheetManagement";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";

export const Settings = ({ navigation }: { navigation: any }) => {
	return (
		<ScrollableScreenLayout>
			<View style={styles.contentsLayout}>
				<SettingsMedicationMethod />
				<SettingsSheetManagement />
				<SettingsDataInit navigation={navigation} />
			</View>
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginTop: 20,
		rowGap: 20,
	},
});
