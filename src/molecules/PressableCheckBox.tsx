import { StyleSheet, Text, View } from "react-native";
import { DropIcon, PillIcon } from "../atoms/Icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// 薬飲んだかと、出血したかチェックボックス
export default ({
	title,
	size,
	isChecked,
	disabled,
	onPress,
}: {
	title: string | null;
	size: "md" | "lg"; //  60 | 90
	isChecked: boolean;
	disabled: boolean;
	onPress: (nextBoolean: boolean) => void;
}) => {
	return (
		<View style={styles.container}>
			{title && <Text style={styles.checkBoxText}>{title}</Text>}
			<BouncyCheckbox
				size={size === "md" ? 60 : 90}
				fillColor='#F6B69A'
				unfillColor='#fff'
				isChecked={isChecked}
				textComponent={null}
				disableText={true}
				disabled={disabled}
				ImageComponent={
					title === "服薬" ? PillIcon("lg") : DropIcon("lg")
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
