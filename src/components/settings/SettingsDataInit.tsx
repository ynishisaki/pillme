import { Alert, Button, StyleSheet, Text } from "react-native";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialRecord, recordState } from "~/states/recordState";
import { warningRed } from "~/styles/color";
import ContentLayout from "../ContentLayout";

export default function SettingsDataInit() {
	const [record, setRecord] = useRecoilState(recordState);

	const onPressDelete = async () => {
		setRecord({
			...initialRecord,
			isAsyncStorageLoaded: true,
		});

		await AsyncStorage.clear();
		console.log("Initialized AsyncStorage.");
	};

	const createTwoButtonAlert = () =>
		Alert.alert("データを削除しますか？", "一度削除したデータは復元できません。よろしいですか？", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "OK",
				style: "destructive",
				onPress: onPressDelete,
			},
		]);

	return (
		<ContentLayout title='初期化'>
			<Text style={styles.overviewText}>
				{"本アプリ内の全データを削除し、インストール時の状態に初期化します。"}
			</Text>
			<Button
				onPress={createTwoButtonAlert}
				title='データ初期化'
				color={warningRed}
				accessibilityLabel='delete button'
			/>
		</ContentLayout>
	);
}

const styles = StyleSheet.create({
	overviewText: {
		fontSize: 12,
		color: "#000000A8",
		paddingBottom: 10,
	},
});
