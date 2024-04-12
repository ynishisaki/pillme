import { useRef, useState } from "react";
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScrollTopButton from "~/components/common/ScrollTopButton";

export default function ScrollableScreenLayout({ children }: { children: React.ReactNode }) {
	const insets = useSafeAreaInsets();
	const scrollRef = useRef<ScrollView>(null);
	const [isScrollTopButtonVisible, setIsScrollTopButtonVisible] = useState(false);

	const handleScrollToTop = () => {
		scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
	};

	const handleScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
		if (event.nativeEvent.contentOffset.y > 0) {
			setIsScrollTopButtonVisible(true);
		} else {
			setIsScrollTopButtonVisible(false);
		}
	};

	return (
		<ImageBackground source={require("../../assets/bgimage.png")} resizeMode='cover' style={styles.backgroundImage}>
			<View
				style={[
					styles.container,
					{
						paddingTop: insets.top,
						paddingBottom: insets.bottom,
						paddingLeft: insets.left,
						paddingRight: insets.right,
					},
				]}>
				<StatusBar barStyle='light-content' translucent={true} backgroundColor='rgba(0, 0, 0, 0)' />
				<ScrollView ref={scrollRef} onScroll={handleScroll} style={[styles.contentsLayout]}>
					{children}
				</ScrollView>

				{isScrollTopButtonVisible && <ScrollTopButton onPress={handleScrollToTop} />}
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	contentsLayout: {
		flex: 1,
		paddingHorizontal: 32,
	},
	scrollTopButton: {
		position: "absolute",
		bottom: 2,
		right: 2,
	},
});
