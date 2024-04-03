import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Button, View } from "react-native";
import { useRecoilState } from "recoil";
import CustomButton from "~/components/common/CustomButton";
import OverviewText from "~/components/common/OverviewText";
import { initialRecord, recordState } from "~/states/recordState";
import { warningYellow } from "~/styles/color";
import ContentLayout from "../ContentLayout";

export default function SettingsDataInit({ navigation }: { navigation: any }) {
	const [record, setRecord] = useRecoilState(recordState);

	const onPressDelete = async () => {
		setRecord({
			...initialRecord,
			isAsyncStorageLoaded: true,
		});

		await AsyncStorage.clear();
		console.log("Initialized AsyncStorage.");

		navigation.navigate("FirstSettings");
	};

	const onPressDataInitButton = () =>
		Alert.alert("データを削除しますか？", "一度削除したデータは復元できません。よろしいですか？", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "OK",
				style: "destructive",
				onPress: onPressDelete,
			},
		]);

	return (
		<ContentLayout title='初期化'>
			<OverviewText>{"本アプリ内の全データを削除し、インストール時の状態に初期化します。"}</OverviewText>
			<View style={{ height: 20 }} />
			<CustomButton
				onPress={onPressDataInitButton}
				title='データ初期化'
				bgColor={warningYellow}
				textColor='white'
			/>
		</ContentLayout>
	);
}
