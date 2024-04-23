import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderColor, translucentWhite } from "~/styles/color";

interface Props {
	children: React.ReactNode;
	title: string;
	onPress?: () => void;
	titleIcon?: React.ReactNode;
}

export default function ContentLayout(props: Props) {
	return (
		<View style={styles.container}>
			{props.onPress ? (
				<TouchableOpacity onPress={props.onPress}>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>{props.title}</Text>
						{props.titleIcon}
					</View>
				</TouchableOpacity>
			) : (
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>{props.title}</Text>
				</View>
			)}

			{props.children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: translucentWhite,
		borderRadius: 8,
		elevation: 3,
		overflow: "hidden",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: HeaderColor,
	},
	titleText: {
		color: "whitesmoke",
		fontSize: 18,
		fontFamily: "NotoSansJP_700Bold",
		lineHeight: 24,
	},
});
