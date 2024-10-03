/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#7B9EC8";
const tintColorDark = "#fff";

export const Colors = {
	light: {
		text: "dimgray",
		background: "#fff",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "white",
		background: "#151718",
		tint: tintColorDark,
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
	},
	contentHeader: "#6a8fa2",
	translucentWhite: "rgba(255, 255, 255, 1)",
	pillColor: "#E37376",
	lightBlue: "#2196F3",
	warningRed: "indianred",
	checkbox: {
		fill: "#E37376",
		unfill: "white",
		unpressable: "gray",
		unpressableUnknown: "lightgray",
	},
};
