import { StyleSheet, Text } from "react-native";
export default function SubTitleText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.subText}>{children}</Text>;
}

const styles = StyleSheet.create({
	subText: {
		fontSize: 10,
		lineHeight: 16,
		fontFamily: "NotoSansJP_400Regular",
	},
});
