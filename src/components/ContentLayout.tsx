import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderColor } from "~/styles/color";
import { RightIcon } from "./Icons";

export default function ContentLayout({
	children,
	title,
	onPress,
}: {
	children: React.ReactNode;
	title: string;
	onPress?: () => void;
}) {
	return (
		<View style={styles.container}>
			{!onPress && (
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>{title}</Text>
				</View>
			)}
			{onPress && (
				<TouchableOpacity onPress={onPress}>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>{title}</Text>
						<RightIcon />
					</View>
				</TouchableOpacity>
			)}
			<View style={styles.contentLayout}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 40,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		borderRadius: 8,
		overflow: "hidden",
	},
	titleContainer: {
		paddingTop: 8,
		paddingHorizontal: 20,
		height: 46,
		backgroundColor: HeaderColor,
		flexDirection: "row",
		justifyContent: "space-between",
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
