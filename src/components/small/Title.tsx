import { StyleSheet, Text, View } from "react-native";

export default ({ title }: { title: string }) => {
	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>{title}</Text>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: 16,
		marginHorizontal: 20,
		height: 42,
		borderBottomColor: "#B25AB4",
		borderBottomWidth: 2,
	},
	titleText: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
