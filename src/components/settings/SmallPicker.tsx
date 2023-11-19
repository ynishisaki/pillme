import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface props {
	selectedValue: number;
	minValue: number;
	maxValue: number;
	onChange: (itemValue: number) => void;
}

export default function SmallPicker(props: props) {
	const pickerItems = (minValue: number, maxValue: number) => {
		const items = [];
		for (let i = minValue; i <= maxValue; i++) {
			const fontColor = props.selectedValue === i ? "#000" : "#bbb";
			items.push(<Picker.Item key={i} label={`${i}`} value={i} color={fontColor} />);
		}

		return items;
	};

	return (
		<View style={styles.border}>
			<Picker
				style={styles.picker}
				selectedValue={props.selectedValue}
				onValueChange={(itemValue) => props.onChange(itemValue)}
				mode='dropdown'>
				{pickerItems(props.minValue, props.maxValue)}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	border: {
		borderColor: "#ccc",
		borderRadius: 8,
		borderStyle: "solid",
		borderWidth: 1,
	},
	picker: {
		height: 50,
		width: 110,
	},
});
