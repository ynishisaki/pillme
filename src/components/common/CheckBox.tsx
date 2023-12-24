import React from "react";
import { StyleSheet, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CancelIcon, DropIcon, PillIcon, QuestionIcon } from "~/components/Icons";
import {
	pillColor,
	unPressableCheckBoxColor,
	unPressableUnknownCheckBoxColor,
	unfillCheckBoxColor,
} from "~/styles/color";

type Props = {
	textComponent?: React.ReactNode;
	type: "medicine" | "bleeding";
	size: "sm" | "md" | "lg";
	isChecked: boolean;
	isRestPeriod: boolean;
	isNotRecorded?: boolean;
	readonly?: boolean;
	onPress: (nextBoolean: boolean) => void;
};

export default function CheckBox(props: Props) {
	const checkBoxSize = props.size === "sm" ? 25 : props.size === "md" ? 70 : 100;

	const ImageComponent = () => {
		if (props.isRestPeriod) {
			return <CancelIcon size={props.size} />;
		}
		if (props.isNotRecorded) {
			return <QuestionIcon size={props.size} />;
		}
		if (props.type === "medicine") {
			return <PillIcon size={props.size} />;
		}
		if (props.type === "bleeding") {
			return <DropIcon size={props.size} />;
		}
	};

	const fillColor = () => {
		if (props.isRestPeriod) {
			return unPressableCheckBoxColor;
		}
		if (props.isNotRecorded) {
			return unPressableUnknownCheckBoxColor;
		}
		return pillColor;
	};

	return (
		<View style={styles.container}>
			{props.textComponent}
			<BouncyCheckbox
				size={checkBoxSize}
				innerIconStyle={{
					borderWidth: 2,
				}}
				ImageComponent={ImageComponent}
				fillColor={fillColor()}
				unfillColor={unfillCheckBoxColor}
				isChecked={props.isRestPeriod || props.isNotRecorded ? true : props.isChecked} // タスク：isCheckedは無視されるが大丈夫？
				disableText={true}
				disabled={props.isRestPeriod || props.isNotRecorded || props.readonly}
				// onPress={(nextBoolean) => onPress(nextBoolean)}
				disableBuiltInState={true}
				onPress={() => props.onPress(!props.isChecked)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
});
