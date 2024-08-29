import { StyleSheet, Text, type TextProps } from "react-native";
import { pillColor } from "~/styles/color";

// import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?:
		| "default"
		| "homeTitle"
		| "subTitle"
		| "overview"
		| "warn"
		| "title"
		| "defaultSemiBold"
		| "subtitle"
		| "link";
};

export function ThemedText({ style, lightColor, darkColor, type = "default", ...rest }: ThemedTextProps) {
	return (
		<Text
			style={[
				type === "default" ? styles.default : undefined,
				type === "homeTitle" ? styles.homeTitle : undefined,
				type === "subTitle" ? styles.subTitle : undefined,
				type === "overview" ? styles.overview : undefined,
				type === "warn" ? styles.warn : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		color: "dimgray",
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansJP_400Regular",
	},
	// baseWhite: {
	// 	color: "gainsboro",
	// 	fontSize: 16,
	// 	lineHeight: 24,
	// 	fontFamily: "NotoSansJP_400Regular",
	// },
	homeTitle: {
		color: "white",
		fontSize: 52,
		lineHeight: 60,
		fontFamily: "NotoSansJP_700Bold",
		marginBottom: 30,
	},
	subTitle: {
		color: "gray",
		fontSize: 10,
		lineHeight: 16,
		fontFamily: "NotoSansJP_400Regular",
	},
	overview: {
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

	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "600",
	},
	topTitle: {
		fontSize: 40,
		fontWeight: "bold",
		lineHeight: 40,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: "#0a7ea4",
	},
});
