import { StyleSheet, Text } from "react-native";
export default function PickerText({ children }: { children: React.ReactNode }) {
	return <Text style={styles.pickerText}>{children}</Text>;
}

const styles = StyleSheet.create({
	pickerText: {
		color: "dimgray",
		fontSize: 14,
		maxWidth: 200,
		fontFamily: "NotoSansJP_400Regular",
	},
});
