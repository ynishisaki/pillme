import { StyleSheet, Text } from "react-native";
export default function WidthFixedRightText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.baseText}>{children}</Text>;
}

const styles = StyleSheet.create({
	baseText: {
		width: 100,
		textAlign: "right",
		color: "dimgray",
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansJP_400Regular",
	},
});
