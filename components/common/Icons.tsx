import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";

export const ArrowUpIcon = () => <MaterialCommunityIcons name='arrow-up' size={30} color='dimgray' />;

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
