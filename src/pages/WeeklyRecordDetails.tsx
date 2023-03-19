import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { Layout } from "~/templates/layout";

import { ScreenNavigationProp } from "~/types";

export const WeeklyRecordDetails = ({
	navigation,
}: {
	navigation: ScreenNavigationProp;
}) => {
	return (
		<Layout
			navigationProps={navigation}
			navigationType='WeeklyRecordDetails'>
			<Text>InitialSettings</Text>
		</Layout>
	);
};
