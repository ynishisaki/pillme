import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import CustomOutlineButton from "~/components/common/CustomOutlineButton";
import { ThemedText } from "~/components/common/ThemedText";
import { initialRecord, recordState } from "~/states/recordState";
import { warningRed } from "~/styles/color";
import ContentLayout from "../common/ContentLayout";

export default function SettingsDataInit({ navigation }: { navigation: any }) {
	const [record, setRecord] = useRecoilState(recordState);

	const onPressDelete = async () => {
		setRecord({
			...initialRecord,
			isAsyncStorageLoaded: true,
		});

		await AsyncStorage.clear();
		console.log("Initialized AsyncStorage.");

		navigation.navigate("FirstSettings");
	};

	const onPressDataInitButton = () =>
		Alert.alert("アプリ内データを削除しますか？", "一度削除したデータは復元できません。よろしいですか？", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "アプリ内データを削除",
				style: "destructive",
				onPress: onPressDelete,
			},
		]);

	return (
		<ContentLayout title='データの削除'>
			<View style={styles.contentLayout}>
				<ThemedText type='overview'>本アプリ内のすべてのデータを削除します。</ThemedText>
				<ThemedText type='overview'>この操作を元に戻すことはできません。</ThemedText>

				<View style={{ height: 20 }} />
				<CustomOutlineButton
					onPress={onPressDataInitButton}
					title='データの削除'
					bgColor='white'
					textColor={warningRed}
				/>
			</View>
		</ContentLayout>
	);
}

const styles = StyleSheet.create({
	contentLayout: {
		margin: 20,
	},
});
