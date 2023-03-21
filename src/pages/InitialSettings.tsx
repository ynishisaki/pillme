import React from "react";
import Layout from "~/templates/Layout";

import { ScreenNavigationProp } from "~/types";
import { Settings } from "~/organisms/Settings";

export const InitialSettings = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<Layout navigationProps={navigation} navigationType='InitialSettings'>
			<Settings />
		</Layout>
	);
};
