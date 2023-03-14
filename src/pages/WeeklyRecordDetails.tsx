import {
	ImageBackground,
	Text,
	TouchableHighlight,
	StyleSheet,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const WeeklyRecordDetails = ({ navigation }: { navigation: any }) => {
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
				<Text>details</Text>
				<TouchableHighlight
					onPress={() => navigation.goBack()}
					// onPress={() => {
					// 	console.log("test: pressed");
					// }}
				>
					<View>
						<Text>back</Text>
					</View>
				</TouchableHighlight>
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
		alignSelf: "flex-start",
		// backgroundColor: "gray",
		marginHorizontal: 16,
	},
});
