import ContentLayout from "@/components/common/ContentLayout";
import ScrollableScreenLayout from "@/components/common/ScrollableScreenLayout";
import { ThemedText } from "@/components/common/ThemedText";
import NewSettingsMedicationMethod from "@/components/settings/NewSettingsMedicationMethod";
import NewSettingsSheetManagement from "@/components/settings/NewSettingsSheetManagement";
import SettingsDataInit from "@/components/settings/SettingsDataInit";
import SettingsMedicationMethod from "@/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "@/components/settings/SettingsSheetManagement";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
	return (
		<ScrollableScreenLayout>
			<ContentLayout title='服薬方法'>
				<View style={styles.contentLayout}>
					<View style={styles.h2Layout}>
						<View style={styles.h2Marker}></View>
						<ThemedText type='bold'>服薬方法</ThemedText>
					</View>
					<NewSettingsMedicationMethod />
					{/* divider */}
					<View style={styles.divider}></View>
					<NewSettingsSheetManagement />
				</View>
			</ContentLayout>
			{/* <View style={styles.viewLayout}>
				<SettingsMedicationMethod />
				<SettingsSheetManagement />
				<SettingsDataInit />
			</View> */}
		</ScrollableScreenLayout>
	);
}

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
		marginVertical: 20,
		rowGap: 20,
	},
	contentLayout: {
		margin: 20,
	},
	h2Layout: {
		marginBottom: 20,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: 16,
	},
	h2Marker: {
		backgroundColor: Colors.contentHeader,
		width: 10,
		height: 40,
	},
	divider: {
		marginVertical: 40,
		borderTopWidth: 1,
		borderTopColor: "lightgray",
	},
});
