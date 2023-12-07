import { StyleSheet, Text, View } from "react-native";
import { CancelIcon, DropIcon, PillIcon, QuestionIcon } from "~/components/Icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
	pillColor,
	unPressableCheckBoxColor,
	unPressableUnknownCheckBoxColor,
	unfillCheckBoxColor,
} from "~/styles/color";
import React from "react";

export default function CheckBox({
	title,
	type,
	size,
	isChecked,
	isRestPeriod,
	isNotRecorded,
	readonly,
	onPress,
}: {
	title: string | null;
	type: "medicine" | "bleeding";
	size: "sm" | "md" | "lg";
	isChecked: boolean;
	isRestPeriod: boolean;
	isNotRecorded?: boolean;
	readonly?: boolean;
	onPress: (nextBoolean: boolean) => void;
}) {
	const checkBoxSize = size === "sm" ? 25 : size === "md" ? 70 : 100;

	const ImageComponent = () => {
		if (isRestPeriod) {
			return <CancelIcon size={size} />;
		}
		if (isNotRecorded) {
			return <QuestionIcon size={size} />;
		}
		if (type === "medicine") {
			return <PillIcon size={size} />;
		}
		if (type === "bleeding") {
			return <DropIcon size={size} />;
		}
	};

	const fillColor = () => {
		if (isRestPeriod) {
			return unPressableCheckBoxColor;
		}
		if (isNotRecorded) {
			return unPressableUnknownCheckBoxColor;
		}
		return pillColor;
	};

	return (
		<View style={styles.container}>
			{title && (
				<Text style={(styles.checkBoxText, size === "md" ? { fontSize: 10 } : { fontSize: 16 })}>{title}</Text>
			)}
			<BouncyCheckbox
				size={checkBoxSize}
				innerIconStyle={{
					borderWidth: 2,
				}}
				ImageComponent={ImageComponent}
				fillColor={fillColor()}
				unfillColor={unfillCheckBoxColor}
				isChecked={isRestPeriod || isNotRecorded ? true : isChecked} // タスク：isCheckedは無視されるが大丈夫？
				disableText={true}
				disabled={isRestPeriod || isNotRecorded || readonly}
				// onPress={(nextBoolean) => onPress(nextBoolean)}
				disableBuiltInState={true}
				onPress={() => onPress(!isChecked)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	checkBoxText: {
		color: "gray",
		fontWeight: "bold",
		marginBottom: 8,
	},
});
