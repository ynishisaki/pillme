import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
	onPress: () => void;
	disabled: boolean;
	children: React.ReactNode;
}

export default function CustomIconButton(props: Props) {
	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? "lightgray" : "white",
					display: props.disabled ? "none" : undefined,
				},
				styles.button,
			]}
			onPress={props.onPress}>
			{props.children}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		// paddingVertical: 10,
		// paddingHorizontal: 32,
		// borderColor: "dimgray",
		// borderStyle: "solid",
		// borderWidth: 1,
		// radius full
		borderRadius: 100,
		// elevation: 1,
	},
});
