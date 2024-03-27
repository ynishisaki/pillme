import { StyleSheet, Text } from "react-native";

export default function FirstSettingsTitleText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
	titleText: {
		color: "white",
		fontSize: 30,
		lineHeight: 36,
		fontFamily: "NotoSansJP_700Bold",
		// marginBottom: 30,
	},
});
