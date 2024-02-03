import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import BaseWhiteText from "~/components/common/BaseWhiteText";
import { HomeTitle } from "~/components/home/HomeTitle";
import { HomeTodaysRecord } from "~/components/home/HomeTodaysRecord";
import SettingsMedicationMethod from "~/components/settings/SettingsMedicationMethod";
import SettingsSheetManagement from "~/components/settings/SettingsSheetManagement";
import { getDateStrings } from "~/functions/getDateStrings";
import { judgeIsTodayRestPeriod } from "~/functions/judgeIsRestPeriod";
import { recordState, today } from "~/states/recordState";
import { translucentWhite } from "~/styles/color";
import ScreenLayout from "~/template/ScreenLayout";
import ScrollableScreenLayout from "~/template/ScrollableScreenLayout";
import { dailyRecordType, recordType } from "~/types/record";

export const FirstSettings = ({ navigation }: { navigation: any }) => {
	const [record, setRecord] = useRecoilState(recordState);
	const isFocused = useIsFocused();

	// const [modalVisible, setModalVisible] = useState(false);

	// AsyncStorageから記録を取得
	// useEffect(() => {
	// 	(async () => {
	// 		const storedRecordAsString: string | null = await AsyncStorage.getItem("record");

	// 		// AsyncStorageに記録がないので、デフォルトのrecordを利用する
	// 		if (storedRecordAsString === null) {
	// 			setModalVisible(true);

	// 			return setRecord((oldRecord) => ({
	// 				...oldRecord,
	// 				isAsyncStorageLoaded: true,
	// 			}));
	// 		}

	// 		// AsyncStorageから記録取得、stateにsetする
	// 		const storedRecord: recordType = JSON.parse(storedRecordAsString);
	// 		const latestRecordDateString = storedRecord.dailyRecord[0].date;

	// 		// アプリ起動日が、前回起動日と同日の場合
	// 		if (latestRecordDateString === today) {
	// 			return setRecord({
	// 				...storedRecord,
	// 				isAsyncStorageLoaded: true,
	// 			});
	// 		}

	// 		// アプリ起動日が、前回起動日と異なる日だったら、前回から今日までの記録を追加
	// 		let latestDate = new Date(latestRecordDateString);
	// 		let todayDate = new Date();

	// 		todayDate.setHours(0, 0, 0, 0);

	// 		let lapsedDailyRecords: Array<dailyRecordType> = [];
	// 		// 時刻まで比較すると、左項は0時0分0秒、右項は現在時刻になることに注意
	// 		while (latestDate.getTime() < todayDate.getTime()) {
	// 			latestDate.setDate(latestDate.getDate() + 1);
	// 			lapsedDailyRecords = [
	// 				{
	// 					date: getDateStrings(latestDate),
	// 					tookMedicine: false,
	// 					haveBleeding: false,
	// 					isRestPeriod: false,
	// 				},
	// 				...lapsedDailyRecords,
	// 			];
	// 		}

	// 		const updatedRecord = {
	// 			...storedRecord,
	// 			dailyRecord: [...lapsedDailyRecords, ...storedRecord.dailyRecord],
	// 			isAsyncStorageLoaded: true,
	// 		};

	// 		// 今日が休薬日かどうか判定
	// 		const shouldRestPeriod = judgeIsTodayRestPeriod(updatedRecord);

	// 		return setRecord({
	// 			...updatedRecord,
	// 			dailyRecord: [
	// 				{
	// 					...updatedRecord.dailyRecord[0],
	// 					isRestPeriod: shouldRestPeriod,
	// 				},
	// 				...updatedRecord.dailyRecord.slice(1),
	// 			],
	// 		});
	// 	})();
	// 	// 上記の括弧をつけることで即時関数を実行
	// }, []);

	// AsyncStorageに記録を保存
	// useEffect(() => {
	// 	AsyncStorage.setItem("record", JSON.stringify(record));
	// 	// console.log(record.dailyRecord);
	// 	// console.log(record.initialSheetSettings);
	// 	console.log("stored");
	// 	console.log();
	// }, [record]);

	return (
		<ScrollableScreenLayout>
			<View style={styles.contentsLayout}>
				{/* <View style={styles.centeredView}> */}
				{/* <View style={styles.modalView}> */}
				{/* <ScrollView style={[styles.modalLayout]}> */}
				{/* <View style={styles.modelView}> */}
				<SettingsMedicationMethod />
				<SettingsSheetManagement />
				<Pressable
					style={[styles.button, styles.buttonClose]}
					// onPress={() => navigation.navigate("HomeStacks")}
				>
					<BaseWhiteText>設定を確定する</BaseWhiteText>
				</Pressable>
				{/* </View> */}
				{/* </ScrollView> */}
			</View>

			{/* </View> */}
			{/* </ScrollableScreenLayout> */}
			{/* </View> */}
		</ScrollableScreenLayout>
	);
};

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginTop: 20,
		rowGap: 20,
	},
	infoView: {
		height: 200,
		width: 330,
	},
	todaysRecordView: {
		height: 220,
		width: 330,
		borderRadius: 8,
		backgroundColor: translucentWhite,
		overflow: "hidden",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// marginTop: 22,
	},
	modalLayout: {
		flex: 1,
		paddingHorizontal: 32,
		paddingBottom: 16,
		backgroundColor: "white",
	},
	modelView: {
		flex: 1,
		marginTop: 20,
		rowGap: 20,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
});
