import { ImageBackground, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "~/types";
import { ScreenNavigationProp } from "~/types";

export default function ModalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const insets = useSafeAreaInsets();

	return (
		<>
			<View style={styles.header} />
			<View style={styles.contentsLayout}>{children}</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgimage: {
		flex: 1,
	},
	header: {
		height: 47,
		width: 47,
		marginTop: 8,
		marginLeft: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	contentsLayout: {
		flex: 1,
		marginTop: 16,
		marginBottom: 16,
		marginHorizontal: 16,
		alignItems: "center",
		flexDirection: "column",
		// gap: 40,
		// backgroundColor: "black",
	},
});
