import Divider from "@/components/common/Divider";
import ContentLayout from "@/components/common/content/ContentLayout";
import ScrollableScreenLayout from "@/components/common/screen/ScrollableScreenLayout";
import DataInit from "@/components/settings/DataInit";
import MedicationMethod from "@/components/settings/MedicationMethod";
import SheetManagement from "@/components/settings/SheetManagement";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
	return (
		<ScrollableScreenLayout>
			<View style={styles.viewLayout}>
				<ContentLayout title='設定'>
					<View style={styles.contentLayout}>
						<MedicationMethod />

						<Divider />

						<SheetManagement />

						<Divider />

						<DataInit />
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
});
