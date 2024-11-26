import CustomButton from "@/components/common/CustomButton";
import { CurrentSheet } from "@/components/records/CurrentSheet";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Props {}

export default function SheetModal(props: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  function handleToggleModalVisible() {
    setModalVisible(!modalVisible);
  }

  function handleClose() {
    handleToggleModalVisible();
  }

  return (
    <>
      <CustomButton
        type="default"
        title="現在のシートを確認する"
        onPress={handleToggleModalVisible}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View style={styles.modalView}>
            <CurrentSheet />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    margin: 28,
  },
  contentLayout: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  textLayout: {
    marginTop: 16,
  },
});
