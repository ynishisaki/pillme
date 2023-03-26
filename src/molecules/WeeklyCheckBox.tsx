import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CancelSmIcon, DropSmIcon, PillSmIcon } from "../atoms/Icons";

export default ({
	title,
	isChecked,
	disabled,
}: {
	title: string;
	isChecked: boolean;
	disabled: boolean;
}) => {
	return (
		<>
			<BouncyCheckbox
				style={styles.container}
				size={25}
				fillColor={disabled ? "lightgray" : "#F6B69A"} // タスク
				unfillColor='#fcfae8'
				isChecked={disabled ? true : isChecked} // must set
				disableText={true}
				ImageComponent={
					disabled
						? CancelSmIcon
						: title === "服薬"
						? PillSmIcon
						: DropSmIcon
				}
				disabled={disabled}
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
