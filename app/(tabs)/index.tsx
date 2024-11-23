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

  // AsyncStorageから記録を取得
  useEffect(() => {
    (async () => {
      const storedRecordAsString: string | null = await AsyncStorage.getItem(
        "record"
      );

      // AsyncStorageに記録がない
      // ->初期設定が完了していない場合
      if (storedRecordAsString === null) {
        return router.replace("/initial-settings");
      }

      // AsyncStorageから記録取得
      const storedRecord: recordType = JSON.parse(storedRecordAsString);
      const latestRecordDate = storedRecord.dailyRecord[0].date;

      console.log("storedRecord", storedRecord.dailyRecord[0]);

      // 初期設定が完了していない場合
      if (storedRecord.isInitialSettingsDone === false) {
        return router.replace("/initial-settings");
      }

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
      console.log("numberOfDays", numberOfDays);

      let updatedRecord = {
        ...storedRecord,
      };

      // 日付の昇順であることに注意
      Array.from({ length: numberOfDays }, (_, i) => {
        const date = format(addDay(latestRecordDate, i + 1), yyyymmdd, locale);
        const isRestPeriod = judgeIsTodayRestPeriod(updatedRecord);
        console.log("date", date);
        console.log("isRestPeriod", isRestPeriod);

        updatedRecord = {
          ...updatedRecord,
          dailyRecord: [
            {
              date,
              tookMedicine: false,
              haveBleeding: false,
              isRestPeriod: isRestPeriod,
            },
            ...updatedRecord.dailyRecord,
          ],
        };

        return;
      });
      console.log("updatedRecord", updatedRecord.dailyRecord[0]);
      console.log("updatedRecord.length", updatedRecord.dailyRecord.length);

      // const updatedRecord = {
      //   ...storedRecord,
      //   dailyRecord: [
      //     ...lapsedDailyRecords.reverse(),
      //     ...storedRecord.dailyRecord,
      //   ],
      //   isAsyncStorageLoaded: true,
      // };

      // 今日が休薬日かどうか判定
      // const shouldRestPeriod = judgeIsTodayRestPeriod(updatedRecord);
      // console.log("shouldRestPeriod", shouldRestPeriod);

      return setRecord({
        ...updatedRecord,
        isAsyncStorageLoaded: true,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // AsyncStorageに記録を保存
  useEffect(() => {
    (async () => {
      if (record.isAsyncStorageLoaded === false) return;
      await AsyncStorage.setItem("record", JSON.stringify(record));
      console.log("stored");
    })();
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
