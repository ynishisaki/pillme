import { StyleSheet, View, Text } from "react-native";
import { useRecoilState } from "recoil";
import Title from "~/components/small/Title";
import Message from "~/components/medium/TodaysMessage";
import { recordState } from "~/hooks/recordState";
import { getDateWeekStringsForDisplay } from "~/utils/getDateStrings";

export const HomeInfo = () => {
	const [record, setRecord] = useRecoilState(recordState);

	const tookMedicine = record.dailyRecord[0].tookMedicine;
	const haveBleeding = record.dailyRecord[0].haveBleeding;
	const isRestPeriod = record.dailyRecord[0].isRestPeriod;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{getDateWeekStringsForDisplay(record.dailyRecord[0].date)}
			</Text>

			<Text style={styles.text}>服薬　5日</Text>
			<Text style={styles.text}>出血　0日</Text>

			<Message takeRestPeriod={record.dailyRecord[0].isRestPeriod} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		color: "white",
		fontSize: 48,
		fontWeight: "bold",
		marginBottom: 16,
	},
	text: {
		color: "white",
		fontSize: 16,
	},
});
