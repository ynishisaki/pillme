import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

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
		<View style={styles.border}>
			<Picker
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
		borderRadius: 16,
		borderStyle: "solid",
		borderWidth: 1,
		backgroundColor: "white",
		elevation: 1,
	},
});
