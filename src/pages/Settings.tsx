import React from "react";
import { ScreenNavigationProp } from "~/types";
import SettingsMedicationMethod from "~/organisms/SettingsMedicationMethod";
import SettingsSheetManagement from "~/organisms/SettingsSheetManagement";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import SettingsDataInit from "~/organisms/SettingsDataInit";

export const Settings = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<ScrollableScreenLayout
			navigationProps={navigation}
			navigationType='Settings'>
			<SettingsMedicationMethod />
			<SettingsSheetManagement />
			<SettingsDataInit />
		</ScrollableScreenLayout>
	);
};
