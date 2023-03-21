import { StyleSheet, Text, View } from "react-native";
import { DropLgIcon, PillLgIcon } from "../atoms/Icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// 薬飲んだかと、出血したかチェックボックス
export default ({
	title,
	isChecked,
	disabled,
	onPress,
}: {
	title: string;
	isChecked: boolean;
	disabled: boolean;
	onPress: (nextBoolean: boolean) => void;
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.checkBoxText}>{title}</Text>
			<BouncyCheckbox
				size={90}
				fillColor='#F6B69A'
				unfillColor='#fff'
				isChecked={isChecked}
				textComponent={null}
				disableText={true}
				disabled={disabled}
				ImageComponent={title === "服薬" ? PillLgIcon : DropLgIcon}
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
		fontWeight: "bold",
	},
});
