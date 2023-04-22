import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import { RootStackParamList, ScreenNavigationProp } from "~/types";

interface ScreenLayoutProps {
	navigationProps: ScreenNavigationProp;
	navigationType: keyof RootStackParamList;
	children: React.ReactNode;
}

export default function ScreenLayout({
	navigationProps,
	navigationType,
	children,
}: ScreenLayoutProps) {
	const insets = useSafeAreaInsets();
	const headerHeight = useHeaderHeight();

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/bgimage.png")}
				resizeMode='cover'
				style={styles.bgimage}>
				<View
					style={[
						styles.contentsLayout,
						{
							marginTop: headerHeight,
						},
					]}>
					{children}
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	bgimage: {
		flex: 1,
	},
	contentsLayout: {
		flex: 1,
		marginBottom: 16,
		marginHorizontal: 16,
		alignItems: "center",
		flexDirection: "column",
	},
});
