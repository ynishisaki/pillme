import React from "react";
import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import BaseWhiteText from "~/components/common/BaseWhiteText";
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
					<BaseWhiteText>初期設定</BaseWhiteText>
					<BaseWhiteText>設定はアプリ開始後に変更することも可能です。</BaseWhiteText>
				</View>
				<SettingsMedicationMethod />
				<SettingsSheetManagement />
				<Button
					onPress={onPressDecideButton}
					title='アプリを開始する'
					color={"darkorange"}
					// color={warningRed}
					accessibilityLabel='decide button'
				/>
				<BaseWhiteText>設定はアプリ開始後に変更することも可能です。</BaseWhiteText>
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
});
