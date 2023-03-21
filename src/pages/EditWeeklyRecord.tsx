import React from "react";
import Layout from "~/templates/Layout";

import { ScreenNavigationProp } from "~/types";
import EditWeellyRecord from "~/organisms/EditWeellyRecord";

export const EditWeeklyRecord = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<Layout navigationProps={navigation} navigationType='EditWeeklyRecord'>
			<EditWeellyRecord />
		</Layout>
	);
};
