import { pillColor } from "@/constants/color";
import { StyleSheet, Text, type TextProps } from "react-native";

// import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "bold" | "homeTitle" | "contentTitle" | "description" | "warn";
};

export function ThemedText({ style, lightColor, darkColor, type = "default", ...rest }: ThemedTextProps) {
	return (
		<Text
			style={[
				type === "default" ? styles.default : undefined,
				type === "bold" ? styles.bold : undefined,
				type === "homeTitle" ? styles.homeTitle : undefined,
				type === "contentTitle" ? styles.contentTitle : undefined,
				type === "description" ? styles.description : undefined,
				type === "warn" ? styles.warn : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		color: "dimgray",
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "NotoSansJP_400Regular",
	},
	bold: {
		color: "dimgray",
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "NotoSansJP_700Bold",
	},
	homeTitle: {
		color: "white",
		fontSize: 52,
		lineHeight: 60,
		fontFamily: "NotoSansJP_700Bold",
	},
	contentTitle: {
		color: "white",
		fontSize: 22,
		fontFamily: "NotoSansJP_700Bold",
		lineHeight: 30,
	},
	description: {
		color: "gray",
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansJP_400Regular",
	},
	warn: {
		color: pillColor,
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansJP_400Regular",
	},
});
