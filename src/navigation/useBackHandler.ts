import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export default function useBackHandler(shouldExitApp: boolean) {
	useEffect(() => {
		const backAction = () => {
			if (shouldExitApp) {
				Alert.alert("アプリを終了しますか？", undefined, [
					{ text: "キャンセル", style: "cancel" },
					{ text: "OK", style: "destructive", onPress: () => BackHandler.exitApp() },
				]);
				return true;
			} else {
				return false;
			}
		};

		const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

		return () => backHandler.remove();
	}, [shouldExitApp]);
}
