import React from "react";
import { StyleSheet, Text } from "react-native";

export default ({ title, days }: { title: string; days: number }) => {
	return (
		<>
			<Text style={styles.subtitleText}>{title}</Text>
			<Text style={styles.numberOfDaysText}>{`${days}日目`}</Text>
		</>
	);
};
const styles = StyleSheet.create({
	subtitleText: {
		fontSize: 10,
		// color: "#ddd",
	},
	numberOfDaysText: {
		fontSize: 16,
		// fontWeight: "600", // semibold
		// color: "#fff",
		marginBottom: 4,
	},
});
