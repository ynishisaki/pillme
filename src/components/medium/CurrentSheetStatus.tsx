import { StyleSheet, View } from "react-native";
import { CurrentSheetCheckBox } from "../small/CurrentSheetCheckBox";
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
	// console.log(
	// 	"currentSheetTookMedicineLength",
	// 	currentSheetTookMedicineLength
	// );
	// console.log("remainingDays", remainingDays);

	const checkBoxes = [];
	// 現在のシートの昨日までの分
	if (currentSheetTookMedicineLength > 0) {
		for (let i = 0; i < currentSheetTookMedicineLength - 1; i++) {
			checkBoxes.push(
				<View key={i} style={styles.checkBoxLayout}>
					<CurrentSheetCheckBox isChecked={true} />
				</View>
			);
			// console.log(i);
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
	// console.log(100 + 1);

	// 現在のシートの残り分
	for (let i = 0; i < remainingDays; i++) {
		checkBoxes.push(
			<View key={1000 + i} style={styles.checkBoxLayout}>
				<CurrentSheetCheckBox isChecked={false} />
			</View>
		);
		// console.log(1000 + i);
	}

	// 空間を埋めるためのダミー分

	if ((currentSheetTookMedicineLength + remainingDays) % 7 !== 0) {
		for (
			let i = 0;
			i < (currentSheetTookMedicineLength + 1 + remainingDays) % 7;
			i++
		) {
			checkBoxes.push(
				<View key={10000 + i} style={styles.checkBoxLayout}>
					<View style={styles.dammyCheckBox} />
				</View>
			);
			// console.log(10000 + i);
		}
	}

	return <View style={styles.container}>{checkBoxes}</View>;
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		borderColor: "#fff",
		borderWidth: 2,
		borderRadius: 16,
		width: 200,
		height: 110,
		flexDirection: "row",
		flexWrap: "wrap",
		// padding: "auto",
		padding: 5,
		justifyContent: "space-between",
	},
	checkBoxLayout: {
		// flex: 1,
		alignItems: "center",
		// marginHorizontal: 5,
		// marginVertical: 150,
		margin: 5,
		paddingVertical: 7,
	},
	dammyCheckBox: {
		width: 15,
		// height: 10,
	},
});