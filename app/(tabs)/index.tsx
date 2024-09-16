import ScreenLayout from "@/components/common/screen/ScreenLayout";
import HomeTitle from "@/components/home/HomeTitle";
import HomeTodaysRecord from "@/components/home/HomeTodaysRecord";
import { locale, yyyymmdd } from "@/constants/tempo-options";
import { judgeIsTodayRestPeriod } from "@/functions/judgeIsRestPeriod";
import { recordState } from "@/states/recordState";
import { dailyRecordType, recordType } from "@/types/record";
import { addDay, diffDays, format } from "@formkit/tempo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";

export default function HomeScreen() {
	const router = useRouter();

	const [record, setRecord] = useRecoilState(recordState);
	const isFocused = useIsFocused();

	const todayDate = format(new Date(), yyyymmdd, locale); // YYYY-DD-MM
	// console.log("today", todayDate);

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
				return router.push("/initial-settings");
			}

			// AsyncStorageから記録取得、stateにsetする
			const storedRecord: recordType = JSON.parse(storedRecordAsString);
			const latestRecordDate = storedRecord.dailyRecord[0].date;

			// アプリ起動日が、前回起動日と同日の場合
			if (latestRecordDate === todayDate) {
				return setRecord({
					...storedRecord,
					isAsyncStorageLoaded: true,
				});
			}

			// アプリ起動日が、前回起動日と異なる場合
			// 前回から今日までの記録を追加
			const numberOfDays = diffDays(todayDate, latestRecordDate);

			// 日付の昇順であることに注意
			const lapsedDailyRecords: Array<dailyRecordType> = Array.from({ length: numberOfDays }, (_, i) => {
				const date = format(addDay(latestRecordDate, i + 1), yyyymmdd, locale);
				return {
					date,
					tookMedicine: false,
					haveBleeding: false,
					isRestPeriod: judgeIsTodayRestPeriod({
						...storedRecord,
						dailyRecord: storedRecord.dailyRecord,
					}),
				};
			});

			const updatedRecord = {
				...storedRecord,
				dailyRecord: [...lapsedDailyRecords.reverse(), ...storedRecord.dailyRecord],
				isAsyncStorageLoaded: true,
			};

			// 今日が休薬日かどうか判定
			const shouldRestPeriod = judgeIsTodayRestPeriod(updatedRecord);

			return setRecord({
				...updatedRecord,
				dailyRecord: [
					{
						...updatedRecord.dailyRecord[0],
						isRestPeriod: shouldRestPeriod,
					},
					...updatedRecord.dailyRecord.slice(1),
				],
			});
		})();
		// 上記の括弧をつけることで即時関数を実行
	}, []);

	// AsyncStorageに記録を保存
	useEffect(() => {
		AsyncStorage.setItem("record", JSON.stringify(record));
		// console.log(record.dailyRecord);
		// console.log(record.initialSheetSettings);
		console.log("stored");
		console.log();
	}, [record]);

	return (
		<ScreenLayout>
			{isFocused && (
				<View style={styles.viewLayout}>
					<HomeTitle />
					<HomeTodaysRecord />
				</View>
			)}
		</ScreenLayout>
	);
}

const styles = StyleSheet.create({
	viewLayout: {
		flex: 1,
		justifyContent: "space-between",
		marginTop: 20,
	},
});
