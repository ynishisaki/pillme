import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
	onPress: () => void;
	title?: string;
	bgColor?: string;
	textColor?: string;
	iconComponent?: React.ReactNode;
}

export default function CustomButton(props: Props) {
	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? "lightgray" : props.bgColor,
					borderColor: props.textColor,
				},
				styles.button,
			]}
			onPress={props.onPress}>
			<Text
				style={[
					styles.text,
					{
						color: props.textColor,
					},
				]}>
				{props.iconComponent}

				{props.title}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
		paddingHorizontal: 32,
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 8,
		elevation: 1,
	},
	text: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansJP_700Bold",
		letterSpacing: 0.25,
	},
});
