import { StyleSheet, Text } from "react-native";
import { pillColor } from "~/styles/color";
export default function OverviewAlertText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.overviewText}>{children}</Text>;
}

const styles = StyleSheet.create({
	overviewText: {
		color: pillColor,
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansJP_400Regular",
	},
});
