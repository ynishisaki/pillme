import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomOutlineButton from "~/components/common/CustomOutlineButton";
import SupplementText from "~/components/common/SupplementText";
import SettingsMedicationMethod from "~/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "~/components/settings/SettingsSheetManagement";
import { warningRed } from "~/styles/color";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";

export const FirstSettings = ({ navigation }: { navigation: any }) => {
	const onPressDecideButton = () => {
		navigation.navigate("Home");
	};

	return (
		<ScrollableScreenLayout>
			<View style={styles.viewLayout}>
				<View>
					<Text style={styles.titleText}>初期設定</Text>
				</View>

				<SettingsMedicationMethod />
				<SettingsSheetManagement />

				<View style={styles.buttonContainer}>
					<SupplementText>この設定はアプリ開始後に変更することも可能です。</SupplementText>
					<CustomOutlineButton
						onPress={onPressDecideButton}
						title='アプリを開始する'
						bgColor={warningRed}
						textColor='white'
					/>
				</View>
			</View>
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
		marginVertical: 20,
		rowGap: 20,
	},
	titleText: {
		color: "white",
		fontSize: 30,
		lineHeight: 36,
		fontFamily: "NotoSansJP_700Bold",
	},
	buttonContainer: {
		rowGap: 6,
	},
});
