import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CancelSmIcon, DropSmIcon, PillSmIcon } from "~/components/small/Icons";
import { unPressableCheckBoxColor, pillColor, unfillCheckBoxColor } from "~/styles/color";

export default ({ title, isChecked, isRestPeriod }: { title: string; isChecked: boolean; isRestPeriod: boolean }) => {
	return (
		<>
			<BouncyCheckbox
				style={styles.container}
				size={25}
				fillColor={isRestPeriod ? unPressableCheckBoxColor : pillColor} // タスク
				unfillColor={unfillCheckBoxColor}
				isChecked={isRestPeriod ? true : isChecked} // must set
				disableText={true}
				ImageComponent={isRestPeriod ? CancelSmIcon : title === "服薬" ? PillSmIcon : DropSmIcon}
				disabled={true}
				disableBuiltInState={isChecked}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
