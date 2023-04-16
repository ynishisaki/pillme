import React from "react";
import Layout from "~/templates/Layout";

import { ScreenNavigationProp } from "~/types";
import MedicationMethodSettings from "~/organisms/MedicationMethodSettings";
import SheetManagementSettings from "~/organisms/SheetManagementSettings";
import CurrentSettings from "~/molecules/CurrentSettings";
import ShowSettings from "~/organisms/ShowSettings";

export const InitialSettings = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<Layout navigationProps={navigation} navigationType='InitialSettings'>
			<MedicationMethodSettings />
			{/* <SheetManagementSettings /> */}
			{/* <ShowSettings /> */}
			{/* <CurrentSettings /> */}
		</Layout>
	);
};
