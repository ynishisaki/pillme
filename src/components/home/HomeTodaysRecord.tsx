import { Alert, StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import ContentLayout from "~/components/ContentLayout";
import CheckBox from "~/components/common/CheckBox";
import CheckboxTitleText from "~/components/common/CheckboxTitleText";
import OverviewText from "~/components/common/OverviewText";
import SheetModal from "~/components/home/SheetModal";
import { hasNoRecordDays } from "~/functions/countRecord";
import { judgeIsTomorrowStartsRestPeriod } from "~/functions/judgeIsRestPeriod";
import { recordState } from "~/states/recordState";
import { recordType } from "~/types/record";

export const HomeTodaysRecord = () => {
	const [record, setRecord] = useRecoilState(recordState);

	const { tookMedicine, haveBleeding, isRestPeriod } = record.dailyRecord[0];
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	function updateTodayRecord(key: string, nextBoolean: boolean) {
		const updatedRecord: recordType = {
			...record,
			dailyRecord: [
				{
					...record.dailyRecord[0],
					[key]: nextBoolean,
				},
				...record.dailyRecord.slice(1),
			],
		};

		const isTomorrowStartsRestPeriod = judgeIsTomorrowStartsRestPeriod(updatedRecord);
		setRecord(updatedRecord);

		// 明日から休薬日の場合はアラートを表示
		nextBoolean && isTomorrowStartsRestPeriod && alertTomorrowRestPeriod();
	}

	const alertTomorrowRestPeriod = () =>
		Alert.alert(
			"明日から休薬日です",
			`出血の有無に関わらず${record.initialSheetSettings.stopTakingDays}日間休薬します。`,
			[
				{
					text: "OK",
					style: "default",
				},
			]
		);

	return (
		<ContentLayout title='今日の記録'>
			<View style={styles.contentLayout}>
				{!hasNoRecordWithoutToday && hasNoRecordToday && (
					<OverviewText type='warn'>今日の記録をつけてください</OverviewText>
				)}
				<View style={styles.checkBoxLayout}>
					{record.isAsyncStorageLoaded && (
						<>
							<CheckBox
								textComponent={<CheckboxTitleText>服薬</CheckboxTitleText>}
								type='medicine'
								size={"lg"}
								isChecked={tookMedicine}
								isRestPeriod={isRestPeriod}
								isNotRecorded={hasNoRecordWithoutToday}
								onPress={() => updateTodayRecord("tookMedicine", !tookMedicine)}
							/>
							<CheckBox
								textComponent={<CheckboxTitleText>出血</CheckboxTitleText>}
								type='bleeding'
								size={"lg"}
								isChecked={haveBleeding}
								isRestPeriod={isRestPeriod}
								isNotRecorded={hasNoRecordWithoutToday}
								onPress={() => updateTodayRecord("haveBleeding", !haveBleeding)}
							/>
						</>
					)}
				</View>

				<SheetModal />
			</View>
		</ContentLayout>
	);
};

const styles = StyleSheet.create({
	contentLayout: {
		paddingHorizontal: 20,
		paddingVertical: 30,
		gap: 20,
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
});
