import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
	onPress: () => void;
	title?: string;
	bgColor?: string;
	textColor?: string;
}

export default function CustomButton(props: Props) {
	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? "lightgray" : props.bgColor,
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
		borderColor: "dimgray",
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 8,
		elevation: 1,
	},
	text: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansJP_700Bold",
		// fontFamily: "NotoSansJP_400Regular",
		letterSpacing: 0.25,
		// color: "white",
		// color: "dimgray",
	},
});
