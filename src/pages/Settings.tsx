import React from "react";
import SettingsMedicationMethod from "~/components/large/SettingsMedicationMethod";
import SettingsSheetManagement from "~/components/large/SettingsSheetManagement";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import SettingsDataInit from "~/components/large/SettingsDataInit";

export const Settings = () => {
	return (
		<ScrollableScreenLayout>
			<SettingsMedicationMethod />
			<SettingsSheetManagement />
			<SettingsDataInit />
		</ScrollableScreenLayout>
	);
};
