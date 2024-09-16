import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform, StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "bold" | "homeTitle" | "contentTitle" | "description" | "warn";
};

export function ThemedText({ style, lightColor, darkColor, type = "default", ...rest }: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	return (
		<Text
			style={[
				{ color },
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
		fontSize: 16,
		lineHeight: 20,
		fontFamily: Platform.select({
			android: "NotoSansJP_400Regular",
			ios: "NotoSansJP-Regular",
		}),
	},
	bold: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: Platform.select({
			android: "NotoSansJP_700Bold",
			ios: "NotoSansJP-Bold",
		}),
	},
	homeTitle: {
		color: "white",
		fontSize: 52,
		lineHeight: 60,
		fontFamily: Platform.select({
			android: "NotoSansJP_700Bold",
			ios: "NotoSansJP-Bold",
		}),
	},
	contentTitle: {
		color: "white",
		fontSize: 22,
		lineHeight: 30,
		fontFamily: Platform.select({
			android: "NotoSansJP_700Bold",
			ios: "NotoSansJP-Bold",
		}),
	},
	description: {
		color: "gray",
		fontSize: 12,
		lineHeight: 16,
		fontFamily: Platform.select({
			android: "NotoSansJP_400Regular",
			ios: "NotoSansJP-Regular",
		}),
	},
	warn: {
		color: Colors.pillColor,
		fontSize: 12,
		lineHeight: 16,
		fontFamily: Platform.select({
			android: "NotoSansJP_400Regular",
			ios: "NotoSansJP-Regular",
		}),
	},
});
