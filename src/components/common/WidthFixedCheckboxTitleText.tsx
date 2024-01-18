import { StyleSheet, Text } from "react-native";
export default function WidthFixedCheckboxTitleText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.baseText}>{children}</Text>;
}

const styles = StyleSheet.create({
	baseText: {
		width: 70,
		textAlign: "center",
		color: "gray",
		fontSize: 13,
		lineHeight: 18,
		fontFamily: "NotoSansJP_400Regular",
		marginBottom: 6,
	},
});
