import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
	onPress: () => void;
	title: string;
}

export default function CustomDatePickerModalButton(props: Props) {
	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? "lightgray" : "white",
				},
				styles.button,
			]}
			onPress={props.onPress}>
			<Text style={styles.text}>{props.title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		borderColor: "#ccc",
		borderRadius: 8,
		borderStyle: "solid",
		borderWidth: 1,
		backgroundColor: "white",
		elevation: 1,
	},
	text: {
		fontSize: 14,
		lineHeight: 20,
		// fontFamily: "NotoSansJP_700Bold",
		fontFamily: "NotoSansJP_400Regular",
	},
});
