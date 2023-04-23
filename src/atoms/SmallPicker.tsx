import { Picker } from "@react-native-picker/picker";

export default function SmallPicker({
	value,
	onChange,
	items,
}: {
	value: number;
	onChange: (itemValue: number, itemIndex: number) => void;
	items: JSX.Element[];
}) {
	return (
		<Picker
			style={{
				display: "flex",
				height: 40,
				width: 60,
			}}
			selectedValue={value}
			onValueChange={(itemValue, itemIndex) =>
				onChange(itemValue, itemIndex)
			}>
			{items}
		</Picker>
	);
}
