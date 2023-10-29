import { StyleSheet, Text, View } from "react-native";
import { mainColor } from "~/styles/color";

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
		// paddingTop: 8,
		paddingHorizontal: 20,
		height: 46,
		backgroundColor: mainColor,
	},
	titleText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
});
