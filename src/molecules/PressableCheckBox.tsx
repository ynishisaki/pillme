import { StyleSheet, Text, View } from "react-native";
import { CancelLgIcon, DropLgIcon, PillLgIcon } from "../atoms/Icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// 薬飲んだかと、出血したかチェックボックス
export default ({
	title,
	type,
	size,
	isChecked,
	disabled,
	onPress,
}: {
	title: string | null;
	type: "medicine" | "bleeding";
	size: "md" | "lg"; //  60 | 80
	isChecked: boolean;
	disabled: boolean;
	onPress: (nextBoolean: boolean) => void;
}) => {
	return (
		<View style={styles.container}>
			{title && <Text style={styles.checkBoxText}>{title}</Text>}
			<BouncyCheckbox
				size={size === "md" ? 60 : 80}
				fillColor={disabled ? "lightgray" : "#F6B69A"}
				unfillColor='#fff'
				isChecked={disabled ? true : isChecked} // タスク：isCheckedは無視されるが大丈夫？
				textComponent={null}
				disableText={true}
				disabled={disabled}
				ImageComponent={
					disabled
						? CancelLgIcon
						: type === "medicine"
						? PillLgIcon
						: DropLgIcon
				}
				onPress={(nextBoolean) => onPress(nextBoolean)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	checkBoxText: {
		fontSize: 12,
	},
});
