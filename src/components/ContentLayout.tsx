import { StyleSheet, Text, View } from "react-native";
import { HeaderColor, translucentWhite } from "~/styles/color";

export default function ContentLayout({ children, title }: { children: React.ReactNode; title: string }) {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>{title}</Text>
			</View>

			<View style={styles.contentLayout}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 40,
		backgroundColor: translucentWhite,
		borderRadius: 8,
		overflow: "hidden",
	},
	titleContainer: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: HeaderColor,
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	contentLayout: {
		flex: 1,
		padding: 20,
	},
});
