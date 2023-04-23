import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

export default function SmallPicker({
	selectedValue,
	minValue,
	maxValue,
	onChange,
}: {
	selectedValue: number;
	minValue: number;
	maxValue: number;
	onChange: (itemValue: number, itemIndex: number) => void;
}) {
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
			selectedValue={selectedValue}
			onValueChange={(itemValue, itemIndex) =>
				onChange(itemValue, itemIndex)
			}>
			{pickerItems(minValue, maxValue)}
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
