import { StyleSheet, Text } from "react-native";

export default function HomeTitleText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
	titleText: {
		color: "white",
		fontSize: 52,
		lineHeight: 56,
		fontFamily: "NotoSansJP_700Bold",
		marginTop: 40,
		marginBottom: 20,
	},
});
