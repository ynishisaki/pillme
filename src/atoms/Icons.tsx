import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const MenuIcon = () => (
	<MaterialCommunityIcons name='menu' size={40} color='#000' />
);

export const SettingIcon = () => (
	<MaterialCommunityIcons name='cog-outline' size={35} color='gray' />
);

export const BackIcon = () => (
	<MaterialCommunityIcons name='keyboard-backspace' size={35} color='gray' />
);

export const RightIcon = () => (
	<MaterialCommunityIcons name='chevron-right' size={30} color='#fff' />
);

export const PillIcon = (size: "sm" | "lg") => (
	<MaterialCommunityIcons name='pill' size={size ? 20 : 50} color='#fff' />
);

export const DropIcon = (size: "sm" | "lg") => (
	<MaterialCommunityIcons name='water' size={size ? 20 : 50} color='#fff' />
);

export const CancelIcon = (size: "sm" | "lg") => (
	<MaterialCommunityIcons name='cancel' size={size ? 20 : 50} color='#fff' />
);
