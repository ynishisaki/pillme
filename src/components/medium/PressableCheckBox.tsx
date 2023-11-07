import { StyleSheet, Text, View } from "react-native";
import { CancelLgIcon, DropLgIcon, PillLgIcon } from "~/components/small/Icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { HeaderColor, pillColor, unPressableCheckBoxColor, unfillCheckBoxColor } from "~/styles/color";

export default ({
	title,
	type,
	size,
	isChecked,
	isRestPeriod,
	onPress,
}: {
	title: string | null;
	type: "medicine" | "bleeding";
	size: "md" | "lg"; //  60 | 80
	isChecked: boolean;
	isRestPeriod: boolean;
	onPress: (nextBoolean: boolean) => void;
}) => {
	return (
		<View style={styles.container}>
			{title && <Text style={styles.checkBoxText}>{title}</Text>}
			<BouncyCheckbox
				size={size === "md" ? 60 : 100}
				style={{
					borderRadius: 10,
					borderWidth: 0,
				}}
				fillColor={isRestPeriod ? unPressableCheckBoxColor : pillColor}
				unfillColor={unfillCheckBoxColor}
				isChecked={isRestPeriod ? true : isChecked} // タスク：isCheckedは無視されるが大丈夫？
				textComponent={null}
				disableText={true}
				disabled={isRestPeriod}
				ImageComponent={isRestPeriod ? CancelLgIcon : type === "medicine" ? PillLgIcon : DropLgIcon}
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
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
});
