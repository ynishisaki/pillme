import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "~/components/common/CustomButton";
import FirstSettingsTitleText from "~/components/common/FirstSettingsTitleText";
import SupplementText from "~/components/common/SupplementText";
import SettingsMedicationMethod from "~/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "~/components/settings/SettingsSheetManagement";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";

export const FirstSettings = ({ navigation }: { navigation: any }) => {
	const onPressDecideButton = () => {
		navigation.navigate("Home");
	};

	return (
		<ScrollableScreenLayout>
			<View style={styles.contentsLayout}>
				<View>
					<FirstSettingsTitleText>初期設定</FirstSettingsTitleText>
				</View>
				<SettingsMedicationMethod />
				<SettingsSheetManagement />
				<View style={styles.buttonContainer}>
					<SupplementText>この設定はアプリ開始後に変更することも可能です。</SupplementText>
					<CustomButton onPress={onPressDecideButton} title='アプリを開始する' color={"darkorange"} />
				</View>
			</View>
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginVertical: 20,
		rowGap: 20,
	},
	buttonContainer: {
		// flex: 1,
		// justifyContent: "flex-end",
		rowGap: 6,
	},
});
