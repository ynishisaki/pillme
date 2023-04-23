import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

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
			items.push(<Picker.Item key={i} label={`${i}`} value={i} />);
		}
		return items;
	};

	return (
		<Picker
			style={styles.picker}
			selectedValue={props.selectedValue}
			onValueChange={(itemValue) => props.onChange(itemValue)}>
			{pickerItems(props.minValue, props.maxValue)}
		</Picker>
	);
}

const styles = StyleSheet.create({
	picker: {
		display: "flex",
		height: 40,
		width: 60,
	},
});
