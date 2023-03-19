import { StyleSheet, View } from "react-native";
import { CurrentSheetCheckBox } from "../atoms/CurrentSheetCheckBox";
import { recordType } from "../types";

export const CurrentSheetStatus = ({
	record,
	currentSheetTookMedicineLength,
	remainingDays,
}: {
	record: recordType;
	currentSheetTookMedicineLength: number;
	remainingDays: number;
}) => {
	console.log(
		"currentSheetTookMedicineLength",
		currentSheetTookMedicineLength
	);
	console.log("remainingDays", remainingDays);

	const checkBoxes = [];
	// 現在のシートの昨日までの分
	if (currentSheetTookMedicineLength > 0) {
		for (let i = 0; i < currentSheetTookMedicineLength - 1; i++) {
			checkBoxes.push(
				<View key={i} style={styles.checkBoxLayout}>
					<CurrentSheetCheckBox isChecked={true} />
				</View>
			);
			console.log(i);
		}
	}

	// 今日の分
	checkBoxes.push(
		<View key={100 + 1} style={styles.checkBoxLayout}>
			<CurrentSheetCheckBox
				isChecked={record.dailyRecord[0].tookMedicine}
			/>
		</View>
	);
	console.log(100 + 1);

	// 現在のシートの残り分
	for (let i = 0; i < remainingDays; i++) {
		checkBoxes.push(
			<View key={1000 + i} style={styles.checkBoxLayout}>
				<CurrentSheetCheckBox isChecked={false} />
			</View>
		);
		console.log(1000 + i);
	}

	// 空間を埋めるためのダミー分
	for (
		let i = 0;
		i < (currentSheetTookMedicineLength + (remainingDays + 1)) % 7;
		i++
	) {
		checkBoxes.push(
			<View key={10000 + i} style={styles.checkBoxLayout}>
				<View style={styles.dammyCheckBox} />
			</View>
		);
		console.log(10000 + i);
	}

	return (
		<View style={styles.container}>
			<View style={styles.checkBoxesLayout}>{checkBoxes}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// height: 196,
		// width: 330,
		// width: 185, // 5*2 + 25*7
		borderColor: "#fff",
		borderWidth: 2,
		borderRadius: 16,
	},
	checkBoxesLayout: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 5,
		justifyContent: "space-between",
	},
	checkBoxLayout: {
		alignItems: "center",
		marginHorizontal: 5,
		marginVertical: 5,
	},
	dammyCheckBox: {
		width: 15,
	},
});
