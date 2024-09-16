import ScreenContainer from "@/components/common/ScreenContainer";
import ScrollTopButton from "@/components/common/ScrollTopButton";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ScrollableScreenLayout({ children }: { children: React.ReactNode }) {
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
		<ScreenContainer>
			<ScrollView ref={scrollRef} onScroll={handleScroll} style={[styles.contentsLayout]}>
				{children}
			</ScrollView>

			{isScrollTopButtonVisible && <ScrollTopButton onPress={handleScrollToTop} />}
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	contentsLayout: {
		flex: 1,
		paddingHorizontal: 28,
	},
	scrollTopButton: {
		position: "absolute",
		bottom: 2,
		right: 2,
	},
});
