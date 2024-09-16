import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export default function ContentSubTitle({ title }: { title: string }) {
	return (
		<View style={styles.h2Layout}>
			<View style={styles.h2Marker}></View>
			<ThemedText type='bold'>{title}</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	h2Layout: {
		marginBottom: 20,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: 16,
	},
	h2Marker: {
		backgroundColor: Colors.contentHeader,
		width: 8,
		height: 36,
	},
});
