import { StyleSheet, Text } from "react-native";

export default function ContainerTitleText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
	titleText: {
		color: "white",
		fontSize: 18,
		fontFamily: "NotoSansJP_700Bold",
		lineHeight: 24,
	},
});
