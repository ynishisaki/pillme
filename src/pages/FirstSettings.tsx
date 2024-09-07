import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import CustomOutlineButton from "~/components/common/CustomOutlineButton";
import { ThemedText } from "~/components/common/ThemedText";
import SettingsMedicationMethod from "~/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "~/components/settings/SettingsSheetManagement";
import SettingsStartRecordDate from "~/components/settings/SettingsStartRecordDate";
import { recordState } from "~/states/recordState";
import { pillColor } from "~/styles/color";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";

export const FirstSettings = ({ navigation }: { navigation: any }) => {
	const [record, setRecord] = useRecoilState(recordState);
	const onPressDecideButton = () => {
		setRecord({
			...record,
			isAsyncStorageLoaded: true,
		});
		navigation.navigate("Home");
	};

	return (
		<ScrollableScreenLayout>
			<View style={styles.viewLayout}>
				<View>
					<ThemedText type='contentTitle'>初期設定</ThemedText>
				</View>

				<SettingsMedicationMethod isFirstSettings />
				<SettingsSheetManagement isFirstSettings />
				<SettingsStartRecordDate isFirstSettings />

				<View style={styles.buttonContainer}>
					<CustomOutlineButton
						onPress={onPressDecideButton}
						title='アプリを開始する'
						bgColor={pillColor}
						textColor='whitesmoke'
						borderColor='transparent'
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

	buttonContainer: {
		rowGap: 6,
	},
});
