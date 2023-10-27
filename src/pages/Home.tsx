import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

import ScreenLayout from "~/template/ScreenLayout";
import { HomeTodaysRecord } from "~/components/large/HomeTodaysRecord";

import { dailyRecordType, ScreenNavigationProp } from "~/types";
import { recordState, today } from "~/hooks/recordState";
import { getDateStrings } from "~/utils/getDateStrings";
import { HomeInfo } from "~/components/large/HomeInfo";

export const Home = () => {
	const [record, setRecord] = useRecoilState(recordState);

	// This hook returns `true` if the screen is focused, `false` otherwise
	// const isFocused = useIsFocused();

	// AsyncStorageから記録を取得
	useEffect(() => {
		(async () => {
			const storedRecordAsString: string | null = await AsyncStorage.getItem("record");

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
						dailyRecord: [...lapsedDailyRecords, ...storedRecord.dailyRecord],
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

	return (
		<ScreenLayout>
			{/* {isFocused && ( */}
			<View style={styles.contentsLayout}>
				<View style={styles.infoView}>
					<HomeInfo />
				</View>
				<View style={styles.todaysRecordView}>
					<HomeTodaysRecord />
				</View>
			</View>
			{/* )} */}
		</ScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		rowGap: 200,
	},
	infoView: {
		height: 200,
		width: 330,
	},
	todaysRecordView: {
		height: 220,
		width: 330,
		borderRadius: 8,
	},
});
