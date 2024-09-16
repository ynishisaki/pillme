import CustomOutlineButton from "@/components/common/CustomOutlineButton";
import Divider from "@/components/common/Divider";
import ContentLayout from "@/components/common/content/ContentLayout";
import ScrollableScreenLayout from "@/components/common/screen/ScrollableScreenLayout";
import { default as StartRecordDate } from "@/components/initial-settings/StartRecordDate";
import MedicationMethod from "@/components/settings/MedicationMethod";
import SheetManagement from "@/components/settings/SheetManagement";
import { Colors } from "@/constants/Colors";
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
			isAsyncStorageLoaded: true,
		});
		router.push("/");
	};

	return (
		<ScrollableScreenLayout>
			<View style={styles.viewLayout}>
				<ContentLayout title='初期設定'>
					<View style={styles.contentLayout}>
						<MedicationMethod isFirstSettings />

						<Divider />

						<SheetManagement isFirstSettings />

						<Divider />

						<StartRecordDate isFirstSettings />

						<Divider />

						<View style={styles.buttonContainer}>
							<CustomOutlineButton
								onPress={onPressDecideButton}
								title='アプリを開始する'
								bgColor={Colors.lightBlue}
								textColor='whitesmoke'
								borderColor='transparent'
							/>
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
		margin: 20,
	},
	buttonContainer: {
		rowGap: 6,
	},
});
