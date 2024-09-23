import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";

interface Props {
	onPress: () => void;
	title?: string;
	bgColor?: string;
	textColor?: string;
	borderColor?: string;
	iconComponent?: ReactNode;
	type?: "default" | "warn" | "fill";
}

export default function CustomButton(props: Props) {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{
					backgroundColor: pressed ? "lightgray" : "white",
				},
				props.type === "default" ? styles.default : undefined,
				props.type === "warn" ? styles.warn : undefined,
				props.type === "fill" ? styles.fill : undefined,
			]}
			onPress={props.onPress}>
			{props.iconComponent}
			<ThemedText
				type='bold'
				style={[
					props.type === "default" ? styles.default : undefined,
					props.type === "warn" ? styles.warn : undefined,
					props.type === "fill" ? styles.fill : undefined,
				]}>
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
		borderRadius: 9999,
		elevation: 1,
	},
	default: {
		color: "gray",
		borderColor: "lightgray",
	},
	warn: {
		color: Colors.warningRed,
		borderColor: Colors.warningRed,
	},
	fill: {
		color: "white",
		borderColor: "transparent",
		backgroundColor: Colors.contentHeader,
	},
});
