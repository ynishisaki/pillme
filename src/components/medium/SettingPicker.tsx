import { StyleSheet, Text, View } from "react-native";
import SmallPicker from "~/components/small/SmallPicker";

interface props {
	description: string;
	selectedValue: number;
	minValue: number;
	maxValue: number;
	onChange: (itemValue: number) => void;
}

export default function SettingPicker(props: props) {
	return (
		<View style={styles.contentLayout}>
			<Text style={styles.contentText}>{props.description}</Text>
			<SmallPicker
				selectedValue={props.selectedValue}
				minValue={props.minValue}
				onChange={props.onChange}
				maxValue={props.maxValue}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	contentLayout: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 6,
	},

	contentText: {
		fontSize: 16,
		maxWidth: 200,
	},
});
