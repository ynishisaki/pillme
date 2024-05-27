import { StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import CustomOutlineButton from "~/components/common/CustomOutlineButton";
import SettingsMedicationMethod from "~/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "~/components/settings/SettingsSheetManagement";
import SettingsStartRecordDate from "~/components/settings/SettingsStartRecordDate";
import { recordState } from "~/states/recordState";
import { lightBlue } from "~/styles/color";
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
					<Text style={styles.titleText}>初期設定</Text>
				</View>

				<SettingsMedicationMethod isFirstSettings />
				<SettingsSheetManagement isFirstSettings />
				<SettingsStartRecordDate isFirstSettings />

				<View style={styles.buttonContainer}>
					<CustomOutlineButton
						onPress={onPressDecideButton}
						title='アプリを開始する'
						bgColor={lightBlue}
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
