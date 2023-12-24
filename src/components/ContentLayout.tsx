import { StyleSheet, View } from "react-native";
import ContainerTitleText from "~/components/common/ContainerTitleText";
import { HeaderColor, translucentWhite } from "~/styles/color";

export default function ContentLayout({ children, title }: { children: React.ReactNode; title: string }) {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<ContainerTitleText>{title}</ContainerTitleText>
			</View>

			<View style={styles.contentLayout}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// marginBottom: 40,
		backgroundColor: translucentWhite,
		borderRadius: 8,
		overflow: "hidden",
	},
	titleContainer: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: HeaderColor,
	},
	contentLayout: {
		flex: 1,
		padding: 20,
	},
});
