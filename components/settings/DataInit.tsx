import ContentSubTitle from "@/components/common/content/ContentSubTitle";
import CustomButton from "@/components/common/CustomButton";
import { ThemedText } from "@/components/common/ThemedText";
import { initialRecord, recordState } from "@/states/recordState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";

export default function DataInit() {
	const router = useRouter();

	const [record, setRecord] = useRecoilState(recordState);

	const onPressDelete = async () => {
		setRecord({
			...initialRecord,
			isAsyncStorageLoaded: true,
		});

		await AsyncStorage.clear();
		console.log("Initialized AsyncStorage.");

		router.replace("/initial-settings");
	};

	const onPressDataInitButton = () =>
		Alert.alert("アプリ内データを削除しますか？", "一度削除したデータは復元できません。よろしいですか？", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "アプリ内データを削除",
				style: "destructive",
				onPress: onPressDelete,
			},
		]);

	return (
		<>
			<ContentSubTitle title='データの削除' />

			<ThemedText type='description'>本アプリ内のすべてのデータを削除します。</ThemedText>
			<ThemedText type='description'>この操作を元に戻すことはできません。</ThemedText>

			<View style={{ height: 20 }} />
			<CustomButton type='warn' title='データの削除' onPress={onPressDataInitButton} />
		</>
	);
}

const styles = StyleSheet.create({});
