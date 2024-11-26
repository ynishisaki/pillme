import { ThemedText } from "@/components/common/ThemedText";
import CheckBox from "@/components/ui/CheckBox";
import { dailyRecordType } from "@/types/record";
import { View } from "react-native";

interface Props {
  dailyRecord: dailyRecordType;
  handleUpdateTookMedicineRecord: (nextBoolean: boolean) => void;
  handleUpdateHaveBleedingRecord: (nextBoolean: boolean) => void;
  isNotRecorded?: boolean;
}

export default function Checkboxes({
  dailyRecord,
  handleUpdateTookMedicineRecord,
  handleUpdateHaveBleedingRecord,
  isNotRecorded,
}: Props) {
  return (
    <>
      <CheckBox
        textComponent={
          <View style={{ marginBottom: 6 }}>
            <ThemedText>服薬</ThemedText>
          </View>
        }
        type="medicine"
        isChecked={dailyRecord.tookMedicine}
        isRestPeriod={dailyRecord.isRestPeriod}
        isNotRecorded={isNotRecorded}
        onPress={handleUpdateTookMedicineRecord}
      />
      <CheckBox
        textComponent={
          <View style={{ marginBottom: 6 }}>
            <ThemedText>出血</ThemedText>
          </View>
        }
        type="bleeding"
        isChecked={dailyRecord.haveBleeding}
        isRestPeriod={dailyRecord.isRestPeriod}
        isNotRecorded={isNotRecorded}
        onPress={handleUpdateHaveBleedingRecord}
      />
    </>
  );
}
