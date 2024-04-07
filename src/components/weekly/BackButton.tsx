import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BackIcon } from "~/components/Icons";
import OverviewText from "~/components/common/OverviewText";
import { HeaderColor } from "~/styles/color";

export const BackButton = ({ onPress }: { onPress: () => void }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.backButtonContainer}>
				<BackIcon />
				<OverviewText>戻る</OverviewText>
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	backButtonContainer: {
		width: 80,
		paddingVertical: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		columnGap: 6,
		borderColor: HeaderColor,
		borderStyle: "solid",
		borderWidth: 1.8,
		borderRadius: 8,
	},
});
