import CustomButton from "@/components/common/CustomButton";
import Divider from "@/components/common/Divider";
import ContentLayout from "@/components/common/content/ContentLayout";
import ScrollableScreenLayout from "@/components/common/screen/ScrollableScreenLayout";
import StartRecordDate from "@/components/initial-settings/StartRecordDate";
import MedicationMethod from "@/components/settings/MedicationMethod";
import SheetManagement from "@/components/settings/SheetManagement";
import { recordState } from "@/states/recordState";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";

export default function InitnialSettingsScreen() {
	const router = useRouter();

	const [record, setRecord] = useRecoilState(recordState);

	const onPressDecideButton = () => {
		setRecord({
			...record,
			isInitialSettingsDone: true,
		});
		router.push("/");
	};

	return (
		<ScrollableScreenLayout>
			<View style={styles.viewLayout}>
				<ContentLayout title='初期設定'>
					<View style={styles.contentLayout}>
						<StartRecordDate isFirstSettings />

						<Divider />

						<MedicationMethod isFirstSettings />

						<Divider />

						<SheetManagement isFirstSettings />

						<Divider />

						<View style={styles.buttonLayout}>
							<CustomButton type='fill' title='アプリを開始する' onPress={onPressDecideButton} />
						</View>
					</View>
				</ContentLayout>
			</View>
		</ScrollableScreenLayout>
	);
}

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
		marginVertical: 20,
	},
	contentLayout: {
		padding: 20,
	},
	buttonLayout: {
		marginTop: -20,
	},
});
