import React from "react";
import SettingsMedicationMethod from "~/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "~/components/settings/SettingsSheetManagement";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import SettingsDataInit from "~/components/settings/SettingsDataInit";

export const Settings = () => {
	return (
		<ScrollableScreenLayout>
			<SettingsMedicationMethod />
			<SettingsSheetManagement />
			<SettingsDataInit />
		</ScrollableScreenLayout>
	);
};
