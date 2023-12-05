import { View } from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { HeaderColor } from "~/styles/color";

export const HomeIcon = ({ color }: { color?: string }) => <Octicons name='home' size={28} color={color || "gray"} />;

export const HistoryIcon = ({ color }: { color?: string }) => (
	<MaterialCommunityIcons name='table-clock' size={30} color={color || "gray"} />
);

export const SettingIcon = ({ color }: { color?: string }) => (
	<MaterialCommunityIcons name='cog-outline' size={30} color={color || "gray"} />
);

export const EditIcon = ({ hasExclamation }: { hasExclamation?: boolean }) => (
	<View>
		<MaterialCommunityIcons name='playlist-edit' size={30} color='white' />
		{hasExclamation && (
			<MaterialCommunityIcons
				name='circle'
				size={16}
				color='red'
				style={{ position: "absolute", top: -2, right: -2 }}
			/>
		)}
	</View>
);

export const BackIcon = () => <MaterialCommunityIcons name='keyboard-backspace' size={24} color={HeaderColor} />;

export const RightIcon = () => <MaterialCommunityIcons name='chevron-right' size={30} color='white' />;

export const LeftIcon = () => <MaterialCommunityIcons name='chevron-left' size={30} color='white' />;

function getSize(size: "sm" | "md" | "lg") {
	switch (size) {
		case "sm":
			return 20;
		case "md":
			return 30;
		case "lg":
			return 60;
		default:
			return 30;
	}
}

export const PillIcon = ({ size }: { size: "sm" | "md" | "lg" }) => {
	return <MaterialCommunityIcons name='pill' size={getSize(size)} color='#fff' />;
};

export const DropIcon = ({ size }: { size: "sm" | "md" | "lg" }) => {
	return <MaterialCommunityIcons name='water' size={getSize(size)} color='#fff' />;
};

export const CancelIcon = ({ size }: { size: "sm" | "md" | "lg" }) => {
	return <MaterialCommunityIcons name='cancel' size={getSize(size)} color='#fff' />;
};

export const QuestionIcon = ({ size }: { size: "sm" | "md" | "lg" }) => {
	return <AntDesign name='question' size={getSize(size)} color='#fff' />;
};
