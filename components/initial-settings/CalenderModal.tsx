import CustomButton from "@/components/common/CustomButton";
import { ThemedText } from "@/components/common/ThemedText";
import ContentSubTitle from "@/components/common/content/ContentSubTitle";
import useCalender from "@/components/initial-settings/useCalender";
import { CustomCalender } from "@/components/ui/CustomCalender";
import { locale, md } from "@/constants/tempo-options";
import { addDay, diffDays, format } from "@formkit/tempo";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Props {
  numOfDays: number;
  handleSetNumOfDays: (numOfDays: number) => void;
}

export default function CalenderModal({
  numOfDays,
  handleSetNumOfDays,
}: Props) {
  const todayDate = new Date();

  const parentDate = format(
    addDay(todayDate, -numOfDays + 1),
    "YYYY-MM-DD",
    locale
  );

  const {
    handleDayPress,
    markedDates,
    minDate,
    maxDate,
    selectedDate,
    setSelectedDate,
  } = useCalender({
    todayDate,
    parentDate,
  });

  const parentDateForDisplay = format(parentDate, md, locale);
  const selectedDateForDisplay = format(selectedDate, md, locale);

  // 今日の服薬も含めるため+1
  const currentNumOfDays = diffDays(todayDate, selectedDate) + 1;

  const [modalVisible, setModalVisible] = useState(false);
  function handleToggleModalVisible() {
    setModalVisible(!modalVisible);
  }

  function handleCancel() {
    setSelectedDate(parentDate); // reset date
    handleToggleModalVisible();
  }

  function handleDecide() {
    handleSetNumOfDays(currentNumOfDays);
    handleToggleModalVisible();
  }

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCancel}
        >
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={handleCancel}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>

            <View style={styles.modalView}>
              <View>
                <ContentSubTitle title="最新の服薬開始日" />

                <View>
                  <CustomCalender
                    handleDayPress={handleDayPress}
                    markedDates={markedDates}
                    minDate={minDate}
                    maxDate={maxDate}
                  />

                  <ThemedText>
                    {`${selectedDateForDisplay}（本日服薬${currentNumOfDays}日目）`}
                  </ThemedText>
                </View>
              </View>

              <CustomButton type="fill" title="決定" onPress={handleDecide} />
            </View>
          </View>
        </Modal>
      </View>

      <CustomButton
        type="default"
        title={`${parentDateForDisplay}（本日服薬${numOfDays}日目）`}
        onPress={handleToggleModalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
