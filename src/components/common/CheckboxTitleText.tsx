import { StyleSheet, Text } from "react-native";
export default function CheckboxTitleText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.baseText}>{children}</Text>;
}

const styles = StyleSheet.create({
	baseText: {
		textAlign: "center",
		color: "gray",
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansJP_400Regular",
		marginBottom: 6,
	},
});
