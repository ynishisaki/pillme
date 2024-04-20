import { StyleSheet, View } from "react-native";
import ContainerTitleText from "~/components/common/ContainerTitleText";
import { HeaderColor, translucentWhite } from "~/styles/color";

export default function ContentLayout({ children, title }: { children: React.ReactNode; title: string }) {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<ContainerTitleText>{title}</ContainerTitleText>
			</View>

			{children}
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
		elevation: 3,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 10,
		// height: 46,
		backgroundColor: HeaderColor,
	},
});
