import { StyleSheet, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { pillColor, unPressableCheckBoxColor } from "~/styles/color";

export const CurrentSheetStatus = ({ tookDays, remainingDays }: { tookDays: number; remainingDays: number }) => {
	const checkBoxes = [];
	// 現在のシートの飲んだ分
	if (tookDays > 0) {
		for (let i = 0; i < tookDays; i++) {
			checkBoxes.push(
				<View key={i} style={styles.checkBoxLayout}>
					<BouncyCheckbox
						size={15}
						fillColor={unPressableCheckBoxColor}
						unfillColor={pillColor}
						isChecked={true}
						disableText={true}
						disabled={true}
						disableBuiltInState={true}
					/>
				</View>
			);
			// console.log(i);
		}
	}

	// 現在のシートの残り分
	for (let i = 0; i < remainingDays; i++) {
		checkBoxes.push(
			<View key={1000 + i} style={styles.checkBoxLayout}>
				<BouncyCheckbox
					size={15}
					fillColor={unPressableCheckBoxColor}
					unfillColor={pillColor}
					isChecked={false}
					disableText={true}
					disabled={true}
					disableBuiltInState={false}
				/>
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
		// flex: 1,
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
		// alignItems: "center",
	},
	checkBoxLayout: {
		margin: 5,
		marginVertical: 7,
	},
	dammyCheckBox: {
		width: 15,
	},
});
