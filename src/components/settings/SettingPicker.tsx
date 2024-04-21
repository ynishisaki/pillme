import { StyleSheet, Text, View } from "react-native";
import SmallPicker from "~/components/settings/SmallPicker";

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
			<Text style={styles.pickerText}>{props.description}</Text>
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
		paddingVertical: 6,
	},
	pickerText: {
		color: "dimgray",
		fontSize: 14,
		lineHeight: 24,
		fontFamily: "NotoSansJP_400Regular",
	},
});
