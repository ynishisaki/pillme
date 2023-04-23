import { StyleSheet, Text, View } from "react-native";
import SmallPicker from "~/atoms/SmallPicker";

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
			<Text>{props.description}</Text>
			<SmallPicker
				selectedValue={props.selectedValue}
				minValue={props.minValue}
				maxValue={props.maxValue}
				onChange={props.onChange}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	contentLayout: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 10,
	},
});
