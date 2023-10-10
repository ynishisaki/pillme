import { StyleSheet, Text, View } from "react-native";

export default ({ title, Icon }: { title: string; Icon?: React.FC }) => {
	return (
		<View style={styles.titleContainer}>
			<Text style={styles.titleText}>{title}</Text>
			{Icon && <Icon />}
		</View>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 9,
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
