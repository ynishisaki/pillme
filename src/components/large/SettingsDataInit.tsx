import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Title from "~/components/small/Title";
import { useState } from "react";
import { initialRecord, recordState } from "~/states/recordState";
import { warningRed } from "~/styles/color";

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
		<View style={styles.container}>
			<Title title={`初期化`} />
			<View style={styles.contentLayout}>
				<Text style={styles.description}>
					{"本アプリ内の全データを削除し、インストール時の状態に初期化します。"}
				</Text>
				<Button
					onPress={createTwoButtonAlert}
					title='データ初期化'
					color={warningRed}
					accessibilityLabel='delete button'
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 160,
		marginBottom: 40,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		// backgroundColor: "white",
		borderRadius: 8,
		overflow: "hidden",
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
