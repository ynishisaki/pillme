import { StyleSheet, Text } from "react-native";
export default function SupplementText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.baseText}>{children}</Text>;
}

const styles = StyleSheet.create({
	baseText: {
		// color: "dimgray",
		color: "gainsboro",
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansJP_400Regular",
		// marginBottom: 8,
	},
});
