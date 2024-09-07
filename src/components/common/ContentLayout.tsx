import { StyleSheet, View } from "react-native";
import { ThemedText } from "~/components/common/ThemedText";
import { HeaderColor, translucentWhite } from "~/styles/color";

interface Props {
	children: React.ReactNode;
	title: string;
	titleIcon?: React.ReactNode;
}

export default function ContentLayout(props: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<ThemedText type='contentTitle'>{props.title}</ThemedText>
			</View>

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
});
