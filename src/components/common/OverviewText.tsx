import { StyleSheet, Text } from "react-native";
import { pillColor } from "~/styles/color";

interface Props {
	children: React.ReactNode;
	type?: "warn";
}
export default function OverviewText(props: Props) {
	const color = props.type === "warn" ? pillColor : "gray";

	return <Text style={[styles.overviewText, { color }]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
	overviewText: {
		color: "gray",
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansJP_400Regular",
	},
});
