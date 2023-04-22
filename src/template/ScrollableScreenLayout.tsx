import {
	ImageBackground,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import { RootStackParamList, ScreenNavigationProp } from "~/types";

interface ScreenLayoutProps {
	navigationProps: ScreenNavigationProp;
	navigationType: keyof RootStackParamList;
	children: React.ReactNode;
}

export default function ScrollableScreenLayout({
	navigationProps,
	navigationType,
	children,
}: ScreenLayoutProps) {
	const headerHeight = useHeaderHeight();

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/bgimage.png")}
				resizeMode='cover'
				style={styles.bgimage}>
				<ScrollView
					style={[
						styles.contentsLayout,
						{
							marginTop: headerHeight,
						},
					]}>
					{children}
				</ScrollView>
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
		paddingHorizontal: 16,
	},
});
