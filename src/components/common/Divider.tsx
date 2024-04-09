import { StyleSheet, View } from "react-native";

export default function Divider() {
	return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
	divider: {
		borderBottomColor: "dimgray",
		borderBottomWidth: 0.5,
		marginVertical: 16,
	},
});
