import ScreenContainer from "@/components/template/ScreenContainer";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ScreenLayout({ children }: { children: React.ReactNode }) {
	return (
		<ScreenContainer>
			<View style={styles.contentsLayout}>{children}</View>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		marginVertical: 32,
		marginHorizontal: 28,
	},
});
