import { ThemedText } from "@/components/common/ThemedText";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

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
			<ThemedText>{props.title}</ThemedText>
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
});
