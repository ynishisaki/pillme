import { Alert, Button, Modal, StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { recordState, today } from "~/../App";
import Title from "~/atoms/Title";
import { useEffect, useState } from "react";

export default () => {
	const [isPressDelete, setIsPressDelete] = useState(false);

	const [record, setRecord] = useRecoilState(recordState);

	const onPressDelete = async () => {
		setIsPressDelete(true);

		setRecord({
			initialSheetSettings: {
				// 投薬方法に関する設定
				minConteniousTakingDays: 24,
				maxConteniousTakingDays: 120,
				conteniousBleeingDaysForRest: 3,
				stopTakingDays: 4,
				// シートの管理
				numOfPillsPerSheet: 28,
				beginSheetIndex: 0, // 0スタート
			},
			dailyRecord: [
				{
					date: today,
					tookMedicine: false, // 今日薬を飲んだか
					haveBleeding: false, // 今日出血があったか
					isRestPeriod: false, // 休薬日か
				},
			],
			isAsyncStorageLoaded: true,
		});
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
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: 330,
		backgroundColor: "#fff",
		borderRadius: 16,
	},
	currentSettingsContainer: {
		// flex: 1,
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
	},
	layout: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		// marginHorizontal: 20,
		paddingVertical: 10,
	},
	leftContent: {
		width: "65%",
	},
	rightContent: {
		width: "35%",
	},
	picker: {
		height: 50,
		fontSize: 20,
	},
});
