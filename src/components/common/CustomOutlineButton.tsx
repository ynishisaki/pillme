import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "~/components/common/ThemedText";

interface Props {
	onPress: () => void;
	title?: string;
	bgColor?: string;
	textColor?: string;
	borderColor?: string;
	iconComponent?: React.ReactNode;
}

export default function CustomOutlineButton(props: Props) {
	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: pressed ? "lightgray" : props.bgColor,
					borderColor: props.borderColor ?? props.textColor,
				},
				styles.button,
			]}
			onPress={props.onPress}>
			{props.iconComponent}
			<ThemedText type='bold' style={{ color: props.textColor }}>
				{props.title}
			</ThemedText>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 8,
		elevation: 1,
	},
});
