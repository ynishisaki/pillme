import { StyleSheet, View } from "react-native";

export default function Divider() {
	return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
	divider: {
		marginVertical: 40,
		borderTopWidth: 1,
		borderTopColor: "lightgray",
	},
});
