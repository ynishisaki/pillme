import React from "react";
import Layout from "~/templates/Layout";

import { ScreenNavigationProp } from "~/types";
import TakingMedicineSettings from "~/organisms/TakingMedicineSettings";
import SheetManagementSettings from "~/organisms/SheetManagementSettings";

export const InitialSettings = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<Layout navigationProps={navigation} navigationType='InitialSettings'>
			<TakingMedicineSettings />
			<SheetManagementSettings />
		</Layout>
	);
};
