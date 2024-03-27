import React from "react";
import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import BaseWhiteText from "~/components/common/BaseWhiteText";
import FirstSettingsTitleText from "~/components/common/FirstSettingsTitleText";
import HomeTitleText from "~/components/common/HomeTitleText";
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
					<Button
						onPress={onPressDecideButton}
						title='アプリを開始する'
						color={"darkorange"}
						// color={warningRed}
						accessibilityLabel='decide button'
					/>
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
