import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useResetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { recordState } from "~/../App";
import Title from "~/atoms/Title";
import { useState } from "react";

export default function DataInitialization() {
	const [isPressDelete, setIsPressDelete] = useState(false);

	const resetRecord = useResetRecoilState(recordState);

	const onPressDelete = async () => {
		setIsPressDelete(true);

		resetRecord;
		await AsyncStorage.clear();
		console.log("Initialized AsyncStorage.");
	};

	const createTwoButtonAlert = () =>
		Alert.alert(
			"データを削除しますか？",
			"一度削除したデータは復元できません。よろしいですか？",
			[
				{
					text: "キャンセル",
					style: "cancel",
				},
				{
					text: "OK",
					style: "destructive",
					onPress: () => onPressDelete,
				},
			]
		);

	return (
		<View style={styles.container}>
			<Title title={`初期化`} />
			<View style={styles.contentLayout}>
				<View>
					<Text style={styles.description}>
						{
							"本アプリ内の全データを削除し、インストール時の状態に初期化します。"
						}
					</Text>
					<Button
						onPress={createTwoButtonAlert}
						title='データ初期化'
						disabled={isPressDelete}
						color='#841584'
						accessibilityLabel='delete button'
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 160,
		marginBottom: 20,

		backgroundColor: "#fff",
		borderRadius: 16,
	},
	currentSettingsContainer: {
		backgroundColor: "#ddd",
		borderRadius: 16,
	},
	contentLayout: {
		flex: 1,
		padding: 20,
	},
	description: {
		fontSize: 12,
		color: "#000000A8",
		paddingBottom: 10,
	},
});