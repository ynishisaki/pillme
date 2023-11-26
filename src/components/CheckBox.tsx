import { StyleSheet, Text, View } from "react-native";
import { CancelIcon, DropIcon, PillIcon } from "~/components/Icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { HeaderColor, pillColor, unPressableCheckBoxColor, unfillCheckBoxColor } from "~/styles/color";
import React from "react";

export default function CheckBox({
	title,
	type,
	size,
	isChecked,
	isRestPeriod,
	readonly,
	onPress,
}: {
	title: string | null;
	type: "medicine" | "bleeding";
	size: "sm" | "md" | "lg"; //  60 | 80
	isChecked: boolean;
	isRestPeriod: boolean;
	readonly?: boolean;
	onPress: (nextBoolean: boolean) => void;
}) {
	const checkBoxSize = size === "sm" ? 25 : size === "md" ? 40 : 100;
	// = size === "md" ? 40 : 100;

	const ImageComponent = () => {
		if (isRestPeriod) {
			return <CancelIcon size={size} />;
		}
		if (type === "medicine") {
			return <DropIcon size={size} />;
		}
		if (type === "bleeding") {
			return <PillIcon size={size} />;
		}
	};

	return (
		<View style={styles.container}>
			{/* {title && (
				<Text style={(styles.checkBoxText, size === "md" ? { fontSize: 10 } : { fontSize: 16 })}>{title}</Text>
			)} */}
			<BouncyCheckbox
				size={checkBoxSize}
				style={{
					borderRadius: 10,
					borderWidth: 0,
					flexDirection: "column",
				}}
				fillColor={isRestPeriod ? unPressableCheckBoxColor : pillColor}
				unfillColor={unfillCheckBoxColor}
				isChecked={isRestPeriod ? true : isChecked} // タスク：isCheckedは無視されるが大丈夫？
				textComponent={<Text>{title}</Text>}
				textStyle={{ ...styles.checkBoxText, fontSize: size === "md" ? 10 : 16 }}
				// disableText={true}
				disabled={isRestPeriod || readonly}
				ImageComponent={ImageComponent}
				onPress={(nextBoolean) => onPress(nextBoolean)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: "center",
	},
	checkBoxText: {
		color: "gray",
		fontWeight: "bold",
		marginBottom: 8,
	},
});
