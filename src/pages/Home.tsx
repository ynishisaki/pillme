import {
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Layout from "~/templates/Layout";
import { getDateStrings, recordState, today } from "~/../App";
import { TodaysRecord } from "~/organisms/TodaysRecord";
import { WeeklyRecord } from "~/organisms/WeeklyRecord";
import { CurrentSheet } from "~/organisms/CurrentSheet";
import { dailyRecordType, ScreenNavigationProp } from "~/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SettingIcon } from "~/atoms/Icons";

export const Home = ({ navigation }: { navigation: ScreenNavigationProp }) => {
	const [record, setRecord] = useRecoilState(recordState);

	// AsyncStorageから記録を取得
	useEffect(() => {
		(async () => {
			const storedRecordAsString: string | null =
				await AsyncStorage.getItem("record");
			// AsyncStorageに記録がないので、デフォルトのrecordを利用する
			if (storedRecordAsString === null) {
				setRecord((oldRecord) => ({
					...oldRecord,
					isAsyncStorageLoaded: true,
				}));
			}
			// AsyncStorageから記録取得、stateにsetする
			else {
				const storedRecord = JSON.parse(storedRecordAsString);
				const latestDailyRecord = storedRecord.dailyRecord[0];

				// アプリ起動日が、前回起動日と同日の場合
				if (latestDailyRecord.date === today) {
					setRecord({
						...storedRecord,
						isAsyncStorageLoaded: true,
					});
				}

				// アプリ起動日が、前回起動日と異なる日だったら、前回から今日までの記録を追加
				else {
					let latestDate = new Date(latestDailyRecord.date);
					let todayDate = new Date(today);

					let lapsedDailyRecords: Array<dailyRecordType> = [];
					// 時刻まで比較すると、左項は0時0分0秒、右項は現在時刻になることに注意
					while (latestDate.getTime() < todayDate.getTime()) {
						latestDate.setDate(latestDate.getDate() + 1);
						lapsedDailyRecords = [
							{
								date: getDateStrings(latestDate),
								tookMedicine: false,
								haveBleeding: false,
								isRestPeriod: false,
							},
							...lapsedDailyRecords,
						];
					}

					setRecord({
						...storedRecord,
						dailyRecord: [
							...lapsedDailyRecords,
							...storedRecord.dailyRecord,
						],
						isAsyncStorageLoaded: true,
					});
				}
			}
		})();
		// 上記の括弧をつけることで即時関数を実行
	}, []);

	// AsyncStorageに記録を保存
	useEffect(() => {
		AsyncStorage.setItem("record", JSON.stringify(record));
		console.log(record);
		console.log("stored");
		console.log();
	}, [record]);

	// 注意！AsyncStorageを初期化
	// useEffect(() => {
	// 	(async () => {
	// 		await AsyncStorage.clear();
	// 	})();
	// }, []);

	return (
		<Layout navigationProps={navigation} navigationType='Home'>
			<View style={styles.contentsLayout}>
				<View style={styles.todaysRecord}>
					<TodaysRecord />
				</View>
				<View style={styles.weeklyRecord}>
					<WeeklyRecord
						onPress={() => navigation.navigate("EditWeeklyRecord")}
					/>
				</View>
				<View style={styles.sheetRecord}>
					<CurrentSheet />
				</View>
			</View>
		</Layout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginTop: 16,
		marginBottom: 16,
		marginHorizontal: 16,
		alignItems: "center",
		flexDirection: "column",
		// gap: 30,
		justifyContent: "space-between",
	},
	todaysRecord: {
		// flex: 4,
		height: 190,
		width: 270,
		backgroundColor: "white",
		borderRadius: 40,
	},
	weeklyRecord: {
		// flex: 3,
		height: 150,
		width: 330,
		backgroundColor: "#63769C",
		borderRadius: 16,
	},
	sheetRecord: {
		// flex: 4,
		height: 180,
		width: 330,
		// marginBottom: 24,
		backgroundColor: "#63769C",
		borderRadius: 16,
	},
});
