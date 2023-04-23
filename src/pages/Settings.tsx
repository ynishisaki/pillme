import React from "react";
import { ScreenNavigationProp } from "~/types";
import MedicationMethodSettings from "~/organisms/MedicationMethodSettings";
import SheetManagementSettings from "~/organisms/SheetManagementSettings";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import DataInitialization from "~/organisms/DataInitialization";

export const Settings = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<ScrollableScreenLayout
			navigationProps={navigation}
			navigationType='Settings'>
			<SheetManagementSettings />
			<MedicationMethodSettings />
			<DataInitialization />
		</ScrollableScreenLayout>
	);
};
