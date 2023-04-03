import { StyleSheet, Text, View } from "react-native";

export default ({ title, Icon }: { title: string; Icon: React.FC | null }) => {
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
		height: 30,
		borderBottomColor: "#fff",
		borderBottomWidth: 0.5,
	},
	titleText: {
		fontSize: 14,
		lineHeight: 30,
		color: "#fff",
	},
});
