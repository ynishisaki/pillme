import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const HomeIcon = ({ color }: { color?: string }) => <Octicons name='home' size={28} color={color || "gray"} />;

export const HistoryIcon = ({ color }: { color?: string }) => (
	<MaterialCommunityIcons name='table-clock' size={30} color={color || "gray"} />
);

export const SettingIcon = ({ color }: { color?: string }) => (
	<MaterialCommunityIcons name='cog-outline' size={30} color={color || "gray"} />
);

export const BackIcon = () => <MaterialCommunityIcons name='keyboard-backspace' size={35} color='gray' />;

export const RightIcon = () => <MaterialCommunityIcons name='chevron-right' size={30} color='white' />;

export const LeftIcon = () => <MaterialCommunityIcons name='chevron-left' size={30} color='white' />;

export const PillLgIcon = () => <MaterialCommunityIcons name='pill' size={50} color='#fff' />;

export const PillSmIcon = () => <MaterialCommunityIcons name='pill' size={20} color='#fff' />;

export const DropLgIcon = () => <MaterialCommunityIcons name='water' size={50} color='#fff' />;

export const DropSmIcon = () => <MaterialCommunityIcons name='water' size={20} color='#fff' />;

export const CancelLgIcon = () => <MaterialCommunityIcons name='cancel' size={50} color='#fff' />;

export const CancelSmIcon = () => <MaterialCommunityIcons name='cancel' size={20} color='#fff' />;
