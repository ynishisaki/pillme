import { ThemedText } from "@/components/common/ThemedText";
import { Sheet } from "@/components/record/Sheet";
import { StyleSheet, View } from "react-native";

export default function CurrentSettingsSheet() {
	return (
		<View style={styles.container}>
			<ThemedText type='default'>現在の設定内容</ThemedText>
			<Sheet />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginBottom: 20,
		padding: 20,
		backgroundColor: "whitesmoke",
		borderColor: "gray",
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 8,
		elevation: 1,
		gap: 8,
	},
});
