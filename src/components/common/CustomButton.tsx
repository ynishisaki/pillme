import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
	onPress: () => void;
	title?: string;
	color?: string;
}

export default function CustomButton(props: Props) {
	return (
		<Pressable style={[styles.button, { backgroundColor: props.color }]} onPress={props.onPress}>
			<Text style={styles.text}>{props.title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		paddingHorizontal: 32,
		borderRadius: 8,
		elevation: 3,
	},
	text: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansJP_700Bold",
		// fontFamily: "NotoSansJP_400Regular",
		letterSpacing: 0.25,
		color: "white",
	},
});
