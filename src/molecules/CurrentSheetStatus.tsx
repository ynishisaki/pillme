import { StyleSheet, View } from "react-native";
import { CurrentSheetCheckBox } from "../atoms/CurrentSheetCheckBox";
import { recordType } from "../types/types";

export const CurrentSheetStatus = ({
	record,
	currentSheetTookMedicineLength,
	remainingDays,
}: {
	record: recordType;
	currentSheetTookMedicineLength: number;
	remainingDays: number;
}) => {
	const checkBoxes = [];
	// 現在のシートの初期開始位置までの分
	if (record.initialSheetSettings.beginSheetIndex > 0) {
		for (let i = 0; i < record.initialSheetSettings.beginSheetIndex; i++) {
			checkBoxes.push(
				<View key={i} style={styles.checkBoxLayout}>
					<CurrentSheetCheckBox isChecked={true} />
				</View>
			);
			console.log(i);
		}
	}

	// 現在のシートの飲んだ分
	record.dailyRecord
		.slice(0, currentSheetTookMedicineLength)
		.reverse()
		.forEach((rec, i) => {
			checkBoxes.push(
				<View key={100 + i} style={styles.checkBoxLayout}>
					<CurrentSheetCheckBox isChecked={rec.tookMedicine} />
				</View>
			);
			console.log(100 + i);
		});

	// 現在のシートの残り分
	for (let i = 0; i < remainingDays; i++) {
		checkBoxes.push(
			<View key={1000 + i} style={styles.checkBoxLayout}>
				<CurrentSheetCheckBox isChecked={false} />
			</View>
		);
		console.log(1000 + i);
	}

	// 空間を埋める用
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
