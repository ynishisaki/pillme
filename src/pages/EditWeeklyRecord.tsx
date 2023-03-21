import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import Layout from "~/templates/Layout";

import { ScreenNavigationProp } from "~/types";
import EditWeellyRecord from "~/organisms/EditWeellyRecord";

export const WeeklyRecordDetails = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<Layout
			navigationProps={navigation}
			navigationType='WeeklyRecordDetails'>
			<EditWeellyRecord />
		</Layout>
	);
};
