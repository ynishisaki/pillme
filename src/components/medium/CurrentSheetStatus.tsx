import { StyleSheet, View } from "react-native";
import { CurrentSheetCheckBox } from "~/components/small/CurrentSheetCheckBox";

export const CurrentSheetStatus = ({ tookDays, remainingDays }: { tookDays: number; remainingDays: number }) => {
	const checkBoxes = [];
	// 現在のシートの飲んだ分
	if (tookDays > 0) {
		for (let i = 0; i < tookDays; i++) {
			checkBoxes.push(
				<View key={i} style={styles.checkBoxLayout}>
					<CurrentSheetCheckBox isChecked={true} />
				</View>
			);
			// console.log(i);
		}
	}

	// 現在のシートの残り分
	for (let i = 0; i < remainingDays; i++) {
		checkBoxes.push(
			<View key={1000 + i} style={styles.checkBoxLayout}>
				<CurrentSheetCheckBox isChecked={false} />
			</View>
		);
		// console.log(100 + i);
	}

	// 空間を埋めるためのダミー分

	if ((tookDays + remainingDays) % 7 !== 0) {
		const remainingDummyDays = 7 - ((tookDays + remainingDays) % 7);
		for (let i = 0; i < remainingDummyDays; i++) {
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
		flex: 1,
		borderColor: "#fff",
		borderWidth: 2,
		borderRadius: 16,
		width: 200,
		height: 130,

		flexDirection: "row",
		flexWrap: "wrap",
		// padding: "auto",
		padding: 5,
		justifyContent: "space-between",
		alignItems: "center",
	},
	checkBoxLayout: {
		// flex: 1,
		alignItems: "center",
		// marginHorizontal: 5,
		// marginVertical: 150,
		margin: 5,
		marginVertical: 7,
		// paddingVertical: 7,
		// columnGap: 5,
		// rowGap: 5,
	},
	dammyCheckBox: {
		width: 15,
		// height: 10,
	},
});
