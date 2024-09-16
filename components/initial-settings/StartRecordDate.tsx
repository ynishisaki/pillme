import { ThemedText } from "@/components/common/ThemedText";
import ContentSubTitle from "@/components/common/content/ContentSubTitle";
import CalenderModal from "@/components/initial-settings/CalenderModal";
import { generatePastRecord, recordState } from "@/states/recordState";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";

interface Props {
	isFirstSettings?: boolean;
}
export default function StartRecordDate(props: Props) {
	const [numOfRecordDays, setNumOfRecordDays] = useState(1);

	const [record, setRecord] = useRecoilState(recordState);

	const genRecord = generatePastRecord(numOfRecordDays);
	useEffect(() => {
		setRecord({
			...genRecord,
		});
	}, [numOfRecordDays]);

	return (
		<>
			<ContentSubTitle title='服薬開始日' />

			<ThemedText type='description'>服薬開始日を設定します。</ThemedText>
			{props.isFirstSettings && <ThemedText type='warn'>※この設定はアプリ開始後に変更できません。</ThemedText>}

			<View style={styles.contentLayout}>
				<ThemedText>最新の服薬開始日</ThemedText>
				<CalenderModal numOfDays={numOfRecordDays} handleSetNumOfDays={setNumOfRecordDays}></CalenderModal>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	contentLayout: {
		paddingVertical: 16,
	},
});
