import { StyleSheet, Text } from "react-native";
export default function OverviewText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.overviewText}>{children}</Text>;
}

const styles = StyleSheet.create({
	overviewText: {
		fontSize: 12,
		color: "#000000A8",
		// fontSize: 16,
		lineHeight: 16,
		// marginBottom: 16,
		// fontFamily: "NotoSansJP_300Light",
		fontFamily: "NotoSansJP_400Regular",
	},
});
