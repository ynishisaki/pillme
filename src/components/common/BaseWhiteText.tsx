import { StyleSheet, Text } from "react-native";
export default function BaseWhiteText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.baseText}>{children}</Text>;
}

const styles = StyleSheet.create({
	baseText: {
		color: "white",
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansJP_400Regular",
	},
});
