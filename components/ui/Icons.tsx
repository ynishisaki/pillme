import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

export function ArrowUpIcon() {
  return <MaterialCommunityIcons name="arrow-up" size={30} color="dimgray" />;
}

export function PillIcon() {
  return <MaterialCommunityIcons name="pill" size={60} color="#fff" />;
}

export function DropIcon() {
  return <MaterialCommunityIcons name="water" size={60} color="#fff" />;
}

export function CancelIcon() {
  return <MaterialCommunityIcons name="cancel" size={60} color="#fff" />;
}

export function QuestionIcon() {
  return <AntDesign name="question" size={60} color="#fff" />;
}
