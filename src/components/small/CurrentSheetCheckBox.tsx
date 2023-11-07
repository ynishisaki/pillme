import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { unPressableCheckBoxColor, pillColor } from "~/styles/color";

export const CurrentSheetCheckBox = ({ isChecked }: { isChecked: boolean }) => {
	return (
		<BouncyCheckbox
			style={styles.checkBox}
			size={15}
			fillColor={unPressableCheckBoxColor}
			unfillColor={pillColor}
			isChecked={isChecked} // must set
			disableText={true}
			disabled={true}
			disableBuiltInState={isChecked}
		/>
	);
};

const styles = StyleSheet.create({
	checkBox: {
		// flex: 1,
	},
});
