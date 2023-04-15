import {
	ImageBackground,
	StyleSheet,
	View,
	TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackIcon, SettingIcon } from "~/atoms/Icons";
import { RootStackParamList } from "~/types";
import { ScreenNavigationProp } from "~/types";

export default ({
	navigationProps,
	navigationType,
	children,
}: {
	navigationProps: ScreenNavigationProp;

	navigationType: keyof RootStackParamList;
	children: React.ReactNode;
}) => {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: "#fff",
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
				},
			]}>
			<ImageBackground
				source={require("../../assets/bgimage.png")}
				resizeMode='cover'
				style={styles.bgimage}>
				<View style={styles.header}>
					{navigationType === "Home" && (
						<TouchableOpacity
							onPress={() => {
								navigationProps.navigate("InitialSettings");
							}}>
							<SettingIcon />
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.contentsLayout}>{children}</View>
			</ImageBackground>
		</View>
	);
};

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
