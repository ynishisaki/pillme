import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
	ImageBackground,
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackIcon } from "../atoms/Icons";
import { RootStackParamList } from "../types/types";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"InitialSettings"
>;

export const InitialSettings = ({
	navigation,
}: {
	navigation: ProfileScreenNavigationProp;
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
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<BackIcon />
					</TouchableOpacity>
				</View>
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
});
