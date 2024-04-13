import { View } from "react-native";
import { useRecoilState } from "recoil";
import BaseBlackText from "~/components/common/BaseBlackText";
import CustomButton from "~/components/common/CustomButton";
import Divider from "~/components/common/Divider";
import OverviewText from "~/components/common/OverviewText";
import CurrentSettings from "~/components/settings/CurrentSettings";
import SettingPicker from "~/components/settings/SettingPicker";
import { recordState } from "~/states/recordState";
import { secondaryColor } from "~/styles/color";
import ContentLayout from "../ContentLayout";

export default function SettingsMedicationMethod() {
	const [record, setRecord] = useRecoilState(recordState);

	const minConteniousTakingDays = record.initialSheetSettings.minConteniousTakingDays;
	const maxConteniousTakingDays = record.initialSheetSettings.maxConteniousTakingDays;
	const conteniousBleeingDaysForRest = record.initialSheetSettings.conteniousBleeingDaysForRest;
	const stopTakingDays = record.initialSheetSettings.stopTakingDays;

	function onChangeMinConteniousTakingDays(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				minConteniousTakingDays: Number(itemValue),
			},
		}));
	}

	function onChangeMaxConteniousTakingDays(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				maxConteniousTakingDays: Number(itemValue),
			},
		}));
	}

	function onChangeConteniousBleeingDaysForRest(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				conteniousBleeingDaysForRest: Number(itemValue),
			},
		}));
	}

	function onChangeStopTakingDays(itemValue: number) {
		setRecord((oldrecord) => ({
			...oldrecord,
			initialSheetSettings: {
				...oldrecord.initialSheetSettings,
				stopTakingDays: Number(itemValue),
			},
		}));
	}

	return (
		<ContentLayout title='服薬方法'>
			<OverviewText>このアプリは、120日連続服用を対象としています。</OverviewText>
			<OverviewText>お飲みの薬の服薬方法に合わせて、以下の設定を編集してください。</OverviewText>

			<Divider />

			<CurrentSettings />

			<Divider />

			<>
				<SettingPicker
					description={"最短連続服薬日数"}
					selectedValue={minConteniousTakingDays}
					minValue={1}
					maxValue={maxConteniousTakingDays - 1 > 30 ? 30 : maxConteniousTakingDays - 1}
					onChange={onChangeMinConteniousTakingDays}
				/>
				<SettingPicker
					description={"最長連続服薬日数"}
					selectedValue={maxConteniousTakingDays}
					minValue={minConteniousTakingDays + 1}
					maxValue={120}
					onChange={onChangeMaxConteniousTakingDays}
				/>
				<SettingPicker
					description={"休薬開始となる連続出血日数"}
					selectedValue={conteniousBleeingDaysForRest}
					minValue={1}
					maxValue={7}
					onChange={onChangeConteniousBleeingDaysForRest}
				/>
				<SettingPicker
					description={"連続休薬日数"}
					selectedValue={stopTakingDays}
					minValue={1}
					maxValue={7}
					onChange={onChangeStopTakingDays}
				/>
			</>
		</ContentLayout>
	);
}
