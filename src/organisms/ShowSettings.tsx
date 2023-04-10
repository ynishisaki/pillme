import { Button, StyleSheet, Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { recordState, today } from "~/../App";
import Title from "~/atoms/Title";
import { useEffect } from "react";

export default () => {
	const [record, setRecord] = useRecoilState(recordState);

	const onPressDelete = async () => {
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

	// AsyncStorageに記録を保存
	// useEffect(() => {
	// 	AsyncStorage.setItem("record", JSON.stringify(record));
	// 	console.log(record);
	// 	console.log("stored");
	// 	console.log();
	// }, [record]);
	// 注意！AsyncStorageを初期化
	// 	async () => {
	// 		await AsyncStorage.clear();
	// 	};

	// 	console.log("Initialized AsyncStorage.");
	// };
	// useEffect(() => {
	// 	(async () => {
	// 		await AsyncStorage.clear();
	// 	})();
	// }, []);

	return (
		<View style={styles.container}>
			<Title title={`シートの設定`} />
			<View style={styles.contentLayout}>
				<View>
					<Text style={styles.description}>
						{
							"この設定は、アプリ利用開始時とデータリセット時にのみ登録することができます。"
						}
					</Text>
					<Text style={styles.description}>
						{
							"お飲みのお薬とシートの現在の状態に合わせて、以下の設定を編集してください。"
						}
					</Text>
					<Button
						onPress={onPressDelete}
						title='注意！データ削除'
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
