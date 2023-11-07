import { StyleSheet, Text, View } from "react-native";
import { HeaderColor } from "~/styles/color";

export default ({ title }: { title: string }) => {
	return (
		<View style={styles.titleContainer}>
			<Text style={styles.titleText}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		paddingTop: 8,
		paddingHorizontal: 20,
		height: 46,
		backgroundColor: HeaderColor,
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
		// color: "dimgray",
		// color: "dimgray",
	},
});
